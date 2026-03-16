import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';

export const metadata: Metadata = {
  title: 'Events — AI Builder Meetups & Workshops',
  description:
    'Join upcoming meetups and workshops for AI builders. Learn to build and ship with Claude Code and other AI tools.',
  alternates: { canonical: '/events' },
};

export default function EventsPage() {
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
        </div>
      </div>
    </Container>
  );
}
