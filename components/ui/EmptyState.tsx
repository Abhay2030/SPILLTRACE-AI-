import React from 'react';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import { Button } from './Button';

export interface EmptyStateProps {
  title: string;
  message: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({
  title,
  message,
  icon,
  action,
  className
}: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center p-12 text-center max-w-md mx-auto", className)}>
      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-ink-tertiary mb-4">
        {icon || <Search size={24} />}
      </div>
      <h3 className="text-xl font-display font-medium text-ink-primary mb-2">
        {title}
      </h3>
      <p className="text-ink-secondary mb-6 text-sm">
        {message}
      </p>
      {action && (
        <Button onClick={action.onClick} variant="secondary" size="sm">
          {action.label}
        </Button>
      )}
    </div>
  );
}
