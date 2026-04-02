import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { getAllWeeks, getWeeklyDigest } from '@/lib/weekly';

export const metadata: Metadata = {
  title: 'Weekly Anthropic & Claude Updates',
  description: 'Curated weekly digest of what\'s new from Anthropic and Claude, tailored for builders.',
  alternates: { canonical: '/weekly' },
};

function formatDateRange(startDate: string, endDate: string): string {
  const start = new Date(startDate + 'T00:00:00');
  const end = new Date(endDate + 'T00:00:00');
  const opts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
  const yearOpts: Intl.DateTimeFormatOptions = { ...opts, year: 'numeric' };
  return `${start.toLocaleDateString('en-US', opts)} – ${end.toLocaleDateString('en-US', yearOpts)}`;
}

function getTopTags(digest: { sections: { items: { impact: string; tags: string[] }[] }[] }): string[] {
  const tags: string[] = [];
  for (const section of digest.sections) {
    for (const item of section.items) {
      if (item.impact === 'high') {
        tags.push(...item.tags);
      }
    }
  }
  return Array.from(new Set(tags)).slice(0, 3);
}

function getStats(digest: { sections: { items: unknown[] }[] }): { items: number; sections: number } {
  const sections = digest.sections.filter(s => s.items.length > 0).length;
  const items = digest.sections.reduce((sum, s) => sum + s.items.length, 0);
  return { items, sections };
}

export default async function WeeklyPage() {
  const weeks = await getAllWeeks();
  const digests = await Promise.all(weeks.map(w => getWeeklyDigest(w)));

  return (
    <div className="py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Weekly Anthropic & Claude Updates
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Curated weekly digest of what&apos;s new from Anthropic and Claude
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl">
          {digests.length > 0 ? (
            <div className="space-y-4">
              {digests.map((digest) => {
                if (!digest) return null;
                const dateRange = formatDateRange(digest.startDate, digest.endDate);
                const topTags = getTopTags(digest);
                const stats = getStats(digest);
                return (
                  <Link
                    key={digest.week}
                    href={`/weekly/${digest.week}`}
                    className="block rounded-lg border border-gray-200 bg-white p-5 shadow-sm hover:border-blue-300 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <span className="text-lg font-semibold text-gray-900">{dateRange}</span>
                      <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                        {digest.week.split('-')[1]}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">{digest.summary}</p>
                    <div className="mt-3 flex items-center gap-2 flex-wrap">
                      {topTags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="mt-2 text-xs text-gray-500">
                      {stats.items} updates &middot; {stats.sections} sections
                    </p>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center text-gray-600">
              <p>No weekly updates yet. Check back soon!</p>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
