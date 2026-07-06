'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, WarningCircle } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface Card {
  id: string;
  title: string;
  speakerName: string;
  intro: string;
}

export function VoteClient({ cards, voteLimit }: { cards: Card[]; voteLimit: number }) {
  const router = useRouter();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState<string>('');

  const atLimit = selected.size >= voteLimit;

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else if (next.size < voteLimit) next.add(id);
      return next;
    });
  }

  async function submit() {
    setStatus('submitting');
    const res = await fetch('/api/votes', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ submissionIds: Array.from(selected) }),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.ok) {
      setStatus('success');
      router.refresh();
      return;
    }
    setStatus('error');
    switch (data.error) {
      case 'already-voted':
        setMessage('This browser has already submitted a ballot.');
        break;
      case 'selection-unavailable':
        setMessage('Your selected talks changed while you were voting. Refresh and try again.');
        break;
      case 'closed':
        setMessage('Voting is closed.');
        break;
      case 'cookies-required':
        setMessage('Please enable cookies and reload.');
        break;
      case 'unknown-submission':
        setMessage('One of your selections is no longer available. Refresh and try again.');
        break;
      case 'server':
        setMessage('Server error - storage is unreachable. Please contact the organizer.');
        break;
      default:
        setMessage('Could not record your vote. Try again.');
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-none border border-slate-200 bg-white p-4 shadow-sm shadow-slate-950/5 dark:border-slate-800 dark:bg-slate-900">
        <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
          Pick up to {voteLimit} talks.
        </p>
        <span className="rounded-none bg-blue-50 px-3 py-1 text-sm font-black text-blue-700 dark:bg-blue-950/50 dark:text-blue-200">
          {selected.size}/{voteLimit} selected
        </span>
      </div>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {cards.map((c) => {
          const isSelected = selected.has(c.id);
          const disabled = !isSelected && atLimit;
          return (
            <li key={c.id}>
              <button
                type="button"
                onClick={() => toggle(c.id)}
                disabled={disabled}
                aria-pressed={isSelected}
                className={cn(
                  'group relative flex h-full w-full flex-col rounded-none border p-5 text-left shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:focus-visible:ring-offset-slate-950',
                  isSelected
                    ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-600 dark:bg-blue-950/40'
                    : 'border-slate-200 bg-white hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-800'
                )}
              >
                {isSelected && (
                  <span className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-none bg-blue-600 text-white">
                    <CheckCircle className="h-5 w-5" weight="fill" />
                  </span>
                )}
                <h3 className="pr-8 text-lg font-black tracking-tight text-slate-950 dark:text-white">{c.title}</h3>
                <p className="mt-2 text-xs font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                  {c.speakerName}
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{c.intro}</p>
              </button>
            </li>
          );
        })}
      </ul>
      {status === 'error' && (
        <p role="alert" className="flex items-center gap-2 text-sm font-bold text-red-700 dark:text-red-300">
          <WarningCircle className="h-5 w-5" weight="fill" />
          {message}
        </p>
      )}
      <div className="flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
        <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
          {selected.size === 0
            ? 'Select at least one talk to submit your vote.'
            : `You're voting for ${selected.size} ${selected.size === 1 ? 'talk' : 'talks'}.`}
        </p>
        <Button
          type="button"
          size="lg"
          onClick={submit}
          disabled={selected.size === 0 || status === 'submitting' || status === 'success'}
        >
          {status === 'submitting' || status === 'success'
            ? 'Submitting...'
            : `Submit vote${selected.size > 0 ? ` (${selected.size})` : ''}`}
        </Button>
      </div>
    </div>
  );
}
