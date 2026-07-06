import type { Metadata } from 'next';
import Link from 'next/link';
import { TelegramLogo } from '@phosphor-icons/react/dist/ssr';
import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/ui/PageHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { getAllNewsDates } from '@/lib/news';
import { cn, cardSurface, cardHover } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Daily News - Curated & Ranked',
  description: 'Daily curated AI news from Hacker News, Reddit, arXiv, and Hugging Face, ranked by impact.',
  alternates: { canonical: '/news' },
};

export default async function NewsPage() {
  const dates = await getAllNewsDates();

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
            <div className="grid gap-3">
              {dates.map((date) => {
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
