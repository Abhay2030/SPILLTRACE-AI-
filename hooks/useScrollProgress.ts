'use client'

import { useState, useEffect } from 'react';

export function useScrollProgress() {
  const [progress, setProgress] = useState({
    progress: 0,
    scrollY: 0,
    viewportHeight: 0,
    documentHeight: 0
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const viewportHeight = window.innerHeight;
          const documentHeight = document.documentElement.scrollHeight;
          const scrollProgress = scrollY / (documentHeight - viewportHeight) || 0;
          
          setProgress({
            progress: Math.max(0, Math.min(1, scrollProgress)),
            scrollY,
            viewportHeight,
            documentHeight
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Init

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
}
