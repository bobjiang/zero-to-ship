'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Status = 'pending' | 'approved' | 'rejected';

const baseBtn =
  'inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

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
    <div className="flex flex-wrap gap-1.5">
      <button
        type="button"
        disabled={busy || current === 'approved'}
        onClick={() => set('approved')}
        className={`${baseBtn} bg-green-600 text-white hover:bg-green-700 focus-visible:ring-green-600`}
      >
        Approve
      </button>
      <button
        type="button"
        disabled={busy || current === 'rejected'}
        onClick={() => set('rejected')}
        className={`${baseBtn} bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600`}
      >
        Reject
      </button>
      <button
        type="button"
        disabled={busy || current === 'pending'}
        onClick={() => set('pending')}
        className={`${baseBtn} border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus-visible:ring-gray-500`}
      >
        Reset
      </button>
    </div>
  );
}
