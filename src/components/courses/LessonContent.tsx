import Link from 'next/link';
import { ArrowLeft, ArrowRight, BookOpen, Check, WarningCircle } from '@phosphor-icons/react/dist/ssr';
import { Series, Lesson } from '@/types/course';
import { VideoPlayer } from '@/components/courses/VideoPlayer';
import { Button } from '@/components/ui/Button';
import { LessonActionsClient } from '@/components/courses/LessonActionsClient';
import { lessonHref, cleanLessonTitle, cn } from '@/lib/utils';

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
      <p className="text-sm font-bold text-blue-600">
        Lesson {index + 1} of {lessons.length}
      </p>
      <h1 className="mt-3 text-balance text-4xl font-black tracking-tight text-slate-950 dark:text-white sm:text-5xl">
        {cleanLessonTitle(lesson.title)}
      </h1>
      <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-300">{lesson.description}</p>
      <p className="mt-3 inline-flex rounded-none bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600 dark:bg-slate-900 dark:text-slate-300">
        Duration: {lesson.duration}
      </p>
      <LessonActionsClient seriesSlug={series.slug} lessonSlug={lesson.slug} />

      {/* Learning Objectives */}
      {lesson.learningObjectives && lesson.learningObjectives.length > 0 && (
        <div className="mt-10 rounded-none border border-blue-200 bg-blue-50 p-6 dark:border-blue-900/70 dark:bg-blue-950/30">
          <h2 className="text-xl font-black tracking-tight text-slate-950 dark:text-white">Learning Objectives</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
            By the end of this lesson, you will be able to:
          </p>
          <ul className="mt-4 space-y-2">
            {lesson.learningObjectives.map((objective, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-none bg-blue-600 text-white">
                  <Check className="h-2.5 w-2.5" weight="bold" />
                </span>
                <span className="text-sm leading-6 text-slate-700 dark:text-slate-200">{objective}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Videos Section */}
      {lesson.videos && lesson.videos.length > 0 ? (
        <div className="mt-12">
          <h2 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white">Videos</h2>
          <div className="mt-6 space-y-8">
            {lesson.videos.map((video, i) => (
              <div key={i} className="rounded-none border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5 dark:border-slate-800 dark:bg-slate-950">
                <h3 className="text-xl font-black tracking-tight text-slate-950 dark:text-white">{video.title}</h3>
                <p className="mt-2 text-slate-600 dark:text-slate-300">{video.description}</p>
                {video.estimatedDuration && (
                  <p className="mt-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
                    Duration: {video.estimatedDuration}
                  </p>
                )}
                <div className="mt-4">
                  {video.youtubeId && video.youtubeId !== '[To be recorded]' ? (
                    <VideoPlayer youtubeId={video.youtubeId} title={video.title} />
                  ) : (
                    <div className="flex h-64 items-center justify-center rounded-none bg-slate-100 dark:bg-slate-900">
                      <p className="text-slate-500 dark:text-slate-400">Video coming soon</p>
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
          <h2 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white">Key Concepts</h2>
          <div className="mt-6 space-y-6">
            {lesson.textSections.map((section, i) => (
              <div key={i} className="rounded-none border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">
                <h3 className="text-lg font-black tracking-tight text-slate-950 dark:text-white">{section.title}</h3>
                <div className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-700 dark:text-slate-300">{section.content}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Common Mistakes */}
      {lesson.commonMistakes && lesson.commonMistakes.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white">Common Mistakes & Pitfalls</h2>
          <div className="mt-6 space-y-4">
            {lesson.commonMistakes.map((item, i) => (
              <div key={i} className="rounded-none border border-amber-200 bg-amber-50 p-5 dark:border-amber-900/70 dark:bg-amber-950/20">
                <h3 className="flex items-start gap-2 font-black text-slate-950 dark:text-white">
                  <WarningCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" weight="duotone" />
                  {item.mistake}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">{item.explanation}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Exercises */}
      {lesson.exercises && lesson.exercises.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white">Exercises</h2>
          <div className="mt-6 space-y-6">
            {lesson.exercises.map((exercise, i) => (
              <div key={i} className="rounded-none border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5 dark:border-slate-800 dark:bg-slate-950">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h3 className="text-lg font-black tracking-tight text-slate-950 dark:text-white">
                    Exercise {i + 1}: {exercise.title}
                  </h3>
                  <span className="rounded-none bg-blue-50 px-3 py-1 text-sm font-bold text-blue-700 dark:bg-blue-950/40 dark:text-blue-300">
                    {exercise.estimatedTime}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-700 dark:text-slate-300">{exercise.description}</p>
                <div className="mt-4">
                  <p className="text-sm font-bold text-slate-950 dark:text-white">Expected Output:</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">{exercise.output}</p>
                </div>
                {Array.isArray(exercise.successCriteria) ? (
                  <div className="mt-4">
                    <p className="text-sm font-bold text-slate-950 dark:text-white">Success Criteria:</p>
                    <ul className="mt-2 space-y-1">
                      {exercise.successCriteria.map((criteria, idx) => (
                        <li key={idx} className="flex items-start text-sm text-slate-600 dark:text-slate-300">
                          <span className="mr-2">&bull;</span>
                          <span>{criteria}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="mt-4">
                    <p className="text-sm italic text-slate-600 dark:text-slate-300">{exercise.successCriteria}</p>
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
          <h2 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white">Lesson Reflection</h2>
          <div className="mt-6 rounded-none border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900/60">
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Take a moment to reflect on what you&apos;ve learned:
            </p>
            <ul className="mt-4 space-y-3">
              {lesson.reflectionQuestions.map((question, i) => (
                <li key={i} className="text-sm leading-6 text-slate-700 dark:text-slate-300">
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
          <h2 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white">Resources & Further Reading</h2>
          <div className="mt-6 space-y-3">
            {lesson.resources.map((resource, i) => (
              <a
                key={i}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-none border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-blue-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-blue-700 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-slate-700"
              >
                <BookOpen className="h-4 w-4" weight="duotone" />
                <span>{resource.title}</span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Legacy Transcript */}
      {lesson.transcript && (
        <div className="mt-12">
          <h2 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white">Transcript</h2>
          <div className="mt-4 whitespace-pre-wrap text-sm leading-7 text-slate-600 dark:text-slate-300">{lesson.transcript}</div>
        </div>
      )}

      {/* Navigation */}
      <div className="mt-12 flex flex-col justify-between gap-3 border-t border-slate-200 pt-8 dark:border-slate-800 sm:flex-row">
        <div>
          {previousLesson ? (
            <Link href={lessonHref(series.slug, previousLesson.slug, index - 1 === 0)}>
              <Button variant="outline" className={cn('gap-2')}>
                <ArrowLeft className="h-4 w-4" weight="bold" />
                Previous Lesson
              </Button>
            </Link>
          ) : (
            <div />
          )}
        </div>
        <div>
          {nextLesson ? (
            <Link href={lessonHref(series.slug, nextLesson.slug, false)}>
              <Button className={cn('gap-2')}>
                Next Lesson
                <ArrowRight className="h-4 w-4" weight="bold" />
              </Button>
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
