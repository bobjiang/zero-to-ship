import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
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
  pending: 'bg-amber-100 text-amber-900',
  approved: 'bg-green-100 text-green-900',
  rejected: 'bg-red-100 text-red-900',
};

export default async function AdminResultsPage() {
  const session = cookies().get(ADMIN_SESSION_COOKIE)?.value;
  if (!verifySession(session, Date.now())) redirect('/admin');

  const event = await getEventConfig();
  const [subs, ballots, totalVoters] = await Promise.all([
    listSubmissions(event.slug),
    listBallots(event.slug),
    voterCount(event.slug),
  ]);
  const approvedIds = new Set(subs.filter((s) => s.status === 'approved').map((s) => s.id));
  const counts = tallyVotes(ballots, approvedIds);
  const totalVotes = ballots.reduce((n, b) => n + b.submissionIds.length, 0);
  const rows = assignRanks(subs.map((s) => ({ ...s, voteCount: counts.get(s.id) ?? 0 })));
  const votingOpen = Date.now() < new Date(event.votingClosesAt).getTime();

  return (
    <section className="py-12 sm:py-16">
      <Container>
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Results
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                {event.name} ·{' '}
                {votingOpen
                  ? `voting closes ${new Date(event.votingClosesAt).toLocaleString()}`
                  : 'Final ranking'}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/admin/submissions"
                className="text-sm font-medium text-blue-700 hover:text-blue-900"
              >
                ← Submissions
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
            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">Voters</dt>
              <dd className="mt-1 text-2xl font-bold text-gray-900">{totalVoters}</dd>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">Total votes</dt>
              <dd className="mt-1 text-2xl font-bold text-gray-900">{totalVotes}</dd>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">Approved talks</dt>
              <dd className="mt-1 text-2xl font-bold text-gray-900">{approvedIds.size}</dd>
            </div>
          </dl>

          <div className="mt-10 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-gray-50">
                <tr className="text-left">
                  <th className="px-4 py-3 font-medium text-gray-700">Rank</th>
                  <th className="px-4 py-3 font-medium text-gray-700">Title</th>
                  <th className="px-4 py-3 font-medium text-gray-700">Speaker</th>
                  <th className="px-4 py-3 font-medium text-gray-700">Contact</th>
                  <th className="px-4 py-3 font-medium text-gray-700">Status</th>
                  <th className="px-4 py-3 text-right font-medium text-gray-700">Votes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {rows.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-6 text-center text-sm text-gray-500">
                      No submissions yet.
                    </td>
                  </tr>
                ) : (
                  rows.map((r) => (
                    <tr key={r.id} className="align-top">
                      <td className="px-4 py-3 font-mono text-sm text-gray-900">
                        {r.status === 'approved' ? r.rank : '—'}
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-900">{r.title}</td>
                      <td className="px-4 py-3 text-gray-700">
                        <div>{r.speakerName}</div>
                        {r.handle && <div className="text-xs text-gray-500">{r.handle}</div>}
                      </td>
                      <td className="px-4 py-3 text-gray-600">{r.contact ?? '—'}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_BADGE[r.status]}`}
                        >
                          {r.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-gray-900">
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
