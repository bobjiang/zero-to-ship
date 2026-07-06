import { CheckCircle } from '@phosphor-icons/react/dist/ssr';
import { cn } from '@/lib/utils';

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
      className={cn(
        'relative flex h-full flex-col rounded-none border p-5 shadow-sm',
        isMine
          ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-600 dark:bg-blue-950/40'
          : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900'
      )}
    >
      <div className="absolute right-4 top-4 flex items-center gap-2">
        {isMine && (
          <span className="rounded-none bg-blue-600 px-2.5 py-1 text-xs font-bold text-white">
            Your pick
          </span>
        )}
        <span className="rounded-none bg-slate-950 px-2.5 py-1 text-xs font-bold text-white dark:bg-white dark:text-slate-950">
          {voteLabel(card.voteCount)}
        </span>
      </div>
      <h3 className="pr-28 text-lg font-black tracking-tight text-slate-950 dark:text-white">{card.title}</h3>
      <p className="mt-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
        {card.speakerName}
      </p>
      <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{card.intro}</p>
    </div>
  );
}

export function VotedView({ yourVotes, otherTalks, submittedAt, closed }: Props) {
  return (
    <div className="space-y-8">
      <div className="rounded-none border border-green-200 bg-green-50 p-5 shadow-sm shadow-green-950/5 dark:border-green-900/60 dark:bg-green-950/30">
        {submittedAt ? (
          <div className="flex gap-3">
            <CheckCircle className="mt-0.5 h-6 w-6 shrink-0 text-green-700 dark:text-green-200" weight="fill" />
            <div>
              <p className="text-base font-black text-green-950 dark:text-green-100">
              Your vote is locked in - {yourVotes.length}{' '}
              {yourVotes.length === 1 ? 'selection' : 'selections'} recorded.
              </p>
              <p className="mt-1 text-sm font-semibold text-green-800 dark:text-green-200">
                Submitted {new Date(submittedAt).toLocaleString()}. Votes cannot be changed.
              </p>
            </div>
          </div>
        ) : (
          <p className="text-base font-black text-green-950 dark:text-green-100">
            {closed ? 'Voting is closed.' : 'Voting results so far.'}
          </p>
        )}
      </div>

      {yourVotes.length > 0 && (
        <section>
          <h2 className="text-xl font-black tracking-tight text-slate-950 dark:text-white">Your picks</h2>
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
          <h2 className="text-xl font-black tracking-tight text-slate-950 dark:text-white">
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
