import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { cn, cardSurface, cardHover } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Community — Join Sydney\'s Claude Builder Community',
  description:
    'Join 700+ AI enthusiasts in Sydney\'s Claude AI community. Monthly meetups, daily AI news, and hands-on courses. Connect on X, LinkedIn, GitHub, and Telegram.',
  alternates: { canonical: '/community' },
};

const communities = [
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
    description: 'Daily AI news and Claude updates.',
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
      '02Ship is Sydney\'s Claude builder community. We run monthly meetups, free online courses, and publish daily AI news. Our members are builders, designers, product managers, and anyone curious about building with AI tools like Claude Code.',
  },
  {
    question: 'How do I join 02Ship?',
    answer:
      'Follow us on X (@zero_to_ship), subscribe to our Telegram channel (@ClauderSydney) for daily news, and attend our monthly meetups in Sydney through Lu.ma.',
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
            700+ AI enthusiasts learning to ship ideas with AI. Monthly meetups,
            free courses, and daily AI news. No coding experience required.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <a href="/events">
              <Button size="lg">Upcoming Events</Button>
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
                className={cn(cardSurface, 'p-6')}
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
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {communities.map((community) => (
              <a
                key={community.name}
                href={community.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(cardSurface, cardHover, 'flex flex-col items-center p-6 text-center')}
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
            className="block rounded-lg border border-amber-200 bg-amber-50 p-6 transition-shadow hover:shadow-md"
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
