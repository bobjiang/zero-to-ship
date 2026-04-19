import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ADMIN_SESSION_COOKIE, verifySession } from '@/lib/admin';
import { getEventConfig, listSubmissions, voterCount, listBallots } from '@/lib/voting';
import type { Submission, SubmissionStatus } from '@/types/voting';
import { SubmissionActions } from './SubmissionActions';

export const dynamic = 'force-dynamic';

const ORDER: SubmissionStatus[] = ['pending', 'approved', 'rejected'];

function groupByStatus(list: Submission[]): Record<SubmissionStatus, Submission[]> {
  const out: Record<SubmissionStatus, Submission[]> = { pending: [], approved: [], rejected: [] };
  for (const s of list) out[s.status].push(s);
  return out;
}

export default async function AdminSubmissionsPage() {
  const session = cookies().get(ADMIN_SESSION_COOKIE)?.value;
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
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-2 text-2xl font-semibold">Submissions</h1>
      <p className="mb-6 text-sm text-neutral-600">
        {event.name} · submissions close {new Date(event.submissionClosesAt).toLocaleString()} · voting closes{' '}
        {new Date(event.votingClosesAt).toLocaleString()} · vote limit {event.voteLimit} · voters {totalVoters} ·
        total votes {totalVotes}
      </p>
      {ORDER.map((status) => (
        <section key={status} className="mb-8">
          <h2 className="mb-2 text-lg font-semibold capitalize">
            {status} ({grouped[status].length})
          </h2>
          {grouped[status].length === 0 ? (
            <p className="text-sm text-neutral-600">None.</p>
          ) : (
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="py-2 pr-4">Title</th>
                  <th className="py-2 pr-4">Speaker</th>
                  <th className="py-2 pr-4">Contact</th>
                  <th className="py-2 pr-4">Intro</th>
                  <th className="py-2 pr-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {grouped[status].map((s) => (
                  <tr key={s.id} className="border-b align-top">
                    <td className="py-2 pr-4 font-medium">{s.title}</td>
                    <td className="py-2 pr-4">
                      {s.speakerName}
                      {s.handle ? ` · ${s.handle}` : ''}
                    </td>
                    <td className="py-2 pr-4 text-neutral-700">{s.contact ?? ''}</td>
                    <td className="py-2 pr-4 text-neutral-700">{s.intro}</td>
                    <td className="py-2 pr-4">
                      <SubmissionActions id={s.id} current={s.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      ))}
    </div>
  );
}
