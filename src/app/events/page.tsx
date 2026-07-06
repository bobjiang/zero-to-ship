import type { Metadata } from 'next';
import { BellRinging, CalendarCheck, HandHeart } from '@phosphor-icons/react/dist/ssr';
import { Container } from '@/components/ui/Container';

export const metadata: Metadata = {
  title: 'Events - Claude AI Meetups & Workshops in Sydney',
  description:
    'Monthly Claude AI meetups and workshops in Sydney, Australia. Live demos, talks, networking, and hands-on building sessions for AI practitioners of all levels.',
  alternates: { canonical: '/events' },
};

interface LumaEvent {
  event: {
    name: string;
    start_at: string;
    url: string;
    geo_address_info?: {
      city?: string;
      country?: string;
    };
  };
}

async function getPastEvents(): Promise<LumaEvent[]> {
  try {
    const res = await fetch(
      'https://api.lu.ma/calendar/get-items?calendar_api_id=cal-zhuelVReFdNX5xm&period=past&limit=50',
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.entries ?? [];
  } catch {
    return [];
  }
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatLocation(geo?: LumaEvent['event']['geo_address_info']): string {
  if (!geo) return 'Online';
  const parts = [geo.city, geo.country].filter(Boolean);
  return parts.length > 0 ? parts.join(', ') : 'Online';
}

const faqItems = [
  {
    question: 'When and where are the meetups?',
    answer:
      'We host monthly in-person meetups in Sydney, Australia. Dates and venues vary, so subscribe on Lu.ma or join our Discord to get notified about each event.',
  },
  {
    question: 'What happens at a typical meetup?',
    answer:
      'Each meetup includes lightning talks from community members, live demos of projects built with AI tools, networking time, and sometimes hands-on workshops. Topics focus on Claude Code, agent skills, and building products with AI.',
  },
  {
    question: 'Do I need coding experience to attend?',
    answer:
      'No. Our events welcome everyone from complete beginners to experienced developers. The community is built around helping non-programmers learn to build with AI.',
  },
  {
    question: 'Are events free?',
    answer:
      'Yes, all 02Ship events are free to attend. Just RSVP on Lu.ma so we can plan for the right number of attendees.',
  },
  {
    question: 'Can I speak or present at a meetup?',
    answer:
      'Absolutely. We love community speakers. Fill out the contribution form above or message us on Discord to propose a talk or demo.',
  },
];

export default async function EventsPage() {
  const pastEvents = await getPastEvents();

  return (
    <div className="py-16 sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
              Sydney meetups
            </p>
            <h1 className="mt-4 text-balance text-5xl font-black tracking-tight text-slate-950 dark:text-white sm:text-6xl">
              Events
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              Monthly in-person meetups in Sydney for Claude AI practitioners.
              Live demos, lightning talks, and hands-on building sessions. All
              skill levels welcome.
            </p>
          </div>
          <div className="grid gap-4">
            <a
              href="https://luma.com/02ship"
              target="_blank"
              rel="noopener noreferrer"
              className="group grid gap-4 rounded-none border border-blue-200 bg-blue-50 p-5 transition hover:border-blue-300 hover:bg-blue-100 dark:border-blue-900/70 dark:bg-blue-950/30 dark:hover:border-blue-800 sm:grid-cols-[3rem_1fr_auto] sm:items-center"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-none bg-blue-600 text-white">
                <BellRinging className="h-6 w-6" weight="duotone" />
              </div>
              <div>
                <p className="text-sm font-bold text-blue-950 dark:text-blue-100">
                  Never miss an event
                </p>
                <p className="mt-1 text-xs font-medium text-blue-700 dark:text-blue-300">
                  Subscribe on Lu.ma to get notified about upcoming events
                </p>
              </div>
              <span className="inline-flex w-fit rounded-none bg-blue-600 px-3 py-2 text-xs font-bold text-white transition group-hover:bg-blue-700">
                Subscribe
              </span>
            </a>

            <a
              href="https://forms.gle/wT2d2zZ47waQAviC8"
              target="_blank"
              rel="noopener noreferrer"
              className="group grid gap-4 rounded-none border border-slate-200 bg-white p-5 transition hover:border-slate-300 hover:shadow-md hover:shadow-slate-950/10 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-slate-700 sm:grid-cols-[3rem_1fr_auto] sm:items-center"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-none bg-slate-950 text-white dark:bg-white dark:text-slate-950">
                <HandHeart className="h-6 w-6" weight="duotone" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-950 dark:text-white">
                  Bring your talent to the pot
                </p>
                <p className="mt-1 text-xs font-medium text-slate-600 dark:text-slate-300">
                  Volunteer, speak, mentor, or create content with us
                </p>
              </div>
              <span className="inline-flex w-fit rounded-none bg-slate-950 px-3 py-2 text-xs font-bold text-white transition group-hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:group-hover:bg-slate-200">
                Contribute
              </span>
            </a>
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-none border border-slate-200 bg-white shadow-xl shadow-slate-950/10 dark:border-slate-800 dark:bg-slate-950">
          <iframe
            src="https://luma.com/embed/calendar/cal-zhuelVReFdNX5xm/events"
            width="100%"
            height="520"
            frameBorder="0"
            className="block w-full"
            allowFullScreen
            aria-hidden="false"
            tabIndex={0}
            title="02Ship events calendar"
          />
        </div>

        {pastEvents.length > 0 && (
          <section className="mt-16">
            <div className="flex items-center gap-3">
              <CalendarCheck className="h-7 w-7 text-blue-600" weight="duotone" />
              <h2 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white">
                Past Events
              </h2>
            </div>
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {pastEvents.map((entry) => (
                <a
                  key={entry.event.url}
                  href={`https://lu.ma/${entry.event.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid gap-3 rounded-none border border-slate-200 bg-white p-5 transition hover:border-slate-300 hover:shadow-md hover:shadow-slate-950/10 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-slate-700 sm:grid-cols-[1fr_auto]"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-slate-950 dark:text-white">
                      {entry.event.name}
                    </p>
                    <p className="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
                      {formatLocation(entry.event.geo_address_info)}
                    </p>
                  </div>
                  <time
                    dateTime={entry.event.start_at}
                    className="text-sm font-semibold text-slate-500 dark:text-slate-400"
                  >
                    {formatDate(entry.event.start_at)}
                  </time>
                </a>
              ))}
            </div>
          </section>
        )}

        <section className="mt-16">
          <h2 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white">
            Event FAQ
          </h2>
          <dl className="mt-6 grid gap-4 md:grid-cols-2">
            {faqItems.map((item) => (
              <div
                key={item.question}
                className="rounded-none border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950"
              >
                <dt className="text-base font-bold text-slate-950 dark:text-white">
                  {item.question}
                </dt>
                <dd className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {item.answer}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </Container>
    </div>
  );
}
