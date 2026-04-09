'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { BookmarkButton } from '@/components/bookmarks/BookmarkButton';

interface LessonActionsClientProps {
  seriesSlug: string;
  lessonSlug: string;
}

export function LessonActionsClient({ seriesSlug, lessonSlug }: LessonActionsClientProps) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return;
      setIsAuthed(true);

      supabase
        .from('lesson_progress')
        .select('is_completed')
        .eq('user_id', user.id)
        .eq('series_slug', seriesSlug)
        .eq('lesson_slug', lessonSlug)
        .maybeSingle()
        .then(({ data }) => {
          setIsCompleted(data?.is_completed ?? false);
        });
    });
  }, [seriesSlug, lessonSlug]);

  if (!isAuthed) return null;

  const toggleComplete = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    if (isCompleted) {
      await supabase
        .from('lesson_progress')
        .update({ is_completed: false, completed_at: null })
        .eq('user_id', user.id)
        .eq('series_slug', seriesSlug)
        .eq('lesson_slug', lessonSlug);
      setIsCompleted(false);
    } else {
      await supabase
        .from('lesson_progress')
        .upsert({
          user_id: user.id,
          series_slug: seriesSlug,
          lesson_slug: lessonSlug,
          is_completed: true,
          completed_at: new Date().toISOString(),
        });
      setIsCompleted(true);
    }
    setLoading(false);
  };

  return (
    <div className="mt-4 flex items-center gap-3">
      <Button
        variant={isCompleted ? 'secondary' : 'primary'}
        size="sm"
        onClick={toggleComplete}
        disabled={loading}
      >
        {isCompleted ? 'Completed' : 'Mark complete'}
      </Button>
      <BookmarkButton
        contentType="lesson"
        contentSlug={lessonSlug}
        parentSlug={seriesSlug}
      />
    </div>
  );
}
