import type { Metadata } from 'next';
import Image from 'next/image';
import { HandHeart } from '@phosphor-icons/react/dist/ssr';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'About 02Ship',
  description:
    'Learn about 02Ship, a learning platform inspired by the Stone Soup story, helping non-programmers build and ship real projects with AI coding tools like Claude Code.',
  alternates: { canonical: '/about' },
};

const faqs = [
  {
    question: 'What is 02Ship?',
    answer:
      '02Ship is a free learning platform and community based in Sydney, Australia. We help people with no coding experience build and ship real projects using AI tools like Claude Code. We offer step-by-step video courses, daily AI news, monthly meetups, and 2-week building sprints called ship weeks.',
  },
  {
    question: 'Who is 02Ship for?',
    answer:
      'Anyone who wants to build with AI but does not know where to start. Our members include designers, product managers, entrepreneurs, students, and developers. No programming background required.',
  },
  {
    question: 'Is 02Ship free?',
    answer: 'Yes. Our community, courses, meetups, and daily news are all free.',
  },
  {
    question: 'Where is 02Ship based?',
    answer:
      '02Ship is based in Sydney, Australia. Our in-person meetups happen monthly in Sydney, and our online content is available globally.',
  },
];

export default function AboutPage() {
  return (
    <div className="py-16 sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
              Our story
            </p>
            <h1 className="mt-4 text-balance text-5xl font-black tracking-tight text-slate-950 dark:text-white sm:text-6xl">
              About 02Ship
            </h1>
          </div>
          <div className="max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            <p>
              02Ship, short for{' '}
              <strong className="text-slate-950 dark:text-white">
                Zero to Ship
              </strong>
              , is a learning platform designed to help absolute beginners
              build and ship their ideas using AI coding tools like Claude Code.
            </p>
          </div>
        </div>

        <section className="mt-14 grid gap-8 lg:grid-cols-[1fr_0.88fr] lg:items-start">
          <div className="overflow-hidden rounded-none border border-slate-200 bg-white shadow-xl shadow-slate-950/10 dark:border-slate-800 dark:bg-slate-950">
            <Image
              src="/images/stone-soup.svg"
              alt="Illustration of the Stone Soup story with people gathering around a pot and contributing ingredients"
              width={800}
              height={500}
              className="w-full"
              priority
            />
          </div>

          <div className="space-y-6 text-base leading-7 text-slate-600 dark:text-slate-300">
            <h2 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white">
              Our Inspiration: The Stone Soup
            </h2>
            <p>
              There&apos;s an old folk tale called{' '}
              <strong className="text-slate-950 dark:text-white">Stone Soup</strong>.
              A hungry traveler arrives in a village with a pot and a stone. He
              starts cooking in the village square, and curious villagers each
              add something small. Carrots, potatoes, onions, herbs, salt. Before
              long, a shared meal exists where none existed before.
            </p>
            <p>
              The moral is catalysis. The traveler did not have every
              ingredient, and neither did any single villager. Starting with
              something small made it easier for others to contribute.
            </p>
            <p>
              That is what building with AI feels like. You start with an idea,
              put it in the pot, and get to work. Claude Code helps shape it.
              The community adds technique, feedback, examples, and practical
              confidence.
            </p>
            <p>
              <strong className="text-slate-950 dark:text-white">
                02Ship is our village square.
              </strong>{' '}
              The courses are the fire. Your idea is the stone. The community
              brings the rest.
            </p>
          </div>
        </section>

        <section className="mt-16 grid gap-6 rounded-none border border-slate-200 bg-white p-7 shadow-sm shadow-slate-950/5 dark:border-slate-800 dark:bg-slate-950 md:grid-cols-[3rem_1fr_auto] md:items-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-none bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-300">
            <HandHeart className="h-7 w-7" weight="duotone" />
          </div>
          <div>
            <h3 className="text-xl font-black tracking-tight text-slate-950 dark:text-white">
              Bring Your Talent to the Pot
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
              We&apos;re looking for volunteers, speakers, mentors, and content
              creators. Everyone has an ingredient to contribute. What&apos;s
              yours?
            </p>
          </div>
          <a
            href="https://forms.gle/wT2d2zZ47waQAviC8"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center rounded-none bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-sm shadow-blue-950/10 transition hover:bg-blue-700"
          >
            Share Your Talent
          </a>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white">
            Frequently Asked Questions
          </h2>
          <dl className="mt-6 grid gap-4 md:grid-cols-2">
            {faqs.map((item) => (
              <div
                key={item.question}
                className="rounded-none border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950"
              >
                <dt className="text-lg font-bold text-slate-950 dark:text-white">
                  {item.question}
                </dt>
                <dd className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {item.answer}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white">
            Join Our Community
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            Bring your stone. We&apos;ll make soup together.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <a
              href="https://discord.gg/btqaA3hzKp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button>Join Discord</Button>
            </a>
            <a
              href="https://github.com/bobjiang/zero-to-ship"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline">GitHub</Button>
            </a>
            <a
              href="https://x.com/zero_to_ship"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline">X</Button>
            </a>
          </div>
        </section>
      </Container>
    </div>
  );
}
