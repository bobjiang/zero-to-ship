import Link from 'next/link';
import { Container } from '@/components/ui/Container';

export default function NotFound() {
  return (
    <Container>
      <div className="mx-auto max-w-2xl py-20 text-center">
        <p className="text-sm font-black uppercase tracking-[0.24em] text-blue-600 dark:text-blue-400">
          404
        </p>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white">
          Page not found
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-600 dark:text-slate-300">
          The page may have moved, or the link may be incorrect.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex min-h-10 items-center justify-center rounded-none bg-blue-600 px-4 py-2 text-base font-semibold text-white shadow-sm shadow-blue-950/10 transition hover:bg-blue-700"
        >
          Go home
        </Link>
      </div>
    </Container>
  );
}
