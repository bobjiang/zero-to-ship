import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { VOTER_COOKIE } from '@/middleware';
import {
  getBallot,
  getEventConfig,
  listSubmissions,
  sameCanonicalBallot,
  validateBallot,
  writeBallot,
} from '@/lib/voting';

export const dynamic = 'force-dynamic';

const bodySchema = z.object({ submissionIds: z.array(z.string().min(1)) });

export async function POST(req: Request) {
  const voter = cookies().get(VOTER_COOKIE)?.value;
  if (!voter) {
    return NextResponse.json({ ok: false, error: 'cookies-required' }, { status: 400 });
  }

  const event = await getEventConfig();
  if (Date.now() >= new Date(event.votingClosesAt).getTime()) {
    return NextResponse.json({ ok: false, error: 'closed' }, { status: 400 });
  }

  const json = await req.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'validation' }, { status: 400 });
  }
  const requested = parsed.data.submissionIds;

  // Initial validation pass
  const initial = await listSubmissions(event.slug);
  const approvedIds = new Set(initial.filter((s) => s.status === 'approved').map((s) => s.id));
  const first = validateBallot(requested, event.voteLimit, approvedIds);
  if (!first.ok) {
    return NextResponse.json({ ok: false, error: first.error }, { status: 400 });
  }

  // Idempotency / already-voted check
  const existing = await getBallot(event.slug, voter);
  if (existing) {
    if (sameCanonicalBallot(existing.submissionIds, requested)) {
      return NextResponse.json({ ok: true, recorded: existing.submissionIds.length, alreadyRecorded: true });
    }
    return NextResponse.json({ ok: false, error: 'already-voted' }, { status: 409 });
  }

  // Re-read right before writing — talks may have changed status
  const fresh = await listSubmissions(event.slug);
  const freshApproved = new Set(fresh.filter((s) => s.status === 'approved').map((s) => s.id));
  const final = requested.filter((id) => freshApproved.has(id));
  if (final.length === 0) {
    return NextResponse.json({ ok: false, error: 'selection-unavailable' }, { status: 409 });
  }

  await writeBallot(event.slug, voter, {
    submissionIds: final,
    submittedAt: new Date().toISOString(),
  });

  const dropped = requested.length - final.length;
  return NextResponse.json({
    ok: true,
    recorded: final.length,
    ...(dropped > 0 ? { dropped } : {}),
  });
}
