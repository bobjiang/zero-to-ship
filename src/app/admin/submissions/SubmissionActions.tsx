'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Status = 'pending' | 'approved' | 'rejected';

export function SubmissionActions({ id, current }: { id: string; current: Status }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function set(status: Status) {
    setBusy(true);
    const res = await fetch(`/api/admin/submissions?id=${encodeURIComponent(id)}`, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    setBusy(false);
    if (res.ok) router.refresh();
    else alert('Update failed.');
  }

  return (
    <div className="flex gap-2">
      <button
        type="button"
        disabled={busy || current === 'approved'}
        onClick={() => set('approved')}
        className="rounded bg-green-700 px-2 py-1 text-xs text-white disabled:opacity-50"
      >
        Approve
      </button>
      <button
        type="button"
        disabled={busy || current === 'rejected'}
        onClick={() => set('rejected')}
        className="rounded bg-red-700 px-2 py-1 text-xs text-white disabled:opacity-50"
      >
        Reject
      </button>
      <button
        type="button"
        disabled={busy || current === 'pending'}
        onClick={() => set('pending')}
        className="rounded bg-neutral-700 px-2 py-1 text-xs text-white disabled:opacity-50"
      >
        Reset
      </button>
    </div>
  );
}
