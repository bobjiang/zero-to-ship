import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Cohort — 2-Week Build Sprints',
  description:
    'Join a 2-week build sprint with fellow Claude practitioners. Small groups, real projects, demo day presentations. Apply for the next cohort.',
  alternates: { canonical: '/ship-weeks' },
};

const timeline = [
  {
    label: 'Week 0',
    title: 'Apply',
    description: 'Submit your project idea and get matched with a small cohort of builders.',
  },
  {
    label: 'Day 1',
    title: 'Kickoff',
    description: 'Meet your cohort, scope your project, and set your 2-week goal.',
  },
  {
    label: 'Day 7',
    title: 'Check-in',
    description: 'Share progress, get feedback, and unblock any issues with the group.',
  },
  {
    label: 'Day 14',
    title: 'Demo Day',
    description: 'Present your finished build to the community at our monthly meetup.',
  },
];

export default function ShipWeeksPage() {
  return (
    <div className="py-20">
      <Container>
        {/* Hero */}
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Cohort
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            2-week build sprints for Claude practitioners. Pick a project, join a
            small cohort, and ship something real — with accountability,
            feedback, and a demo day to show it off.
          </p>
          <div className="mt-8">
            <a
              href="https://forms.gle/QAvpyXisP4MQ53kX9"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg">Apply for Next Cohort</Button>
            </a>
          </div>
        </div>

        {/* Timeline */}
        <div className="mx-auto mt-16 max-w-3xl">
          <h2 className="text-2xl font-bold text-gray-900">How It Works</h2>
          <div className="mt-8 space-y-0">
            {timeline.map((step, i) => (
              <div key={step.label} className="relative flex gap-6 pb-8">
                {i < timeline.length - 1 && (
                  <div className="absolute left-5 top-10 h-full w-px bg-gray-200" />
                )}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                  {i + 1}
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                    {step.label}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-gray-900">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mx-auto mt-16 max-w-xl text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Ready to ship something?
          </h2>
          <p className="mt-3 text-gray-600">
            Apply for the next cohort. We run them monthly alongside
            our meetups.
          </p>
          <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="https://forms.gle/QAvpyXisP4MQ53kX9"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg">Apply for Next Cohort</Button>
            </a>
            <Link href="/ships">
              <Button variant="outline" size="lg">
                See Past Builds
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
