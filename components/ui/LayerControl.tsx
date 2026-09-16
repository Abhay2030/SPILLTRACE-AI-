'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface Layer {
  id: string;
  label: string;
  icon?: React.ReactNode;
  active: boolean;
}

export interface LayerControlProps {
  layers: Layer[];
  onChange: (id: string, active: boolean) => void;
  className?: string;
}

export function LayerControl({
  layers,
  onChange,
  className
}: LayerControlProps) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {layers.map(layer => (
        <label
          key={layer.id}
          className="flex items-center gap-3 p-2 rounded-md hover:bg-surface cursor-pointer group transition-colors"
        >
          {layer.icon && (
            <div className={cn(
              "text-ink-tertiary group-hover:text-ink-primary transition-colors",
              layer.active && "text-ocean"
            )}>
              {layer.icon}
            </div>
          )}
          <span className={cn(
            "flex-1 text-sm font-medium",
            layer.active ? "text-ink-primary" : "text-ink-secondary"
          )}>
            {layer.label}
          </span>
          <div className="relative inline-flex h-4 w-7 items-center rounded-full transition-colors focus-within:ring-2 focus-within:ring-ocean/50 focus-within:ring-offset-2">
            <input
              type="checkbox"
              className="sr-only"
              checked={layer.active}
              onChange={(e) => onChange(layer.id, e.target.checked)}
            />
            <div className={cn(
              "absolute inset-0 rounded-full transition-colors",
              layer.active ? "bg-ocean" : "bg-gray-200"
            )} />
            <div className={cn(
              "absolute left-0.5 top-0.5 h-3 w-3 rounded-full bg-white transition-transform",
              layer.active ? "translate-x-3" : "translate-x-0"
            )} />
          </div>
        </label>
      ))}
    </div>
  );
}
