import type { Metadata } from 'next';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'About 02Ship',
  description:
    'Learn about 02Ship — a learning platform inspired by the Stone Soup story, helping non-programmers build and ship real projects with AI coding tools like Claude Code.',
  alternates: { canonical: '/about' },
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
              02Ship is a learning platform designed to help absolute beginners
              build and ship their ideas using AI coding tools like Claude Code.
            </p>

            <p>
              We believe that everyone should have the ability to bring their
              ideas to life, regardless of their coding experience. With AI
              tools, the barrier to entry has never been lower.
            </p>

            <p>
              Our step-by-step courses break down complex concepts into
              easy-to-understand lessons, so you can go from zero to shipping
              your first project in no time.
            </p>
          </div>

          {/* Stone Soup Story */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900">
              Our Inspiration: The Stone Soup
            </h2>

            <div className="mt-6 overflow-hidden rounded-xl">
              <Image
                src="/images/stone-soup.svg"
                alt="Illustration of the Stone Soup story — people gathering around a pot, each contributing an ingredient to make something wonderful together"
                width={800}
                height={500}
                className="w-full"
                priority
              />
            </div>

            <div className="mt-6 space-y-4 text-lg text-gray-600">
              <p>
                There&apos;s an old folk tale called{' '}
                <strong className="text-gray-900">Stone Soup</strong>. It goes
                like this:
              </p>

              <blockquote className="border-l-4 border-amber-400 bg-amber-50 py-4 pl-6 pr-4 text-gray-700 italic">
                A hungry traveler arrives in a village with nothing but a pot and
                a stone. He fills the pot with water, drops in the stone, and
                starts a fire in the village square. Curious villagers gather
                around. &ldquo;What are you making?&rdquo; they ask.
                &ldquo;Stone soup,&rdquo; he says. &ldquo;It&apos;s delicious,
                though it could use a little garnish.&rdquo; One villager brings
                a few carrots. Another offers potatoes. Someone else adds
                onions, herbs, salt. Before long, the whole village has
                contributed — and what started as a stone in water has become a
                rich, nourishing soup that feeds everyone.
              </blockquote>

              <p>
                The moral isn&apos;t about trickery — it&apos;s about{' '}
                <strong className="text-gray-900">catalysis</strong>. The
                traveler didn&apos;t have all the ingredients. Neither did any
                single villager. But by starting with something small and
                inviting others to contribute, they created something none of
                them could have made alone.
              </p>

              <p>
                That&apos;s exactly what building with AI feels like. You start
                with an idea — your &ldquo;stone.&rdquo; You put it in the pot
                and get to work. AI tools like Claude Code help you shape it.
                Then the community shows up: someone shares a technique that
                saves you hours, someone else suggests a feature you hadn&apos;t
                thought of, another person finds a bug you missed.
              </p>

              <p>
                <strong className="text-gray-900">
                  02Ship is our village square.
                </strong>{' '}
                The courses are the fire. Your idea is the stone. And the
                community — learners, builders, mentors — they&apos;re the ones
                who bring the carrots, the potatoes, the herbs that turn a
                simple idea into something real.
              </p>

              <p>
                You don&apos;t need to know everything. You don&apos;t need to
                have everything. You just need to start — and be willing to
                share the pot.
              </p>
            </div>
          </div>

          {/* Bring Your Talent CTA */}
          <div className="mt-16">
            <a
              href="https://forms.gle/wT2d2zZ47waQAviC8"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-xl border border-amber-200 bg-amber-50 p-6 transition-all hover:border-amber-300 hover:shadow-md"
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl" aria-hidden="true">
                  🍲
                </span>
                <div>
                  <h3 className="text-lg font-bold text-amber-900">
                    Bring Your Talent to the Pot
                  </h3>
                  <p className="mt-1 text-amber-800">
                    We&apos;re looking for volunteers, speakers, mentors, and
                    content creators. Everyone has an ingredient to
                    contribute — what&apos;s yours?
                  </p>
                  <span className="mt-3 inline-block rounded-md bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-700">
                    Share Your Talent
                  </span>
                </div>
              </div>
            </a>
          </div>

          {/* Community Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900">
              Join Our Community
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Bring your stone. We&apos;ll make soup together.
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
