import React from 'react';
import { cn } from '@/lib/utils';

export interface StatusBadgeProps {
  status: string;
  variant?: 'info' | 'success' | 'warning' | 'danger' | 'neutral';
  size?: 'sm' | 'md';
  pulse?: boolean;
  className?: string;
}

export function StatusBadge({
  status,
  variant = 'neutral',
  size = 'md',
  pulse = false,
  className
}: StatusBadgeProps) {
  const variants = {
    info: 'bg-ocean/10 text-ocean',
    success: 'bg-verified/10 text-verified',
    warning: 'bg-caution/10 text-caution',
    danger: 'bg-critical/10 text-critical',
    neutral: 'bg-gray-100 text-ink-secondary'
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-2.5 py-1 text-xs'
  };

  const pulseColors = {
    info: 'bg-ocean',
    success: 'bg-verified',
    warning: 'bg-caution',
    danger: 'bg-critical',
    neutral: 'bg-ink-secondary'
  };

  return (
    <div className={cn(
      "inline-flex items-center gap-1.5 rounded-full font-mono uppercase tracking-wider",
      variants[variant],
      sizes[size],
      className
    )}>
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", pulseColors[variant])}></span>
          <span className={cn("relative inline-flex rounded-full h-2 w-2", pulseColors[variant])}></span>
        </span>
      )}
      {status}
    </div>
  );
}
