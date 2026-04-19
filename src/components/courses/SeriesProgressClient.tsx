'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

interface SeriesProgressClientProps {
  seriesSlug: string;
  totalLessons: number;
}

export function SeriesProgressClient({ seriesSlug, totalLessons }: SeriesProgressClientProps) {
  const [completedCount, setCompletedCount] = useState(0);
  const [isAuthed, setIsAuthed] = useState(false);

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
          setCompletedCount(data?.length ?? 0);
        });
    });
  }, [seriesSlug]);

  if (!isAuthed || totalLessons === 0) return null;

  const percentage = Math.round((completedCount / totalLessons) * 100);

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>{completedCount} of {totalLessons} lessons completed</span>
        <span>{percentage}%</span>
      </div>
      <div className="mt-1 h-2 w-full rounded-full bg-gray-200">
        <div
          className="h-2 rounded-full bg-blue-600 transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
