import { cn } from '@/lib/utils';

interface BrandMarkProps {
  className?: string;
}

interface BrandLogoProps {
  className?: string;
  markClassName?: string;
  wordmarkClassName?: string;
  showWordmark?: boolean;
}

export function BrandMark({ className }: BrandMarkProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden="true"
      className={cn('h-9 w-9 shrink-0', className)}
    >
      <rect width="48" height="48" rx="0" fill="#020617" />
      <rect x="10" y="14" width="8" height="22" rx="0" fill="#f8fafc" />
      <rect x="17" y="9" width="14" height="8" rx="0" fill="#f8fafc" />
      <rect x="17" y="31" width="7" height="8" rx="0" fill="#2563eb" />
      <rect x="24" y="31" width="7" height="8" rx="0" fill="#60a5fa" />
      <rect x="30" y="14" width="8" height="22" rx="0" fill="#f8fafc" />
      <path
        d="M24 17.3c3 3.35 4.45 6.5 4.45 10.9l-3.05-1.45L24 34.6l-1.4-7.85-3.05 1.45c0-4.4 1.45-7.55 4.45-10.9Z"
        fill="#f8fafc"
      />
      <path
        d="M24 24.5v13.7"
        fill="none"
        stroke="#f8fafc"
        strokeWidth="2.4"
        strokeLinecap="butt"
      />
    </svg>
  );
}

export function BrandLogo({
  className,
  markClassName,
  wordmarkClassName,
  showWordmark = true,
}: BrandLogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <BrandMark className={markClassName} />
      {showWordmark && (
        <span
          className={cn(
            'text-xl font-black tracking-tight text-slate-950 dark:text-white',
            wordmarkClassName
          )}
        >
          02Ship
        </span>
      )}
    </span>
  );
}
