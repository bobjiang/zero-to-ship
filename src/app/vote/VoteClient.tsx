'use client';

import { useState } from 'react';

interface Card {
  id: string;
  title: string;
  speakerName: string;
  handle?: string;
  tag?: string;
  intro: string;
}

export function VoteClient({ cards, voteLimit }: { cards: Card[]; voteLimit: number }) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState<string>('');

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
      <div className="rounded-md border border-green-300 bg-green-50 p-4 text-green-900">
        <p className="font-medium">{message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-neutral-600">
        Pick up to {voteLimit} talks. {selected.size}/{voteLimit} selected.
      </p>
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {cards.map((c) => {
          const isSelected = selected.has(c.id);
          return (
            <li key={c.id}>
              <button
                type="button"
                onClick={() => toggle(c.id)}
                className={`w-full rounded-lg border p-4 text-left transition ${
                  isSelected ? 'border-black bg-neutral-900 text-white' : 'border-neutral-300 bg-white'
                }`}
                aria-pressed={isSelected}
              >
                <div className="font-medium">{c.title}</div>
                <div className="text-xs opacity-80">
                  {c.speakerName}
                  {c.handle ? ` · ${c.handle}` : ''}
                  {c.tag ? ` · ${c.tag}` : ''}
                </div>
                <p className="mt-2 text-sm opacity-90">{c.intro}</p>
              </button>
            </li>
          );
        })}
      </ul>
      {status === 'error' && (
        <p role="alert" className="text-sm text-red-700">
          {message}
        </p>
      )}
      <button
        type="button"
        onClick={submit}
        disabled={selected.size === 0 || status === 'submitting'}
        className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
      >
        {status === 'submitting' ? 'Submitting…' : `Submit vote (${selected.size})`}
      </button>
    </div>
  );
}
