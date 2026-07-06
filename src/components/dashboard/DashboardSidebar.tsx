'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookmarkSimple, GearSix, GraduationCap, SquaresFour } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

const links = [
  { href: '/dashboard', label: 'Overview', Icon: SquaresFour },
  { href: '/dashboard/courses', label: 'My Courses', Icon: GraduationCap },
  { href: '/dashboard/bookmarks', label: 'Bookmarks', Icon: BookmarkSimple },
  { href: '/dashboard/settings', label: 'Settings', Icon: GearSix },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <nav
      className="rounded-none border border-slate-200 bg-white p-2 shadow-sm shadow-slate-950/5 dark:border-slate-800 dark:bg-slate-900"
      aria-label="Dashboard navigation"
    >
      {links.map((link) => {
        const isActive = pathname === link.href;
        const Icon = link.Icon;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'flex min-h-11 items-center gap-3 rounded-none px-3 py-2 text-sm font-bold transition',
              isActive
                ? 'bg-blue-600 text-white shadow-sm shadow-blue-950/10'
                : 'text-slate-700 hover:bg-slate-50 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
            )}
          >
            <Icon className="h-5 w-5" weight={isActive ? 'fill' : 'regular'} />
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
