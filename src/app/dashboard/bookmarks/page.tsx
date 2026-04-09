import type { Metadata } from 'next';
import { requireUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';
import { createClient } from '@/lib/supabase/server';
import { BookmarkCard } from '@/components/dashboard/BookmarkCard';

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
      <h1 className="text-2xl font-bold text-gray-900">Bookmarks</h1>

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
        <p className="mt-6 text-sm text-gray-500">
          No bookmarks yet. Bookmark content as you browse to find it later.
        </p>
      )}
    </div>
  );
}
