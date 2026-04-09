import type { Metadata } from 'next';
import Link from 'next/link';
import { requireUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';
import { createClient } from '@/lib/supabase/server';

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
      <h1 className="text-2xl font-bold text-gray-900">My Courses</h1>

      {seriesList.length > 0 ? (
        <div className="mt-6 space-y-4">
          {seriesList.map(([slug, info]) => (
            <Link
              key={slug}
              href={`/courses/${slug}`}
              className="block rounded-lg border border-gray-200 p-4 hover:bg-gray-50"
            >
              <p className="font-medium text-gray-900">{slug}</p>
              <p className="mt-1 text-sm text-gray-500">
                {info.count} {info.count === 1 ? 'lesson' : 'lessons'} completed
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <p className="mt-6 text-sm text-gray-500">
          No courses started yet.{' '}
          <Link href="/courses" className="text-blue-600 hover:text-blue-700">
            Browse courses
          </Link>
        </p>
      )}
    </div>
  );
}
