import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

export const VOTER_COOKIE = 'zts_voter';

const VOTING_PATHS = new Set(['/submit', '/vote', '/api/submissions', '/api/votes']);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Voting paths do not depend on Supabase auth; seed the anonymous voter
  // cookie and skip the Supabase session refresh entirely.
  if (VOTING_PATHS.has(pathname)) {
    const res = NextResponse.next();
    if (!request.cookies.get(VOTER_COOKIE)) {
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

  // Every other matched path runs Supabase session refresh.
  return await updateSession(request);
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/:path*',
    '/auth/:path*',
    '/login',
    '/signup',
    '/submit',
    '/vote',
  ],
};
