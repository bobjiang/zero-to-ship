import { createBrowserClient } from '@supabase/ssr';
import type { Database } from '@/types/database.generated';

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    if (process.env.VERCEL_ENV === 'production') {
      throw new Error(
        'Missing Supabase env: set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY'
      );
    }
    return createBrowserClient<Database>(
      'https://example.supabase.co',
      'missing-anon-key'
    );
  }

  return createBrowserClient<Database>(url, anonKey);
}
