'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

interface Props {
  disabled: boolean;
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

const inputClass =
  'w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 disabled:bg-gray-50 disabled:text-gray-500';
const labelClass = 'mb-1.5 block text-sm font-medium text-gray-900';

export function SubmissionForm({ disabled }: Props) {
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
        setErrorMsg('Please fill in name, title, intro, and tick the consent box.');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-6 shadow-sm">
        <p className="text-lg font-semibold text-green-900">Thanks — your talk is under review.</p>
        <p className="mt-2 text-sm text-green-800">
          You&apos;ll see it on the voting page once organizers approve it.
        </p>
        <div className="mt-5">
          <Link href="/vote">
            <Button size="lg">Go vote for other talks →</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <label className="block">
        <span className={labelClass}>Name</span>
        <input name="speakerName" required className={inputClass} disabled={disabled} />
      </label>
      <label className="block">
        <span className={labelClass}>Talk title</span>
        <input name="title" required maxLength={80} className={inputClass} disabled={disabled} />
        <span className="mt-1 block text-xs text-gray-500">Up to 80 characters.</span>
      </label>
      <label className="block">
        <span className={labelClass}>Short intro</span>
        <textarea
          name="intro"
          required
          maxLength={500}
          rows={5}
          className={inputClass}
          disabled={disabled}
        />
        <span className="mt-1 block text-xs text-gray-500">Up to 500 characters.</span>
      </label>
      <label className="block">
        <span className={labelClass}>GitHub</span>
        <input name="handle" className={inputClass} disabled={disabled} placeholder="@username" />
        <span className="mt-1 block text-xs text-gray-500">Optional. Not shown publicly.</span>
      </label>
      <label className="block">
        <span className={labelClass}>Email</span>
        <input
          name="contact"
          type="email"
          className={inputClass}
          disabled={disabled}
          placeholder="you@example.com"
        />
        <span className="mt-1 block text-xs text-gray-500">Optional. Not shown publicly.</span>
      </label>
      <label className="flex items-start gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
        <input
          type="checkbox"
          name="consent"
          required
          disabled={disabled}
          className="mt-0.5 h-4 w-4 rounded border-gray-300 text-blue-600 focus-visible:ring-2 focus-visible:ring-blue-600"
        />
        <span>
          I understand this is a 5-minute lightning talk and agree my submission can be displayed publicly for
          voting.
        </span>
      </label>
      {status === 'error' && (
        <p role="alert" className="text-sm font-medium text-red-700">
          {errorMsg}
        </p>
      )}
      <div className="pt-2">
        <Button
          type="submit"
          size="lg"
          disabled={disabled || status === 'submitting'}
          className="w-full sm:w-auto"
        >
          {status === 'submitting' ? 'Submitting…' : 'Submit talk'}
        </Button>
      </div>
      {disabled && (
        <p className="text-sm text-gray-600">Submissions are closed.</p>
      )}
    </form>
  );
}
