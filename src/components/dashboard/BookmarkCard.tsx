import Link from 'next/link';
import { resolveContentUrl } from '@/lib/content-resolver';

interface BookmarkCardProps {
  contentType: string;
  contentSlug: string;
  parentSlug: string;
  createdAt: string;
}

export function BookmarkCard({ contentType, contentSlug, parentSlug, createdAt }: BookmarkCardProps) {
  const url = resolveContentUrl(contentType, contentSlug, parentSlug);
  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  return (
    <Link
      href={url}
      className="block rounded-lg border border-gray-200 p-3 hover:bg-gray-50"
    >
      <p className="text-sm font-medium text-gray-900">{contentSlug}</p>
      <p className="text-xs text-gray-500">
        <span className="capitalize">{contentType}</span>
        {parentSlug && <> in {parentSlug}</>}
        {' '}&middot; Saved {formattedDate}
      </p>
    </Link>
  );
}
