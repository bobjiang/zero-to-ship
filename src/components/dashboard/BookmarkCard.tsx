import Link from 'next/link';
import { BookmarkSimple } from '@phosphor-icons/react/dist/ssr';
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
      className="group flex gap-3 rounded-none border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:hover:border-blue-800"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-none bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-200">
        <BookmarkSimple className="h-5 w-5" weight="fill" />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-black text-slate-950 transition group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">{contentSlug}</span>
        <span className="mt-1 block text-xs font-semibold text-slate-500 dark:text-slate-400">
          <span className="capitalize">{contentType}</span>
          {parentSlug && <> in {parentSlug}</>}
          {' '}/ Saved {formattedDate}
        </span>
      </span>
    </Link>
  );
}
