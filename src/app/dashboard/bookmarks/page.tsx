import type { Metadata } from 'next';
import { requireUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';
import { createClient } from '@/lib/supabase/server';
import { BookmarkCard } from '@/components/dashboard/BookmarkCard';
import { EmptyState } from '@/components/ui/EmptyState';

export const metadata: Metadata = {
  title: 'Bookmarks',
};

export default async function DashboardBookmarksPage() {
  const user = await requireUser();
  const supabase = await createClient();

  const { data: bookmarks } = await supabase
    .from('bookmarks')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  const rows = bookmarks ?? [];

  return (
    <div>
      <p className="text-sm font-black uppercase tracking-[0.24em] text-blue-600 dark:text-blue-400">
        Saved
      </p>
      <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white">Bookmarks</h1>

      {rows.length > 0 ? (
        <div className="mt-6 space-y-3">
          {rows.map((b) => (
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
          className="mt-6"
          title="No bookmarks yet."
          description="Bookmark content as you browse to find it later."
        />
      )}
    </div>
  );
}
