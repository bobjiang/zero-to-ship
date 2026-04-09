import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { getNewsByDate, getAllNewsDates } from '@/lib/news';
import { cn } from '@/lib/utils';
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
    title: `AI News — ${formatted}`,
    description: `Top AI news for ${formatted}, curated from Hacker News, Reddit, arXiv, and Hugging Face.`,
    openGraph: {
      title: `AI News — ${formatted}`,
      description: `Top AI news for ${formatted}`,
      type: 'article' as const,
    },
    alternates: {
      canonical: `/news/${date}`,
    },
  };
}

const categoryColors: Record<NewsCategory, string> = {
  research: 'bg-purple-100 text-purple-700',
  product: 'bg-blue-100 text-blue-700',
  'open-source': 'bg-green-100 text-green-700',
  industry: 'bg-amber-100 text-amber-700',
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
    <div className="py-20">
      <Container>
        <div className="mx-auto max-w-3xl">
          <div className="mb-6">
            <Link
              href="/news"
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              ← Back to AI News
            </Link>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            AI News — {formatted}
          </h1>
          <div className="mt-3">
            <BookmarkButton contentType="news" contentSlug={date} />
          </div>

          <div className="mt-8 space-y-6">
            {news.items.map((item, i) => (
              <article
                key={i}
                className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm font-bold text-gray-700">
                    {item.score}
                  </div>
                  <div className="min-w-0">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                    >
                      {item.title}
                    </a>
                    <p className="mt-1 text-gray-600">{item.summary}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-xs font-medium text-gray-500">{item.source}</span>
                      <span
                        className={cn(
                          'rounded-full px-2 py-0.5 text-xs font-medium',
                          categoryColors[item.category]
                        )}
                      >
                        {item.category}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 flex justify-between border-t border-gray-200 pt-6">
            {newerDate ? (
              <Link
                href={`/news/${newerDate}`}
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                ← Newer
              </Link>
            ) : (
              <span />
            )}
            {olderDate ? (
              <Link
                href={`/news/${olderDate}`}
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                Older →
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
