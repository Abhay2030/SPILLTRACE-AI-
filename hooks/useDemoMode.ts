'use client'

import { useState, useEffect, useCallback, useRef } from 'react';

const TOTAL_CHAPTERS = 20;

export function useDemoMode() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentChapter, setCurrentChapter] = useState(1);
  const [speed, setSpeed] = useState(1);
  const [isDemoMode, setIsDemoMode] = useState(false);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const next = useCallback(() => {
    setCurrentChapter(prev => Math.min(prev + 1, TOTAL_CHAPTERS));
  }, []);

  const previous = useCallback(() => {
    setCurrentChapter(prev => Math.max(prev - 1, 1));
  }, []);

  const play = useCallback(() => {
    setIsPlaying(true);
    setIsDemoMode(true);
  }, []);

  const pause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const restart = useCallback(() => {
    setCurrentChapter(1);
    setIsPlaying(true);
    setIsDemoMode(true);
  }, []);

  const goToChapter = useCallback((chapter: number) => {
    setCurrentChapter(Math.max(1, Math.min(chapter, TOTAL_CHAPTERS)));
  }, []);

  useEffect(() => {
    if (isPlaying) {
      const intervalMs = 5000 / speed; // Base duration 5 seconds per chapter
      timerRef.current = setInterval(() => {
        setCurrentChapter(prev => {
          if (prev >= TOTAL_CHAPTERS) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, intervalMs);
    } else {
      clearTimer();
    }

    return clearTimer;
  }, [isPlaying, speed]);

  return {
    isPlaying,
    currentChapter,
    speed,
    isDemoMode,
    play,
    pause,
    next,
    previous,
    restart,
    setSpeed,
    goToChapter,
  };
}
