'use client';

import { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr, AdaptiveEvents, PerformanceMonitor, Preload } from '@react-three/drei';
import SceneController from './SceneController';

export default function SceneCanvas() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      <Canvas
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        camera={{ position: [0, 0, 8], fov: 45, near: 0.1, far: 100 }}
        dpr={[1, 2]}
        style={{ background: 'transparent' }}
      >
        <PerformanceMonitor>
          <AdaptiveDpr pixelated />
          <AdaptiveEvents />
        </PerformanceMonitor>
        <Suspense fallback={null}>
          <SceneController />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
}
