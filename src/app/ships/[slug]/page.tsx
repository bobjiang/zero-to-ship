import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, ArrowUpRight, RocketLaunch } from '@phosphor-icons/react/dist/ssr';
import { Container } from '@/components/ui/Container';
import { getShipBySlug, getAllShips } from '@/lib/content';

function withUtmSource(rawUrl: string, source: string): string {
  try {
    const u = new URL(rawUrl);
    if (!u.searchParams.has('utm_source')) {
      u.searchParams.set('utm_source', source);
    }
    return u.toString();
  } catch {
    return rawUrl;
  }
}

interface ShipPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const ships = await getAllShips();
  return ships.map((ship) => ({
    slug: ship.slug,
  }));
}

export async function generateMetadata({ params }: ShipPageProps) {
  const { slug } = await params;
  const ship = await getShipBySlug(slug);

  if (!ship) {
    return { title: 'Ship Not Found' };
  }

  return {
    title: `${ship.title} by ${ship.builder}`,
    description: ship.description,
    openGraph: {
      title: `${ship.title} by ${ship.builder}`,
      description: ship.description,
      url: `/ships/${slug}`,
      siteName: '02Ship',
      locale: 'en_US',
      type: 'article',
      publishedTime: ship.date,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${ship.title} by ${ship.builder}`,
      description: ship.description,
      creator: '@02ship',
    },
    alternates: {
      canonical: `/ships/${slug}`,
    },
  };
}

export default async function ShipDetailPage({ params }: ShipPageProps) {
  const { slug } = await params;
  const ship = await getShipBySlug(slug);

  if (!ship) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.02ship.com';
  const url = `${siteUrl}/ships/${slug}`;

  const demoHref = ship.demoUrl
    ? withUtmSource(ship.demoUrl, '02ship.com')
    : null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: ship.title,
    description: ship.description,
    datePublished: ship.date,
    author: {
      '@type': 'Person',
      name: ship.builder,
    },
    publisher: {
      '@type': 'Organization',
      name: '02Ship',
      url: siteUrl,
    },
    url: url,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="py-16 sm:py-24">
        <Container>
          <div className="mx-auto max-w-4xl">
            <div className="mb-6">
              <Link
                href="/ships"
                className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 transition hover:text-blue-700 dark:text-blue-400"
              >
                <ArrowLeft className="h-4 w-4" weight="bold" />
                Back to Ships
              </Link>
            </div>

            <article>
              <header className="mb-8">
                {ship.cohort && (
                  <span className="mb-4 inline-flex rounded-none bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 dark:bg-blue-950/40 dark:text-blue-300">
                    {ship.cohort}
                  </span>
                )}
                <h1 className="text-balance text-5xl font-black tracking-tight text-slate-950 dark:text-white sm:text-6xl">
                  {ship.title}
                </h1>
                <div className="mt-5 flex flex-wrap items-center gap-3 text-sm font-semibold text-slate-500 dark:text-slate-400">
                  <span>by {ship.builder}</span>
                  <span className="h-1 w-1 rounded-none bg-slate-300 dark:bg-slate-700" aria-hidden="true" />
                  <time dateTime={ship.date}>{ship.date}</time>
                </div>
              </header>

              {ship.screenshot ? (
                <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-none border border-slate-200 bg-slate-100 shadow-xl shadow-slate-950/10 dark:border-slate-800 dark:bg-slate-900">
                  <Image
                    src={ship.screenshot}
                    alt={`${ship.title} homepage screenshot`}
                    fill
                    sizes="(min-width: 768px) 768px, 100vw"
                    className="object-cover object-top"
                    priority
                  />
                </div>
              ) : (
                <div className="mb-8 flex h-64 items-center justify-center rounded-none border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-900">
                  <RocketLaunch className="h-16 w-16 text-slate-400" weight="duotone" />
                </div>
              )}

              {(ship.demoUrl || ship.repoUrl) && (
                <div className="mb-8 flex flex-wrap gap-4">
                  {demoHref && (
                    <a
                      href={demoHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center gap-2 rounded-none bg-blue-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-700"
                    >
                      Live Demo
                      <ArrowUpRight className="h-4 w-4" weight="bold" />
                    </a>
                  )}
                  {ship.repoUrl && (
                    <a
                      href={ship.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center gap-2 rounded-none border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-950 transition hover:border-slate-400 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:hover:border-slate-500"
                    >
                      GitHub Repo
                      <ArrowUpRight className="h-4 w-4" weight="bold" />
                    </a>
                  )}
                </div>
              )}

              <div className="prose prose-lg prose-blue max-w-none dark:prose-invert">
                <p>{ship.description}</p>
              </div>

              {ship.content && (
                <div className="prose prose-lg prose-blue mt-8 max-w-none dark:prose-invert">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {ship.content}
                  </ReactMarkdown>
                </div>
              )}

              {ship.tags.length > 0 && (
                <div className="mt-8 border-t border-slate-200 pt-6 dark:border-slate-800">
                  <h3 className="text-sm font-bold text-slate-950 dark:text-white">Tags</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {ship.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-none bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600 dark:bg-slate-900 dark:text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </article>

            <div className="mt-12 border-t border-slate-200 pt-8 dark:border-slate-800">
              <Link
                href="/ships"
                className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 transition hover:text-blue-700 dark:text-blue-400"
              >
                <ArrowLeft className="h-4 w-4" weight="bold" />
                Back to Ships
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
