'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { cn, lessonHref, cleanLessonTitle } from '@/lib/utils';

interface SidebarLesson {
  slug: string;
  title: string;
}

interface CourseSidebarProps {
  seriesSlug: string;
  seriesTitle: string;
  lessons: SidebarLesson[];
}

export function CourseSidebar({ seriesSlug, seriesTitle, lessons }: CourseSidebarProps) {
  const pathname = usePathname();
  const [isAuthed, setIsAuthed] = useState(false);
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return;
      setIsAuthed(true);
      supabase
        .from('lesson_progress')
        .select('lesson_slug')
        .eq('user_id', user.id)
        .eq('series_slug', seriesSlug)
        .eq('is_completed', true)
        .then(({ data }) => {
          setCompleted(new Set((data ?? []).map((r) => r.lesson_slug)));
        });
    });
  }, [seriesSlug]);

  const firstSlug = lessons[0]?.slug;
  const activeSlug = pathname.startsWith(`/courses/${seriesSlug}/`)
    ? pathname.slice(`/courses/${seriesSlug}/`.length).split('/')[0]
    : firstSlug;

  const completedCount = lessons.filter((l) => completed.has(l.slug)).length;
  const percentage =
    lessons.length > 0 ? Math.round((completedCount / lessons.length) * 100) : 0;

  const list = (
    <ol className="space-y-0.5">
      {lessons.map((lesson, i) => {
        const isActive = lesson.slug === activeSlug;
        const isDone = completed.has(lesson.slug);
        return (
          <li key={lesson.slug}>
            <Link
              href={lessonHref(seriesSlug, lesson.slug, i === 0)}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'group flex items-start gap-3 rounded-md px-2 py-2 text-sm transition-colors',
                isActive ? 'bg-blue-50' : 'hover:bg-gray-50'
              )}
            >
              <span
                className={cn(
                  'mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border',
                  isDone ? 'border-blue-600 bg-blue-600' : 'border-gray-300'
                )}
                aria-hidden="true"
              >
                {isDone && (
                  <svg className="h-2.5 w-2.5 text-white" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2.5 6.5l2.5 2.5 4.5-5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>
              <span className="mt-px shrink-0 text-xs tabular-nums text-gray-400">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span
                className={cn(
                  'leading-snug',
                  isActive
                    ? 'font-semibold text-blue-600'
                    : 'text-gray-700 group-hover:text-gray-900'
                )}
              >
                {cleanLessonTitle(lesson.title)}
              </span>
            </Link>
          </li>
        );
      })}
    </ol>
  );

  const heading = (
    <div className="mb-3">
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
        {seriesTitle}
      </p>
      {isAuthed ? (
        <>
          <p className="mt-2 text-xs text-gray-500">
            {completedCount} of {lessons.length} lessons complete
          </p>
          <div className="mt-1.5 h-1.5 w-full rounded-full bg-gray-200">
            <div
              className="h-1.5 rounded-full bg-blue-600 transition-all"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </>
      ) : (
        <p className="mt-2 text-xs text-gray-500">
          {lessons.length} {lessons.length === 1 ? 'lesson' : 'lessons'}
        </p>
      )}
    </div>
  );

  return (
    <aside className="order-first md:order-last">
      {/* Mobile: collapsible */}
      <details className="rounded-lg border border-gray-200 bg-white p-4 md:hidden">
        <summary className="cursor-pointer text-sm font-semibold text-gray-900">
          Lessons ({lessons.length})
        </summary>
        <div className="mt-4">
          {heading}
          {list}
        </div>
      </details>

      {/* Desktop: sticky nav */}
      <nav
        aria-label="Course lessons"
        className="hidden md:sticky md:top-24 md:block"
      >
        {heading}
        {list}
      </nav>
    </aside>
  );
}
