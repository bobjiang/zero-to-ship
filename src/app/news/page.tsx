import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { getAllNewsDates } from '@/lib/news';

export const metadata: Metadata = {
  title: 'Daily News — Curated & Ranked',
  description: 'Daily curated AI news from Hacker News, Reddit, arXiv, and Hugging Face, ranked by impact.',
  alternates: { canonical: '/news' },
};

export default async function NewsPage() {
  const dates = await getAllNewsDates();

  return (
    <div className="py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            AI News
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Daily curated AI news, ranked by impact
          </p>
          <a
            href="https://t.me/ClauderSydney"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
          >
            Subscribe on Telegram
          </a>
        </div>

        <div className="mx-auto mt-16 max-w-2xl">
          {dates.length > 0 ? (
            <div className="space-y-4">
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
                    className="block rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:border-blue-300 hover:shadow-md transition-all"
                  >
                    <span className="text-lg font-semibold text-gray-900">{formatted}</span>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center text-gray-600">
              <p>No news yet. Check back soon!</p>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
