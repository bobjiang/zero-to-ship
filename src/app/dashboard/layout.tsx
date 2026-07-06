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
    <div className="bg-slate-50 py-12 dark:bg-slate-950">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row">
          <aside className="w-full shrink-0 lg:w-64">
            <DashboardSidebar />
          </aside>
          <main className="min-w-0 flex-1 rounded-none border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5 sm:p-8 dark:border-slate-800 dark:bg-slate-900">
            {children}
          </main>
        </div>
      </Container>
    </div>
  );
}
