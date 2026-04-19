import { cookies } from 'next/headers';
import { VOTER_COOKIE } from '@/middleware';
import {
  getBallot,
  getEventConfig,
  isWithinWindow,
  listSubmissions,
  shuffleWithSeed,
} from '@/lib/voting';
import { VoteClient } from './VoteClient';

export const dynamic = 'force-dynamic';

export default async function VotePage() {
  const event = await getEventConfig();
  const open = isWithinWindow(event.votingOpensAt, event.votingClosesAt, new Date());
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
      handle: s.handle,
      tag: s.tag,
      intro: s.intro,
    })),
    seed
  );

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-2 text-2xl font-semibold">Vote for talks you want to hear</h1>
      <p className="mb-6 text-sm text-neutral-600">
        {event.name} · voting closes {new Date(event.votingClosesAt).toLocaleString()}
      </p>

      {existing ? (
        <div className="rounded-md border border-neutral-300 bg-neutral-50 p-4">
          <p className="font-medium">You&apos;ve already voted from this browser.</p>
          <p className="text-sm text-neutral-700">
            {existing.submissionIds.length} selection(s) recorded at{' '}
            {new Date(existing.submittedAt).toLocaleString()}.
          </p>
        </div>
      ) : !open ? (
        <div className="rounded-md border border-neutral-300 bg-neutral-50 p-4">
          <p className="font-medium">
            {Date.now() < new Date(event.votingOpensAt).getTime()
              ? `Voting opens ${new Date(event.votingOpensAt).toLocaleString()}.`
              : 'Voting is closed. Results will be announced soon.'}
          </p>
        </div>
      ) : approved.length === 0 ? (
        <p className="text-sm text-neutral-700">No talks are available for voting yet.</p>
      ) : (
        <VoteClient cards={cards} voteLimit={event.voteLimit} />
      )}
    </div>
  );
}
