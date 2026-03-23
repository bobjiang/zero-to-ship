'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';

const aboutLinks = [
  { label: 'Our Story', href: '/about' },
  { label: 'AI Daily News', href: '/news' },
  { label: 'Blog', href: '/blog' },
  { label: 'Community', href: '/community' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    closeButtonRef.current?.focus();
    document.body.style.overflow = 'hidden';
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [mobileMenuOpen]);

  return (
    <header className="border-b border-gray-200 bg-white">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-bold text-gray-900">
              02Ship
            </Link>
            <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
              <Link href="/courses" className="text-sm font-medium text-gray-700 hover:text-gray-900">
                Courses
              </Link>
              <Link href="/services" className="text-sm font-medium text-gray-700 hover:text-gray-900">
                Services
              </Link>
              <Link href="/events" className="text-sm font-medium text-gray-700 hover:text-gray-900">
                Events
              </Link>
              <div className="group relative">
                <button aria-haspopup="true" aria-expanded={false} className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-gray-900">
                  About
                  <svg className="h-4 w-4 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
                <div className="invisible absolute left-0 top-full z-50 pt-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <div className="w-48 rounded-lg border border-gray-200 bg-white py-2 shadow-lg">
                    {aboutLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </nav>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-gray-700 hover:text-gray-900"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </Container>

      {/* Mobile slide-out menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/20"
            onClick={() => setMobileMenuOpen(false)}
          />
          {/* Panel */}
          <div role="dialog" aria-modal="true" aria-label="Navigation menu" className="fixed inset-y-0 right-0 w-72 bg-white px-6 py-6 shadow-xl">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="text-xl font-bold text-gray-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                02Ship
              </Link>
              <button
                ref={closeButtonRef}
                className="p-2 text-gray-700 hover:text-gray-900"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="mt-8 space-y-1" aria-label="Mobile navigation">
              <Link
                href="/courses"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                Courses
              </Link>
              <Link
                href="/services"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/events"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                Events
              </Link>
              <div className="pt-4">
                <p className="px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  About
                </p>
                <div className="mt-2 space-y-1">
                  {aboutLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
