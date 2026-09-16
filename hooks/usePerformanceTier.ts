'use client'

import { useState, useEffect } from 'react';

export type PerformanceTier = 'HIGH' | 'MEDIUM' | 'LOW';

export function usePerformanceTier() {
  const [tier, setTier] = useState<PerformanceTier>('HIGH');
  const [isWebGLSupported, setIsWebGLSupported] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check WebGL
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setIsWebGLSupported(!!gl);
    } catch (e) {
      setIsWebGLSupported(false);
    }

    // Check URL params
    const params = new URLSearchParams(window.location.search);
    const qualityParam = params.get('quality');
    if (qualityParam && ['low', 'medium', 'high'].includes(qualityParam.toLowerCase())) {
      const urlTier = qualityParam.toUpperCase() as PerformanceTier;
      setTier(urlTier);
      localStorage.setItem('performance-tier', urlTier);
      return;
    }

    // Check Local Storage
    const storedTier = localStorage.getItem('performance-tier') as PerformanceTier | null;
    if (storedTier && ['HIGH', 'MEDIUM', 'LOW'].includes(storedTier)) {
      setTier(storedTier);
      return;
    }

    // Auto detect
    const hardwareConcurrency = navigator.hardwareConcurrency || 4;
    const dpr = window.devicePixelRatio || 1;
    // @ts-ignore
    const deviceMemory = navigator.deviceMemory || 4;

    if (hardwareConcurrency >= 8 && dpr >= 2 && deviceMemory >= 8) {
      setTier('HIGH');
    } else if (hardwareConcurrency >= 4 && dpr >= 1.5) {
      setTier('MEDIUM');
    } else {
      setTier('LOW');
    }
  }, []);

  const handleSetTier = (newTier: PerformanceTier) => {
    setTier(newTier);
    if (typeof window !== 'undefined') {
      localStorage.setItem('performance-tier', newTier);
    }
  };

  return { tier, setTier: handleSetTier, isWebGLSupported };
}
