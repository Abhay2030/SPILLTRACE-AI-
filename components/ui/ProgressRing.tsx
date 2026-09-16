import React from 'react';
import { cn } from '@/lib/utils';

export interface ProgressRingProps {
  value: number; // 0-100
  size?: number;
  strokeWidth?: number;
  label?: string;
  className?: string;
}

export function ProgressRing({
  value,
  size = 64,
  strokeWidth = 4,
  label,
  className
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  let strokeColor = 'text-teal-500';
  if (value < 30) strokeColor = 'text-critical';
  else if (value < 60) strokeColor = 'text-caution';
  else if (value < 80) strokeColor = 'text-ocean';

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="w-full h-full transform -rotate-90">
          <circle
            className="text-gray-100"
            strokeWidth={strokeWidth}
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
          <circle
            className={cn("transition-all duration-1000 ease-out", strokeColor)}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono text-sm font-medium text-ink-primary">
            {Math.round(value)}%
          </span>
        </div>
      </div>
      {label && (
        <span className="text-xs text-ink-tertiary uppercase tracking-widest font-mono">
          {label}
        </span>
      )}
    </div>
  );
}
