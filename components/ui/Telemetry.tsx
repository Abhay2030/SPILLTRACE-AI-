import React from 'react';
import { cn } from '@/lib/utils';
import { DataStatus } from '@/types/common';

export interface TelemetryItem {
  label: string;
  value: string;
  status?: DataStatus;
}

export interface TelemetryProps {
  items: TelemetryItem[];
  className?: string;
}

export function Telemetry({ items, className }: TelemetryProps) {
  const statusColors: Record<DataStatus, string> = {
    available: 'bg-verified',
    partial: 'bg-caution',
    error: 'bg-critical',
    unavailable: 'bg-gray-400'
  };

  return (
    <div className={cn("flex flex-wrap items-center gap-3 font-mono text-[11px]", className)}>
      {items.map((item, i) => (
        <React.Fragment key={i}>
          <div className="flex items-center gap-2">
            {item.status && (
              <span className={cn("w-2 h-2 rounded-full", statusColors[item.status])} />
            )}
            <span className="uppercase text-ink-tertiary">{item.label}</span>
            <span className="text-ink-primary font-medium">{item.value}</span>
          </div>
          {i < items.length - 1 && (
            <span className="text-ink-tertiary/30">|</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
