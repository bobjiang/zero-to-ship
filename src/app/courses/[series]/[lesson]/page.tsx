import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { VideoPlayer } from '@/components/courses/VideoPlayer';
import { Button } from '@/components/ui/Button';
import { getLessonBySlug, getSeriesBySlug, getAllSeries } from '@/lib/content';

interface LessonPageProps {
  params: Promise<{
    series: string;
    lesson: string;
  }>;
}

export async function generateStaticParams() {
  const allSeries = await getAllSeries();
  const params: { series: string; lesson: string }[] = [];

  for (const series of allSeries) {
    for (const lesson of series.lessons) {
      params.push({
        series: series.slug,
        lesson: lesson.slug,
      });
    }
  }

  return params;
}

export async function generateMetadata({ params }: LessonPageProps) {
  const { series: seriesSlug, lesson: lessonSlug } = await params;
  const lesson = await getLessonBySlug(seriesSlug, lessonSlug);

  if (!lesson) {
    return {
      title: 'Lesson Not Found - 02Ship',
    };
  }

  return {
    title: `${lesson.title} - 02Ship`,
    description: lesson.description,
  };
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { series: seriesSlug, lesson: lessonSlug } = await params;
  const lesson = await getLessonBySlug(seriesSlug, lessonSlug);
  const series = await getSeriesBySlug(seriesSlug);

  if (!lesson || !series) {
    notFound();
  }

  const currentIndex = series.lessons.findIndex((l) => l.slug === lessonSlug);
  const previousLesson = currentIndex > 0 ? series.lessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < series.lessons.length - 1 ? series.lessons[currentIndex + 1] : null;

  return (
    <div className="py-20">
      <Container>
        <div className="mx-auto max-w-4xl">
          <div className="mb-6">
            <Link
              href={`/courses/${seriesSlug}`}
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              ← Back to {series.title}
            </Link>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            {lesson.title}
          </h1>
          <p className="mt-4 text-lg text-gray-600">{lesson.description}</p>
          <p className="mt-2 text-sm text-gray-600">Duration: {lesson.duration}</p>

          {/* Learning Objectives */}
          {lesson.learningObjectives && lesson.learningObjectives.length > 0 && (
            <div className="mt-8 rounded-lg bg-blue-50 p-6">
              <h2 className="text-xl font-semibold text-gray-900">Learning Objectives</h2>
              <p className="mt-2 text-sm text-gray-600">By the end of this lesson, you will be able to:</p>
              <ul className="mt-4 space-y-2">
                {lesson.learningObjectives.map((objective, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2 text-blue-600">✓</span>
                    <span className="text-gray-700">{objective}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Videos Section */}
          {lesson.videos && lesson.videos.length > 0 ? (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900">Videos</h2>
              <div className="mt-6 space-y-8">
                {lesson.videos.map((video, index) => (
                  <div key={index} className="rounded-lg border border-gray-200 p-6">
                    <h3 className="text-xl font-semibold text-gray-900">{video.title}</h3>
                    <p className="mt-2 text-gray-600">{video.description}</p>
                    {video.estimatedDuration && (
                      <p className="mt-1 text-sm text-gray-500">Duration: {video.estimatedDuration}</p>
                    )}
                    <div className="mt-4">
                      {video.youtubeId && video.youtubeId !== '[To be recorded]' ? (
                        <VideoPlayer youtubeId={video.youtubeId} title={video.title} />
                      ) : (
                        <div className="flex h-64 items-center justify-center rounded-lg bg-gray-100">
                          <p className="text-gray-500">Video coming soon</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : lesson.youtubeId ? (
            // Legacy single video support
            <div className="mt-8">
              <VideoPlayer youtubeId={lesson.youtubeId} title={lesson.title} />
            </div>
          ) : null}

          {/* Text Sections */}
          {lesson.textSections && lesson.textSections.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900">Key Concepts</h2>
              <div className="mt-6 space-y-6">
                {lesson.textSections.map((section, index) => (
                  <div key={index} className="rounded-lg bg-gray-50 p-6">
                    <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
                    <div className="mt-3 whitespace-pre-wrap text-gray-700">{section.content}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Common Mistakes */}
          {lesson.commonMistakes && lesson.commonMistakes.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900">Common Mistakes & Pitfalls</h2>
              <div className="mt-6 space-y-4">
                {lesson.commonMistakes.map((item, index) => (
                  <div key={index} className="rounded-lg border-l-4 border-yellow-500 bg-yellow-50 p-4">
                    <h3 className="font-semibold text-gray-900">❌ {item.mistake}</h3>
                    <p className="mt-1 text-gray-700">{item.explanation}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Exercises */}
          {lesson.exercises && lesson.exercises.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900">Exercises</h2>
              <div className="mt-6 space-y-6">
                {lesson.exercises.map((exercise, index) => (
                  <div key={index} className="rounded-lg border border-gray-200 p-6">
                    <div className="flex items-start justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">Exercise {index + 1}: {exercise.title}</h3>
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                        {exercise.estimatedTime}
                      </span>
                    </div>
                    <p className="mt-3 text-gray-700">{exercise.description}</p>
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-900">Expected Output:</p>
                      <p className="mt-1 text-gray-600">{exercise.output}</p>
                    </div>
                    {Array.isArray(exercise.successCriteria) ? (
                      <div className="mt-4">
                        <p className="text-sm font-medium text-gray-900">Success Criteria:</p>
                        <ul className="mt-2 space-y-1">
                          {exercise.successCriteria.map((criteria, idx) => (
                            <li key={idx} className="flex items-start text-sm text-gray-600">
                              <span className="mr-2">•</span>
                              <span>{criteria}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <div className="mt-4">
                        <p className="text-sm italic text-gray-600">{exercise.successCriteria}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reflection Questions */}
          {lesson.reflectionQuestions && lesson.reflectionQuestions.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900">Lesson Reflection</h2>
              <div className="mt-6 rounded-lg bg-purple-50 p-6">
                <p className="text-sm text-gray-600">Take a moment to reflect on what you&apos;ve learned:</p>
                <ul className="mt-4 space-y-3">
                  {lesson.reflectionQuestions.map((question, index) => (
                    <li key={index} className="text-gray-700">
                      <span className="font-medium">{index + 1}.</span> {question}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Resources */}
          {lesson.resources && lesson.resources.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900">Resources & Further Reading</h2>
              <div className="mt-6 space-y-3">
                {lesson.resources.map((resource, index) => (
                  <a
                    key={index}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:text-blue-700"
                  >
                    <span className="mr-2">📖</span>
                    <span>{resource.title}</span>
                    <span className="ml-2">→</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Legacy Transcript */}
          {lesson.transcript && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900">Transcript</h2>
              <div className="mt-4 whitespace-pre-wrap text-gray-600">
                {lesson.transcript}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-8">
            <div>
              {previousLesson ? (
                <Link href={`/courses/${seriesSlug}/${previousLesson.slug}`}>
                  <Button variant="outline">← Previous Lesson</Button>
                </Link>
              ) : (
                <div />
              )}
            </div>
            <div>
              {nextLesson ? (
                <Link href={`/courses/${seriesSlug}/${nextLesson.slug}`}>
                  <Button>Next Lesson →</Button>
                </Link>
              ) : (
                <Link href={`/courses/${seriesSlug}`}>
                  <Button variant="outline">Back to Course</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
