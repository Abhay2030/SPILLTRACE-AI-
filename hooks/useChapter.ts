'use client'

import { useState, useEffect } from 'react';
import { useScrollProgress } from './useScrollProgress';

export function useChapter(totalChapters: number, chapterHeightStr: string = '100vh') {
  const [state, setState] = useState({
    currentChapter: 1,
    chapterProgress: 0,
    isTransitioning: false,
  });

  const { scrollY, viewportHeight } = useScrollProgress();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Parse chapterHeight
    let chapterHeight = viewportHeight; // fallback
    if (chapterHeightStr.endsWith('vh')) {
      chapterHeight = (parseFloat(chapterHeightStr) / 100) * viewportHeight;
    } else if (chapterHeightStr.endsWith('px')) {
      chapterHeight = parseFloat(chapterHeightStr);
    }
    
    if (chapterHeight === 0) return;

    const currentScroll = scrollY;
    const currentChapter = Math.min(
      totalChapters,
      Math.max(1, Math.floor(currentScroll / chapterHeight) + 1)
    );
    
    const chapterStartScroll = (currentChapter - 1) * chapterHeight;
    const progressWithinChapter = (currentScroll - chapterStartScroll) / chapterHeight;
    
    const isTransitioning = progressWithinChapter > 0.8 || progressWithinChapter < 0.2;

    setState({
      currentChapter,
      chapterProgress: Math.max(0, Math.min(1, progressWithinChapter)),
      isTransitioning,
    });

  }, [scrollY, viewportHeight, totalChapters, chapterHeightStr]);

  return state;
}
