'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, CaretDown, List, X } from '@phosphor-icons/react';
import { BrandLogo } from '@/components/brand/BrandLogo';
import { Container } from '@/components/ui/Container';
import { UserNav } from '@/components/auth/UserNav';
import { cn } from '@/lib/utils';

interface NavLink {
  label: string;
  href: string;
  description?: string;
}

interface NavGroup {
  id: 'ships' | 'about';
  label: string;
  links: NavLink[];
}

const navLinks: NavLink[] = [
  { label: 'Courses', href: '/courses' },
  { label: 'Daily News', href: '/news' },
  { label: 'Events', href: '/events' },
];

const navGroups: NavGroup[] = [
  {
    id: 'ships',
    label: 'Ships',
    links: [
      {
        label: 'Project Hub',
        href: '/ships',
        description: 'Browse community launches and build notes.',
      },
      {
        label: 'Submit Project',
        href: 'https://github.com/bobjiang/zero-to-ship/issues/new?template=ship-submission.yml',
        description: 'Share a shipped project with the community.',
      },
    ],
  },
  {
    id: 'about',
    label: 'About',
    links: [
      {
        label: 'Our Story',
        href: '/about',
        description: 'Why 02Ship exists and how the community works.',
      },
      {
        label: 'Get Involved',
        href: '/get-involved',
        description: 'Speak, volunteer, sponsor, or contribute.',
      },
      {
        label: 'Blog',
        href: '/blog',
        description: 'Recaps, build logs, and AI workflow notes.',
      },
      {
        label: 'Community',
        href: '/community',
        description: 'Join the 02Ship channels and meet builders.',
      },
    ],
  },
];

function isExternal(href: string) {
  return href.startsWith('http');
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<NavGroup['id'] | null>(null);
  const closeMenuTimerRef = useRef<number | null>(null);
  const [mobileSections, setMobileSections] = useState<Record<NavGroup['id'], boolean>>({
    ships: true,
    about: true,
  });
  const [isScrolled, setIsScrolled] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  const isActive = (href: string) =>
    !isExternal(href) && (pathname === href || pathname.startsWith(`${href}/`));
  const isGroupActive = (links: NavLink[]) => links.some((link) => isActive(link.href));

  const openDesktopGroup = (id: NavGroup['id']) => {
    if (closeMenuTimerRef.current) window.clearTimeout(closeMenuTimerRef.current);
    setOpenGroup(id);
  };

  const scheduleDesktopMenuClose = (id: NavGroup['id']) => {
    if (closeMenuTimerRef.current) window.clearTimeout(closeMenuTimerRef.current);
    closeMenuTimerRef.current = window.setTimeout(() => {
      setOpenGroup((current) => (current === id ? null : current));
    }, 120);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    closeButtonRef.current?.focus();
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (headerRef.current?.contains(event.target as Node)) return;
      setOpenGroup(null);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpenGroup(null);
      setMobileMenuOpen(false);
    };
    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
      if (closeMenuTimerRef.current) window.clearTimeout(closeMenuTimerRef.current);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className={cn(
        'sticky top-0 z-40 border-b backdrop-blur-xl transition-all duration-200',
        isScrolled
          ? 'border-slate-200/90 bg-slate-50/95 shadow-sm shadow-slate-950/5 dark:border-slate-800 dark:bg-slate-950/95'
          : 'border-slate-200/70 bg-slate-50/85 dark:border-slate-800/80 dark:bg-slate-950/85'
      )}
    >
      <Container>
        <div className="flex h-16 items-center justify-between gap-5">
          <div className="flex min-w-0 items-center gap-7">
            <Link
              href="/"
              aria-label="02Ship home"
              className="shrink-0 rounded-none transition hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
            >
              <BrandLogo className="gap-3" markClassName="h-9 w-9" />
            </Link>

            <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  className={cn(
                    'inline-flex h-10 items-center rounded-none px-3 text-sm font-semibold transition',
                    isActive(link.href)
                      ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-300'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white'
                  )}
                  onClick={() => setOpenGroup(null)}
                >
                  {link.label}
                </Link>
              ))}

              {navGroups.map((group) => {
                const isOpen = openGroup === group.id;
                const groupActive = isGroupActive(group.links);

                return (
                  <div
                    key={group.id}
                    className="relative"
                    onPointerEnter={() => openDesktopGroup(group.id)}
                    onPointerLeave={() => scheduleDesktopMenuClose(group.id)}
                  >
                    <button
                      type="button"
                      aria-haspopup="menu"
                      aria-expanded={isOpen}
                      aria-controls={`${group.id}-desktop-menu`}
                      onClick={() => openDesktopGroup(group.id)}
                      onFocus={() => openDesktopGroup(group.id)}
                      className={cn(
                        'inline-flex h-10 items-center gap-1 rounded-none px-3 text-sm font-semibold transition',
                        groupActive || isOpen
                          ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-300'
                          : 'text-slate-700 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white'
                      )}
                    >
                      {group.label}
                      <CaretDown
                        className={cn('h-4 w-4 transition-transform duration-200', isOpen && 'rotate-180')}
                        weight="bold"
                      />
                    </button>

                    <div
                      id={`${group.id}-desktop-menu`}
                      role="menu"
                      aria-label={`${group.label} menu`}
                      className={cn(
                        'absolute left-0 top-full z-50 pt-3 transition duration-150',
                        group.id === 'about' && 'left-auto right-0',
                        isOpen
                          ? 'visible translate-y-0 opacity-100'
                          : 'invisible -translate-y-1 opacity-0'
                      )}
                    >
                      <div className="w-80 rounded-none border border-slate-200 bg-white p-2 shadow-xl shadow-slate-950/10 ring-1 ring-slate-950/5 dark:border-slate-800 dark:bg-slate-950 dark:ring-white/10">
                        {group.links.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            role="menuitem"
                            {...(isExternal(link.href) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                            aria-current={isActive(link.href) ? 'page' : undefined}
                            onClick={() => setOpenGroup(null)}
                            className={cn(
                              'group/link grid gap-1 rounded-none px-3 py-3 text-left transition',
                              isActive(link.href)
                                ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-200'
                                : 'text-slate-800 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900'
                            )}
                          >
                            <span className="flex items-center justify-between gap-3 text-sm font-bold">
                              {link.label}
                              {isExternal(link.href) && (
                                <ArrowUpRight
                                  className="h-3.5 w-3.5 text-slate-400 transition group-hover/link:text-blue-600"
                                  weight="bold"
                                />
                              )}
                            </span>
                            {link.description && (
                              <span className="text-xs leading-5 text-slate-500 dark:text-slate-400">
                                {link.description}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </nav>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <div className="hidden md:block">
              <UserNav />
            </div>
            <button
              type="button"
              className="rounded-none p-2 text-slate-700 transition hover:bg-slate-100 hover:text-slate-950 md:hidden dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              <List className="h-6 w-6" weight="bold" />
            </button>
          </div>
        </div>
      </Container>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            className="fixed inset-0 cursor-default bg-slate-950/35 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu backdrop"
          />
          <div
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="fixed inset-y-0 right-0 flex w-80 max-w-[calc(100vw-1rem)] flex-col border-l border-slate-200 bg-white shadow-2xl shadow-slate-950/20 dark:border-slate-800 dark:bg-slate-950"
          >
            <div className="flex h-16 items-center justify-between border-b border-slate-200 px-5 dark:border-slate-800">
              <Link
                href="/"
                aria-label="02Ship home"
                className="rounded-none transition hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
                onClick={() => setMobileMenuOpen(false)}
              >
                <BrandLogo className="gap-3" markClassName="h-9 w-9" />
              </Link>
              <button
                ref={closeButtonRef}
                type="button"
                className="rounded-none p-2 text-slate-700 transition hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-6 w-6" weight="bold" />
              </button>
            </div>

            <div className="border-b border-slate-200 px-5 py-4 dark:border-slate-800">
              <UserNav />
            </div>

            <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Mobile navigation">
              <div className="space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={isActive(link.href) ? 'page' : undefined}
                    className={cn(
                      'block rounded-none px-3 py-3 text-base font-bold transition',
                      isActive(link.href)
                        ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-300'
                        : 'text-slate-800 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900'
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="mt-4 space-y-3">
                {navGroups.map((group) => {
                  const sectionOpen = mobileSections[group.id];
                  return (
                    <section key={group.id} className="rounded-none border border-slate-200 p-2 dark:border-slate-800">
                      <button
                        type="button"
                        className="flex w-full items-center justify-between rounded-none px-3 py-2 text-left text-sm font-black text-slate-950 transition hover:bg-slate-100 dark:text-white dark:hover:bg-slate-900"
                        aria-expanded={sectionOpen}
                        aria-controls={`${group.id}-mobile-section`}
                        onClick={() =>
                          setMobileSections((current) => ({
                            ...current,
                            [group.id]: !current[group.id],
                          }))
                        }
                      >
                        {group.label}
                        <CaretDown
                          className={cn('h-4 w-4 transition-transform duration-200', sectionOpen && 'rotate-180')}
                          weight="bold"
                        />
                      </button>
                      {sectionOpen && (
                        <div id={`${group.id}-mobile-section`} className="mt-1 space-y-1">
                          {group.links.map((link) => (
                            <Link
                              key={link.href}
                              href={link.href}
                              {...(isExternal(link.href) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                              aria-current={isActive(link.href) ? 'page' : undefined}
                              className={cn(
                                'block rounded-none px-3 py-3 transition',
                                isActive(link.href)
                                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-200'
                                  : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900'
                              )}
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              <span className="flex items-center justify-between gap-3 text-sm font-bold">
                                {link.label}
                                {isExternal(link.href) && <ArrowUpRight className="h-3.5 w-3.5" weight="bold" />}
                              </span>
                              {link.description && (
                                <span className="mt-1 block text-xs leading-5 text-slate-500 dark:text-slate-400">
                                  {link.description}
                                </span>
                              )}
                            </Link>
                          ))}
                        </div>
                      )}
                    </section>
                  );
                })}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
