import React from 'react';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { ConfidenceLevel } from '@/types/common';
import { StatusBadge } from './StatusBadge';

export interface MetricProps {
  label: string;
  value: string | number;
  unit?: string;
  trend?: 'up' | 'down' | 'stable';
  confidence?: ConfidenceLevel;
  size?: 'sm' | 'md' | 'lg';
}

export function Metric({
  label,
  value,
  unit,
  trend,
  confidence,
  size = 'md'
}: MetricProps) {
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <span className={cn(
          "uppercase tracking-widest text-ink-tertiary",
          size === 'lg' ? 'text-xs font-bold' : 'text-[10px]'
        )}>
          {label}
        </span>
        {confidence && (
          <StatusBadge 
            status={confidence} 
            variant={confidence === 'high' ? 'success' : confidence === 'medium' ? 'warning' : 'danger'}
            size="sm"
          />
        )}
      </div>
      
      <div className="flex items-baseline gap-2">
        <span className={cn(
          "text-ink-primary font-display font-bold",
          size === 'lg' ? 'text-5xl' : size === 'md' ? 'text-3xl' : 'text-xl font-mono'
        )}>
          {value}
        </span>
        
        {unit && (
          <span className="text-ink-tertiary text-sm">
            {unit}
          </span>
        )}
        
        {trend && (
          <TrendIcon 
            size={size === 'lg' ? 24 : 16} 
            className={cn(
              "ml-auto",
              trend === 'up' ? 'text-verified' : trend === 'down' ? 'text-critical' : 'text-ink-tertiary'
            )} 
          />
        )}
      </div>
    </div>
  );
}
