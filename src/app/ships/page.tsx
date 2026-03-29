import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { getAllShips } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Ships — What Our Members Built',
  description:
    'Real projects built by 02Ship community members. See what Claude practitioners are building in Sydney.',
  alternates: { canonical: '/ships' },
};

export default async function ShipsPage() {
  const ships = await getAllShips();

  return (
    <div className="py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Ships
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Real projects built by our community
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-5xl">
          {ships.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {ships.map((ship) => (
                <Link
                  key={ship.slug}
                  href={`/ships/${ship.slug}`}
                  className="group flex flex-col rounded-xl border border-gray-200 transition-all hover:border-gray-300 hover:shadow-md"
                >
                  <div className="flex h-48 items-center justify-center rounded-t-xl bg-gray-100">
                    <svg
                      className="h-12 w-12 text-gray-400"
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
                  <div className="flex flex-1 flex-col p-6">
                    {ship.cohort && (
                      <span className="mb-2 inline-block w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                        {ship.cohort}
                      </span>
                    )}
                    <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {ship.title}
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      by {ship.builder}
                    </p>
                    <p className="mt-3 flex-1 text-sm text-gray-600">
                      {ship.description}
                    </p>
                    {ship.tags.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {ship.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-600"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-600">
              <p>No ships yet. Join a cohort to showcase your build.</p>
              <Link
                href="/ship-weeks"
                className="mt-4 inline-block text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                Learn about cohorts →
              </Link>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
