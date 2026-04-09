'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';

interface ProfileFormProps {
  initialData: {
    fullName: string;
    bio: string;
    skills: string[];
    building: string;
  };
}

export function ProfileForm({ initialData }: ProfileFormProps) {
  const [fullName, setFullName] = useState(initialData.fullName);
  const [bio, setBio] = useState(initialData.bio);
  const [skills, setSkills] = useState(initialData.skills.join(', '));
  const [building, setBuilding] = useState(initialData.building);
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('saving');

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setStatus('error');
      return;
    }

    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: fullName,
        bio,
        skills: skills.split(',').map((s) => s.trim()).filter(Boolean),
        building,
      })
      .eq('id', user.id);

    if (error) {
      setStatus('error');
      return;
    }

    setStatus('saved');
    router.refresh();
    setTimeout(() => setStatus('idle'), 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-5">
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
          Full name
        </label>
        <input
          id="fullName"
          type="text"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
          Bio
        </label>
        <textarea
          id="bio"
          rows={3}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Tell us about yourself"
        />
      </div>

      <div>
        <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
          Skills (comma-separated)
        </label>
        <input
          id="skills"
          type="text"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="e.g. React, TypeScript, AI"
        />
      </div>

      <div>
        <label htmlFor="building" className="block text-sm font-medium text-gray-700">
          What are you building?
        </label>
        <input
          id="building"
          type="text"
          value={building}
          onChange={(e) => setBuilding(e.target.value)}
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="e.g. An AI-powered note-taking app"
        />
      </div>

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={status === 'saving'}>
          {status === 'saving' ? 'Saving...' : 'Save changes'}
        </Button>
        {status === 'saved' && (
          <span className="text-sm text-green-600">Saved!</span>
        )}
        {status === 'error' && (
          <span className="text-sm text-red-600">Failed to save. Please try again.</span>
        )}
      </div>
    </form>
  );
}
