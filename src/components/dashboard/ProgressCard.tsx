import Link from 'next/link';

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
      className="block rounded-lg border border-gray-200 p-3 hover:bg-gray-50"
    >
      <p className="text-sm font-medium text-gray-900">{lessonSlug}</p>
      <p className="text-xs text-gray-500">
        {seriesSlug}
        {formattedDate && <> &middot; Completed {formattedDate}</>}
      </p>
    </Link>
  );
}
