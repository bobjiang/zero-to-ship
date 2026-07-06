import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex min-h-10 items-center justify-center whitespace-nowrap rounded-none font-semibold tracking-normal transition',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          {
            'bg-blue-600 text-white shadow-sm shadow-blue-950/10 hover:bg-blue-700 active:translate-y-px focus-visible:ring-blue-600': variant === 'primary',
            'bg-slate-900 text-white shadow-sm shadow-slate-950/10 hover:bg-slate-800 active:translate-y-px focus-visible:ring-slate-700 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200': variant === 'secondary',
            'border border-slate-300 bg-white/70 text-slate-950 hover:border-slate-400 hover:bg-white focus-visible:ring-slate-500 dark:border-slate-700 dark:bg-slate-950/50 dark:text-white dark:hover:border-slate-500': variant === 'outline',
          },
          {
            'px-3 py-1.5 text-sm': size === 'sm',
            'px-4 py-2 text-base': size === 'md',
            'px-6 py-3 text-base': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
