import Link from 'next/link';
import { Container } from '@/components/ui/Container';

export default function NotFound() {
  return (
    <Container>
      <div className="mx-auto max-w-2xl py-20">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Page not found
        </h1>
        <p className="mt-3 text-gray-600">
          The page may have moved, or the link may be incorrect.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Go home
        </Link>
      </div>
    </Container>
  );
}
