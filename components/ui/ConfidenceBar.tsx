import React from 'react';
import { cn } from '@/lib/utils';

export interface ConfidenceBarProps {
  value: number; // 0 to 1
  label?: string;
  showPercentage?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

export function ConfidenceBar({
  value,
  label,
  showPercentage = true,
  size = 'md',
  className
}: ConfidenceBarProps) {
  const percentage = Math.round(Math.max(0, Math.min(1, value)) * 100);
  
  let color = 'bg-teal-500'; // teal / green
  if (value < 0.3) color = 'bg-critical';
  else if (value < 0.6) color = 'bg-caution';
  else if (value < 0.8) color = 'bg-ocean';
  
  return (
    <div className={cn("w-full flex flex-col gap-1.5", className)}>
      {(label || showPercentage) && (
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-ink-tertiary">
          {label && <span>{label}</span>}
          {showPercentage && <span className="ml-auto">{percentage}%</span>}
        </div>
      )}
      <div className={cn("w-full bg-gray-100 rounded-full overflow-hidden", size === 'sm' ? 'h-1.5' : 'h-2.5')}>
        <div 
          className={cn("h-full rounded-full transition-all duration-500 ease-out", color)}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
