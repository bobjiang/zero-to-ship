'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[app/error]', error);
  }, [error]);

  return (
    <Container>
      <div className="mx-auto max-w-2xl py-20 text-center">
        <p className="text-sm font-black uppercase tracking-[0.24em] text-blue-600 dark:text-blue-400">
          Error
        </p>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white">
          Something went wrong
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-600 dark:text-slate-300">
          The page could not be rendered. Try again, or come back later.
        </p>
        <div className="mt-8">
          <Button onClick={reset}>Try again</Button>
        </div>
      </div>
    </Container>
  );
}
