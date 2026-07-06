import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  title: string;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'rounded-none border border-dashed border-slate-300 bg-white/70 p-8 text-center dark:border-slate-700 dark:bg-slate-950/60',
        className
      )}
    >
      <h2 className="text-lg font-black tracking-tight text-slate-950 dark:text-white">
        {title}
      </h2>
      {description && (
        <div className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600 dark:text-slate-300">
          {description}
        </div>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

