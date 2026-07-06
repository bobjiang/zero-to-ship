import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import { Container } from '@/components/ui/Container';
import { getNewsByDate, getAllNewsDates } from '@/lib/news';
import { cn, cardSurface, cardHover } from '@/lib/utils';
import { NewsCategory } from '@/types/news';
import { BookmarkButton } from '@/components/bookmarks/BookmarkButton';

interface DailyNewsPageProps {
  params: Promise<{
    date: string;
  }>;
}

export async function generateStaticParams() {
  const dates = await getAllNewsDates();
  return dates.map((date) => ({ date }));
}

export async function generateMetadata({ params }: DailyNewsPageProps) {
  const { date } = await params;
  const formatted = new Date(date + 'T00:00:00').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return {
    title: `AI News - ${formatted}`,
    description: `Top AI news for ${formatted}, curated from Hacker News, Reddit, arXiv, and Hugging Face.`,
    openGraph: {
      title: `AI News - ${formatted}`,
      description: `Top AI news for ${formatted}`,
      type: 'article' as const,
    },
    alternates: {
      canonical: `/news/${date}`,
    },
  };
}

const categoryColors: Record<NewsCategory, string> = {
  research: 'bg-purple-100 text-purple-700 dark:bg-purple-950/50 dark:text-purple-200',
  product: 'bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-200',
  'open-source': 'bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-200',
  industry: 'bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-200',
};

export default async function DailyNewsPage({ params }: DailyNewsPageProps) {
  const { date } = await params;
  const news = await getNewsByDate(date);

  if (!news) {
    notFound();
  }

  const formatted = new Date(date + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const allDates = await getAllNewsDates();
  const currentIndex = allDates.indexOf(date);
  const newerDate = currentIndex > 0 ? allDates[currentIndex - 1] : null;
  const olderDate = currentIndex < allDates.length - 1 ? allDates[currentIndex + 1] : null;

  return (
    <div className="py-16 sm:py-24">
      <Container>
        <div className="mx-auto max-w-3xl">
          <div className="mb-8">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 transition hover:text-blue-700 dark:text-blue-400"
            >
              <ArrowLeft className="h-4 w-4" weight="bold" />
              Back to AI News
            </Link>
          </div>

          <header className="border-b border-slate-200 pb-8 dark:border-slate-800">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-blue-600 dark:text-blue-400">
              Daily briefing
            </p>
            <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl dark:text-white">
              AI News - {formatted}
            </h1>
            <div className="mt-5">
              <BookmarkButton contentType="news" contentSlug={date} />
            </div>
          </header>

          <div className="mt-8 space-y-4">
            {news.items.map((item, i) => (
              <a
                key={i}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(cardSurface, cardHover, 'group block p-5 sm:p-6')}
              >
                <div className="flex items-start gap-4 sm:gap-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-none bg-blue-50 text-sm font-black text-blue-700 dark:bg-blue-950/50 dark:text-blue-200">
                    {item.score}
                  </div>
                  <div className="min-w-0">
                    <span className="flex items-start gap-2 text-lg font-black tracking-tight text-slate-950 transition group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                      {item.title}
                      <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 opacity-50 transition group-hover:opacity-100" weight="bold" />
                    </span>
                    <p className="mt-2 text-base leading-7 text-slate-600 dark:text-slate-300">{item.summary}</p>
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">{item.source}</span>
                      <span
                        className={cn(
                          'rounded-none px-2.5 py-1 text-xs font-bold',
                          categoryColors[item.category]
                        )}
                      >
                        {item.category}
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-10 flex justify-between border-t border-slate-200 pt-6 dark:border-slate-800">
            {newerDate ? (
              <Link
                href={`/news/${newerDate}`}
                className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 transition hover:text-blue-700 dark:text-blue-400"
              >
                <ArrowLeft className="h-4 w-4" weight="bold" />
                Newer
              </Link>
            ) : (
              <span />
            )}
            {olderDate ? (
              <Link
                href={`/news/${olderDate}`}
                className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 transition hover:text-blue-700 dark:text-blue-400"
              >
                Older
                <ArrowRight className="h-4 w-4" weight="bold" />
              </Link>
            ) : (
              <span />
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
