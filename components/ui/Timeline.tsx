import React from 'react';
import { cn } from '@/lib/utils';

export interface TimelineEvent {
  time: string;
  label: string;
  status: 'past' | 'current' | 'future';
  detail?: string;
}

export interface TimelineProps {
  events: TimelineEvent[];
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export function Timeline({
  events,
  orientation = 'horizontal',
  className
}: TimelineProps) {
  if (orientation === 'vertical') {
    return (
      <div className={cn("flex flex-col", className)}>
        {events.map((event, i) => (
          <div key={i} className="flex gap-4 min-h-[4rem]">
            <div className="flex flex-col items-center">
              <div className={cn(
                "w-3 h-3 rounded-full mt-1.5",
                event.status === 'past' ? 'bg-ink-secondary' :
                event.status === 'current' ? 'bg-ocean shadow-[0_0_0_4px_rgba(3,105,161,0.2)] animate-pulse' :
                'border-2 border-gray-300 bg-white'
              )} />
              {i < events.length - 1 && (
                <div className="w-px h-full bg-gray-200 my-2" />
              )}
            </div>
            <div className="pb-6">
              <div className="text-xs font-mono text-ink-tertiary mb-1">{event.time}</div>
              <div className={cn(
                "font-medium",
                event.status === 'future' ? 'text-ink-secondary' : 'text-ink-primary'
              )}>
                {event.label}
              </div>
              {event.detail && (
                <div className="text-sm text-ink-secondary mt-1 max-w-sm">{event.detail}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("flex items-start", className)}>
      {events.map((event, i) => (
        <div key={i} className="flex-1 relative">
          {i < events.length - 1 && (
            <div className="absolute top-1.5 left-3 w-full h-px bg-gray-200" />
          )}
          <div className="relative z-10">
            <div className={cn(
              "w-3 h-3 rounded-full mb-3",
              event.status === 'past' ? 'bg-ink-secondary' :
              event.status === 'current' ? 'bg-ocean shadow-[0_0_0_4px_rgba(3,105,161,0.2)] animate-pulse' :
              'border-2 border-gray-300 bg-white'
            )} />
            <div className="text-xs font-mono text-ink-tertiary mb-1">{event.time}</div>
            <div className={cn(
              "text-sm font-medium pr-4",
              event.status === 'future' ? 'text-ink-secondary' : 'text-ink-primary'
            )}>
              {event.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
