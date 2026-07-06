import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { ADMIN_SESSION_COOKIE, verifySession } from '@/lib/admin';
import {
  getEventConfig,
  listSubmissions,
  voterCount,
  listBallots,
} from '@/lib/voting';
import type { Submission, SubmissionStatus } from '@/types/voting';
import { Container } from '@/components/ui/Container';
import { EmptyState } from '@/components/ui/EmptyState';
import { SubmissionActions } from './SubmissionActions';

export const dynamic = 'force-dynamic';

const ORDER: SubmissionStatus[] = ['pending', 'approved', 'rejected'];

const STATUS_BADGE: Record<SubmissionStatus, string> = {
  pending: 'bg-amber-100 text-amber-900 dark:bg-amber-950/50 dark:text-amber-200',
  approved: 'bg-green-100 text-green-900 dark:bg-green-950/50 dark:text-green-200',
  rejected: 'bg-red-100 text-red-900 dark:bg-red-950/50 dark:text-red-200',
};

function groupByStatus(
  list: Submission[]
): Record<SubmissionStatus, Submission[]> {
  const out: Record<SubmissionStatus, Submission[]> = {
    pending: [],
    approved: [],
    rejected: [],
  };
  for (const s of list) out[s.status].push(s);
  return out;
}

export default async function AdminSubmissionsPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  if (!verifySession(session, Date.now())) redirect('/admin');

  const event = await getEventConfig();
  const [all, totalVoters, ballots] = await Promise.all([
    listSubmissions(event.slug),
    voterCount(event.slug),
    listBallots(event.slug),
  ]);
  const totalVotes = ballots.reduce((n, b) => n + b.submissionIds.length, 0);
  const grouped = groupByStatus(all);

  return (
    <section className="py-12 sm:py-16">
      <Container>
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-blue-600 dark:text-blue-400">
                Admin
              </p>
              <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl dark:text-white">
                Submissions
              </h1>
              <p className="mt-2 text-sm font-semibold text-slate-600 dark:text-slate-300">{event.name}</p>
            </div>
            <Link
              href="/admin/results"
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 transition hover:text-blue-700 dark:text-blue-400"
            >
              View results
              <ArrowRight className="h-4 w-4" weight="bold" />
            </Link>
          </div>

          <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-none border border-slate-200 bg-white p-4 shadow-sm shadow-slate-950/5 dark:border-slate-800 dark:bg-slate-900">
              <dt className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                Submissions close
              </dt>
              <dd className="mt-2 text-sm font-black text-slate-950 dark:text-white">
                {new Date(event.submissionClosesAt).toLocaleString()}
              </dd>
            </div>
            <div className="rounded-none border border-slate-200 bg-white p-4 shadow-sm shadow-slate-950/5 dark:border-slate-800 dark:bg-slate-900">
              <dt className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                Voting closes
              </dt>
              <dd className="mt-2 text-sm font-black text-slate-950 dark:text-white">
                {new Date(event.votingClosesAt).toLocaleString()}
              </dd>
            </div>
            <div className="rounded-none border border-slate-200 bg-white p-4 shadow-sm shadow-slate-950/5 dark:border-slate-800 dark:bg-slate-900">
              <dt className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                Voters
              </dt>
              <dd className="mt-2 text-3xl font-black tracking-tight text-slate-950 dark:text-white">
                {totalVoters}
              </dd>
            </div>
            <div className="rounded-none border border-slate-200 bg-white p-4 shadow-sm shadow-slate-950/5 dark:border-slate-800 dark:bg-slate-900">
              <dt className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                Total votes
              </dt>
              <dd className="mt-2 text-3xl font-black tracking-tight text-slate-950 dark:text-white">
                {totalVotes}
              </dd>
            </div>
          </dl>

          <div className="mt-10 space-y-10">
            {ORDER.map((status) => (
              <section key={status}>
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-black capitalize tracking-tight text-slate-950 dark:text-white">
                    {status}
                  </h2>
                  <span
                    className={`rounded-none px-2.5 py-1 text-xs font-bold ${STATUS_BADGE[status]}`}
                  >
                    {grouped[status].length}
                  </span>
                </div>
                {grouped[status].length === 0 ? (
                  <EmptyState
                    className="mt-4 p-5 text-left"
                    title="None."
                    description={`No ${status} submissions right now.`}
                  />
                ) : (
                  <div className="mt-4 overflow-x-auto rounded-none border border-slate-200 bg-white shadow-sm shadow-slate-950/5 dark:border-slate-800 dark:bg-slate-900">
                    <table className="w-full min-w-[920px] border-collapse text-sm">
                      <thead className="bg-slate-50 dark:bg-slate-950">
                        <tr className="text-left">
                          <th className="px-4 py-3 font-bold text-slate-700 dark:text-slate-200">
                            Title
                          </th>
                          <th className="px-4 py-3 font-bold text-slate-700 dark:text-slate-200">
                            Speaker
                          </th>
                          <th className="px-4 py-3 font-bold text-slate-700 dark:text-slate-200">
                            Contact
                          </th>
                          <th className="px-4 py-3 font-bold text-slate-700 dark:text-slate-200">
                            Intro
                          </th>
                          <th className="px-4 py-3 font-bold text-slate-700 dark:text-slate-200">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                        {grouped[status].map((s) => (
                          <tr key={s.id} className="align-top">
                            <td className="px-4 py-3 font-black text-slate-950 dark:text-white">
                              {s.title}
                            </td>
                            <td className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">
                              <div>{s.speakerName}</div>
                              {s.handle && (
                                <div className="text-xs text-slate-500 dark:text-slate-400">
                                  {s.handle}
                                </div>
                              )}
                            </td>
                            <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                              {s.contact ?? '-'}
                            </td>
                            <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                              {s.intro}
                            </td>
                            <td className="px-4 py-3">
                              <SubmissionActions id={s.id} current={s.status} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
