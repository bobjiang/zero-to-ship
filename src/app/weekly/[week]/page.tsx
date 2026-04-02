import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { getWeeklyDigest, getAllWeeks } from '@/lib/weekly';
import { cn } from '@/lib/utils';
import { WeeklyImpact } from '@/types/weekly';

interface WeeklyDetailPageProps {
  params: Promise<{
    week: string;
  }>;
}

export async function generateStaticParams() {
  const weeks = await getAllWeeks();
  return weeks.map((week) => ({ week }));
}

function formatDateRange(startDate: string, endDate: string): string {
  const start = new Date(startDate + 'T00:00:00');
  const end = new Date(endDate + 'T00:00:00');
  const opts: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
  const yearOpts: Intl.DateTimeFormatOptions = { ...opts, year: 'numeric' };
  return `${start.toLocaleDateString('en-US', opts)} – ${end.toLocaleDateString('en-US', yearOpts)}`;
}

export async function generateMetadata({ params }: WeeklyDetailPageProps) {
  const { week } = await params;
  const digest = await getWeeklyDigest(week);

  if (!digest) {
    return { title: 'Week Not Found' };
  }

  const dateRange = formatDateRange(digest.startDate, digest.endDate);

  return {
    title: `Anthropic & Claude Updates — ${dateRange}`,
    description: digest.summary,
    openGraph: {
      title: `Anthropic & Claude Updates — ${dateRange}`,
      description: digest.summary,
      type: 'article' as const,
    },
    alternates: {
      canonical: `/weekly/${week}`,
    },
  };
}

const impactColors: Record<WeeklyImpact, string> = {
  high: 'bg-red-500',
  medium: 'bg-blue-500',
  low: 'bg-gray-400',
};

export default async function WeeklyDetailPage({ params }: WeeklyDetailPageProps) {
  const { week } = await params;
  const digest = await getWeeklyDigest(week);

  if (!digest) {
    notFound();
  }

  const dateRange = formatDateRange(digest.startDate, digest.endDate);

  const allWeeks = await getAllWeeks();
  const currentIndex = allWeeks.indexOf(week);
  const newerWeek = currentIndex > 0 ? allWeeks[currentIndex - 1] : null;
  const olderWeek = currentIndex < allWeeks.length - 1 ? allWeeks[currentIndex + 1] : null;

  const nonEmptySections = digest.sections.filter(s => s.items.length > 0);

  return (
    <div className="py-20">
      <Container>
        <div className="mx-auto max-w-3xl">
          <div className="mb-6">
            <Link
              href="/weekly"
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              &larr; Back to Weekly Updates
            </Link>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {dateRange}
          </h1>
          <p className="mt-2 text-lg text-gray-600">{digest.summary}</p>

          <div className="mt-10 space-y-10">
            {nonEmptySections.map((section) => (
              <div key={section.id}>
                <h2 className="border-l-4 border-blue-500 pl-3 text-xl font-semibold text-gray-900">
                  {section.title}
                </h2>
                <div className="mt-4 space-y-4">
                  {section.items.map((item, i) => (
                    <article
                      key={i}
                      className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className={cn(
                            'mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full',
                            impactColors[item.impact]
                          )}
                          title={`${item.impact} impact`}
                        />
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
                          <div className="mt-2 flex items-center gap-2 flex-wrap">
                            {item.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-between border-t border-gray-200 pt-6">
            {newerWeek ? (
              <Link
                href={`/weekly/${newerWeek}`}
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                &larr; Newer
              </Link>
            ) : (
              <span />
            )}
            {olderWeek ? (
              <Link
                href={`/weekly/${olderWeek}`}
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                Older &rarr;
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
