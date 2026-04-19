'use client';

import { useState } from 'react';

export function AdminLoginForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    const fd = new FormData(e.currentTarget);
    const token = String(fd.get('token') ?? '');
    const res = await fetch('/api/admin/session', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ token }),
    });
    if (res.status === 204) {
      window.location.href = '/admin/submissions';
      return;
    }
    setStatus('error');
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <label className="block">
        <span className="mb-1 block text-sm font-medium">Admin token</span>
        <input
          name="token"
          type="password"
          required
          className="w-full rounded border border-neutral-300 p-2"
          autoComplete="off"
        />
      </label>
      {status === 'error' && (
        <p role="alert" className="text-sm text-red-700">
          Invalid token.
        </p>
      )}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
      >
        {status === 'submitting' ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  );
}
