'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';

interface Card {
  id: string;
  title: string;
  speakerName: string;
  intro: string;
}

export function VoteClient({ cards, voteLimit }: { cards: Card[]; voteLimit: number }) {
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
      const dropped = Number(data.dropped ?? 0);
      setMessage(
        dropped > 0
          ? 'Vote recorded, but some selections were no longer available.'
          : data.alreadyRecorded
            ? 'You already submitted this ballot. Nothing changed.'
            : 'Thanks — your vote has been recorded.'
      );
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
      default:
        setMessage('Could not record your vote. Try again.');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-6 shadow-sm">
        <p className="text-lg font-semibold text-green-900">{message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-600">
        Pick up to {voteLimit} talks. <span className="font-medium text-gray-900">{selected.size}/{voteLimit}</span> selected.
      </p>
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
                className={`group relative flex h-full w-full flex-col rounded-lg border p-5 text-left shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-600'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                }`}
              >
                {isSelected && (
                  <span className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
                    ✓
                  </span>
                )}
                <h3 className="pr-8 text-lg font-semibold text-gray-900">{c.title}</h3>
                <p className="mt-1 text-xs font-medium uppercase tracking-wide text-gray-500">
                  {c.speakerName}
                </p>
                <p className="mt-3 text-sm leading-6 text-gray-600">{c.intro}</p>
              </button>
            </li>
          );
        })}
      </ul>
      {status === 'error' && (
        <p role="alert" className="text-sm font-medium text-red-700">
          {message}
        </p>
      )}
      <div className="flex flex-col gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-gray-600">
          {selected.size === 0
            ? 'Select at least one talk to submit your vote.'
            : `You're voting for ${selected.size} ${selected.size === 1 ? 'talk' : 'talks'}.`}
        </p>
        <Button
          type="button"
          size="lg"
          onClick={submit}
          disabled={selected.size === 0 || status === 'submitting'}
        >
          {status === 'submitting' ? 'Submitting…' : `Submit vote${selected.size > 0 ? ` (${selected.size})` : ''}`}
        </Button>
      </div>
    </div>
  );
}
