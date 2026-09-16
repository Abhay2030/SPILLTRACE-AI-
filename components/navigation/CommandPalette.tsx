'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/lib/state/useAppStore';
import { 
  LucideSearch, 
  LucideMap, 
  LucideShip, 
  LucideBarChart, 
  LucideShield, 
  LucideInfo, 
  LucideSettings,
  LucideHome,
  LucideLayers,
  LucideRotateCcw,
  LucideFileText,
  LucideSatellite,
  LucideCompass,
  LucideCrosshair,
  LucideMaximize,
  LucidePlay,
  LucideRefreshCw,
  LucideTarget
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

interface CommandItem {
  id: string;
  label: string;
  category: 'Navigation' | 'Vessels' | 'Chapters' | 'Tactical' | 'Workflow';
  icon: any;
  shortcut?: string;
  action: string;
  detail?: string;
}

const COMMANDS: CommandItem[] = [
  // Primary Navigation
  { id: 'home', label: 'Workstation — Interactive Investigation', category: 'Navigation', icon: LucideHome, shortcut: 'G H', action: '/' },
  { id: 'incident', label: 'Incident ST-2026-0042 — Legal Dossier', category: 'Navigation', icon: LucideShield, shortcut: 'O I', action: '/incident/ST-2026-0042' },
  { id: 'response', label: 'Response Planning — Tier Matrix', category: 'Navigation', icon: LucideCrosshair, shortcut: 'G R', action: '/response' },
  { id: 'analytics', label: 'Regional Analytics — Arabian Sea', category: 'Navigation', icon: LucideBarChart, shortcut: 'G A', action: '/analytics' },
  { id: 'about', label: 'System Architecture — SIH26143', category: 'Navigation', icon: LucideInfo, shortcut: 'G S', action: '/about' },

  // Candidate Vessels
  { id: 'vessel-a', label: 'MT OCEANIC PIONEER (Primary Suspect · 94%)', category: 'Vessels', icon: LucideShip, shortcut: 'V A', action: 'select_vessel:V-001-ALPHA', detail: 'MMSI 419000123 · Crude Tanker · AIS Gap 14.2h' },
  { id: 'vessel-b', label: 'MV GLOBAL TRADER (Candidate B · 32%)', category: 'Vessels', icon: LucideShip, shortcut: 'V B', action: 'select_vessel:V-002-BRAVO', detail: 'MMSI 419000456 · Bulk Carrier · No discharge' },
  { id: 'vessel-c', label: 'FV SEA HORSE (Candidate C · 12%)', category: 'Vessels', icon: LucideShip, shortcut: 'V C', action: 'select_vessel:V-003-CHARLIE', detail: 'MMSI 419000789 · Fishing Vessel · Size mismatch' },

  // Workflow Steps
  { id: 'step-1', label: 'Step 01: Observe', category: 'Workflow', icon: LucideSatellite, action: 'workflow:1' },
  { id: 'step-2', label: 'Step 02: Detect', category: 'Workflow', icon: LucideLayers, action: 'workflow:2' },
  { id: 'step-3', label: 'Step 03: Validate', category: 'Workflow', icon: LucideTarget, action: 'workflow:3' },
  { id: 'step-5', label: 'Step 05: Trace', category: 'Workflow', icon: LucideRotateCcw, action: 'workflow:5' },
  { id: 'step-6', label: 'Step 06: Correlate', category: 'Workflow', icon: LucideCompass, action: 'workflow:6' },
  { id: 'step-7', label: 'Step 07: Attribute', category: 'Workflow', icon: LucideCrosshair, action: 'workflow:7' },

  // Narrative Chapters (Presentation Mode)
  { id: 'ch-1', label: 'Chapter 01: The Ocean (Arabian Sea Watch)', category: 'Chapters', icon: LucideCompass, shortcut: 'C 1', action: 'chapter:1' },
  { id: 'ch-3', label: 'Chapter 03: Satellite Arrival (Sentinel-1 C-SAR)', category: 'Chapters', icon: LucideSatellite, shortcut: 'C 3', action: 'chapter:3' },
  { id: 'ch-7', label: 'Chapter 07: Rewind the Ocean (Lagrangian Backtrack)', category: 'Chapters', icon: LucideRotateCcw, shortcut: 'C 7', action: 'chapter:7' },
  { id: 'ch-11', label: 'Chapter 11: AIS Reconstruction & Dark Vessel Filter', category: 'Chapters', icon: LucideShip, shortcut: 'C 11', action: 'chapter:11' },
  { id: 'ch-13', label: 'Chapter 13: Why This Vessel? (Culpability Analysis)', category: 'Chapters', icon: LucideShield, shortcut: 'C 13', action: 'chapter:13' },

  // Tactical Controls
  { id: 'focus-mode', label: 'Toggle Focus Mode', category: 'Tactical', icon: LucideMaximize, shortcut: 'F', action: 'toggle_focus' },
  { id: 'present-mode', label: 'Toggle Presentation Mode', category: 'Tactical', icon: LucidePlay, shortcut: 'P', action: 'toggle_presentation' },
  { id: 'reset-demo', label: 'Reset Demo to Initial State', category: 'Tactical', icon: LucideRefreshCw, shortcut: 'T R', action: 'reset_demo' },
];

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Handle Cmd+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  // Filter commands
  const filteredCommands = COMMANDS.filter((command) =>
    command.label.toLowerCase().includes(query.toLowerCase()) ||
    command.category.toLowerCase().includes(query.toLowerCase()) ||
    (command.detail && command.detail.toLowerCase().includes(query.toLowerCase()))
  );

  // Keyboard navigation
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredCommands.length));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length));
      }
      if (e.key === 'Enter' && filteredCommands[selectedIndex]) {
        e.preventDefault();
        handleSelect(filteredCommands[selectedIndex]);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [isOpen, filteredCommands, selectedIndex]);

  // Reset selection on query change
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Auto focus input
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 10);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  const handleSelect = (command: CommandItem) => {
    setIsOpen(false);
    const store = useAppStore.getState();
    
    if (command.action.startsWith('chapter:')) {
      const chNum = parseInt(command.action.replace('chapter:', ''), 10);
      // Activate presentation mode and scroll to chapter
      store.setPresentationMode(true);
      router.push('/');
      setTimeout(() => {
        const target = (chNum - 1) * window.innerHeight;
        window.scrollTo({ top: target, behavior: 'smooth' });
      }, 100);
    } else if (command.action.startsWith('workflow:')) {
      const step = parseInt(command.action.replace('workflow:', ''), 10);
      store.setWorkflowStep(step);
      store.setPresentationMode(false);
      router.push('/');
    } else if (command.action.startsWith('select_vessel:')) {
      const vesselId = command.action.replace('select_vessel:', '');
      store.setSelectedVessel(vesselId);
      store.setWorkflowStep(7); // Jump to Attribution step
      store.setPresentationMode(false);
      router.push('/');
    } else if (command.action === 'toggle_focus') {
      store.setFocusMode(!store.focusMode);
    } else if (command.action === 'toggle_presentation') {
      store.setPresentationMode(!store.presentationMode);
      if (!store.presentationMode) router.push('/');
    } else if (command.action === 'reset_demo') {
      store.resetDemo();
      router.push('/');
    } else if (command.action.startsWith('/')) {
      router.push(command.action);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-navy/20 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl border border-surface-subtle overflow-hidden"
          >
            <div className="flex items-center px-4 border-b border-surface-subtle">
              <LucideSearch className="w-5 h-5 text-ink-tertiary mr-3" />
              <input
                ref={inputRef}
                className="w-full py-4 bg-transparent outline-none text-ink-primary placeholder:text-ink-tertiary"
                placeholder="Type a command or search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <span className="text-xs font-mono text-ink-tertiary bg-surface px-1.5 py-0.5 rounded border border-surface-subtle">
                ESC
              </span>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2">
              {filteredCommands.length === 0 ? (
                <div className="py-8 text-center text-ink-tertiary text-sm">
                  No results found.
                </div>
              ) : (
                <div className="space-y-1">
                  {filteredCommands.map((command, index) => {
                    const isSelected = index === selectedIndex;
                    const Icon = command.icon;
                    return (
                      <button
                        key={command.id}
                        onClick={() => handleSelect(command)}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={cn(
                          "w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors",
                          isSelected
                            ? "bg-ocean/5 text-ocean"
                            : "text-ink-secondary hover:bg-surface-subtle/50"
                        )}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <Icon className={cn("w-4 h-4 shrink-0", isSelected ? "text-ocean" : "text-ink-tertiary")} />
                          <div className="flex flex-col text-left truncate">
                            <div className="flex items-center gap-2">
                              <span className={cn("font-medium truncate", isSelected ? "text-ocean" : "text-ink-primary")}>
                                {command.label}
                              </span>
                              <span className="text-[9px] font-mono px-1.5 py-0.2 bg-surface border border-border rounded text-ink-tertiary shrink-0">
                                {command.category}
                              </span>
                            </div>
                            {command.detail && (
                              <span className="text-[11px] font-mono text-ink-tertiary truncate">
                                {command.detail}
                              </span>
                            )}
                          </div>
                        </div>
                        {command.shortcut && (
                          <div className="flex gap-1 shrink-0 ml-3">
                             {command.shortcut.split(' ').map(key => (
                               <span key={key} className="text-[10px] font-mono text-ink-tertiary bg-surface px-1.5 py-0.5 rounded border border-surface-subtle">
                                 {key}
                               </span>
                             ))}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
            
            <div className="px-4 py-3 bg-surface-subtle/30 border-t border-surface-subtle text-xs text-ink-tertiary flex items-center justify-between">
               <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">↑↓ to navigate</span>
                  <span className="flex items-center gap-1">↵ to select</span>
               </div>
               <span>SpillTrace AI</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
