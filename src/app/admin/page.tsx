import Link from 'next/link';
import { cookies } from 'next/headers';
import { ADMIN_SESSION_COOKIE, verifySession } from '@/lib/admin';
import { AdminLoginForm } from './AdminLoginForm';

export const dynamic = 'force-dynamic';

export default function AdminPage() {
  const session = cookies().get(ADMIN_SESSION_COOKIE)?.value;
  const authed = verifySession(session, Date.now());

  if (!authed) {
    return (
      <div className="mx-auto max-w-sm px-4 py-10">
        <h1 className="mb-4 text-2xl font-semibold">Admin sign-in</h1>
        <AdminLoginForm />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-10">
      <h1 className="mb-4 text-2xl font-semibold">Admin</h1>
      <ul className="space-y-2">
        <li>
          <Link className="text-blue-700 underline" href="/admin/submissions">
            Submissions queue
          </Link>
        </li>
        <li>
          <Link className="text-blue-700 underline" href="/admin/results">
            Results
          </Link>
        </li>
      </ul>
      <form action="/api/admin/logout" method="post" className="mt-6">
        <button type="submit" className="text-sm text-neutral-600 underline">
          Sign out
        </button>
      </form>
    </div>
  );
}
