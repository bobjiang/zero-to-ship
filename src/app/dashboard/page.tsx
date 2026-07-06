import type { Metadata } from 'next';
import Link from 'next/link';
import { requireUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';
import { createClient } from '@/lib/supabase/server';
import { ProgressCard } from '@/components/dashboard/ProgressCard';
import { BookmarkCard } from '@/components/dashboard/BookmarkCard';
import { EmptyState } from '@/components/ui/EmptyState';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function DashboardPage() {
  const user = await requireUser();
  const supabase = await createClient();

  const [progressResult, bookmarksResult, profileResult] = await Promise.all([
    supabase
      .from('lesson_progress')
      .select('*')
      .eq('user_id', user.id)
      .eq('is_completed', true)
      .order('updated_at', { ascending: false })
      .limit(5),
    supabase
      .from('bookmarks')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(5),
    supabase
      .from('profiles')
      .select('full_name')
      .eq('id', user.id)
      .single(),
  ]);

  const recentProgress = progressResult.data ?? [];
  const recentBookmarks = bookmarksResult.data ?? [];
  const displayName = profileResult.data?.full_name || user.user_metadata?.full_name || 'there';

  return (
    <div>
      <p className="text-sm font-black uppercase tracking-[0.24em] text-blue-600 dark:text-blue-400">
        Dashboard
      </p>
      <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white">
        Welcome back, {displayName}
      </h1>

      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        <section>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black tracking-tight text-slate-950 dark:text-white">Recent Progress</h2>
            <Link href="/dashboard/courses" className="text-sm font-bold text-blue-600 transition hover:text-blue-700 dark:text-blue-400">
              View all
            </Link>
          </div>
          {recentProgress.length > 0 ? (
            <div className="mt-4 space-y-3">
              {recentProgress.map((p) => (
                <ProgressCard
                  key={`${p.series_slug}-${p.lesson_slug}`}
                  seriesSlug={p.series_slug}
                  lessonSlug={p.lesson_slug}
                  completedAt={p.completed_at}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              className="mt-4"
              title="No lessons completed yet."
              description="Start a course to see your progress here."
              action={<Link href="/courses" className="text-sm font-bold text-blue-600 transition hover:text-blue-700 dark:text-blue-400">Browse courses</Link>}
            />
          )}
        </section>

        <section>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black tracking-tight text-slate-950 dark:text-white">Recent Bookmarks</h2>
            <Link href="/dashboard/bookmarks" className="text-sm font-bold text-blue-600 transition hover:text-blue-700 dark:text-blue-400">
              View all
            </Link>
          </div>
          {recentBookmarks.length > 0 ? (
            <div className="mt-4 space-y-3">
              {recentBookmarks.map((b) => (
                <BookmarkCard
                  key={b.id}
                  contentType={b.content_type}
                  contentSlug={b.content_slug}
                  parentSlug={b.parent_slug}
                  createdAt={b.created_at}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              className="mt-4"
              title="No bookmarks yet."
              description="Bookmark lessons and articles as you browse."
            />
          )}
        </section>
      </div>
    </div>
  );
}
