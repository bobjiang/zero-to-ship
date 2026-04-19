import type { Metadata } from 'next';
import Link from 'next/link';
import { requireUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';
import { createClient } from '@/lib/supabase/server';
import { ProgressCard } from '@/components/dashboard/ProgressCard';
import { BookmarkCard } from '@/components/dashboard/BookmarkCard';

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
      <h1 className="text-2xl font-bold text-gray-900">
        Welcome back, {displayName}
      </h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <section>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Recent Progress</h2>
            <Link href="/dashboard/courses" className="text-sm text-blue-600 hover:text-blue-700">
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
            <p className="mt-4 text-sm text-gray-500">
              No lessons completed yet.{' '}
              <Link href="/courses" className="text-blue-600 hover:text-blue-700">
                Browse courses
              </Link>
            </p>
          )}
        </section>

        <section>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Recent Bookmarks</h2>
            <Link href="/dashboard/bookmarks" className="text-sm text-blue-600 hover:text-blue-700">
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
            <p className="mt-4 text-sm text-gray-500">
              No bookmarks yet. Bookmark lessons and articles as you browse.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
