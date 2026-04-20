import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ADMIN_SESSION_COOKIE, verifySession } from '@/lib/admin';
import { getEventConfig, listSubmissions, voterCount, listBallots } from '@/lib/voting';
import type { Submission, SubmissionStatus } from '@/types/voting';
import { Container } from '@/components/ui/Container';
import { SubmissionActions } from './SubmissionActions';

export const dynamic = 'force-dynamic';

const ORDER: SubmissionStatus[] = ['pending', 'approved', 'rejected'];

const STATUS_BADGE: Record<SubmissionStatus, string> = {
  pending: 'bg-amber-100 text-amber-900',
  approved: 'bg-green-100 text-green-900',
  rejected: 'bg-red-100 text-red-900',
};

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
    <section className="py-12 sm:py-16">
      <Container>
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Submissions
              </h1>
              <p className="mt-2 text-sm text-gray-600">{event.name}</p>
            </div>
            <Link
              href="/admin/results"
              className="text-sm font-medium text-blue-700 hover:text-blue-900"
            >
              View results →
            </Link>
          </div>

          <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">Submissions close</dt>
              <dd className="mt-1 text-sm font-semibold text-gray-900">
                {new Date(event.submissionClosesAt).toLocaleString()}
              </dd>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">Voting closes</dt>
              <dd className="mt-1 text-sm font-semibold text-gray-900">
                {new Date(event.votingClosesAt).toLocaleString()}
              </dd>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">Voters</dt>
              <dd className="mt-1 text-2xl font-bold text-gray-900">{totalVoters}</dd>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
              <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">Total votes</dt>
              <dd className="mt-1 text-2xl font-bold text-gray-900">{totalVotes}</dd>
            </div>
          </dl>

          <div className="mt-10 space-y-10">
            {ORDER.map((status) => (
              <section key={status}>
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-semibold capitalize text-gray-900">{status}</h2>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_BADGE[status]}`}
                  >
                    {grouped[status].length}
                  </span>
                </div>
                {grouped[status].length === 0 ? (
                  <p className="mt-3 text-sm text-gray-500">None.</p>
                ) : (
                  <div className="mt-4 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                    <table className="w-full border-collapse text-sm">
                      <thead className="bg-gray-50">
                        <tr className="text-left">
                          <th className="px-4 py-3 font-medium text-gray-700">Title</th>
                          <th className="px-4 py-3 font-medium text-gray-700">Speaker</th>
                          <th className="px-4 py-3 font-medium text-gray-700">Contact</th>
                          <th className="px-4 py-3 font-medium text-gray-700">Intro</th>
                          <th className="px-4 py-3 font-medium text-gray-700">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {grouped[status].map((s) => (
                          <tr key={s.id} className="align-top">
                            <td className="px-4 py-3 font-medium text-gray-900">{s.title}</td>
                            <td className="px-4 py-3 text-gray-700">
                              <div>{s.speakerName}</div>
                              {s.handle && (
                                <div className="text-xs text-gray-500">{s.handle}</div>
                              )}
                            </td>
                            <td className="px-4 py-3 text-gray-600">{s.contact ?? '—'}</td>
                            <td className="px-4 py-3 text-gray-600">{s.intro}</td>
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
