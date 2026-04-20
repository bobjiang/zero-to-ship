import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ADMIN_SESSION_COOKIE } from '@/lib/admin';

export const dynamic = 'force-dynamic';

export async function POST() {
  cookies().delete(ADMIN_SESSION_COOKIE);
  return new NextResponse(null, { status: 204 });
}
