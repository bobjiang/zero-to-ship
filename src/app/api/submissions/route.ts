import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { VOTER_COOKIE } from '@/middleware';
import {
  createSubmission,
  getEventConfig,
  incrSubmitRate,
  isWithinWindow,
} from '@/lib/voting';

export const dynamic = 'force-dynamic';

const bodySchema = z.object({
  speakerName: z.string().trim().min(1),
  handle: z.string().trim().optional(),
  contact: z.string().trim().optional(),
  title: z.string().trim().min(1).max(80),
  intro: z.string().trim().min(1).max(500),
  tag: z.string().trim().optional(),
  consent: z.literal(true),
});

export async function POST(req: Request) {
  try {
    const voter = cookies().get(VOTER_COOKIE)?.value;
    if (!voter) {
      return NextResponse.json({ ok: false, error: 'cookies-required' }, { status: 400 });
    }

    const event = await getEventConfig();
    if (!isWithinWindow(event.submissionOpensAt, event.submissionClosesAt, new Date())) {
      return NextResponse.json({ ok: false, error: 'closed' }, { status: 400 });
    }

    const json = await req.json().catch(() => null);
    const parsed = bodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: 'validation' }, { status: 400 });
    }
    const { handle, contact } = parsed.data;

    const afterIncr = await incrSubmitRate(event.slug, voter);
    if (afterIncr > event.submissionRateLimitPerCookie24h) {
      return NextResponse.json({ ok: false, error: 'rate-limited' }, { status: 429 });
    }

    const submission = await createSubmission({
      event: event.slug,
      speakerName: parsed.data.speakerName,
      handle,
      contact,
      title: parsed.data.title,
      intro: parsed.data.intro,
      tag: parsed.data.tag,
    });

    return NextResponse.json({ ok: true, id: submission.id });
  } catch (err) {
    console.error('[api/submissions] server error', err);
    return NextResponse.json({ ok: false, error: 'server' }, { status: 500 });
  }
}
