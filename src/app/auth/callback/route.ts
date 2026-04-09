import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { isValidRedirect } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type');
  const next = searchParams.get('next') ?? '/dashboard';
  const redirectTo = isValidRedirect(next) ? next : '/dashboard';

  const supabase = await createClient();

  if (code) {
    // OAuth code exchange
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`);
    }
  } else if (token_hash && type) {
    // Email magic link / OTP verification
    const { error } = await supabase.auth.verifyOtp({
      token_hash,
      type: type as 'email' | 'signup' | 'magiclink',
    });
    if (error) {
      return NextResponse.redirect(`${origin}/login?error=verification_failed`);
    }
  } else {
    return NextResponse.redirect(`${origin}/login?error=missing_params`);
  }

  // Check if profile has full_name — redirect to settings if empty
  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name')
      .eq('id', user.id)
      .single();

    if (!profile?.full_name) {
      return NextResponse.redirect(`${origin}/dashboard/settings?complete_profile=1`);
    }
  }

  return NextResponse.redirect(`${origin}${redirectTo}`);
}
