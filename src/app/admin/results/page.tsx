import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr';
import { ADMIN_SESSION_COOKIE, verifySession } from '@/lib/admin';
import {
  assignRanks,
  getEventConfig,
  listBallots,
  listSubmissions,
  tallyVotes,
  voterCount,
} from '@/lib/voting';
import type { SubmissionStatus } from '@/types/voting';
import { Container } from '@/components/ui/Container';
import { ResultsExport } from './ResultsExport';

export const dynamic = 'force-dynamic';

const STATUS_BADGE: Record<SubmissionStatus, string> = {
  pending: 'bg-amber-100 text-amber-900 dark:bg-amber-950/50 dark:text-amber-200',
  approved: 'bg-green-100 text-green-900 dark:bg-green-950/50 dark:text-green-200',
  rejected: 'bg-red-100 text-red-900 dark:bg-red-950/50 dark:text-red-200',
};

export default async function AdminResultsPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  if (!verifySession(session, Date.now())) redirect('/admin');

  const event = await getEventConfig();
  const [subs, ballots, totalVoters] = await Promise.all([
    listSubmissions(event.slug),
    listBallots(event.slug),
    voterCount(event.slug),
  ]);
  const approvedIds = new Set(
    subs.filter((s) => s.status === 'approved').map((s) => s.id)
  );
  const counts = tallyVotes(ballots, approvedIds);
  const totalVotes = ballots.reduce((n, b) => n + b.submissionIds.length, 0);
  const rows = assignRanks(
    subs.map((s) => ({ ...s, voteCount: counts.get(s.id) ?? 0 }))
  );
  const votingOpen = Date.now() < new Date(event.votingClosesAt).getTime();

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
                Results
              </h1>
              <p className="mt-2 text-sm font-semibold text-slate-600 dark:text-slate-300">
                {event.name} /{' '}
                {votingOpen
                  ? `voting closes ${new Date(event.votingClosesAt).toLocaleString()}`
                  : 'Final ranking'}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/admin/submissions"
                className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 transition hover:text-blue-700 dark:text-blue-400"
              >
                <ArrowLeft className="h-4 w-4" weight="bold" />
                Submissions
              </Link>
              <ResultsExport
                rows={rows.map((r) => ({
                  rank: r.rank,
                  title: r.title,
                  speakerName: r.speakerName,
                  handle: r.handle,
                  contact: r.contact,
                  tag: r.tag,
                  status: r.status,
                  voteCount: r.voteCount,
                }))}
                filename={`${event.slug}-results.csv`}
              />
            </div>
          </div>

          <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
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
            <div className="rounded-none border border-slate-200 bg-white p-4 shadow-sm shadow-slate-950/5 dark:border-slate-800 dark:bg-slate-900">
              <dt className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                Approved talks
              </dt>
              <dd className="mt-2 text-3xl font-black tracking-tight text-slate-950 dark:text-white">
                {approvedIds.size}
              </dd>
            </div>
          </dl>

          <div className="mt-10 overflow-x-auto rounded-none border border-slate-200 bg-white shadow-sm shadow-slate-950/5 dark:border-slate-800 dark:bg-slate-900">
            <table className="w-full min-w-[860px] border-collapse text-sm">
              <thead className="bg-slate-50 dark:bg-slate-950">
                <tr className="text-left">
                  <th className="px-4 py-3 font-bold text-slate-700 dark:text-slate-200">Rank</th>
                  <th className="px-4 py-3 font-bold text-slate-700 dark:text-slate-200">Title</th>
                  <th className="px-4 py-3 font-bold text-slate-700 dark:text-slate-200">
                    Speaker
                  </th>
                  <th className="px-4 py-3 font-bold text-slate-700 dark:text-slate-200">
                    Contact
                  </th>
                  <th className="px-4 py-3 font-bold text-slate-700 dark:text-slate-200">
                    Status
                  </th>
                  <th className="px-4 py-3 text-right font-bold text-slate-700 dark:text-slate-200">
                    Votes
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {rows.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-6 text-center text-sm font-semibold text-slate-500 dark:text-slate-400"
                    >
                      No submissions yet.
                    </td>
                  </tr>
                ) : (
                  rows.map((r) => (
                    <tr key={r.id} className="align-top">
                      <td className="px-4 py-3 font-mono text-sm font-bold text-slate-950 dark:text-white">
                        {r.status === 'approved' ? r.rank : '-'}
                      </td>
                      <td className="px-4 py-3 font-black text-slate-950 dark:text-white">
                        {r.title}
                      </td>
                      <td className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">
                        <div>{r.speakerName}</div>
                        {r.handle && (
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            {r.handle}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                        {r.contact ?? '-'}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-none px-2.5 py-1 text-xs font-bold ${STATUS_BADGE[r.status]}`}
                        >
                          {r.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-black text-slate-950 dark:text-white">
                        {r.voteCount}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </section>
  );
}
