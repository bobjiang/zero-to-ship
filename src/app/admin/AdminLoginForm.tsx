'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';

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
    <form onSubmit={onSubmit} className="space-y-4">
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-gray-900">Admin token</span>
        <input
          name="token"
          type="password"
          required
          autoComplete="new-password"
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
        />
      </label>
      {status === 'error' && (
        <p role="alert" className="text-sm font-medium text-red-700">
          Invalid token.
        </p>
      )}
      <Button type="submit" disabled={status === 'submitting'} className="w-full">
        {status === 'submitting' ? 'Signing in…' : 'Sign in'}
      </Button>
    </form>
  );
}
