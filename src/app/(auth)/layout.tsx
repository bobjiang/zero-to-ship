import { Container } from '@/components/ui/Container';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center py-12">
      <Container>
        <div className="mx-auto max-w-md">{children}</div>
      </Container>
    </div>
  );
}
