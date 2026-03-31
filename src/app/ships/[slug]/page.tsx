import { notFound } from 'next/navigation';
import Link from 'next/link';
import { marked } from 'marked';
import { Container } from '@/components/ui/Container';
import { getShipBySlug, getAllShips } from '@/lib/content';

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
      <div className="py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="mb-6">
              <Link
                href="/ships"
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                ← Back to Ships
              </Link>
            </div>

            <article>
              <header className="mb-8">
                {ship.cohort && (
                  <span className="mb-3 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                    {ship.cohort}
                  </span>
                )}
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                  {ship.title}
                </h1>
                <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
                  <span>by {ship.builder}</span>
                  <span>•</span>
                  <time dateTime={ship.date}>{ship.date}</time>
                </div>
              </header>

              <div className="mb-8 flex h-64 items-center justify-center rounded-xl bg-gray-100">
                <svg
                  className="h-16 w-16 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.841m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                  />
                </svg>
              </div>

              {(ship.demoUrl || ship.repoUrl) && (
                <div className="mb-8 flex flex-wrap gap-4">
                  {ship.demoUrl && (
                    <a
                      href={ship.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                    >
                      Live Demo
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                    </a>
                  )}
                  {ship.repoUrl && (
                    <a
                      href={ship.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                    >
                      GitHub Repo
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                    </a>
                  )}
                </div>
              )}

              <div className="prose prose-lg prose-blue max-w-none">
                <p>{ship.description}</p>
              </div>

              {ship.content && (
                <div
                  className="prose prose-lg prose-blue mt-8 max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: marked.parse(ship.content, { async: false }) as string
                  }}
                />
              )}

              {ship.tags.length > 0 && (
                <div className="mt-8 border-t border-gray-200 pt-6">
                  <h3 className="text-sm font-semibold text-gray-900">Tags</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {ship.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-gray-100 px-3 py-1 text-sm text-gray-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </article>

            <div className="mt-12 border-t border-gray-200 pt-8">
              <Link
                href="/ships"
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                ← Back to Ships
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
