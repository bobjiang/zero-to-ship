import Link from 'next/link';
import { cookies } from 'next/headers';
import { ADMIN_SESSION_COOKIE, verifySession } from '@/lib/admin';
import { Container } from '@/components/ui/Container';
import { AdminLoginForm } from './AdminLoginForm';

export const dynamic = 'force-dynamic';

export default function AdminPage() {
  const session = cookies().get(ADMIN_SESSION_COOKIE)?.value;
  const authed = verifySession(session, Date.now());

  if (!authed) {
    return (
      <section className="py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-sm">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Admin sign-in
            </h1>
            <p className="mt-3 text-sm text-gray-600">
              Enter the admin token to moderate submissions and view results.
            </p>
            <div className="mt-8">
              <AdminLoginForm />
            </div>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-xl">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Admin</h1>
          <p className="mt-3 text-sm text-gray-600">
            Moderate submissions and view ranked voting results.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Link
              href="/admin/submissions"
              className="group rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition hover:border-gray-300 hover:shadow-md"
            >
              <h2 className="text-lg font-semibold text-gray-900 group-hover:text-blue-700">
                Submissions queue →
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Approve or reject pending talks.
              </p>
            </Link>
            <Link
              href="/admin/results"
              className="group rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition hover:border-gray-300 hover:shadow-md"
            >
              <h2 className="text-lg font-semibold text-gray-900 group-hover:text-blue-700">
                Results →
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Ranked tally and CSV export.
              </p>
            </Link>
          </div>
          <form action="/api/admin/logout" method="post" className="mt-8">
            <button
              type="submit"
              className="text-sm font-medium text-gray-500 underline-offset-4 hover:text-gray-900 hover:underline"
            >
              Sign out
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
}
