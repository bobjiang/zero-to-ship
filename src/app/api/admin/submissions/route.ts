import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { ADMIN_SESSION_COOKIE, verifySession } from '@/lib/admin';
import {
  getEventConfig,
  listSubmissions,
  setSubmissionStatus,
  getSubmission,
} from '@/lib/voting';
import type { SubmissionStatus } from '@/types/voting';

export const dynamic = 'force-dynamic';

function unauthorized() {
  return NextResponse.json({ ok: false }, { status: 401 });
}

function requireSession(): boolean {
  const v = cookies().get(ADMIN_SESSION_COOKIE)?.value;
  return verifySession(v, Date.now());
}

export async function GET(req: Request) {
  try {
    if (!requireSession()) return unauthorized();
    const url = new URL(req.url);
    const filter = (url.searchParams.get('status') ?? 'all') as SubmissionStatus | 'all';
    const event = await getEventConfig();
    const all = await listSubmissions(event.slug);
    const submissions = filter === 'all' ? all : all.filter((s) => s.status === filter);
    return NextResponse.json({ submissions });
  } catch (err) {
    console.error('[api/admin/submissions GET] server error', err);
    return NextResponse.json({ ok: false, error: 'server' }, { status: 500 });
  }
}

const patchSchema = z.object({ status: z.enum(['pending', 'approved', 'rejected']) });

export async function PATCH(req: Request) {
  try {
    if (!requireSession()) return unauthorized();
    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    if (!id) return NextResponse.json({ ok: false, error: 'validation' }, { status: 400 });
    const existing = await getSubmission(id);
    if (!existing) return NextResponse.json({ ok: false, error: 'not-found' }, { status: 404 });
    const json = await req.json().catch(() => null);
    const parsed = patchSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: 'validation' }, { status: 400 });
    }
    await setSubmissionStatus(id, parsed.data.status);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[api/admin/submissions PATCH] server error', err);
    return NextResponse.json({ ok: false, error: 'server' }, { status: 500 });
  }
}
