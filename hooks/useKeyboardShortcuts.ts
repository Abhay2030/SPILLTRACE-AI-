'use client'

import { useEffect } from 'react';

export function useKeyboardShortcuts(shortcuts: Record<string, () => void>) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Create string representation of the event
      const keys = [];
      
      if (event.ctrlKey) keys.push('ctrl');
      if (event.metaKey) keys.push('meta');
      if (event.shiftKey) keys.push('shift');
      if (event.altKey) keys.push('alt');
      
      const key = event.key.toLowerCase();
      if (!['control', 'meta', 'shift', 'alt'].includes(key)) {
        keys.push(key);
      }
      
      const keyCombo = keys.join('+');
      
      if (shortcuts[keyCombo]) {
        event.preventDefault();
        shortcuts[keyCombo]();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
}
