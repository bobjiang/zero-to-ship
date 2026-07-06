'use client';

import { useState } from 'react';
import { WarningCircle } from '@phosphor-icons/react';
import { Button } from '@/components/ui/Button';
import { inputClass, labelClass } from '@/components/ui/formStyles';

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
        <span className={labelClass}>Admin token</span>
        <input
          name="token"
          type="password"
          required
          autoComplete="new-password"
          className={inputClass}
        />
      </label>
      {status === 'error' && (
        <p role="alert" className="flex items-center gap-2 text-sm font-bold text-red-700 dark:text-red-300">
          <WarningCircle className="h-5 w-5" weight="fill" />
          Invalid token.
        </p>
      )}
      <Button type="submit" disabled={status === 'submitting'} className="w-full">
        {status === 'submitting' ? 'Signing in...' : 'Sign in'}
      </Button>
    </form>
  );
}
