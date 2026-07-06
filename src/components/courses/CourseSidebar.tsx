'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Check } from '@phosphor-icons/react';
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
    <ol className="space-y-1">
      {lessons.map((lesson, i) => {
        const isActive = lesson.slug === activeSlug;
        const isDone = completed.has(lesson.slug);
        return (
          <li key={lesson.slug}>
            <Link
              href={lessonHref(seriesSlug, lesson.slug, i === 0)}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'group flex items-start gap-3 rounded-none px-2.5 py-2 text-sm transition',
                isActive
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-200'
                  : 'text-slate-700 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white'
              )}
            >
              <span
                className={cn(
                  'mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-none border',
                  isDone ? 'border-blue-600 bg-blue-600' : 'border-slate-300 dark:border-slate-700'
                )}
                aria-hidden="true"
              >
                {isDone && (
                  <Check className="h-2.5 w-2.5 text-white" weight="bold" />
                )}
              </span>
              <span className="mt-px shrink-0 text-xs tabular-nums text-slate-400 dark:text-slate-600">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span
                className={cn(
                  'leading-snug',
                  isActive ? 'font-bold' : ''
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
      <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        {seriesTitle}
      </p>
      {isAuthed ? (
        <>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            {completedCount} of {lessons.length} lessons complete
          </p>
          <div className="mt-1.5 h-1.5 w-full rounded-none bg-slate-200 dark:bg-slate-800">
            <div
              className="h-1.5 rounded-none bg-blue-600 transition-all"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </>
      ) : (
        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
          {lessons.length} {lessons.length === 1 ? 'lesson' : 'lessons'}
        </p>
      )}
    </div>
  );

  return (
    <aside className="order-first md:order-last">
      {/* Mobile: collapsible */}
      <details className="rounded-none border border-slate-200 bg-white p-4 shadow-sm shadow-slate-950/5 md:hidden dark:border-slate-800 dark:bg-slate-950">
        <summary className="cursor-pointer text-sm font-bold text-slate-950 dark:text-white">
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
