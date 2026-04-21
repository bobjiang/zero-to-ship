import { cookies } from 'next/headers';
import { VOTER_COOKIE } from '@/middleware';
import {
  getBallot,
  getEventConfig,
  listBallots,
  listSubmissions,
  shuffleWithSeed,
  tallyVotes,
} from '@/lib/voting';
import { Container } from '@/components/ui/Container';
import { AutoRefresh } from './AutoRefresh';
import { VoteClient } from './VoteClient';
import { VotedView } from './VotedView';

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

  const showReadOnly = Boolean(existing) || closed;
  const ballots = showReadOnly ? await listBallots(event.slug) : [];

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-3xl">
          {!closed && <AutoRefresh intervalMs={10000} />}
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            {existing ? 'Your vote is in' : closed ? 'Voting is closed' : 'Vote for talks you want to hear'}
          </h1>

          <div className="mt-10">
            {showReadOnly ? (
              (() => {
                const approvedIds = new Set(approved.map((s) => s.id));
                const counts = tallyVotes(ballots, approvedIds);
                const cards = approved.map((s) => ({
                  id: s.id,
                  title: s.title,
                  speakerName: s.speakerName,
                  intro: s.intro,
                  voteCount: counts.get(s.id) ?? 0,
                }));
                const mine = new Set(existing?.submissionIds ?? []);
                const byCountDesc = (a: { voteCount: number }, b: { voteCount: number }) =>
                  b.voteCount - a.voteCount;
                const yourVotes = cards.filter((c) => mine.has(c.id)).sort(byCountDesc);
                const otherTalks = cards.filter((c) => !mine.has(c.id)).sort(byCountDesc);
                return (
                  <VotedView
                    yourVotes={yourVotes}
                    otherTalks={otherTalks}
                    submittedAt={existing?.submittedAt}
                    closed={closed}
                  />
                );
              })()
            ) : approved.length === 0 ? (
              <p className="text-gray-600">No talks are available for voting yet.</p>
            ) : (
              <VoteClient
                cards={shuffleWithSeed(
                  approved.map((s) => ({
                    id: s.id,
                    title: s.title,
                    speakerName: s.speakerName,
                    intro: s.intro,
                  })),
                  seed
                )}
                voteLimit={event.voteLimit}
              />
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
