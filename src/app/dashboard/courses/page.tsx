import type { Metadata } from 'next';
import Link from 'next/link';
import { GraduationCap } from '@phosphor-icons/react/dist/ssr';
import { requireUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';
import { createClient } from '@/lib/supabase/server';
import { EmptyState } from '@/components/ui/EmptyState';

export const metadata: Metadata = {
  title: 'My Courses',
};

export default async function DashboardCoursesPage() {
  const user = await requireUser();
  const supabase = await createClient();

  const { data: progress } = await supabase
    .from('lesson_progress')
    .select('*')
    .eq('user_id', user.id)
    .eq('is_completed', true)
    .order('updated_at', { ascending: false });

  const rows = progress ?? [];

  // Group by series
  const seriesMap = new Map<string, { count: number; lastUpdated: string }>();
  for (const row of rows) {
    const existing = seriesMap.get(row.series_slug);
    if (existing) {
      existing.count++;
      if (row.updated_at > existing.lastUpdated) {
        existing.lastUpdated = row.updated_at;
      }
    } else {
      seriesMap.set(row.series_slug, { count: 1, lastUpdated: row.updated_at });
    }
  }

  const seriesList = Array.from(seriesMap.entries())
    .sort((a, b) => b[1].lastUpdated.localeCompare(a[1].lastUpdated));

  return (
    <div>
      <p className="text-sm font-black uppercase tracking-[0.24em] text-blue-600 dark:text-blue-400">
        Learning
      </p>
      <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white">My Courses</h1>

      {seriesList.length > 0 ? (
        <div className="mt-6 grid gap-3">
          {seriesList.map(([slug, info]) => (
            <Link
              key={slug}
              href={`/courses/${slug}`}
              className="group flex items-center gap-4 rounded-none border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:hover:border-blue-800"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-none bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-200">
                <GraduationCap className="h-6 w-6" weight="fill" />
              </span>
              <span>
                <span className="block font-black text-slate-950 transition group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">{slug}</span>
                <span className="mt-1 block text-sm font-semibold text-slate-500 dark:text-slate-400">
                  {info.count} {info.count === 1 ? 'lesson' : 'lessons'} completed
                </span>
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <EmptyState
          className="mt-6"
          title="No courses started yet."
          description="Choose a course and completed lessons will appear here."
          action={<Link href="/courses" className="text-sm font-bold text-blue-600 transition hover:text-blue-700 dark:text-blue-400">Browse courses</Link>}
        />
      )}
    </div>
  );
}
