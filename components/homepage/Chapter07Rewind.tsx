'use client';

import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Metric } from '@/components/ui/Metric';
import { Play, Pause, RotateCcw, Clock, Wind, Waves, Crosshair, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface RewindStep {
  id: string;
  label: string;
  offsetHours: number;
  timestamp: string;
  areaKm2: number;
  centroid: { lat: number; lng: number };
  wind: { speedKts: number; dirDeg: number; desc: string };
  current: { speedMs: number; dirDeg: number; desc: string };
  slickScale: number;
  description: string;
}

const REWIND_STEPS: RewindStep[] = [
  {
    id: 't0',
    label: 'T0 (Detection)',
    offsetHours: 0,
    timestamp: '2026-09-14 03:42 UTC',
    areaKm2: 18.4,
    centroid: { lat: 15.342, lng: 72.115 },
    wind: { speedKts: 14, dirDeg: 235, desc: '235° SW @ 14 kts' },
    current: { speedMs: 0.38, dirDeg: 45, desc: '045° NE @ 0.38 m/s' },
    slickScale: 1.0,
    description: 'Detection timestep. Sentinel-1A SAR capture shows fully spread multi-lobed slick.',
  },
  {
    id: 't-6',
    label: 'T -6h',
    offsetHours: -6,
    timestamp: '2026-09-13 21:42 UTC',
    areaKm2: 12.8,
    centroid: { lat: 15.328, lng: 72.098 },
    wind: { speedKts: 13, dirDeg: 240, desc: '240° WSW @ 13 kts' },
    current: { speedMs: 0.35, dirDeg: 42, desc: '042° NE @ 0.35 m/s' },
    slickScale: 0.76,
    description: 'Backward advection reverses surface current dispersion. Sheen fringe collapses.',
  },
  {
    id: 't-12',
    label: 'T -12h',
    offsetHours: -12,
    timestamp: '2026-09-13 15:42 UTC',
    areaKm2: 7.5,
    centroid: { lat: 15.312, lng: 72.081 },
    wind: { speedKts: 12, dirDeg: 230, desc: '230° SW @ 12 kts' },
    current: { speedMs: 0.33, dirDeg: 40, desc: '040° NE @ 0.33 m/s' },
    slickScale: 0.52,
    description: 'Intermediate slick contracting along principal wind leeway vector.',
  },
  {
    id: 't-18',
    label: 'T -18h',
    offsetHours: -18,
    timestamp: '2026-09-13 09:42 UTC',
    areaKm2: 2.8,
    centroid: { lat: 15.295, lng: 72.062 },
    wind: { speedKts: 11, dirDeg: 225, desc: '225° SW @ 11 kts' },
    current: { speedMs: 0.30, dirDeg: 38, desc: '038° NE @ 0.30 m/s' },
    slickScale: 0.28,
    description: 'Close proximity to discharge origin. Concentrated heavy oil patch identified.',
  },
  {
    id: 't-24',
    label: 'T -24h (Inception)',
    offsetHours: -24,
    timestamp: '2026-09-13 03:42 UTC',
    areaKm2: 0.4,
    centroid: { lat: 15.281, lng: 72.048 },
    wind: { speedKts: 10, dirDeg: 220, desc: '220° SW @ 10 kts' },
    current: { speedMs: 0.28, dirDeg: 35, desc: '035° NE @ 0.28 m/s' },
    slickScale: 0.12,
    description: 'Discharge inception point. 10,000 Monte Carlo particles converge within ±6.4 km ellipse.',
  },
];

export function Chapter07Rewind() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Auto-play timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setActiveStepIndex((prev) => {
          if (prev >= REWIND_STEPS.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1800);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 50%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.fromTo('.rewind-header', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 });
    tl.fromTo('.rewind-visual', { scale: 0.95, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8 }, '-=0.3');
    tl.fromTo('.rewind-telemetry', { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, stagger: 0.1 }, '-=0.5');
  }, { scope: containerRef });

  const activeStep = REWIND_STEPS[activeStepIndex];

  return (
    <section
      ref={containerRef}
      className="chapter-section min-h-screen relative flex items-center justify-center p-6 md:p-12 lg:p-16 overflow-hidden"
    >
      <div className="z-10 w-full max-w-6xl mx-auto flex flex-col justify-center">
        {/* Header */}
        <div className="rewind-header text-center mb-10 space-y-3">
          <SectionLabel title="HYDRODYNAMIC REVERSE TRACKING" align="center" />
          <h2 className="font-display font-bold text-4xl md:text-6xl text-ink-primary tracking-tight">
            REWIND THE OCEAN.
          </h2>
          <p className="font-body text-base md:text-lg text-ink-secondary max-w-2xl mx-auto">
            Reverse Eulerian-Lagrangian transport model unwinds wind leeway and ocean currents to trace the slick back to its origin.
          </p>
        </div>

        {/* Interactive Playback / Step Controller */}
        <div className="w-full max-w-4xl mx-auto bg-surface rounded-2xl border border-ink-tertiary/20 p-4 md:p-6 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-2 px-4 py-2 bg-ocean hover:bg-ocean/90 text-white rounded-lg text-xs font-mono font-bold transition-all shadow-sm"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isPlaying ? 'PAUSE REPLAY' : 'PLAY RECONSTRUCTION'}
              </button>
              <button
                onClick={() => {
                  setIsPlaying(false);
                  setActiveStepIndex(0);
                }}
                className="flex items-center gap-1.5 px-3 py-2 bg-surface border border-ink-tertiary/20 text-ink-secondary hover:text-ink-primary rounded-lg text-xs font-mono transition-colors"
                title="Reset to T0"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                RESET T0
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-ink-tertiary">MODEL:</span>
              <span className="font-mono text-xs font-semibold text-marine bg-marine/10 px-2.5 py-1 rounded">
                10,000 MONTE CARLO PARTICLES
              </span>
            </div>
          </div>

          {/* Stepper Buttons / Timeline Track */}
          <div className="relative pt-2 pb-1">
            <div className="relative flex items-center justify-between z-10">
              {REWIND_STEPS.map((step, idx) => {
                const isActive = idx === activeStepIndex;
                const isPast = idx < activeStepIndex;
                return (
                  <button
                    key={step.id}
                    onClick={() => {
                      setIsPlaying(false);
                      setActiveStepIndex(idx);
                    }}
                    className="flex flex-col items-center group focus:outline-none"
                  >
                    <div
                      className={cn(
                        "w-7 h-7 rounded-full flex items-center justify-center font-mono text-[11px] font-bold transition-all duration-300",
                        isActive
                          ? "bg-marine text-white ring-4 ring-marine/20 shadow-md scale-110"
                          : isPast
                          ? "bg-ocean/20 text-ocean border border-ocean/40"
                          : "bg-surface-subtle text-ink-tertiary border border-ink-tertiary/30 group-hover:border-marine/50"
                      )}
                    >
                      {idx === 0 ? 'T0' : `-${step.offsetHours * -1}h`}
                    </div>
                    <span
                      className={cn(
                        "text-[11px] font-mono mt-2 transition-colors",
                        isActive ? "text-marine font-bold" : "text-ink-tertiary group-hover:text-ink-secondary"
                      )}
                    >
                      {step.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Connecting Track Line */}
            <div className="absolute top-[22px] left-4 right-4 h-0.5 bg-ink-tertiary/20 -z-0">
              <div
                className="h-full bg-marine transition-all duration-500"
                style={{ width: `${(activeStepIndex / (REWIND_STEPS.length - 1)) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Main Display: Visual Canvas + Dynamic Telemetry */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Visual Reverse Path Map */}
          <div className="rewind-visual lg:col-span-7 relative aspect-[4/3] bg-surface rounded-2xl p-6 border border-ink-tertiary/20 shadow-sm overflow-hidden flex flex-col justify-between">
            {/* Top Bar inside Canvas */}
            <div className="flex items-center justify-between text-xs font-mono z-10">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-ocean" />
                <span className="font-bold text-ink-primary">{activeStep.timestamp}</span>
              </div>
              <span className="text-ink-tertiary">
                STEP {activeStepIndex + 1} OF {REWIND_STEPS.length}
              </span>
            </div>

            {/* SVG Reverse Trajectory Canvas */}
            <div className="relative w-full h-full flex items-center justify-center my-2">
              <svg viewBox="0 0 500 320" className="w-full h-full max-h-[300px] select-none">
                <defs>
                  <linearGradient id="reversePathGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#0F172A" stopOpacity="0.4" />
                  </linearGradient>
                </defs>

                {/* Hydrodynamic Backtrack Curve */}
                <path
                  d="M 380,90 Q 280,160 140,240"
                  fill="none"
                  stroke="#94A3B8"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  className="opacity-40"
                />

                {/* Trajectory waypoint nodes */}
                {REWIND_STEPS.map((s, i) => {
                  // Coordinate interpolation along the curve
                  const progress = i / (REWIND_STEPS.length - 1);
                  const cx = 380 - progress * 240;
                  const cy = 90 + progress * 150;
                  const isCurrent = i === activeStepIndex;

                  return (
                    <g key={s.id}>
                      <circle
                        cx={cx}
                        cy={cy}
                        r={isCurrent ? 6 : 3}
                        fill={isCurrent ? '#06B6D4' : '#CBD5E1'}
                        stroke={isCurrent ? '#FFFFFF' : 'none'}
                        strokeWidth={isCurrent ? 2 : 0}
                      />
                      {isCurrent && (
                        <circle
                          cx={cx}
                          cy={cy}
                          r={14}
                          fill="none"
                          stroke="#06B6D4"
                          strokeWidth="1.5"
                          className="animate-ping"
                        />
                      )}
                    </g>
                  );
                })}

                {/* Reverse Slick Polygon (shrinks as we rewind) */}
                {(() => {
                  const progress = activeStepIndex / (REWIND_STEPS.length - 1);
                  const curCx = 380 - progress * 240;
                  const curCy = 90 + progress * 150;
                  const scale = activeStep.slickScale;

                  return (
                    <g transform={`translate(${curCx}, ${curCy}) scale(${scale})`}>
                      {/* Slick Shape */}
                      <path
                        d="M -40,-25 C 10,-45 50,-10 40,20 C 30,50 -20,40 -45,20 C -60,0 -50,-15 -40,-25 Z"
                        fill="rgba(15, 23, 42, 0.7)"
                        stroke="#06B6D4"
                        strokeWidth="2"
                      />
                      {/* Centroid Point */}
                      <circle cx="0" cy="0" r="3" fill="#06B6D4" />
                    </g>
                  );
                })()}

                {/* Origin Ellipse Target (visible near T-24h) */}
                <g transform="translate(140, 240)">
                  <ellipse
                    rx="32"
                    ry="20"
                    fill="rgba(6, 182, 212, 0.12)"
                    stroke="#06B6D4"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                  />
                  <text x="0" y="32" fill="#0891B2" fontSize="9" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                    PROBABLE ORIGIN (±6.4 km)
                  </text>
                </g>

                {/* Reverse Advection Arrow Vector */}
                <g transform="translate(420, 260)">
                  <line x1="0" y1="0" x2="-35" y2="-20" stroke="#06B6D4" strokeWidth="2" markerEnd="url(#revArrow)" />
                  <text x="-40" y="-25" fill="#06B6D4" fontSize="8" fontFamily="monospace" textAnchor="middle">
                    REVERSE FORCING
                  </text>
                  <defs>
                    <marker id="revArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                      <polygon points="0 0, 6 3, 0 6" fill="#06B6D4" />
                    </marker>
                  </defs>
                </g>
              </svg>
            </div>

            {/* Bottom Coordinates & Step Note */}
            <div className="z-10 pt-2 border-t border-ink-tertiary/10 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-1.5 text-ink-secondary">
                <Crosshair className="w-3.5 h-3.5 text-marine" />
                <span>
                  CENTROID: {activeStep.centroid.lat.toFixed(3)}°N, {activeStep.centroid.lng.toFixed(3)}°E
                </span>
              </div>
              <span className="text-ink-tertiary">
                AREA: {activeStep.areaKm2} km²
              </span>
            </div>
          </div>

          {/* Right: Dynamic Telemetry Cards */}
          <div className="rewind-telemetry lg:col-span-5 flex flex-col gap-4">
            <div className="p-5 bg-surface rounded-xl border border-ink-tertiary/20 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-ink-tertiary uppercase tracking-wider">
                  TIME STEP ANALYSIS
                </span>
                <StatusBadge
                  variant={activeStepIndex === 4 ? 'critical' : 'verified'}
                  status={activeStep.label}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[11px] font-mono text-ink-tertiary block">SLICK SURFACE AREA</span>
                  <span className="font-mono text-2xl font-bold text-ink-primary">
                    {activeStep.areaKm2}
                  </span>
                  <span className="font-mono text-xs text-ink-secondary ml-1">km²</span>
                </div>
                <div>
                  <span className="text-[11px] font-mono text-ink-tertiary block">BACKTRACK ELAPSED</span>
                  <span className="font-mono text-2xl font-bold text-ocean">
                    {activeStep.offsetHours * -1}
                  </span>
                  <span className="font-mono text-xs text-ink-secondary ml-1">hours</span>
                </div>
              </div>

              <p className="text-xs font-body text-ink-secondary leading-relaxed pt-2 border-t border-ink-tertiary/10">
                {activeStep.description}
              </p>
            </div>

            {/* Environmental MetOcean Forcings */}
            <div className="p-5 bg-surface-subtle rounded-xl border border-ink-tertiary/15 space-y-3">
              <span className="font-mono text-xs text-ink-tertiary uppercase tracking-wider block">
                METOCEAN ENVIRONMENTAL CONDITIONS
              </span>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-white rounded-lg border border-ink-tertiary/10">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-ink-secondary mb-1">
                    <Wind className="w-3.5 h-3.5 text-sky-500" />
                    <span>ERA5 SURFACE WIND</span>
                  </div>
                  <div className="font-mono text-sm font-bold text-ink-primary">
                    {activeStep.wind.desc}
                  </div>
                </div>

                <div className="p-3 bg-white rounded-lg border border-ink-tertiary/10">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-ink-secondary mb-1">
                    <Waves className="w-3.5 h-3.5 text-teal-500" />
                    <span>INCOIS CURRENT</span>
                  </div>
                  <div className="font-mono text-sm font-bold text-ink-primary">
                    {activeStep.current.desc}
                  </div>
                </div>
              </div>
            </div>

            {/* Step Action Notice */}
            <div className="p-4 bg-marine/10 border border-marine/20 rounded-xl flex items-center justify-between text-xs font-mono">
              <span className="text-ink-primary">
                Origin convergence reached at T-24h
              </span>
              <span className="font-bold text-marine">
                PROCEED TO ORIGIN &rarr;
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Chapter07Rewind;
