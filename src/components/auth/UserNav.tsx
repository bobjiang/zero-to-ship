'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { GearSix, SignIn, SignOut, SquaresFour } from '@phosphor-icons/react';
import { createClient } from '@/lib/supabase/client';
import { cn } from '@/lib/utils';
import type { User } from '@supabase/supabase-js';

export function UserNav() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  useEffect(() => {
    if (!menuOpen) return;
    const handlePointerDown = (event: PointerEvent) => {
      if (menuRef.current?.contains(event.target as Node)) return;
      setMenuOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  if (loading) {
    return (
      <div
        className="h-10 w-20 animate-pulse rounded-none bg-slate-200 dark:bg-slate-800"
        aria-hidden="true"
      />
    );
  }

  if (!user) {
    return (
      <Link
        href="/login"
        className="inline-flex h-10 items-center gap-2 rounded-none bg-blue-600 px-4 text-sm font-bold text-white shadow-sm shadow-blue-950/10 transition hover:bg-blue-700 active:translate-y-px"
      >
        <SignIn className="h-4 w-4" weight="bold" />
        Sign in
      </Link>
    );
  }

  const displayName = user.user_metadata?.full_name || 'Member';
  const initials = (user.user_metadata?.full_name || user.email || '?')
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setMenuOpen((current) => !current)}
        className={cn(
          'flex h-10 items-center gap-2 rounded-none border px-2 pr-3 text-sm font-bold transition',
          menuOpen
            ? 'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900/70 dark:bg-blue-950/40 dark:text-blue-200'
            : 'border-slate-200 bg-white text-slate-800 hover:border-slate-300 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:border-slate-700 dark:hover:bg-slate-900'
        )}
        aria-label="User menu"
        aria-haspopup="menu"
        aria-expanded={menuOpen}
        aria-controls="user-menu"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-none bg-blue-600 text-xs font-black text-white">
          {initials}
        </span>
        <span className="hidden max-w-24 truncate sm:inline">{displayName}</span>
      </button>

      {menuOpen && (
        <div
          id="user-menu"
          role="menu"
          aria-label="User menu"
          className="absolute right-0 top-full z-50 mt-3 w-64 overflow-hidden rounded-none border border-slate-200 bg-white p-2 shadow-xl shadow-slate-950/10 ring-1 ring-slate-950/5 dark:border-slate-800 dark:bg-slate-950 dark:ring-white/10"
        >
          <div className="border-b border-slate-200 px-3 py-3 dark:border-slate-800">
            <p className="truncate text-sm font-bold text-slate-950 dark:text-white">
              {displayName}
            </p>
            <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400">
              {user.email}
            </p>
          </div>
          <div className="py-2">
            <Link
              href="/dashboard"
              role="menuitem"
              className="flex items-center gap-3 rounded-none px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white"
              onClick={() => setMenuOpen(false)}
            >
              <SquaresFour className="h-4 w-4 text-blue-600" weight="duotone" />
              Dashboard
            </Link>
            <Link
              href="/dashboard/settings"
              role="menuitem"
              className="flex items-center gap-3 rounded-none px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white"
              onClick={() => setMenuOpen(false)}
            >
              <GearSix className="h-4 w-4 text-blue-600" weight="duotone" />
              Settings
            </Link>
            <button
              type="button"
              role="menuitem"
              onClick={async () => {
                await supabase.auth.signOut();
                setMenuOpen(false);
                router.refresh();
              }}
              className="flex w-full items-center gap-3 rounded-none px-3 py-2 text-left text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white"
            >
              <SignOut className="h-4 w-4 text-blue-600" weight="duotone" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
