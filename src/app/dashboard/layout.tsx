import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { Container } from '@/components/ui/Container';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';

export const dynamic = 'force-dynamic';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/login?next=/dashboard');
  }

  return (
    <div className="py-12">
      <Container>
        <div className="flex flex-col gap-8 md:flex-row">
          <aside className="w-full md:w-56 shrink-0">
            <DashboardSidebar />
          </aside>
          <main className="min-w-0 flex-1">{children}</main>
        </div>
      </Container>
    </div>
  );
}
