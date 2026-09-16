import React from 'react';
import { cn } from '@/lib/utils';
import { Metric, MetricProps } from './Metric';

export interface MetricGroupProps {
  metrics: MetricProps[];
  columns?: 1 | 2 | 3 | 4;
  className?: string;
  showDividers?: boolean;
}

export function MetricGroup({
  metrics,
  columns = 3,
  className,
  showDividers = true
}: MetricGroupProps) {
  const gridCols = {
    1: 'md:grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4'
  };

  return (
    <div className={cn(
      "grid grid-cols-1 gap-6",
      gridCols[columns],
      className
    )}>
      {metrics.map((metric, i) => (
        <React.Fragment key={i}>
          <Metric {...metric} />
          {showDividers && i < metrics.length - 1 && (
            <div className="hidden md:block w-px bg-gray-200" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
