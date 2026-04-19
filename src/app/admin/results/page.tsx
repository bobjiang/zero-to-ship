import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ADMIN_SESSION_COOKIE, verifySession } from '@/lib/admin';
import {
  assignRanks,
  getEventConfig,
  isWithinWindow,
  listBallots,
  listSubmissions,
  tallyVotes,
  voterCount,
} from '@/lib/voting';
import { ResultsExport } from './ResultsExport';

export const dynamic = 'force-dynamic';

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
  const votingOpen = isWithinWindow(event.votingOpensAt, event.votingClosesAt, new Date());

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <h1 className="text-2xl font-semibold">Results</h1>
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
      <p className="mb-6 text-sm text-neutral-600">
        {event.name} ·{' '}
        {votingOpen
          ? `voting closes ${new Date(event.votingClosesAt).toLocaleString()}`
          : 'Final ranking'}{' '}
        · voters {totalVoters} · total votes {totalVotes}
      </p>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b text-left">
            <th className="py-2 pr-4">Rank</th>
            <th className="py-2 pr-4">Title</th>
            <th className="py-2 pr-4">Speaker</th>
            <th className="py-2 pr-4">Contact</th>
            <th className="py-2 pr-4">Tag</th>
            <th className="py-2 pr-4">Status</th>
            <th className="py-2 pr-4">Votes</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-b align-top">
              <td className="py-2 pr-4">{r.rank}</td>
              <td className="py-2 pr-4 font-medium">{r.title}</td>
              <td className="py-2 pr-4">
                {r.speakerName}
                {r.handle ? ` · ${r.handle}` : ''}
              </td>
              <td className="py-2 pr-4 text-neutral-700">{r.contact ?? ''}</td>
              <td className="py-2 pr-4">{r.tag ?? ''}</td>
              <td className="py-2 pr-4">{r.status}</td>
              <td className="py-2 pr-4">{r.voteCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
