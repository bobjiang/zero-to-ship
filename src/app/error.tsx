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
      <div className="mx-auto max-w-2xl py-20">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Something went wrong
        </h1>
        <p className="mt-3 text-gray-600">
          The page could not be rendered. Try again, or come back later.
        </p>
        <div className="mt-8">
          <Button onClick={reset}>Try again</Button>
        </div>
      </div>
    </Container>
  );
}
