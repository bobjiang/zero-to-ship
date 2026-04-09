'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const links = [
  { href: '/dashboard', label: 'Overview' },
  { href: '/dashboard/courses', label: 'My Courses' },
  { href: '/dashboard/bookmarks', label: 'Bookmarks' },
  { href: '/dashboard/settings', label: 'Settings' },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <nav className="space-y-1" aria-label="Dashboard navigation">
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'block rounded-lg px-3 py-2 text-sm font-medium',
              isActive
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
