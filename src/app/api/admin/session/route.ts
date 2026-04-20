import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { z } from 'zod';
import {
  ADMIN_SESSION_COOKIE,
  constantTimeTokenMatch,
  newSessionCookieValue,
} from '@/lib/admin';

export const dynamic = 'force-dynamic';

const bodySchema = z.object({ token: z.string().min(1) });

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  if (!constantTimeTokenMatch(parsed.data.token)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const { value, expiresAt } = newSessionCookieValue();
  cookies().set({
    name: ADMIN_SESSION_COOKIE,
    value,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    expires: expiresAt,
  });
  return new NextResponse(null, { status: 204 });
}
