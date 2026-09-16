import React from 'react';
import { cn } from '@/lib/utils';

export interface LoadingStateProps {
  message?: string;
  variant?: 'skeleton' | 'spinner' | 'pulse';
  className?: string;
}

export function LoadingState({
  message = 'Loading...',
  variant = 'spinner',
  className
}: LoadingStateProps) {
  if (variant === 'skeleton') {
    return (
      <div className={cn("w-full space-y-4 animate-pulse", className)}>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-32 bg-gray-200 rounded-md w-full"></div>
        <div className="text-xs font-mono text-ink-tertiary text-center mt-4 uppercase tracking-widest">{message}</div>
      </div>
    );
  }

  if (variant === 'pulse') {
    return (
      <div className={cn("flex flex-col items-center justify-center p-8 gap-4", className)}>
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-ocean animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 rounded-full bg-ocean animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 rounded-full bg-ocean animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
        <div className="text-xs font-mono text-ink-tertiary uppercase tracking-widest">{message}</div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col items-center justify-center p-8 gap-4", className)}>
      <svg className="animate-spin h-8 w-8 text-ocean" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <div className="text-xs font-mono text-ink-tertiary uppercase tracking-widest">{message}</div>
    </div>
  );
}
