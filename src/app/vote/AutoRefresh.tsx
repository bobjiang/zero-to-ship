'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

// Polls router.refresh() on an interval so new submissions (after admin
// approval) and updated vote counts show up without a manual reload. Pauses
// when the tab is hidden so idle tabs don't hammer Upstash.
export function AutoRefresh({ intervalMs = 10000 }: { intervalMs?: number }) {
  const router = useRouter();
  const lastTick = useRef(Date.now());

  useEffect(() => {
    function tick() {
      if (document.visibilityState !== 'visible') return;
      router.refresh();
      lastTick.current = Date.now();
    }
    const id = window.setInterval(tick, intervalMs);
    function onVisibility() {
      if (
        document.visibilityState === 'visible' &&
        Date.now() - lastTick.current >= intervalMs
      ) {
        tick();
      }
    }
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      window.clearInterval(id);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [intervalMs, router]);

  return null;
}
