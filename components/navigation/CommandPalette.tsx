'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  LucideSearch, 
  LucideMap, 
  LucideShip, 
  LucideBarChart, 
  LucideShield, 
  LucideInfo, 
  LucideSettings,
  LucideHome
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const COMMANDS = [
  { id: 'home', label: 'Home', icon: LucideHome, shortcut: 'G H', action: '/' },
  { id: 'investigate', label: 'Start Investigation', icon: LucideMap, shortcut: 'G I', action: '/investigate' },
  { id: 'incident', label: 'Open Incident ST-2026-0042', icon: LucideShield, shortcut: 'O I', action: '/incident/ST-2026-0042' },
  { id: 'vessel', label: 'Find Vessel', icon: LucideShip, shortcut: 'F V', action: '/vessel/horizon-trader' },
  { id: 'analytics', label: 'View Analytics', icon: LucideBarChart, shortcut: 'G A', action: '/analytics' },
  { id: 'response', label: 'Response Planning', icon: LucideMap, shortcut: 'G R', action: '/response' },
  { id: 'about', label: 'About System', icon: LucideInfo, shortcut: 'G S', action: '/about' },
  { id: 'demo', label: 'Toggle Demo Mode', icon: LucideSettings, shortcut: 'T D', action: 'toggle_demo' },
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
    command.label.toLowerCase().includes(query.toLowerCase())
  );

  // Keyboard navigation
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
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

  const handleSelect = (command: typeof COMMANDS[0]) => {
    setIsOpen(false);
    if (command.action.startsWith('/')) {
      router.push(command.action);
    } else if (command.action === 'toggle_demo') {
      console.log('Toggled demo mode');
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
                        <div className="flex items-center">
                          <Icon className={cn("w-4 h-4 mr-3", isSelected ? "text-ocean" : "text-ink-tertiary")} />
                          <span className={cn("font-medium", isSelected ? "text-ocean" : "text-ink-primary")}>
                            {command.label}
                          </span>
                        </div>
                        {command.shortcut && (
                          <div className="flex gap-1">
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
