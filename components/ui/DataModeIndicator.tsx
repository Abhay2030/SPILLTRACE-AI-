import React from 'react';
import { DataMode } from '@/types/common';
import { cn } from '@/lib/utils';

export interface DataModeIndicatorProps {
  mode: DataMode;
  className?: string;
}

export function DataModeIndicator({ mode, className }: DataModeIndicatorProps) {
  if (mode === 'DEMO') {
    return (
      <div className={cn("inline-flex items-center px-3 py-1 rounded bg-caution/10 border border-caution/20 text-caution font-mono text-[10px] uppercase tracking-widest", className)}>
        DEMO MODE — SIMULATED DATA
      </div>
    );
  }

  const config = {
    REAL: { color: 'bg-verified', text: 'LIVE' },
    SIMULATED: { color: 'bg-caution', text: 'SIMULATED' },
    UNAVAILABLE: { color: 'bg-gray-400', text: 'DATA UNAVAILABLE' }
  };

  const { color, text } = config[mode];

  return (
    <div className={cn("inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-surface-muted/80 backdrop-blur-sm border border-gray-200 font-mono text-[10px] uppercase tracking-widest text-ink-secondary", className)}>
      <span className={cn("w-2 h-2 rounded-full", color)} />
      {text}
    </div>
  );
}
