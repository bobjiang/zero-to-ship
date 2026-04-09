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
      <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
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
