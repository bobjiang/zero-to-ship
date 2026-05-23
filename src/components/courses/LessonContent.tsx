import Link from 'next/link';
import { Series, Lesson } from '@/types/course';
import { VideoPlayer } from '@/components/courses/VideoPlayer';
import { Button } from '@/components/ui/Button';
import { LessonActionsClient } from '@/components/courses/LessonActionsClient';
import { lessonHref, cleanLessonTitle } from '@/lib/utils';

interface LessonContentProps {
  series: Series;
  lesson: Lesson;
}

export function LessonContent({ series, lesson }: LessonContentProps) {
  const lessons = series.lessons;
  const index = lessons.findIndex((l) => l.slug === lesson.slug);
  const previousLesson = index > 0 ? lessons[index - 1] : null;
  const nextLesson = index < lessons.length - 1 ? lessons[index + 1] : null;

  return (
    <article className="max-w-3xl">
      {/* Header */}
      <p className="text-sm font-medium text-gray-500">
        Lesson {index + 1} of {lessons.length}
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        {cleanLessonTitle(lesson.title)}
      </h1>
      <p className="mt-4 text-lg text-gray-600">{lesson.description}</p>
      <p className="mt-2 text-sm text-gray-500">Duration: {lesson.duration}</p>
      <LessonActionsClient seriesSlug={series.slug} lessonSlug={lesson.slug} />

      {/* Learning Objectives */}
      {lesson.learningObjectives && lesson.learningObjectives.length > 0 && (
        <div className="mt-8 rounded-lg bg-blue-50 p-6">
          <h2 className="text-xl font-semibold text-gray-900">Learning Objectives</h2>
          <p className="mt-2 text-sm text-gray-600">
            By the end of this lesson, you will be able to:
          </p>
          <ul className="mt-4 space-y-2">
            {lesson.learningObjectives.map((objective, i) => (
              <li key={i} className="flex items-start">
                <span className="mr-2 text-blue-600">&#10003;</span>
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
            {lesson.videos.map((video, i) => (
              <div key={i} className="rounded-lg border border-gray-200 p-6">
                <h3 className="text-xl font-semibold text-gray-900">{video.title}</h3>
                <p className="mt-2 text-gray-600">{video.description}</p>
                {video.estimatedDuration && (
                  <p className="mt-1 text-sm text-gray-500">
                    Duration: {video.estimatedDuration}
                  </p>
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
            {lesson.textSections.map((section, i) => (
              <div key={i} className="rounded-lg bg-gray-50 p-6">
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
            {lesson.commonMistakes.map((item, i) => (
              <div key={i} className="rounded-lg border-l-4 border-yellow-500 bg-yellow-50 p-4">
                <h3 className="font-semibold text-gray-900">&#10060; {item.mistake}</h3>
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
            {lesson.exercises.map((exercise, i) => (
              <div key={i} className="rounded-lg border border-gray-200 p-6">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Exercise {i + 1}: {exercise.title}
                  </h3>
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
                          <span className="mr-2">&bull;</span>
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
            <p className="text-sm text-gray-600">
              Take a moment to reflect on what you&apos;ve learned:
            </p>
            <ul className="mt-4 space-y-3">
              {lesson.reflectionQuestions.map((question, i) => (
                <li key={i} className="text-gray-700">
                  <span className="font-medium">{i + 1}.</span> {question}
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
            {lesson.resources.map((resource, i) => (
              <a
                key={i}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-blue-600 hover:text-blue-700"
              >
                <span className="mr-2">&#128214;</span>
                <span>{resource.title}</span>
                <span className="ml-2">&rarr;</span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Legacy Transcript */}
      {lesson.transcript && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900">Transcript</h2>
          <div className="mt-4 whitespace-pre-wrap text-gray-600">{lesson.transcript}</div>
        </div>
      )}

      {/* Navigation */}
      <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-8">
        <div>
          {previousLesson ? (
            <Link href={lessonHref(series.slug, previousLesson.slug, index - 1 === 0)}>
              <Button variant="outline">&larr; Previous Lesson</Button>
            </Link>
          ) : (
            <div />
          )}
        </div>
        <div>
          {nextLesson ? (
            <Link href={lessonHref(series.slug, nextLesson.slug, false)}>
              <Button>Next Lesson &rarr;</Button>
            </Link>
          ) : (
            <Link href={lessonHref(series.slug, lessons[0].slug, true)}>
              <Button variant="outline">Back to start</Button>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
