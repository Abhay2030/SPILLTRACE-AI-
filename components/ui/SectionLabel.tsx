import React from 'react';
import { cn } from '@/lib/utils';

export interface SectionLabelProps {
  chapter?: number;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionLabel({
  chapter,
  title,
  subtitle,
  align = 'left',
  className
}: SectionLabelProps) {
  return (
    <div className={cn(
      "flex flex-col gap-3",
      align === 'center' && 'items-center text-center',
      className
    )}>
      {chapter !== undefined && (
        <div className="text-xs font-mono text-ink-tertiary uppercase tracking-widest">
          CHAPTER {chapter.toString().padStart(2, '0')}
        </div>
      )}
      <h2 className="text-4xl md:text-5xl font-display font-bold text-ink-primary tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-ink-secondary max-w-2xl leading-relaxed mt-2">
          {subtitle}
        </p>
      )}
    </div>
  );
}
