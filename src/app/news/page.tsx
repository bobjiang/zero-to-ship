import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, TelegramLogo } from '@phosphor-icons/react/dist/ssr';
import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/ui/PageHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { getAllNewsDates } from '@/lib/news';
import { cn, cardSurface, cardHover } from '@/lib/utils';

const PAGE_SIZE = 24;

interface NewsPageProps {
  searchParams?: Promise<{
    page?: string;
  }>;
}

export const metadata: Metadata = {
  title: 'Daily News - Curated & Ranked',
  description: 'Daily curated AI news from Hacker News, Reddit, arXiv, and Hugging Face, ranked by impact.',
  alternates: { canonical: '/news' },
};

function parsePage(value: string | undefined): number {
  if (!value) return 1;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

function pageHref(page: number): string {
  return page <= 1 ? '/news' : `/news?page=${page}`;
}

export default async function NewsPage({ searchParams }: NewsPageProps) {
  const params = await searchParams;
  const dates = await getAllNewsDates();
  const pageCount = Math.max(1, Math.ceil(dates.length / PAGE_SIZE));
  const currentPage = Math.min(parsePage(params?.page), pageCount);
  const start = (currentPage - 1) * PAGE_SIZE;
  const paginatedDates = dates.slice(start, start + PAGE_SIZE);
  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < pageCount;

  return (
    <div className="py-16 sm:py-24">
      <Container>
        <PageHeader
          eyebrow="Daily briefing"
          title="AI News"
          description="Daily curated AI news, ranked by impact."
          actions={
            <a
              href="https://t.me/ClauderSydney"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-none bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-sm shadow-blue-950/10 transition hover:bg-blue-700"
            >
              <TelegramLogo className="h-4 w-4" weight="fill" />
              Subscribe on Telegram
            </a>
          }
        />

        <div className="mx-auto mt-12 max-w-3xl">
          {dates.length > 0 ? (
            <>
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-y border-slate-200 py-3 dark:border-slate-800">
                <p className="text-sm font-bold text-slate-600 dark:text-slate-300">
                  Showing {start + 1}-{Math.min(start + PAGE_SIZE, dates.length)} of {dates.length} briefings
                </p>
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                  Page {currentPage} of {pageCount}
                </p>
              </div>

              <div className="grid gap-3">
                {paginatedDates.map((date) => {
                  const formatted = new Date(date + 'T00:00:00').toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  });
                  return (
                    <Link
                      key={date}
                      href={`/news/${date}`}
                      className={cn(cardSurface, cardHover, 'block p-5')}
                    >
                      <span className="text-lg font-black tracking-tight text-slate-950 dark:text-white">{formatted}</span>
                    </Link>
                  );
                })}
              </div>

              {pageCount > 1 && (
                <nav
                  className="mt-8 flex items-center justify-between gap-4 border-t border-slate-200 pt-5 dark:border-slate-800"
                  aria-label="News pagination"
                >
                  {hasPrevious ? (
                    <Link
                      href={pageHref(currentPage - 1)}
                      className="inline-flex min-h-10 items-center gap-2 border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-950 transition hover:border-slate-400 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:hover:border-slate-500"
                    >
                      <ArrowLeft className="h-4 w-4" weight="bold" />
                      Newer
                    </Link>
                  ) : (
                    <span />
                  )}

                  {hasNext ? (
                    <Link
                      href={pageHref(currentPage + 1)}
                      className="inline-flex min-h-10 items-center gap-2 border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-950 transition hover:border-slate-400 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:hover:border-slate-500"
                    >
                      Older
                      <ArrowRight className="h-4 w-4" weight="bold" />
                    </Link>
                  ) : (
                    <span />
                  )}
                </nav>
              )}
            </>
          ) : (
            <EmptyState
              title="No news yet."
              description="Check back soon for daily AI briefings."
            />
          )}
        </div>
      </Container>
    </div>
  );
}
