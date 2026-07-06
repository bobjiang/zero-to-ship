import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { RocketLaunch } from '@phosphor-icons/react/dist/ssr';
import { Container } from '@/components/ui/Container';
import { getAllShips } from '@/lib/content';
import { cn, cardSurface, cardHover } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Ships - What Our Members Built',
  description:
    'Real projects built by 02Ship community members. See what Claude practitioners are building in Sydney.',
  alternates: { canonical: '/ships' },
};

export default async function ShipsPage() {
  const ships = await getAllShips();
  const featured = ships[0];
  const rest = ships.slice(1);

  return (
    <div className="py-16 sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
              Project Hub
            </p>
            <h1 className="mt-4 text-balance text-5xl font-black tracking-tight text-slate-950 dark:text-white sm:text-6xl">
              Ships
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              Real projects built by our community, documented with the
              practical details other builders need.
            </p>
          </div>
          <div className="flex justify-start lg:justify-end">
            <a
              href="https://github.com/bobjiang/zero-to-ship/issues/new?template=ship-submission.yml"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center rounded-none bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-sm shadow-blue-950/10 transition hover:bg-blue-700"
            >
              Submit Project
            </a>
          </div>
        </div>

        {featured ? (
          <div className="mt-14 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <Link
              href={`/ships/${featured.slug}`}
              className={cn(cardSurface, cardHover, 'group overflow-hidden')}
            >
              {featured.screenshot && (
                <div className="relative overflow-hidden bg-slate-100 dark:bg-slate-900">
                  <Image
                    src={featured.screenshot}
                    alt={`${featured.title} homepage screenshot`}
                    width={1100}
                    height={720}
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    className="aspect-[1.58/1] w-full object-cover object-top transition duration-500 group-hover:scale-[1.02]"
                    priority
                  />
                </div>
              )}
              <div className="p-7">
                {featured.cohort && (
                  <span className="inline-flex rounded-none bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 dark:bg-blue-950/40 dark:text-blue-300">
                    {featured.cohort}
                  </span>
                )}
                <h2 className="mt-4 text-2xl font-black tracking-tight text-slate-950 dark:text-white">
                  {featured.title}
                </h2>
                <p className="mt-1 text-sm font-semibold text-slate-500 dark:text-slate-400">
                  by {featured.builder}
                </p>
                <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300">
                  {featured.description}
                </p>
              </div>
            </Link>

            <div className="rounded-none border border-slate-200 bg-slate-950 p-7 text-white shadow-xl shadow-slate-950/10 dark:border-slate-800">
              <RocketLaunch className="h-9 w-9 text-blue-300" weight="duotone" />
              <h2 className="mt-6 text-2xl font-black tracking-tight">
                Built, shipped, and explained.
              </h2>
              <p className="mt-4 text-sm leading-6 text-slate-300">
                The hub is meant to show how members turn ideas into working
                software. Each ship connects the product, the builder, the stack,
                and the result.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-3">
                <div className="rounded-none border border-white/10 bg-white/5 p-4">
                  <p className="text-3xl font-black">{ships.length}</p>
                  <p className="mt-1 text-xs font-semibold text-slate-400">
                    Listed ships
                  </p>
                </div>
                <div className="rounded-none border border-white/10 bg-white/5 p-4">
                  <p className="text-3xl font-black">
                    {new Set(ships.flatMap((ship) => ship.tags)).size}
                  </p>
                  <p className="mt-1 text-xs font-semibold text-slate-400">
                    Tags covered
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-16 rounded-none border border-slate-200 bg-white p-8 text-center text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
            <p>No ships yet - check back soon.</p>
          </div>
        )}

        {rest.length > 0 && (
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((ship) => (
              <Link
                key={ship.slug}
                href={`/ships/${ship.slug}`}
                className={cn(cardSurface, cardHover, 'group flex flex-col overflow-hidden')}
              >
                {ship.screenshot && (
                  <div className="relative overflow-hidden bg-slate-100 dark:bg-slate-900">
                    <Image
                      src={ship.screenshot}
                      alt={`${ship.title} homepage screenshot`}
                      width={760}
                      height={520}
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="aspect-[1.46/1] w-full object-cover object-top transition duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  {ship.cohort && (
                    <span className="mb-3 inline-flex w-fit rounded-none bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 dark:bg-blue-950/40 dark:text-blue-300">
                      {ship.cohort}
                    </span>
                  )}
                  <h2 className="text-xl font-black tracking-tight text-slate-950 dark:text-white">
                    {ship.title}
                  </h2>
                  <p className="mt-1 text-sm font-semibold text-slate-500 dark:text-slate-400">
                    by {ship.builder}
                  </p>
                  <p className="mt-3 flex-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {ship.description}
                  </p>
                  {ship.tags.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {ship.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-none bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-900 dark:text-slate-300"
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
        )}
      </Container>
    </div>
  );
}
