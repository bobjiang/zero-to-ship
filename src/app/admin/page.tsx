import Link from 'next/link';
import { cookies } from 'next/headers';
import { ArrowRight, ChartBar, ListChecks } from '@phosphor-icons/react/dist/ssr';
import { ADMIN_SESSION_COOKIE, verifySession } from '@/lib/admin';
import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/ui/PageHeader';
import { AdminLoginForm } from './AdminLoginForm';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  const authed = verifySession(session, Date.now());

  if (!authed) {
    return (
      <section className="py-16 sm:py-24">
        <Container>
          <div className="mx-auto max-w-md rounded-none border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5 sm:p-8 dark:border-slate-800 dark:bg-slate-900">
            <PageHeader
              eyebrow="Admin"
              title="Admin sign-in"
              description="Enter the admin token to moderate submissions and view results."
            />
            <div className="mt-8">
              <AdminLoginForm />
            </div>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="mx-auto max-w-3xl">
          <PageHeader
            eyebrow="Admin"
            title="Admin"
            description="Moderate submissions and view ranked voting results."
          />
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Link
              href="/admin/submissions"
              className="group rounded-none border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-800"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-none bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-200">
                <ListChecks className="h-6 w-6" weight="fill" />
              </div>
              <h2 className="mt-5 flex items-center gap-2 text-lg font-black tracking-tight text-slate-950 transition group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                Submissions queue
                <ArrowRight className="h-4 w-4" weight="bold" />
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                Approve or reject pending talks.
              </p>
            </Link>
            <Link
              href="/admin/results"
              className="group rounded-none border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-800"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-none bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-200">
                <ChartBar className="h-6 w-6" weight="fill" />
              </div>
              <h2 className="mt-5 flex items-center gap-2 text-lg font-black tracking-tight text-slate-950 transition group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                Results
                <ArrowRight className="h-4 w-4" weight="bold" />
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                Ranked tally and CSV export.
              </p>
            </Link>
          </div>
          <form action="/api/admin/logout" method="post" className="mt-8">
            <button
              type="submit"
              className="text-sm font-bold text-slate-500 underline-offset-4 hover:text-slate-900 hover:underline dark:text-slate-400 dark:hover:text-white"
            >
              Sign out
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
}
