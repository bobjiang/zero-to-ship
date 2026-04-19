import { cookies } from 'next/headers';
import { VOTER_COOKIE } from '@/middleware';
import {
  getBallot,
  getEventConfig,
  listSubmissions,
  shuffleWithSeed,
} from '@/lib/voting';
import { Container } from '@/components/ui/Container';
import { VoteClient } from './VoteClient';

export const dynamic = 'force-dynamic';

export default async function VotePage() {
  const event = await getEventConfig();
  const closed = Date.now() >= new Date(event.votingClosesAt).getTime();
  const voter = cookies().get(VOTER_COOKIE)?.value;
  const seed = (voter ?? `anon-${Date.now()}`) + ':' + event.slug;
  const [all, existing] = await Promise.all([
    listSubmissions(event.slug),
    voter ? getBallot(event.slug, voter) : Promise.resolve(null),
  ]);
  const approved = all.filter((s) => s.status === 'approved');
  const cards = shuffleWithSeed(
    approved.map((s) => ({
      id: s.id,
      title: s.title,
      speakerName: s.speakerName,
      intro: s.intro,
    })),
    seed
  );

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Vote for talks you want to hear
          </h1>

          <div className="mt-10">
            {existing ? (
              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <p className="text-lg font-semibold text-gray-900">
                  You&apos;ve already voted from this browser.
                </p>
                <p className="mt-2 text-sm text-gray-600">
                  {existing.submissionIds.length} selection(s) recorded at{' '}
                  {new Date(existing.submittedAt).toLocaleString()}.
                </p>
              </div>
            ) : closed ? (
              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <p className="text-lg font-semibold text-gray-900">Voting is closed.</p>
                <p className="mt-2 text-sm text-gray-600">Results will be announced soon.</p>
              </div>
            ) : approved.length === 0 ? (
              <p className="text-gray-600">No talks are available for voting yet.</p>
            ) : (
              <VoteClient cards={cards} voteLimit={event.voteLimit} />
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
