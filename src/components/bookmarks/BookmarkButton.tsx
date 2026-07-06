'use client';

import { useEffect, useState } from 'react';
import { BookmarkSimple } from '@phosphor-icons/react';
import { createClient } from '@/lib/supabase/client';

interface BookmarkButtonProps {
  contentType: string;
  contentSlug: string;
  parentSlug?: string;
}

export function BookmarkButton({ contentType, contentSlug, parentSlug = '' }: BookmarkButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return;
      setIsAuthed(true);

      supabase
        .from('bookmarks')
        .select('id')
        .eq('user_id', user.id)
        .eq('content_type', contentType)
        .eq('content_slug', contentSlug)
        .eq('parent_slug', parentSlug)
        .maybeSingle()
        .then(({ data }) => {
          setIsBookmarked(!!data);
        });
    });
  }, [contentType, contentSlug, parentSlug]);

  if (!isAuthed) return null;

  const toggleBookmark = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    if (isBookmarked) {
      await supabase
        .from('bookmarks')
        .delete()
        .eq('user_id', user.id)
        .eq('content_type', contentType)
        .eq('content_slug', contentSlug)
        .eq('parent_slug', parentSlug);
      setIsBookmarked(false);
    } else {
      await supabase
        .from('bookmarks')
        .insert({
          user_id: user.id,
          content_type: contentType,
          content_slug: contentSlug,
          parent_slug: parentSlug,
        });
      setIsBookmarked(true);
    }
    setLoading(false);
  };

  return (
    <button
      onClick={toggleBookmark}
      disabled={loading}
      className="inline-flex min-h-9 items-center gap-1.5 rounded-none border border-slate-300 bg-white px-3 py-1.5 text-sm font-bold text-slate-700 shadow-sm shadow-slate-950/5 transition hover:border-slate-400 hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:border-slate-500"
      aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
    >
      <BookmarkSimple
        className="h-4 w-4"
        weight={isBookmarked ? 'fill' : 'regular'}
      />
      {isBookmarked ? 'Bookmarked' : 'Bookmark'}
    </button>
  );
}
