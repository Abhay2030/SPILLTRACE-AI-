import React from 'react';
import { cn } from '@/lib/utils';
import { AlertTriangle } from 'lucide-react';
import { Button } from './Button';

export interface ErrorStateProps {
  title: string;
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  icon?: React.ReactNode;
  className?: string;
}

export function ErrorState({
  title,
  message,
  action,
  icon,
  className
}: ErrorStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center p-12 text-center max-w-md mx-auto", className)}>
      <div className="w-12 h-12 rounded-full bg-critical/10 flex items-center justify-center text-critical mb-4">
        {icon || <AlertTriangle size={24} />}
      </div>
      <h3 className="text-2xl font-display font-medium text-ink-primary mb-2">
        {title}
      </h3>
      <p className="text-ink-secondary mb-6 leading-relaxed">
        {message}
      </p>
      {action && (
        <Button onClick={action.onClick} variant="secondary">
          {action.label}
        </Button>
      )}
    </div>
  );
}
