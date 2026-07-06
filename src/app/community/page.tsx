import type { Metadata } from 'next';
import {
  DiscordLogo,
  GithubLogo,
  LinkedinLogo,
  TelegramLogo,
  UsersThree,
  XLogo,
} from '@phosphor-icons/react/dist/ssr';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { cn, cardSurface, cardHover } from '@/lib/utils';

export const metadata: Metadata = {
  title: "Community - Join Sydney's Claude Builder Community",
  description:
    "Join 100+ builders in Sydney's Claude AI community. Monthly meetups, 2-week ship weeks, daily AI news, and hands-on courses. Connect on Discord, X, LinkedIn, GitHub, and Telegram.",
  alternates: { canonical: '/community' },
};

const communities = [
  {
    name: 'Discord',
    description: 'Chat with fellow builders, ask questions, and share your progress.',
    href: 'https://discord.gg/btqaA3hzKp',
    members: '100+',
    icon: DiscordLogo,
  },
  {
    name: 'X',
    description: 'Follow for daily updates, tips, and community highlights.',
    href: 'https://x.com/zero_to_ship',
    members: '',
    icon: XLogo,
  },
  {
    name: 'LinkedIn',
    description: 'Professional updates and announcements for your network.',
    href: 'https://www.linkedin.com/company/02ship/',
    members: '',
    icon: LinkedinLogo,
  },
  {
    name: 'GitHub',
    description: 'Explore our open-source code and contribute to the project.',
    href: 'https://github.com/bobjiang/zero-to-ship',
    members: '',
    icon: GithubLogo,
  },
  {
    name: 'Telegram',
    description: 'Daily AI news and Claude updates.',
    href: 'https://t.me/ClauderSydney',
    members: '',
    icon: TelegramLogo,
  },
];

const whatWeDoItems = [
  {
    title: 'Monthly Meetups',
    description:
      "In-person meetups in Sydney where members demo what they've built, share Claude tips, and learn from each other. Talks, live demos, and networking.",
  },
  {
    title: 'Ship Weeks',
    description:
      '2-week focused building sprints. Pick a project, build it with AI tools, and ship it. Community support and accountability throughout.',
  },
  {
    title: 'Daily AI News',
    description:
      'Curated daily digest of the most important AI developments. Research papers, product launches, and industry moves, delivered every day.',
  },
  {
    title: 'Free Courses',
    description:
      'Step-by-step video courses teaching you to build with Claude Code and agent skills. Designed for beginners, no coding experience needed.',
  },
];

const faqItems = [
  {
    question: 'What is 02Ship?',
    answer:
      "02Ship is Sydney's Claude builder community. We run monthly meetups, 2-week ship weeks, free online courses, and publish daily AI news. Our members are builders, designers, product managers, and anyone curious about building with AI tools like Claude Code.",
  },
  {
    question: 'How do I join 02Ship?',
    answer:
      'Join our Discord server for free at discord.gg/btqaA3hzKp. You can also follow us on X (@zero_to_ship), subscribe to our Telegram channel (@ClauderSydney) for daily news, and attend our monthly meetups in Sydney through Lu.ma.',
  },
  {
    question: 'Do I need to know how to code?',
    answer:
      "No. 02Ship is specifically designed for people who want to build with AI tools but don't have a programming background. Our courses start from zero, and our community welcomes all skill levels.",
  },
  {
    question: 'Where are the meetups held?',
    answer:
      'Our meetups are held in-person in Sydney, Australia. We typically meet monthly at various locations around Sydney CBD. Check our events page or Lu.ma calendar for upcoming dates and venues.',
  },
  {
    question: 'What is a ship week?',
    answer:
      "A ship week is a 2-week focused building sprint. You pick a project, build it using AI coding tools, and ship it by the end of the sprint. The community provides support, feedback, and accountability throughout. It's the best way to go from idea to working product.",
  },
  {
    question: 'Is 02Ship free?',
    answer:
      'Yes. Our community, courses, meetups, and daily news are all free. We believe everyone should have access to learn AI building skills.',
  },
];

export default function CommunityPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <div className="py-16 sm:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Container>
        <section className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
              Community
            </p>
            <h1 className="mt-4 text-balance text-5xl font-black tracking-tight text-slate-950 dark:text-white sm:text-6xl">
              Sydney&apos;s Claude Builder Community
            </h1>
          </div>
          <div>
            <p className="max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              100+ builders learning to ship ideas with AI. Monthly meetups,
              ship weeks, free courses, and daily AI news. No coding experience
              required.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://discord.gg/btqaA3hzKp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg">Join Discord</Button>
              </a>
              <a href="/events">
                <Button size="lg" variant="outline">
                  Upcoming Events
                </Button>
              </a>
            </div>
          </div>
        </section>

        <section className="mt-16 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-none border border-slate-200 bg-slate-950 p-7 text-white shadow-xl shadow-slate-950/10 dark:border-slate-800">
            <UsersThree className="h-10 w-10 text-blue-300" weight="duotone" />
            <h2 className="mt-6 text-3xl font-black tracking-tight">
              What We Do
            </h2>
            <p className="mt-4 text-sm leading-6 text-slate-300">
              The community is designed for repeated progress: learn, meet,
              build, ship, and come back with the next version.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {whatWeDoItems.map((item) => (
              <div key={item.title} className={cn(cardSurface, 'p-6')}>
                <h3 className="text-lg font-black tracking-tight text-slate-950 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white">
            Connect With Us
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {communities.map((community) => {
              const Icon = community.icon;
              return (
                <a
                  key={community.name}
                  href={community.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    cardSurface,
                    cardHover,
                    'flex min-h-64 flex-col p-6'
                  )}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-none bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-300">
                    <Icon className="h-7 w-7" weight="fill" />
                  </div>
                  <h3 className="mt-5 text-lg font-black tracking-tight text-slate-950 dark:text-white">
                    {community.name}
                  </h3>
                  {community.members && (
                    <p className="mt-1 text-sm font-bold text-blue-600 dark:text-blue-400">
                      {community.members} members
                    </p>
                  )}
                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {community.description}
                  </p>
                </a>
              );
            })}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white">
            Frequently Asked Questions
          </h2>
          <dl className="mt-6 grid gap-4 md:grid-cols-2">
            {faqItems.map((item) => (
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

        <section className="mt-16 rounded-none border border-slate-200 bg-white p-7 shadow-sm shadow-slate-950/5 dark:border-slate-800 dark:bg-slate-950">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h3 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white">
                Bring Your Talent to the Pot
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
                Volunteer, speak at a meetup, mentor a builder, or create
                content with us. Everyone has an ingredient to contribute.
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
          </div>
        </section>
      </Container>
    </div>
  );
}
