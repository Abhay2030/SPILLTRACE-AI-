'use client';

import { Download } from 'lucide-react';

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="hidden sm:flex items-center gap-2 px-4 py-2 bg-surface hover:bg-surface-subtle text-ink-primary border border-ink-tertiary/20 rounded-xl font-mono text-xs font-bold tracking-wider transition-colors shadow-sm print:hidden"
    >
      <Download className="w-4 h-4" /> EXPORT PDF
    </button>
  );
}