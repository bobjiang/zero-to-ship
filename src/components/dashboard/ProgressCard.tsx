import Link from 'next/link';
import { CheckCircle } from '@phosphor-icons/react/dist/ssr';

interface ProgressCardProps {
  seriesSlug: string;
  lessonSlug: string;
  completedAt: string | null;
}

export function ProgressCard({ seriesSlug, lessonSlug, completedAt }: ProgressCardProps) {
  const formattedDate = completedAt
    ? new Date(completedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })
    : null;

  return (
    <Link
      href={`/courses/${seriesSlug}/${lessonSlug}`}
      className="group flex gap-3 rounded-none border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:hover:border-blue-800"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-none bg-green-50 text-green-700 dark:bg-green-950/50 dark:text-green-200">
        <CheckCircle className="h-5 w-5" weight="fill" />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-black text-slate-950 transition group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">{lessonSlug}</span>
        <span className="mt-1 block text-xs font-semibold text-slate-500 dark:text-slate-400">
          {seriesSlug}
          {formattedDate && <> / Completed {formattedDate}</>}
        </span>
      </span>
    </Link>
  );
}
