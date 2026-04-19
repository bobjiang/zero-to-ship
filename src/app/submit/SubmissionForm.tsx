'use client';

import { useState } from 'react';

interface Props {
  disabled: boolean;
  submissionClosesAt: string;
  eventName: string;
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function SubmissionForm({ disabled, submissionClosesAt, eventName }: Props) {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState<string>('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (disabled) return;
    setStatus('submitting');
    const fd = new FormData(e.currentTarget);
    const body = {
      speakerName: String(fd.get('speakerName') ?? '').trim(),
      handle: String(fd.get('handle') ?? '').trim() || undefined,
      contact: String(fd.get('contact') ?? '').trim() || undefined,
      title: String(fd.get('title') ?? '').trim(),
      intro: String(fd.get('intro') ?? '').trim(),
      tag: String(fd.get('tag') ?? '').trim() || undefined,
      consent: fd.get('consent') === 'on',
    };
    const res = await fetch('/api/submissions', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.ok) {
      setStatus('success');
      return;
    }
    setStatus('error');
    switch (data.error) {
      case 'closed':
        setErrorMsg('Submissions are closed.');
        break;
      case 'rate-limited':
        setErrorMsg("You've reached the limit of submissions from this browser in 24 hours.");
        break;
      case 'cookies-required':
        setErrorMsg('Please enable cookies and reload before submitting.');
        break;
      case 'validation':
      default:
        setErrorMsg('Please fill in every required field, including a handle or contact.');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-md border border-green-300 bg-green-50 p-4 text-green-900">
        <p className="font-medium">Thanks — your talk is under review.</p>
        <p className="text-sm">You&apos;ll see it on the voting page once organizers approve it.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <p className="text-sm text-neutral-600">
        Submitting to <strong>{eventName}</strong>. Window closes{' '}
        {new Date(submissionClosesAt).toLocaleString()}.
      </p>
      <label className="block">
        <span className="mb-1 block text-sm font-medium">Your name</span>
        <input
          name="speakerName"
          required
          className="w-full rounded border border-neutral-300 p-2"
          disabled={disabled}
        />
      </label>
      <label className="block">
        <span className="mb-1 block text-sm font-medium">Public handle (optional if you fill in contact)</span>
        <input name="handle" className="w-full rounded border border-neutral-300 p-2" disabled={disabled} />
      </label>
      <label className="block">
        <span className="mb-1 block text-sm font-medium">Contact info (optional if you fill in handle)</span>
        <input name="contact" className="w-full rounded border border-neutral-300 p-2" disabled={disabled} />
      </label>
      <label className="block">
        <span className="mb-1 block text-sm font-medium">Talk title (≤ 80 chars)</span>
        <input
          name="title"
          required
          maxLength={80}
          className="w-full rounded border border-neutral-300 p-2"
          disabled={disabled}
        />
      </label>
      <label className="block">
        <span className="mb-1 block text-sm font-medium">Short intro (≤ 500 chars)</span>
        <textarea
          name="intro"
          required
          maxLength={500}
          rows={4}
          className="w-full rounded border border-neutral-300 p-2"
          disabled={disabled}
        />
      </label>
      <label className="block">
        <span className="mb-1 block text-sm font-medium">Tag (optional)</span>
        <input name="tag" className="w-full rounded border border-neutral-300 p-2" disabled={disabled} />
      </label>
      <label className="flex items-start gap-2 text-sm">
        <input type="checkbox" name="consent" required disabled={disabled} />
        <span>
          I understand this is a 5-minute lightning talk and agree my submission can be displayed publicly for
          voting.
        </span>
      </label>
      {status === 'error' && (
        <p role="alert" className="text-sm text-red-700">
          {errorMsg}
        </p>
      )}
      <button
        type="submit"
        disabled={disabled || status === 'submitting'}
        className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
      >
        {status === 'submitting' ? 'Submitting…' : 'Submit talk'}
      </button>
      {disabled && <p className="text-sm text-neutral-600">Submissions are closed.</p>}
    </form>
  );
}
