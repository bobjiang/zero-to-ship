import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 sm:py-32">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Build Your Ideas with AI
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Learn to build and ship your ideas using Claude Code, even with zero coding experience.
              Step-by-step courses designed for absolute beginners.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/courses">
                <Button size="lg">Start Learning</Button>
              </Link>
              <a
                href="https://discord.gg/btqaA3hzKp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="lg">
                  Join Community
                </Button>
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to start building
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              From complete beginner to shipping your first project
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-white p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900">
                Step-by-Step Courses
              </h3>
              <p className="mt-4 text-gray-600">
                Follow along with video lessons that break down complex concepts into easy-to-understand steps.
              </p>
            </div>
            <div className="rounded-lg bg-white p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900">
                Hands-On Practice
              </h3>
              <p className="mt-4 text-gray-600">
                Build real projects alongside the lessons and ship them to the world.
              </p>
            </div>
            <div className="rounded-lg bg-white p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900">
                Community Support
              </h3>
              <p className="mt-4 text-gray-600">
                Join our Discord and forum to get help, share progress, and connect with others.
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
              Ready to start building?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Join hundreds of learners turning their ideas into reality
            </p>
            <div className="mt-8">
              <Link href="/courses">
                <Button size="lg">Browse Courses</Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
