import { Container } from '@/components/ui/Container';

export default function Loading() {
  return (
    <Container>
      <div className="mx-auto max-w-3xl py-20">
        <div className="h-8 w-48 animate-pulse rounded bg-gray-200" />
        <div className="mt-8 space-y-4">
          <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-gray-100" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-gray-100" />
        </div>
      </div>
    </Container>
  );
}
