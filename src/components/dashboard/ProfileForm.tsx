'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, WarningCircle } from '@phosphor-icons/react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { inputClass, labelClass } from '@/components/ui/formStyles';

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
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
      <div>
        <label htmlFor="fullName" className={labelClass}>
          Full name
        </label>
        <input
          id="fullName"
          type="text"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="bio" className={labelClass}>
          Bio
        </label>
        <textarea
          id="bio"
          rows={3}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className={inputClass}
          placeholder="Tell us about yourself"
        />
      </div>

      <div>
        <label htmlFor="skills" className={labelClass}>
          Skills (comma-separated)
        </label>
        <input
          id="skills"
          type="text"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          className={inputClass}
          placeholder="e.g. React, TypeScript, AI"
        />
      </div>

      <div>
        <label htmlFor="building" className={labelClass}>
          What are you building?
        </label>
        <input
          id="building"
          type="text"
          value={building}
          onChange={(e) => setBuilding(e.target.value)}
          className={inputClass}
          placeholder="e.g. An AI-powered note-taking app"
        />
      </div>

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={status === 'saving'}>
          {status === 'saving' ? 'Saving...' : 'Save changes'}
        </Button>
        {status === 'saved' && (
          <span className="inline-flex items-center gap-1.5 text-sm font-bold text-green-700 dark:text-green-300">
            <CheckCircle className="h-4 w-4" weight="fill" />
            Saved
          </span>
        )}
        {status === 'error' && (
          <span className="inline-flex items-center gap-1.5 text-sm font-bold text-red-600 dark:text-red-300">
            <WarningCircle className="h-4 w-4" weight="fill" />
            Failed to save. Please try again.
          </span>
        )}
      </div>
    </form>
  );
}
