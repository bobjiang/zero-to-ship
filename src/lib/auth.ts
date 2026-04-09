import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export async function getCurrentUser() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  } catch {
    return null;
  }
}

export async function requireUser(options?: { next?: string }) {
  const user = await getCurrentUser();
  if (!user) {
    const loginUrl = options?.next
      ? `/login?next=${encodeURIComponent(options.next)}`
      : '/login';
    redirect(loginUrl);
  }
  return user;
}

export function isValidRedirect(path: string): boolean {
  if (!path) return false;
  // Only allow relative paths starting with /
  // Reject anything with protocol or //
  if (path.includes('//')) return false;
  if (path.includes(':')) return false;
  return path.startsWith('/');
}
