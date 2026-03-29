import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: {
    absolute: "02Ship — Sydney's Claude Builder Community",
  },
  description:
    'Monthly meetups, small-group ship weeks, and real projects for Claude practitioners in Sydney. Join 100+ members building with AI.',
  alternates: {
    canonical: '/',
  },
};

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 sm:py-32">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Sydney&apos;s Claude Builder Community
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Monthly meetups. Small-group ship weeks. Real projects, real
              outcomes. Join 100+ Claude practitioners building with AI in
              Sydney.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
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
        </Container>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-gray-200 bg-white py-12">
        <Container>
          <div className="mx-auto grid max-w-3xl grid-cols-1 gap-8 text-center sm:grid-cols-3">
            <div>
              <p className="text-3xl font-bold text-gray-900">100+</p>
              <p className="mt-1 text-sm text-gray-600">Members</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">5+</p>
              <p className="mt-1 text-sm text-gray-600">Meetups</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">67%</p>
              <p className="mt-1 text-sm text-gray-600">Daily Claude Users</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              How the community works
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Three ways to level up your Claude skills with other practitioners
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-white p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900">
                Monthly Meetups
              </h3>
              <p className="mt-4 text-gray-600">
                In-person events in Sydney with talks, live demos, and
                networking. Hear what others are building and share your own
                work.
              </p>
            </div>
            <div className="rounded-lg bg-white p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900">
                Cohort
              </h3>
              <p className="mt-4 text-gray-600">
                2-week build sprints in small groups. Pick a project, get
                accountability and feedback, then demo on day 14.
              </p>
            </div>
            <div className="rounded-lg bg-white p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900">
                Member Builds
              </h3>
              <p className="mt-4 text-gray-600">
                Browse real projects shipped by community members. Get inspired,
                learn patterns, and see what&apos;s possible with Claude.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Ready to build with us?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Join Sydney&apos;s community of Claude practitioners shipping real
              projects
            </p>
            <div className="mt-8 flex items-center justify-center gap-x-4">
              <Link href="/events">
                <Button size="lg">Join Next Meetup</Button>
              </Link>
              <Link href="/ship-weeks">
                <Button variant="outline" size="lg">
                  Join a Cohort
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
