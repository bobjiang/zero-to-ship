'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle,
  EnvelopeSimple,
  GithubLogo,
  GoogleLogo,
  User,
  WarningCircle,
} from '@phosphor-icons/react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { inputClass, labelClass } from '@/components/ui/formStyles';
import { cn } from '@/lib/utils';

interface AuthFormProps {
  mode: 'login' | 'signup';
}

export function AuthForm({ mode }: AuthFormProps) {
  const searchParams = useSearchParams();
  const next = searchParams.get('next') ?? '/dashboard';
  const errorParam = searchParams.get('error');

  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const supabase = createClient();

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`;

    if (mode === 'signup') {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: redirectTo,
          data: { full_name: fullName },
        },
      });
      if (error) {
        setStatus('error');
        setErrorMessage(error.message);
        return;
      }
    } else {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: redirectTo,
        },
      });
      if (error) {
        setStatus('error');
        setErrorMessage(error.message);
        return;
      }
    }

    setStatus('sent');
  };

  const handleOAuth = async (provider: 'google' | 'github') => {
    const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`;
    await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo },
    });
  };

  if (status === 'sent') {
    return (
      <div className="flex min-h-[420px] flex-col justify-center text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-none bg-green-50 text-green-700 ring-1 ring-green-200 dark:bg-green-950/50 dark:text-green-200 dark:ring-green-900/70">
          <CheckCircle className="h-6 w-6" weight="fill" />
        </div>
        <h1 className="mt-6 text-3xl font-black tracking-tight text-slate-950 dark:text-white">
          Check your email
        </h1>
        <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-slate-600 dark:text-slate-300">
          We sent a magic link to <strong>{email}</strong>. Open it in this browser to finish signing in.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-7 text-sm font-bold text-blue-600 transition hover:text-blue-700 dark:text-blue-400"
        >
          Try a different email
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md">
      <h1 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white sm:text-4xl">
        {mode === 'login' ? 'Sign in to 02Ship' : 'Create your account'}
      </h1>
      <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
        {mode === 'login' ? (
          <>
            Get back to your courses, saved resources, and community submissions.{' '}
            <Link href={`/signup?next=${encodeURIComponent(next)}`} className="font-bold text-blue-600 transition hover:text-blue-700 dark:text-blue-400">
              Sign up
            </Link>
          </>
        ) : (
          <>
            Start tracking your progress and saved resources.{' '}
            <Link href={`/login?next=${encodeURIComponent(next)}`} className="font-bold text-blue-600 transition hover:text-blue-700 dark:text-blue-400">
              Sign in
            </Link>
          </>
        )}
      </p>

      {(errorParam || errorMessage) && (
        <div className="mt-5 flex gap-3 rounded-none border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-200">
          <WarningCircle className="mt-0.5 h-5 w-5 shrink-0" weight="fill" />
          {errorMessage || 'Authentication failed. Please try again.'}
        </div>
      )}

      <form onSubmit={handleMagicLink} className="mt-8 space-y-4">
        <div className="rounded-none border border-blue-100 bg-blue-50/60 p-4 dark:border-blue-900/50 dark:bg-blue-950/20">
          <p className="text-sm font-black text-slate-950 dark:text-white">
            Sign in with a magic link
          </p>
          <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-300">
            No password needed. We will email a secure link for this browser.
          </p>
        </div>

        {mode === 'signup' && (
          <div>
            <label htmlFor="fullName" className={labelClass}>
              Full name
            </label>
            <div className="relative">
              <User className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                id="fullName"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={cn(inputClass, 'pl-10')}
                placeholder="Your name"
              />
            </div>
          </div>
        )}
        <div>
          <label htmlFor="email" className={labelClass}>
            Email address
          </label>
          <div className="relative">
            <EnvelopeSimple className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={cn(inputClass, 'pl-10')}
              placeholder="you@example.com"
            />
          </div>
        </div>
        <Button type="submit" className="w-full gap-2" disabled={status === 'loading'}>
          {status === 'loading' ? 'Sending...' : 'Send magic link'}
          {status !== 'loading' && <ArrowRight className="h-4 w-4" weight="bold" />}
        </Button>
      </form>

      <div className="relative my-7">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200 dark:border-slate-800" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-3 font-semibold text-slate-500 dark:bg-slate-900 dark:text-slate-400">
            or use a connected account
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <button
          type="button"
          onClick={() => handleOAuth('github')}
          className="flex min-h-11 w-full items-center justify-center gap-3 rounded-none border border-slate-900 bg-slate-950 px-4 py-2.5 text-sm font-bold text-white shadow-sm shadow-slate-950/10 transition hover:bg-slate-800 active:translate-y-px dark:border-slate-700"
        >
          <GithubLogo className="h-5 w-5" weight="fill" />
          Continue with GitHub
        </button>
        <button
          type="button"
          onClick={() => handleOAuth('google')}
          className="flex min-h-11 w-full items-center justify-center gap-3 rounded-none border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-900 shadow-sm shadow-slate-950/5 transition hover:border-slate-400 hover:bg-slate-50 active:translate-y-px dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:hover:border-slate-500"
        >
          <GoogleLogo className="h-5 w-5" weight="bold" />
          Continue with Google
        </button>
      </div>
    </div>
  );
}
