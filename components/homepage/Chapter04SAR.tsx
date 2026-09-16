'use client';

import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { cn } from '@/lib/utils';
import { Sliders, Eye, Layers, Compass } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function Chapter04SAR() {
  const containerRef = useRef<HTMLElement>(null);
  const [viewMode, setViewMode] = useState<'sar' | 'segmentation' | 'optical'>('segmentation');

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 60%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.fromTo('.sar-heading', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' });
    tl.fromTo('.sar-canvas-card', { scale: 0.96, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.3');
    tl.fromTo('.sar-metrics', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }, '-=0.4');
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="chapter-section min-h-screen relative flex flex-col items-center justify-center p-6 md:p-16 z-10"
    >
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center space-y-8">
        {/* Header */}
        <div className="sar-heading text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 text-xs font-mono tracking-widest uppercase shadow-[0_0_15px_rgba(6,182,212,0.3)]">
            <Layers size={13} className="text-cyan-400" />
            CHAPTER 04 · SAR VISUALIZATION & INTERPRETATION
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight drop-shadow-[0_4px_25px_rgba(0,0,0,0.95)]">
            See what the ocean surface hides.
          </h2>
          <p className="font-body text-base sm:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed font-medium drop-shadow">
            Transitioning from raw radar backscatter returns to segmented hydrocarbon polygons. Oil dampens high-frequency gravity-capillary waves, appearing as a characteristic dark signature.
          </p>
        </div>

        {/* Interactive Viewer Card */}
        <div className="sar-canvas-card w-full glass-card-cinematic rounded-3xl p-5 sm:p-7 space-y-5 shadow-2xl">
          {/* Top Control Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-700/80 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="text-cyan-300 font-semibold tracking-wider">VIEW MODALITY:</span>
              <div className="inline-flex bg-slate-900 p-1 rounded-xl border border-slate-700">
                <button
                  onClick={() => setViewMode('optical')}
                  className={cn(
                    'px-3.5 py-1.5 rounded-lg transition-all font-mono text-xs cursor-pointer',
                    viewMode === 'optical'
                      ? 'bg-cyan-500 text-white shadow font-bold'
                      : 'text-slate-300 hover:text-white'
                  )}
                >
                  Natural Ocean
                </button>
                <button
                  onClick={() => setViewMode('sar')}
                  className={cn(
                    'px-3.5 py-1.5 rounded-lg transition-all font-mono text-xs cursor-pointer',
                    viewMode === 'sar'
                      ? 'bg-cyan-500 text-white shadow font-bold'
                      : 'text-slate-300 hover:text-white'
                  )}
                >
                  Raw SAR Backscatter
                </button>
                <button
                  onClick={() => setViewMode('segmentation')}
                  className={cn(
                    'px-3.5 py-1.5 rounded-lg transition-all font-mono text-xs cursor-pointer',
                    viewMode === 'segmentation'
                      ? 'bg-gradient-to-r from-cyan-500 to-ocean text-white shadow font-bold shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                      : 'text-slate-300 hover:text-white'
                  )}
                >
                  AI Segmentation
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 text-cyan-300">
              <span className="hidden sm:inline font-mono font-medium">LAT: 15.22°N · LON: 72.08°E</span>
              <StatusBadge variant="info" status="CALIBRATED" size="sm" />
            </div>
          </div>

          {/* Visualization Canvas */}
          <div className="relative w-full aspect-[21/9] rounded-xl overflow-hidden border border-border bg-[#090d16] flex items-center justify-center">
            {/* View Layer 1: Optical Representation */}
            {viewMode === 'optical' && (
              <div className="absolute inset-0 bg-gradient-to-tr from-[#024a75] via-[#0369a1] to-[#0891b2] flex items-center justify-center">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
                <div className="text-center p-6 bg-navy/60 backdrop-blur-md rounded-xl text-white max-w-md">
                  <Eye size={24} className="mx-auto mb-2 text-ocean-light" />
                  <p className="font-mono text-xs uppercase tracking-widest text-ocean-light">Natural Sea Surface</p>
                  <p className="text-xs text-slate-300 mt-1">Sun-glint and wave reflections obscure the film from visual optical sensors.</p>
                </div>
              </div>
            )}

            {/* View Layer 2: Raw SAR Backscatter Decibels */}
            {viewMode === 'sar' && (
              <div className="absolute inset-0 bg-[#0b0f19] flex items-center justify-center">
                {/* Simulated radar speckle noise */}
                <div
                  className="absolute inset-0 opacity-40 mix-blend-screen"
                  style={{
                    backgroundImage:
                      'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
                  }}
                />
                {/* Dark slick region in radar return */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 340">
                  <path
                    d="M 320 120 C 370 80, 480 90, 520 140 C 560 190, 510 240, 430 250 C 350 260, 270 210, 280 160 Z"
                    fill="#020408"
                    opacity="0.92"
                  />
                </svg>
                <div className="absolute bottom-4 left-4 font-mono text-[10px] text-slate-400 bg-black/60 px-2.5 py-1 rounded backdrop-blur">
                  SIGMA-0 (σ⁰): -18.4 dB (Slick) vs -12.1 dB (Ambient Water)
                </div>
              </div>
            )}

            {/* View Layer 3: AI Segmentation Overlay */}
            {viewMode === 'segmentation' && (
              <div className="absolute inset-0 bg-[#090d16] flex items-center justify-center">
                <div
                  className="absolute inset-0 opacity-25"
                  style={{
                    backgroundImage:
                      'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
                  }}
                />
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 340">
                  {/* Grid Lines */}
                  <defs>
                    <pattern id="sarGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#sarGrid)" />

                  {/* Slick Delineation Polygon */}
                  <path
                    d="M 320 120 C 370 80, 480 90, 520 140 C 560 190, 510 240, 430 250 C 350 260, 270 210, 280 160 Z"
                    fill="#0369a1"
                    fillOpacity="0.25"
                    stroke="#06b6d4"
                    strokeWidth="2.5"
                    strokeDasharray="6,3"
                  />

                  {/* Dimension marker lines */}
                  <line x1="280" y1="160" x2="520" y2="140" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2,2" />
                  <text x="390" y="145" fill="#38bdf8" fontSize="10" fontFamily="monospace">Major Axis: 6.8 km</text>

                  <circle cx="400" cy="180" r="4" fill="#38bdf8" />
                  <text x="412" y="184" fill="#ffffff" fontSize="11" fontFamily="monospace" fontWeight="bold">Centroid</text>
                </svg>

                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg border border-border-subtle shadow-sm font-mono text-[11px] text-ink-primary">
                  SEGMENTED REGION #01 · AREA: 18.4 km²
                </div>
              </div>
            )}
          </div>

          {/* Telemetry Footer */}
          <div className="sar-metrics grid grid-cols-2 sm:grid-cols-4 gap-3 text-left pt-2">
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-700/80 shadow">
              <div className="text-[10px] font-mono text-cyan-400 uppercase font-semibold">Contrast Ratio</div>
              <div className="font-mono text-sm font-black text-white mt-0.5">4.2 : 1</div>
              <div className="text-[10px] text-emerald-400 font-bold">High Signal Separation</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-700/80 shadow">
              <div className="text-[10px] font-mono text-sky-400 uppercase font-semibold">Radar Backscatter</div>
              <div className="font-mono text-sm font-black text-white mt-0.5">-18.4 dB</div>
              <div className="text-[10px] text-slate-300">Normalized cross-section</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-700/80 shadow">
              <div className="text-[10px] font-mono text-cyan-400 uppercase font-semibold">Boundary Gradient</div>
              <div className="font-mono text-sm font-black text-white mt-0.5">Sharp (0.88)</div>
              <div className="text-[10px] text-slate-300">Steep dampening threshold</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-700/80 shadow">
              <div className="text-[10px] font-mono text-emerald-400 uppercase font-semibold">Segmentation Status</div>
              <div className="font-mono text-sm font-black text-cyan-300 mt-0.5">COMPLETE</div>
              <div className="text-[10px] text-slate-300">Mask vector extracted</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Chapter04SAR;
