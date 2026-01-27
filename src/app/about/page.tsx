import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export const metadata = {
  title: 'About - 02Ship',
  description: 'Learn more about 02Ship and our mission to make AI coding accessible to everyone.',
};

export default function AboutPage() {
  return (
    <div className="py-20">
      <Container>
        <div className="mx-auto max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            About 02Ship
          </h1>

          <div className="mt-8 space-y-6 text-lg text-gray-600">
            <p>
              02Ship is a learning platform designed to help absolute beginners build and ship
              their ideas using AI coding tools like Claude Code.
            </p>

            <p>
              We believe that everyone should have the ability to bring their ideas to life, regardless
              of their coding experience. With AI tools, the barrier to entry has never been lower.
            </p>

            <p>
              Our step-by-step courses break down complex concepts into easy-to-understand lessons,
              so you can go from zero to shipping your first project in no time.
            </p>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900">Join Our Community</h2>
            <p className="mt-4 text-lg text-gray-600">
              Connect with other learners, get help, and share your progress.
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href="https://discord.gg/btqaA3hzKp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button>Join Discord</Button>
              </a>
              <a
                href="https://github.com/bobjiang/zero-to-ship/discussions"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline">Visit Forum</Button>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
