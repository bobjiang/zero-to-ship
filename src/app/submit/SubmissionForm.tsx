'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle, WarningCircle } from '@phosphor-icons/react';
import { Button } from '@/components/ui/Button';
import { helperClass, inputClass, labelClass } from '@/components/ui/formStyles';

interface Props {
  disabled: boolean;
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

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
        setErrorMsg('Please fill in name, title, intro, and tick the consent box.');
        break;
      case 'server':
        setErrorMsg('Server error - storage is unreachable. Please contact the organizer.');
        break;
      default:
        setErrorMsg('Something went wrong. Please try again in a moment.');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-none border border-green-200 bg-green-50 p-6 shadow-sm shadow-green-950/5 dark:border-green-900/60 dark:bg-green-950/30">
        <div className="flex h-11 w-11 items-center justify-center rounded-none bg-white text-green-700 dark:bg-green-950 dark:text-green-200">
          <CheckCircle className="h-6 w-6" weight="fill" />
        </div>
        <p className="mt-4 text-lg font-black tracking-tight text-green-950 dark:text-green-100">Thanks - your talk is under review.</p>
        <p className="mt-2 text-sm leading-6 text-green-800 dark:text-green-200">
          You&apos;ll see it on the voting page once organizers approve it.
        </p>
        <div className="mt-5">
          <Link href="/vote">
            <Button size="lg" className="gap-2">
              Go vote for other talks
              <ArrowRight className="h-4 w-4" weight="bold" />
            </Button>
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
        <span className={helperClass}>Up to 80 characters.</span>
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
        <span className={helperClass}>Up to 500 characters.</span>
      </label>
      <label className="block">
        <span className={labelClass}>GitHub</span>
        <input name="handle" className={inputClass} disabled={disabled} placeholder="@username" />
        <span className={helperClass}>Optional. Not shown publicly.</span>
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
        <span className={helperClass}>Optional. Not shown publicly.</span>
      </label>
      <label className="flex items-start gap-3 rounded-none border border-slate-200 bg-slate-50 p-4 text-sm font-semibold leading-6 text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
        <input
          type="checkbox"
          name="consent"
          required
          disabled={disabled}
          className="mt-1 h-4 w-4 rounded-none border-slate-300 text-blue-600 focus-visible:ring-2 focus-visible:ring-blue-600 dark:border-slate-700"
        />
        <span>
          I understand this is a 5-minute lightning talk and agree my submission can be displayed publicly for
          voting.
        </span>
      </label>
      {status === 'error' && (
        <p role="alert" className="flex items-center gap-2 text-sm font-bold text-red-700 dark:text-red-300">
          <WarningCircle className="h-5 w-5" weight="fill" />
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
          {status === 'submitting' ? 'Submitting...' : 'Submit talk'}
        </Button>
      </div>
      {disabled && (
        <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">Submissions are closed.</p>
      )}
    </form>
  );
}
