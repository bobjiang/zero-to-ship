import type { Metadata } from 'next';
import { requireUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';
import { createClient } from '@/lib/supabase/server';
import { ProfileForm } from '@/components/dashboard/ProfileForm';

export const metadata: Metadata = {
  title: 'Settings',
};

export default async function DashboardSettingsPage() {
  const user = await requireUser();
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  return (
    <div>
      <p className="text-sm font-black uppercase tracking-[0.24em] text-blue-600 dark:text-blue-400">
        Account
      </p>
      <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white">Settings</h1>
      <div className="mt-6">
        <ProfileForm
          initialData={{
            fullName: profile?.full_name ?? '',
            bio: profile?.bio ?? '',
            skills: profile?.skills ?? [],
            building: profile?.building ?? '',
          }}
        />
      </div>
    </div>
  );
}
