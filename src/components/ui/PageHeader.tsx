import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  actions?: ReactNode;
  className?: string;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn('grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end', className)}>
      <div>
        {eyebrow && (
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-4 text-balance text-5xl font-black tracking-tight text-slate-950 dark:text-white sm:text-6xl">
          {title}
        </h1>
      </div>
      {(description || actions) && (
        <div className="max-w-2xl">
          {description && (
            <div className="text-lg leading-8 text-slate-600 dark:text-slate-300">
              {description}
            </div>
          )}
          {actions && <div className="mt-6 flex flex-wrap gap-3">{actions}</div>}
        </div>
      )}
    </div>
  );
}

