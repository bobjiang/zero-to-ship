interface Card {
  id: string;
  title: string;
  speakerName: string;
  intro: string;
  voteCount: number;
}

interface Props {
  yourVotes: Card[];
  otherTalks: Card[];
  submittedAt?: string;
  closed: boolean;
}

function voteLabel(n: number) {
  return `${n} ${n === 1 ? 'vote' : 'votes'}`;
}

function TalkCard({ card, isMine }: { card: Card; isMine: boolean }) {
  return (
    <div
      className={`relative flex h-full flex-col rounded-lg border p-5 shadow-sm ${
        isMine ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-600' : 'border-gray-200 bg-white'
      }`}
    >
      <div className="absolute right-4 top-4 flex items-center gap-2">
        {isMine && (
          <span className="rounded-full bg-blue-600 px-2 py-0.5 text-xs font-semibold text-white">
            Your pick
          </span>
        )}
        <span className="rounded-full bg-gray-900 px-2 py-0.5 text-xs font-semibold text-white">
          {voteLabel(card.voteCount)}
        </span>
      </div>
      <h3 className="pr-28 text-lg font-semibold text-gray-900">{card.title}</h3>
      <p className="mt-1 text-xs font-medium uppercase tracking-wide text-gray-500">
        {card.speakerName}
      </p>
      <p className="mt-3 text-sm leading-6 text-gray-600">{card.intro}</p>
    </div>
  );
}

export function VotedView({ yourVotes, otherTalks, submittedAt, closed }: Props) {
  return (
    <div className="space-y-8">
      <div className="rounded-lg border border-green-200 bg-green-50 p-5 shadow-sm">
        {submittedAt ? (
          <>
            <p className="text-base font-semibold text-green-900">
              Your vote is locked in — {yourVotes.length}{' '}
              {yourVotes.length === 1 ? 'selection' : 'selections'} recorded.
            </p>
            <p className="mt-1 text-sm text-green-800">
              Submitted {new Date(submittedAt).toLocaleString()}. Votes cannot be changed.
            </p>
          </>
        ) : (
          <p className="text-base font-semibold text-green-900">
            {closed ? 'Voting is closed.' : 'Voting results so far.'}
          </p>
        )}
      </div>

      {yourVotes.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-gray-900">Your picks</h2>
          <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {yourVotes.map((c) => (
              <li key={c.id}>
                <TalkCard card={c} isMine />
              </li>
            ))}
          </ul>
        </section>
      )}

      {otherTalks.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-gray-900">
            {yourVotes.length > 0 ? 'Other talks' : 'All talks'}
          </h2>
          <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {otherTalks.map((c) => (
              <li key={c.id}>
                <TalkCard card={c} isMine={false} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
