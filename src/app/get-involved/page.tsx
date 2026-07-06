import type { Metadata } from 'next';
import { ArrowUpRight, HandHeart, Lightbulb, Microphone, UsersThree } from '@phosphor-icons/react/dist/ssr';
import { Container } from '@/components/ui/Container';
import { cn, cardSurface, cardHover } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Get Involved - 02Ship',
  description:
    'Join the 02Ship community as a volunteer, speaker, sponsor, or contributor. Help Claude practitioners build and ship real projects in Sydney.',
  alternates: { canonical: '/get-involved' },
};

const roles = [
  {
    title: 'Speaker',
    description:
      'Share your experience building with AI tools. Present at our meetups, workshops, or online events.',
    icon: Microphone,
  },
  {
    title: 'Volunteer',
    description:
      'Help organize events, mentor learners, create content, or contribute to our open-source projects.',
    icon: UsersThree,
  },
  {
    title: 'Sponsor',
    description:
      'Support our mission to make AI-powered development accessible. Sponsor events, courses, or the platform.',
    icon: HandHeart,
  },
  {
    title: 'Contributor',
    description:
      'Have another idea? We welcome all forms of contribution: content, translations, design, and more.',
    icon: Lightbulb,
  },
];

export default function GetInvolvedPage() {
  return (
    <div className="py-16 sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
              Contribute
            </p>
            <h1 className="mt-4 text-balance text-5xl font-black tracking-tight text-slate-950 dark:text-white sm:text-6xl">
              Get Involved
            </h1>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            02Ship is built by the community, for the community. Whether you
            want to speak, volunteer, sponsor, facilitate a cohort, or
            contribute in your own way, there&apos;s a place for you.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <a
                key={role.title}
                href="https://forms.gle/CuhvaFTHKip9R1At9"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(cardSurface, cardHover, 'flex min-h-64 flex-col p-6')}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-none bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-300">
                  <Icon className="h-7 w-7" weight="duotone" />
                </div>
                <h2 className="mt-5 text-xl font-black tracking-tight text-slate-950 dark:text-white">
                  {role.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {role.description}
                </p>
              </a>
            );
          })}
        </div>

        <div className="mx-auto mt-16 max-w-2xl rounded-none border border-slate-200 bg-white p-8 text-center shadow-sm shadow-slate-950/5 dark:border-slate-800 dark:bg-slate-950">
          <h2 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white">
            Ready to join us?
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300">
            Fill out the form below and we&apos;ll get back to you.
          </p>
          <a
            href="https://forms.gle/CuhvaFTHKip9R1At9"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-none bg-slate-950 px-5 py-3 text-sm font-bold text-white shadow-sm shadow-slate-950/10 transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
          >
            Fill Out the Form
            <ArrowUpRight className="h-4 w-4" weight="bold" />
          </a>
        </div>
      </Container>
    </div>
  );
}
