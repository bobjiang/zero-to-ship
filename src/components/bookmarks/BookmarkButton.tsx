'use client';

import { useEffect, useState } from 'react';
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
      className="inline-flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
      aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
    >
      <svg
        className="h-4 w-4"
        fill={isBookmarked ? 'currentColor' : 'none'}
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
        />
      </svg>
      {isBookmarked ? 'Bookmarked' : 'Bookmark'}
    </button>
  );
}
