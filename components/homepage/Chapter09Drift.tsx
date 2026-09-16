'use client';

import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Metric } from '@/components/ui/Metric';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { TrendingUp, Compass, Clock, ShieldCheck, Flame, Droplets } from 'lucide-react';
import { cn } from '@/lib/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ForecastHorizon {
  id: string;
  hours: number;
  label: string;
  dispersionArea: string;
  centroid: string;
  beachingRisk: string;
  riskVariant: 'success' | 'warning' | 'critical' | 'neutral';
  evaporationPct: number;
  emulsificationPct: number;
}

const HORIZONS: ForecastHorizon[] = [
  {
    id: 'h6',
    hours: 6,
    label: '+6 Hours',
    dispersionArea: '22.8 km²',
    centroid: '15.17°N, 72.11°E',
    beachingRisk: '< 0.1% (Safe Offshore)',
    riskVariant: 'success',
    evaporationPct: 18,
    emulsificationPct: 22,
  },
  {
    id: 'h12',
    hours: 12,
    label: '+12 Hours',
    dispersionArea: '29.4 km²',
    centroid: '15.13°N, 72.13°E',
    beachingRisk: '< 0.5% (Safe Offshore)',
    riskVariant: 'success',
    evaporationPct: 24,
    emulsificationPct: 41,
  },
  {
    id: 'h24',
    hours: 24,
    label: '+24 Hours',
    dispersionArea: '44.2 km²',
    centroid: '15.05°N, 72.15°E',
    beachingRisk: '< 1.8% (Offshore Corridor)',
    riskVariant: 'warning',
    evaporationPct: 28,
    emulsificationPct: 58,
  },
  {
    id: 'h48',
    hours: 48,
    label: '+48 Hours',
    dispersionArea: '72.0 km²',
    centroid: '14.88°N, 72.22°E',
    beachingRisk: '3.4% (Coastal Watch)',
    riskVariant: 'warning',
    evaporationPct: 31,
    emulsificationPct: 74,
  },
];

export function Chapter09Drift() {
  const containerRef = useRef<HTMLElement>(null);
  const [selectedHorizon, setSelectedHorizon] = useState<ForecastHorizon>(HORIZONS[2]); // Default +24h

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 50%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.fromTo('.drift-header', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 });

    // Wedge expansion animations
    tl.fromTo('.wedge-6h', { scale: 0, opacity: 0, transformOrigin: 'top left' }, { scale: 1, opacity: 0.8, duration: 0.4 });
    tl.fromTo('.wedge-12h', { scale: 0, opacity: 0, transformOrigin: 'top left' }, { scale: 1, opacity: 0.6, duration: 0.4 });
    tl.fromTo('.wedge-24h', { scale: 0, opacity: 0, transformOrigin: 'top left' }, { scale: 1, opacity: 0.4, duration: 0.5 });
    tl.fromTo('.wedge-48h', { scale: 0, opacity: 0, transformOrigin: 'top left' }, { scale: 1, opacity: 0.25, duration: 0.5 });

    tl.fromTo('.drift-arrow', { strokeDashoffset: 400 }, { strokeDashoffset: 0, duration: 1, ease: 'power2.out' }, '-=0.5');
    tl.fromTo('.drift-metric-card', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 }, '-=0.5');
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="chapter-section min-h-screen relative flex flex-col justify-center p-6 md:p-12 lg:p-16"
    >
      <div className="z-10 w-full max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="drift-header text-center space-y-3">
          <SectionLabel title="FORWARD HYDRODYNAMIC DRIFT FORECAST" align="center" />
          <h2 className="font-display font-bold text-4xl md:text-6xl text-ink-primary tracking-tight">
            Where will it go next?
          </h2>
          <p className="font-body text-base md:text-lg text-ink-secondary max-w-2xl mx-auto">
            Coupled HYCOM hydrodynamic circulation, WaveWatch III radiation stress, and GFS/ERA5 wind forcing predict the spill trajectory and weathering evolution.
          </p>
        </div>

        {/* Forecast Cone SVG Visualization */}
        <div className="relative w-full max-w-4xl mx-auto bg-surface rounded-2xl p-6 border border-ink-tertiary/20 shadow-sm flex flex-col justify-between overflow-hidden">
          {/* Top Bar inside Graphic */}
          <div className="flex items-center justify-between text-xs font-mono border-b border-ink-tertiary/10 pb-3 z-10">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-ocean" />
              <span className="font-bold text-ink-primary">MEAN DRIFT VECTOR: 142° SSE @ 0.82 KTS</span>
            </div>
            <span className="text-ink-tertiary">MODEL HORIZON: 48 HOURS</span>
          </div>

          <div className="relative w-full h-[320px] flex items-center justify-center my-2">
            <svg viewBox="0 0 650 340" className="w-full h-full select-none">
              <defs>
                <marker id="driftArrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#0284C7" />
                </marker>
              </defs>

              <g transform="translate(80, 70)">
                {/* Reference Coordinate Grid */}
                <g stroke="#94A3B8" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.3">
                  <line x1="0" y1="0" x2="520" y2="0" />
                  <line x1="0" y1="0" x2="0" y2="240" />
                </g>

                {/* +48h Horizon Envelope */}
                <path
                  className="wedge-48h cursor-pointer transition-opacity"
                  onClick={() => setSelectedHorizon(HORIZONS[3])}
                  d="M0,0 L420,250 A 490,490 0 0,0 520,30 L 260,20 A 280,280 0 0,1 210,160 Z"
                  fill="rgba(2, 132, 199, 0.08)"
                  stroke="#0284C7"
                  strokeWidth={selectedHorizon.hours === 48 ? '2' : '1'}
                  strokeDasharray="4 4"
                />

                {/* +24h Horizon Envelope */}
                <path
                  className="wedge-24h cursor-pointer transition-opacity"
                  onClick={() => setSelectedHorizon(HORIZONS[2])}
                  d="M0,0 L260,160 A 300,300 0 0,0 320,10 L 150,10 A 160,160 0 0,1 120,95 Z"
                  fill="rgba(6, 182, 212, 0.18)"
                  stroke="#06B6D4"
                  strokeWidth={selectedHorizon.hours === 24 ? '2.5' : '1.5'}
                />

                {/* +12h Horizon Envelope */}
                <path
                  className="wedge-12h cursor-pointer transition-opacity"
                  onClick={() => setSelectedHorizon(HORIZONS[1])}
                  d="M0,0 L150,95 A 170,170 0 0,0 180,0 L 80,0 A 90,90 0 0,1 70,50 Z"
                  fill="rgba(6, 182, 212, 0.35)"
                  stroke="#06B6D4"
                  strokeWidth={selectedHorizon.hours === 12 ? '2.5' : '1.5'}
                />

                {/* +6h Horizon Envelope */}
                <path
                  className="wedge-6h cursor-pointer transition-opacity"
                  onClick={() => setSelectedHorizon(HORIZONS[0])}
                  d="M0,0 L70,50 A 90,90 0 0,0 90,-5 Z"
                  fill="rgba(6, 182, 212, 0.55)"
                  stroke="#0891B2"
                  strokeWidth={selectedHorizon.hours === 6 ? '2.5' : '1.5'}
                />

                {/* Principal Trajectory Vector Line */}
                <path
                  className="drift-arrow"
                  d="M0,0 Q180,70 420,160"
                  fill="none"
                  stroke="#0284C7"
                  strokeWidth="2.5"
                  markerEnd="url(#driftArrowhead)"
                  strokeDasharray="400"
                  strokeDashoffset="0"
                />

                {/* T0 Center Origin Dot */}
                <circle cx="0" cy="0" r="7" fill="#0F172A" stroke="#FFFFFF" strokeWidth="2" />
                <text x="-15" y="-10" className="font-mono text-xs font-bold fill-ink-primary" textAnchor="end">
                  T0 (Observation)
                </text>

                {/* Horizon Labels */}
                <text x="80" y="70" className="font-mono text-[11px] font-bold fill-ink-primary">+6h</text>
                <text x="170" y="125" className="font-mono text-[11px] font-bold fill-ink-primary">+12h</text>
                <text x="290" y="195" className="font-mono text-[11px] font-bold fill-ink-primary">+24h</text>
                <text x="440" y="275" className="font-mono text-[11px] font-bold fill-ink-primary">+48h</text>

                {/* Coastline Reference Vector */}
                <g transform="translate(380, -20)">
                  <line x1="0" y1="0" x2="60" y2="180" stroke="#94A3B8" strokeWidth="2" strokeDasharray="6 4" />
                  <text x="70" y="70" fill="#64748B" fontSize="10" fontFamily="monospace">
                    INDIAN COAST (~180 km E)
                  </text>
                </g>
              </g>
            </svg>
          </div>

          {/* Interactive Timestep Selector */}
          <div className="z-10 pt-3 border-t border-ink-tertiary/10 flex items-center justify-between text-xs font-mono">
            <span className="text-ink-tertiary">SELECT FORECAST HORIZON:</span>
            <div className="flex gap-2">
              {HORIZONS.map((h) => (
                <button
                  key={h.id}
                  onClick={() => setSelectedHorizon(h)}
                  className={cn(
                    "px-3 py-1 rounded text-xs transition-all",
                    selectedHorizon.id === h.id
                      ? "bg-ocean text-white font-bold shadow-sm"
                      : "bg-surface-subtle text-ink-secondary hover:text-ink-primary border border-ink-tertiary/15"
                  )}
                >
                  {h.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Telemetry & Weathering Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="drift-metric-card p-5 bg-surface rounded-xl border border-ink-tertiary/15 shadow-sm">
            <Metric label="PROJECTED AREA" value={selectedHorizon.dispersionArea} />
          </div>

          <div className="drift-metric-card p-5 bg-surface rounded-xl border border-ink-tertiary/15 shadow-sm">
            <Metric label="PREDICTED CENTROID" value={selectedHorizon.centroid} />
          </div>

          <div className="drift-metric-card p-5 bg-surface rounded-xl border border-ink-tertiary/15 shadow-sm flex flex-col justify-between">
            <span className="text-xs font-mono text-ink-tertiary uppercase tracking-wider">BEACHING PROBABILITY</span>
            <div className="mt-2">
              <span className="font-mono text-xl font-bold text-ink-primary block mb-2">
                {selectedHorizon.beachingRisk}
              </span>
              <StatusBadge variant={selectedHorizon.riskVariant} status="OFFSHORE EEZ" />
            </div>
          </div>

          <div className="drift-metric-card p-5 bg-surface rounded-xl border border-ink-tertiary/15 shadow-sm flex flex-col justify-between">
            <span className="text-xs font-mono text-ink-tertiary uppercase tracking-wider">WEATHERING LOSS</span>
            <div className="mt-2 space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-ink-secondary flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-amber-500" /> Evaporation
                </span>
                <span className="font-bold text-ink-primary">{selectedHorizon.evaporationPct}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-secondary flex items-center gap-1">
                  <Droplets className="w-3.5 h-3.5 text-ocean" /> Emulsification
                </span>
                <span className="font-bold text-marine">{selectedHorizon.emulsificationPct}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Chapter09Drift;
