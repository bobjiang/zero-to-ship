import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const VOTER_COOKIE = 'zts_voter';

export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  if (!req.cookies.get(VOTER_COOKIE)) {
    res.cookies.set({
      name: VOTER_COOKIE,
      value: crypto.randomUUID(),
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
    });
  }
  return res;
}

export const config = {
  matcher: ['/submit', '/vote', '/api/submissions', '/api/votes'],
};
