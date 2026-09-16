'use client';

import React, { useState, useEffect, Suspense, Component, ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr, AdaptiveEvents, PerformanceMonitor, Preload } from '@react-three/drei';
import SceneController from './SceneController';
import TacticalFallback2D from './TacticalFallback2D';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class WebGLErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn('[SpillTrace AI] WebGL initialization failed. Switching to 2D tactical fallback.', error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

function checkWebGLSupport(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

export default function SceneCanvas() {
  const [mounted, setMounted] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    setMounted(true);
    setHasWebGL(checkWebGLSupport());
  }, []);

  if (!mounted) return null;

  if (!hasWebGL) {
    return <TacticalFallback2D />;
  }

  return (
    <WebGLErrorBoundary fallback={<TacticalFallback2D />}>
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
    </WebGLErrorBoundary>
  );
}
