import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Community — Join Sydney\'s Claude Builder Community',
  description:
    'Join 100+ builders in Sydney\'s Claude AI community. Monthly meetups, 2-week ship weeks, daily AI news, and hands-on courses. Connect on Discord, X, LinkedIn, GitHub, and Telegram.',
  alternates: { canonical: '/community' },
};

const communities = [
  {
    name: 'Discord',
    description: 'Chat with fellow builders, ask questions, and share your progress.',
    href: 'https://discord.gg/btqaA3hzKp',
    members: '100+',
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.947 2.418-2.157 2.418z" />
      </svg>
    ),
  },
  {
    name: 'X',
    description: 'Follow for daily updates, tips, and community highlights.',
    href: 'https://x.com/zero_to_ship',
    members: '',
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    description: 'Professional updates and announcements for your network.',
    href: 'https://www.linkedin.com/company/02ship/',
    members: '',
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: 'GitHub',
    description: 'Explore our open-source code and contribute to the project.',
    href: 'https://github.com/bobjiang/zero-to-ship',
    members: '',
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    name: 'Telegram',
    description: 'Daily AI news and weekly Anthropic/Claude updates.',
    href: 'https://t.me/ClauderSydney',
    members: '',
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
  },
];

const whatWeDoItems = [
  {
    title: 'Monthly Meetups',
    description:
      'In-person meetups in Sydney where members demo what they\'ve built, share Claude tips, and learn from each other. Talks, live demos, and networking.',
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
  {
    title: 'Weekly Updates',
    description:
      'Weekly digest of Anthropic and Claude developments. Product updates, API changes, and ecosystem news summarized so you don\'t miss what matters.',
  },
];

const faqItems = [
  {
    question: 'What is 02Ship?',
    answer:
      '02Ship is Sydney\'s Claude builder community. We run monthly meetups, 2-week ship weeks, free online courses, and publish daily AI news. Our members are builders, designers, product managers, and anyone curious about building with AI tools like Claude Code.',
  },
  {
    question: 'How do I join 02Ship?',
    answer:
      'Join our Discord server for free at discord.gg/btqaA3hzKp. You can also follow us on X (@zero_to_ship), subscribe to our Telegram channel (@ClauderSydney) for daily news, and attend our monthly meetups in Sydney through Lu.ma.',
  },
  {
    question: 'Do I need to know how to code?',
    answer:
      'No. 02Ship is specifically designed for people who want to build with AI tools but don\'t have a programming background. Our courses start from zero, and our community welcomes all skill levels.',
  },
  {
    question: 'Where are the meetups held?',
    answer:
      'Our meetups are held in-person in Sydney, Australia. We typically meet monthly at various locations around Sydney CBD. Check our events page or Lu.ma calendar for upcoming dates and venues.',
  },
  {
    question: 'What is a ship week?',
    answer:
      'A ship week is a 2-week focused building sprint. You pick a project, build it using AI coding tools, and ship it by the end of the sprint. The community provides support, feedback, and accountability throughout. It\'s the best way to go from idea to working product.',
  },
  {
    question: 'Is 02Ship free?',
    answer:
      'Yes. Our community, courses, meetups, daily news, and weekly updates are all free. We believe everyone should have access to learn AI building skills.',
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
    <div className="py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Container>
        {/* Hero */}
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Sydney&apos;s Claude Builder Community
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            100+ builders learning to ship ideas with AI. Monthly meetups,
            ship weeks, free courses, and daily AI news. No coding experience required.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
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

        {/* What We Do */}
        <div className="mx-auto mt-20 max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900">What We Do</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whatWeDoItems.map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-gray-200 p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Connect With Us */}
        <div className="mx-auto mt-20 max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900">Connect With Us</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {communities.map((community) => (
              <a
                key={community.name}
                href={community.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center rounded-xl border border-gray-200 p-6 text-center transition-all hover:border-gray-300 hover:shadow-md"
              >
                <div className="text-gray-700">{community.icon}</div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  {community.name}
                </h3>
                {community.members && (
                  <p className="mt-1 text-sm font-medium text-blue-600">
                    {community.members} members
                  </p>
                )}
                <p className="mt-2 text-sm text-gray-600">
                  {community.description}
                </p>
              </a>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mx-auto mt-20 max-w-3xl">
          <h2 className="text-2xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>
          <dl className="mt-8 space-y-6">
            {faqItems.map((item) => (
              <div key={item.question}>
                <dt className="text-lg font-semibold text-gray-900">
                  {item.question}
                </dt>
                <dd className="mt-2 text-gray-600">{item.answer}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Contribute CTA */}
        <div className="mx-auto mt-20 max-w-3xl">
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
                  Volunteer, speak at a meetup, mentor a builder, or create
                  content with us. Everyone has an ingredient to contribute.
                </p>
                <span className="mt-3 inline-block rounded-md bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-700">
                  Share Your Talent
                </span>
              </div>
            </div>
          </a>
        </div>
      </Container>
    </div>
  );
}
