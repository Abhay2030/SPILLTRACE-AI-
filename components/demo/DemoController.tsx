'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  RotateCcw,
  ChevronUp,
  ChevronDown,
  Gauge,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const TOTAL_CHAPTERS = 20;
const CHAPTER_LABELS = [
  'The Ocean',
  'The Watch',
  'Satellite Arrival',
  'SAR Analysis',
  'Validation',
  'Characterization',
  'Rewind the Ocean',
  'Origin Probability',
  'Drift Forecast',
  'Threat Intelligence',
  'AIS Reconstruction',
  'Candidate Vessels',
  'Why This Vessel?',
  'Why Not Vessel B?',
  'Evidence Graph',
  'Response Planning',
  'Scenario Simulation',
  'Continuous Monitoring',
  'Complete System',
  'From Space to Suspect',
];

interface DemoControllerProps {
  className?: string;
}

export default function DemoController({ className }: DemoControllerProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentChapter, setCurrentChapter] = useState(1);
  const [speed, setSpeed] = useState(1);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const scrollToChapter = useCallback((chapter: number) => {
    const target = (chapter - 1) * window.innerHeight;
    window.scrollTo({ top: target, behavior: 'smooth' });
    setCurrentChapter(chapter);
  }, []);

  const play = useCallback(() => setIsPlaying(true), []);
  const pause = useCallback(() => setIsPlaying(false), []);

  const next = useCallback(() => {
    const nextChapter = Math.min(currentChapter + 1, TOTAL_CHAPTERS);
    scrollToChapter(nextChapter);
  }, [currentChapter, scrollToChapter]);

  const previous = useCallback(() => {
    const prevChapter = Math.max(currentChapter - 1, 1);
    scrollToChapter(prevChapter);
  }, [currentChapter, scrollToChapter]);

  const restart = useCallback(() => {
    setIsPlaying(false);
    setElapsedSeconds(0);
    scrollToChapter(1);
  }, [scrollToChapter]);

  const cycleSpeed = useCallback(() => {
    setSpeed((prev) => {
      if (prev === 0.5) return 1;
      if (prev === 1) return 2;
      return 0.5;
    });
  }, []);

  // Elapsed presentation timer
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-advance when playing
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentChapter((prev) => {
        const nextChapter = prev + 1;
        if (nextChapter > TOTAL_CHAPTERS) {
          setIsPlaying(false);
          return prev;
        }
        scrollToChapter(nextChapter);
        return nextChapter;
      });
    }, 8000 / speed);

    return () => clearInterval(interval);
  }, [isPlaying, speed, scrollToChapter]);

  // Track scroll position to update current chapter
  useEffect(() => {
    const handleScroll = () => {
      const chapter = Math.floor(window.scrollY / window.innerHeight) + 1;
      setCurrentChapter(Math.min(Math.max(chapter, 1), TOTAL_CHAPTERS));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLSelectElement) return;

      switch (e.key) {
        case ' ':
        case 'p':
        case 'P':
          e.preventDefault();
          isPlaying ? pause() : play();
          break;
        case 'ArrowRight':
          e.preventDefault();
          next();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          previous();
          break;
        case 'Escape':
          e.preventDefault();
          setIsOpen((prev) => !prev);
          break;
        case 'r':
        case 'R':
          if (!e.metaKey && !e.ctrlKey) {
            e.preventDefault();
            restart();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, play, pause, next, previous, restart]);

  return (
    <>
      {/* Persistent DEMO MODE indicator */}
      <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-caution/10 border border-caution/20 rounded-full">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-caution opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-caution" />
          </span>
          <span className="text-[11px] font-mono font-medium tracking-wider text-caution uppercase">
            Demo Mode — Simulated Data
          </span>
        </div>
      </div>

      {/* Controller panel */}
      <div className={cn('fixed bottom-6 left-1/2 -translate-x-1/2 z-50', className)}>
        <AnimatePresence>
          {isOpen ? (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="bg-white/95 backdrop-blur-xl border border-border rounded-2xl shadow-overlay px-6 py-4 min-w-[480px]"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-ink-tertiary">
                    Presentation Control
                  </span>
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-subtle text-ink-secondary text-[10px] font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-ocean animate-pulse" />
                    <span>
                      {String(Math.floor(elapsedSeconds / 60)).padStart(2, '0')}:
                      {String(elapsedSeconds % 60).padStart(2, '0')}
                    </span>
                  </div>
                  <button
                    onClick={cycleSpeed}
                    className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-subtle text-ink-secondary hover:bg-surface-muted transition-colors"
                    aria-label={`Speed: ${speed}x`}
                  >
                    <Gauge className="w-3 h-3" />
                    <span className="text-[10px] font-mono">{speed}x</span>
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  {/* Quick Chapter Jump Dropdown */}
                  <select
                    value={currentChapter}
                    onChange={(e) => scrollToChapter(Number(e.target.value))}
                    className="text-[10px] font-mono bg-surface-subtle border border-border rounded px-2 py-0.5 text-ink-secondary outline-none cursor-pointer"
                    aria-label="Jump to chapter"
                  >
                    {CHAPTER_LABELS.map((label, idx) => (
                      <option key={idx} value={idx + 1}>
                        CH {String(idx + 1).padStart(2, '0')}: {label}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 hover:bg-surface-subtle rounded-lg transition-colors"
                    aria-label="Minimize controller"
                  >
                    <ChevronDown className="w-4 h-4 text-ink-tertiary" />
                  </button>
                </div>
              </div>

              {/* Chapter info */}
              <div className="text-center mb-3">
                <p className="text-[10px] font-mono uppercase tracking-widest text-ink-tertiary">
                  Chapter {String(currentChapter).padStart(2, '0')} / {TOTAL_CHAPTERS}
                </p>
                <p className="text-sm font-display font-medium text-ink-primary mt-0.5">
                  {CHAPTER_LABELS[currentChapter - 1]}
                </p>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1 bg-surface-muted rounded-full mb-4 overflow-hidden">
                <motion.div
                  className="h-full bg-ocean rounded-full"
                  animate={{ width: `${(currentChapter / TOTAL_CHAPTERS) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Chapter dots */}
              <div className="flex items-center justify-center gap-1 mb-4">
                {Array.from({ length: TOTAL_CHAPTERS }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => scrollToChapter(i + 1)}
                    className={cn(
                      'w-2 h-2 rounded-full transition-all duration-200',
                      i + 1 === currentChapter
                        ? 'bg-ocean w-4'
                        : i + 1 < currentChapter
                        ? 'bg-ocean/40'
                        : 'bg-surface-muted'
                    )}
                    aria-label={`Go to chapter ${i + 1}: ${CHAPTER_LABELS[i]}`}
                  />
                ))}
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={restart}
                  className="p-2 rounded-lg hover:bg-surface-subtle transition-colors text-ink-secondary"
                  aria-label="Restart"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={previous}
                  disabled={currentChapter <= 1}
                  className="p-2 rounded-lg hover:bg-surface-subtle transition-colors text-ink-secondary disabled:opacity-30"
                  aria-label="Previous chapter"
                >
                  <SkipBack className="w-4 h-4" />
                </button>
                <button
                  onClick={isPlaying ? pause : play}
                  className="p-3 rounded-xl bg-ocean text-white hover:bg-ocean-deep transition-colors shadow-card"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5 ml-0.5" />
                  )}
                </button>
                <button
                  onClick={next}
                  disabled={currentChapter >= TOTAL_CHAPTERS}
                  className="p-2 rounded-lg hover:bg-surface-subtle transition-colors text-ink-secondary disabled:opacity-30"
                  aria-label="Next chapter"
                >
                  <SkipForward className="w-4 h-4" />
                </button>
                <div className="w-8" /> {/* Spacer for symmetry */}
              </div>

              {/* Keyboard hints */}
              <div className="flex items-center justify-center gap-4 mt-3">
                {[
                  ['Space', 'Play/Pause'],
                  ['←→', 'Navigate'],
                  ['R', 'Restart'],
                ].map(([key, label]) => (
                  <div key={key} className="flex items-center gap-1.5">
                    <kbd className="px-1.5 py-0.5 text-[9px] font-mono bg-surface-subtle rounded border border-border text-ink-tertiary">
                      {key}
                    </kbd>
                    <span className="text-[9px] text-ink-tertiary">{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              onClick={() => setIsOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-xl border border-border rounded-full shadow-card hover:shadow-elevated transition-all"
              aria-label="Open presentation controls"
            >
              <ChevronUp className="w-4 h-4 text-ink-tertiary" />
              <span className="text-xs font-mono text-ink-secondary">
                {String(currentChapter).padStart(2, '0')}/{TOTAL_CHAPTERS}
              </span>
              <span className="text-xs text-ink-tertiary">
                {CHAPTER_LABELS[currentChapter - 1]}
              </span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
