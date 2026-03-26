import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';

export const metadata: Metadata = {
  title: 'Events — AI Builder Meetups & Workshops',
  description:
    'Join upcoming meetups and workshops for AI builders. Learn to build and ship with Claude Code and other AI tools.',
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

export default async function EventsPage() {
  const pastEvents = await getPastEvents();

  return (
    <Container>
      <div className="py-12">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Events
          </h1>
          <p className="mt-2 text-base text-gray-600">
            Join our upcoming meetups and workshops for AI builders
          </p>

          <a
            href="https://luma.com/02ship"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex items-center justify-between rounded-lg border border-blue-200 bg-blue-50 px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <span className="text-lg" aria-hidden="true">
                🔔
              </span>
              <div>
                <p className="text-sm font-semibold text-blue-800">
                  Never miss an event
                </p>
                <p className="text-xs text-blue-600">
                  Subscribe on Lu.ma to get notified about upcoming events
                </p>
              </div>
            </div>
            <span className="rounded-md bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700">
              Subscribe
            </span>
          </a>

          <a
            href="https://forms.gle/wT2d2zZ47waQAviC8"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center justify-between rounded-lg border border-amber-200 bg-amber-50 px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <span className="text-lg" aria-hidden="true">
                🍲
              </span>
              <div>
                <p className="text-sm font-semibold text-amber-800">
                  Bring your talent to the pot
                </p>
                <p className="text-xs text-amber-600">
                  Volunteer, speak, mentor, or create content with us
                </p>
              </div>
            </div>
            <span className="rounded-md bg-amber-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-700">
              Contribute
            </span>
          </a>

          <div className="mt-6">
            <iframe
              src="https://luma.com/embed/calendar/cal-zhuelVReFdNX5xm/events"
              width="100%"
              height="450"
              frameBorder="0"
              style={{ border: '1px solid #bfcbda88', borderRadius: '4px' }}
              allowFullScreen
              aria-hidden="false"
              tabIndex={0}
              title="02Ship events calendar"
            />
          </div>

          {pastEvents.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                Past Events
              </h2>
              <ul className="mt-4 divide-y divide-gray-200">
                {pastEvents.map((entry) => (
                  <li key={entry.event.url}>
                    <a
                      href={`https://lu.ma/${entry.event.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-baseline justify-between gap-4 py-3 transition-colors hover:bg-gray-50 sm:px-2"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-gray-900">
                          {entry.event.name}
                        </p>
                        <p className="mt-0.5 text-xs text-gray-500">
                          {formatLocation(entry.event.geo_address_info)}
                        </p>
                      </div>
                      <time
                        dateTime={entry.event.start_at}
                        className="shrink-0 text-sm text-gray-500"
                      >
                        {formatDate(entry.event.start_at)}
                      </time>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}
