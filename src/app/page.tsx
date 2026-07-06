import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, CalendarDots, Hammer, Newspaper } from '@phosphor-icons/react/dist/ssr';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { getAllShips } from '@/lib/content';
import { cn, cardSurface, cardHover } from '@/lib/utils';

export const metadata: Metadata = {
  title: {
    absolute: "02Ship - Sydney's Claude Builder Community",
  },
  description:
    'Monthly meetups, small-group ship weeks, and real projects for Claude practitioners in Sydney. Join 100+ members building with AI.',
  alternates: {
    canonical: '/',
  },
};

const rhythms = [
  {
    title: 'Meet in person',
    copy: 'Monthly Sydney events with project demos, tool breakdowns, and practical Claude workflows.',
    icon: CalendarDots,
  },
  {
    title: 'Ship in public',
    copy: 'Members share real products, lessons learned, prompts, architecture choices, and launch notes.',
    icon: Hammer,
  },
  {
    title: 'Stay current',
    copy: 'Daily AI news keeps the community aligned on product launches, papers, and useful building patterns.',
    icon: Newspaper,
  },
];

const stats = [
  ['500+', 'Members'],
  ['5+', 'Meetups'],
  ['67%', 'Daily Claude Users'],
];

export default async function HomePage() {
  const featuredShips = (await getAllShips()).slice(0, 3);

  return (
    <div className="overflow-hidden">
      <section className="relative border-b border-slate-200 bg-slate-50 py-16 dark:border-slate-800 dark:bg-slate-950 sm:py-24">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[0.94fr_1.06fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
                Claude builders in Sydney
              </p>
              <h1 className="mt-5 max-w-4xl text-balance text-5xl font-black tracking-tight text-slate-950 dark:text-white sm:text-6xl lg:text-7xl">
                Sydney&apos;s Claude Builder Community
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                Monthly meetups. Real projects, real outcomes. Join 500+ Claude
                practitioners building with AI in Sydney.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link href="/events">
                  <Button size="lg">Join Next Meetup</Button>
                </Link>
                <Link href="/ships">
                  <Button variant="outline" size="lg">
                    See What Members Built
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-none border border-slate-200 bg-white shadow-2xl shadow-slate-950/15 dark:border-slate-800 dark:bg-slate-900">
                <Image
                  src="/images/02ship-01.jpeg"
                  alt="02Ship community members at the latest Sydney meetup"
                  width={1280}
                  height={964}
                  className="aspect-[16/10] w-full object-cover object-bottom lg:aspect-[4/3]"
                  priority
                />
              </div>
              <div className="grid grid-cols-3 overflow-hidden rounded-none border border-slate-200 bg-white/95 p-2 shadow-lg shadow-slate-950/10 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95 sm:absolute sm:bottom-0 sm:left-6 sm:w-[68%] sm:translate-y-1/2">
                {stats.map(([value, label]) => (
                  <div key={label} className="px-3 py-4 text-center">
                    <p className="text-2xl font-black text-slate-950 dark:text-white">
                      {value}
                    </p>
                    <p className="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-20 dark:bg-slate-950 sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
                How the community works
              </p>
              <h2 className="mt-4 text-balance text-4xl font-black tracking-tight text-slate-950 dark:text-white">
                Build momentum through rhythm, not hype.
              </h2>
              <p className="mt-5 text-base leading-7 text-slate-600 dark:text-slate-300">
                02Ship is structured around repeated practice: meet people,
                learn from shipped work, follow the news, and bring your own
                project back to the room.
              </p>
            </div>
            <div className="grid gap-4">
              {rhythms.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="grid gap-5 border-t border-slate-200 py-6 dark:border-slate-800 sm:grid-cols-[4rem_1fr_auto]"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-none bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-300">
                      <Icon className="h-6 w-6" weight="duotone" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-950 dark:text-white">
                        {item.title}
                      </h3>
                      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
                        {item.copy}
                      </p>
                    </div>
                    <span className="font-mono text-sm font-bold text-slate-300 dark:text-slate-700">
                      0{index + 1}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-slate-200 bg-slate-100/70 py-20 dark:border-slate-800 dark:bg-slate-900/60 sm:py-24">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
                Member builds
              </p>
              <h2 className="mt-4 text-balance text-4xl font-black tracking-tight text-slate-950 dark:text-white">
                Real products from the community.
              </h2>
            </div>
            <Link
              href="/ships"
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 transition hover:text-blue-700 dark:text-blue-400"
            >
              Project Hub
              <ArrowUpRight className="h-4 w-4" weight="bold" />
            </Link>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {featuredShips.map((ship) => (
              <Link
                key={ship.slug}
                href={`/ships/${ship.slug}`}
                className={cn(cardSurface, cardHover, 'group overflow-hidden')}
              >
                {ship.screenshot && (
                  <Image
                    src={ship.screenshot}
                    alt={`${ship.title} project screenshot`}
                    width={720}
                    height={480}
                    className="aspect-[1.5/1] w-full object-cover object-top"
                  />
                )}
                <div className="p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-600">
                    {ship.cohort ?? 'Community ship'}
                  </p>
                  <h3 className="mt-3 text-lg font-bold text-slate-950 dark:text-white">
                    {ship.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {ship.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
