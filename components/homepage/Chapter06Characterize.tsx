'use client';

import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ConfidenceBar } from '@/components/ui/ConfidenceBar';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Metric } from '@/components/ui/Metric';
import { Compass, Layers, Maximize2, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface SectorInfo {
  id: string;
  name: string;
  thickness: string;
  bonnCode: string;
  area: string;
  description: string;
}

const SECTORS: SectorInfo[] = [
  {
    id: 'core',
    name: 'Core Heavy Slick',
    thickness: '80–120 µm',
    bonnCode: 'Bonn Code 4/5 (Continuous True Colors)',
    area: '6.8 km²',
    description: 'Thick emulsified crude oil core. Exhibits maximum SAR backscatter dampening (-18.4 dB). Highest environmental persistence.',
  },
  {
    id: 'mid',
    name: 'Mid-field Slick',
    thickness: '20–50 µm',
    bonnCode: 'Bonn Code 3 (Metallic / Dark Sheen)',
    area: '7.4 km²',
    description: 'Spreading intermediate slick with partial weathering and water-in-oil emulsification.',
  },
  {
    id: 'fringe',
    name: 'Leading Sheen Fringe',
    thickness: '0.1–1.0 µm',
    bonnCode: 'Bonn Code 1/2 (Silver / Rainbow Sheen)',
    area: '4.2 km²',
    description: 'Micro-thin leading edge carried rapidly downwind at 47° azimuth. Subject to photo-oxidation and evaporation.',
  },
];

export function Chapter06Characterize() {
  const containerRef = useRef<HTMLElement>(null);
  const [selectedSector, setSelectedSector] = useState<string>('core');
  const [viewMode, setViewMode] = useState<'classification' | 'thickness'>('classification');

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 60%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.fromTo('.char-header', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 });

    tl.fromTo(
      '.spill-outline',
      { strokeDashoffset: 1200 },
      { strokeDashoffset: 0, duration: 2, ease: 'power2.inOut' },
      '-=0.3'
    );

    tl.fromTo('.spill-layer', { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 1, stagger: 0.2 }, '-=1.2');
    tl.fromTo('.spill-annotation', { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.6, stagger: 0.1 }, '-=0.5');

    tl.fromTo(
      '.char-metric',
      { x: 30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
      '-=1'
    );
  }, { scope: containerRef });

  const currentSectorData = SECTORS.find((s) => s.id === selectedSector) || SECTORS[0];

  return (
    <section
      ref={containerRef}
      className="chapter-section min-h-screen relative flex items-center justify-center p-6 md:p-12 lg:p-16"
    >
      <div className="z-10 w-full max-w-6xl mx-auto">
        <div className="char-header mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-ink-tertiary/15 pb-6">
          <div>
            <SectionLabel title="SPILL GEOMETRY & CHARACTERIZATION" />
            <h2 className="font-display font-bold text-3xl md:text-5xl text-ink-primary tracking-tight mt-2">
              Slick Morphometry & Bonn Classification
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('classification')}
              className={cn(
                "px-3 py-1.5 rounded text-xs font-mono transition-colors",
                viewMode === 'classification'
                  ? "bg-ocean text-white font-semibold shadow-sm"
                  : "bg-surface border border-ink-tertiary/20 text-ink-secondary hover:text-ink-primary"
              )}
            >
              BONN SECTORS
            </button>
            <button
              onClick={() => setViewMode('thickness')}
              className={cn(
                "px-3 py-1.5 rounded text-xs font-mono transition-colors",
                viewMode === 'thickness'
                  ? "bg-ocean text-white font-semibold shadow-sm"
                  : "bg-surface border border-ink-tertiary/20 text-ink-secondary hover:text-ink-primary"
              )}
            >
              THICKNESS PROFILE
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Visual: High-tech Scientific SVG Diagram */}
          <div className="lg:col-span-7 relative aspect-[4/3] bg-surface rounded-2xl p-6 border border-ink-tertiary/20 shadow-sm flex flex-col justify-between overflow-hidden">
            {/* Nautical Graticule & Coordinates */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-3">
              <span className="font-mono text-[11px] font-semibold text-ink-secondary bg-surface-subtle px-2 py-0.5 rounded border border-ink-tertiary/15">
                SAR CENTROID: 15.342°N, 72.115°E
              </span>
              <span className="font-mono text-[10px] text-marine uppercase">
                Dual-Pol VV/VH Segmented
              </span>
            </div>

            <div className="absolute top-4 right-4 z-10 flex items-center gap-2 font-mono text-[11px] text-ink-tertiary">
              <Compass className="w-4 h-4 text-marine" />
              <span>ALIGNMENT 047° NE</span>
            </div>

            {/* SVG Diagram Canvas */}
            <div className="relative w-full h-full flex items-center justify-center my-auto">
              <svg viewBox="0 0 500 380" className="w-full h-full max-h-[340px] select-none">
                <defs>
                  {/* Gradients for thickness visualization */}
                  <linearGradient id="spillCoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0B132B" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#1C2541" stopOpacity="0.9" />
                  </linearGradient>
                  <linearGradient id="spillMidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0891B2" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="#0284C7" stopOpacity="0.35" />
                  </linearGradient>
                  <linearGradient id="spillFringeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#BAE6FD" stopOpacity="0.1" />
                  </linearGradient>

                  {/* Grid pattern */}
                  <pattern id="nauticalGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-ink-tertiary/10" />
                  </pattern>
                </defs>

                {/* Background Grid */}
                <rect width="100%" height="100%" fill="url(#nauticalGrid)" />

                {/* 47 deg Elongation Vector Line */}
                <line
                  x1="120"
                  y1="280"
                  x2="380"
                  y2="90"
                  stroke="#0891B2"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  className="opacity-40"
                />

                {/* Outer Sheen Fringe */}
                <path
                  onClick={() => setSelectedSector('fringe')}
                  className={cn(
                    "spill-layer cursor-pointer transition-all duration-300",
                    selectedSector === 'fringe' ? "opacity-100 filter drop-shadow(0 0 8px rgba(56,189,248,0.4))" : "opacity-75 hover:opacity-90"
                  )}
                  d="M140,290 C90,260 80,190 140,140 C200,90 280,70 360,110 C440,150 430,220 370,270 C310,320 190,320 140,290 Z"
                  fill="url(#spillFringeGrad)"
                  stroke="#38BDF8"
                  strokeWidth={selectedSector === 'fringe' ? '2.5' : '1'}
                  strokeDasharray={selectedSector === 'fringe' ? 'none' : '3 2'}
                />

                {/* Mid-field Slick */}
                <path
                  onClick={() => setSelectedSector('mid')}
                  className={cn(
                    "spill-layer cursor-pointer transition-all duration-300",
                    selectedSector === 'mid' ? "opacity-100 filter drop-shadow(0 0 10px rgba(8,145,178,0.5))" : "opacity-85 hover:opacity-95"
                  )}
                  d="M170,265 C130,240 120,180 170,145 C220,110 280,95 340,130 C400,165 390,215 340,250 C290,285 210,290 170,265 Z"
                  fill="url(#spillMidGrad)"
                  stroke="#0891B2"
                  strokeWidth={selectedSector === 'mid' ? '2.5' : '1.5'}
                />

                {/* Core Emulsified Slick */}
                <path
                  onClick={() => setSelectedSector('core')}
                  className={cn(
                    "spill-layer cursor-pointer transition-all duration-300",
                    selectedSector === 'core' ? "opacity-100 filter drop-shadow(0 0 12px rgba(11,19,43,0.7))" : "opacity-90 hover:opacity-100"
                  )}
                  d="M200,240 C170,220 165,180 200,155 C235,130 280,120 320,145 C360,170 350,210 320,230 C280,255 230,260 200,240 Z"
                  fill="url(#spillCoreGrad)"
                  stroke="#06B6D4"
                  strokeWidth={selectedSector === 'core' ? '2.5' : '1.5'}
                />

                {/* Active Perimeter Contour animated */}
                <path
                  className="spill-outline pointer-events-none"
                  d="M140,290 C90,260 80,190 140,140 C200,90 280,70 360,110 C440,150 430,220 370,270 C310,320 190,320 140,290 Z"
                  fill="none"
                  stroke="#06B6D4"
                  strokeWidth="2"
                  strokeDasharray="1200"
                  strokeDashoffset="1200"
                />

                {/* Centroid Crosshair */}
                <g transform="translate(260, 192)">
                  <circle cx="0" cy="0" r="4" fill="#06B6D4" className="animate-ping" />
                  <circle cx="0" cy="0" r="3" fill="#FFFFFF" />
                  <line x1="-12" y1="0" x2="12" y2="0" stroke="#06B6D4" strokeWidth="1.5" />
                  <line x1="0" y1="-12" x2="0" y2="12" stroke="#06B6D4" strokeWidth="1.5" />
                </g>

                {/* Annotations & Callouts */}
                <g className="spill-annotation font-mono text-[10px]">
                  {/* Core callout */}
                  <line x1="280" y1="180" x2="330" y2="130" stroke="#06B6D4" strokeWidth="1" />
                  <circle cx="330" cy="130" r="2" fill="#06B6D4" />
                  <text x="335" y="133" fill="#0F172A" fontWeight="600">Core (100 µm)</text>

                  {/* Vector angle mark */}
                  <path d="M 340 100 A 30 30 0 0 0 320 85" fill="none" stroke="#0891B2" strokeWidth="1" />
                  <text x="345" y="88" fill="#0891B2" fontWeight="700">47°</text>
                </g>

                {/* Nautical Scale Ruler Bar */}
                <g transform="translate(30, 340)">
                  <line x1="0" y1="0" x2="100" y2="0" stroke="#475569" strokeWidth="2" />
                  <line x1="0" y1="-5" x2="0" y2="5" stroke="#475569" strokeWidth="2" />
                  <line x1="50" y1="-3" x2="50" y2="3" stroke="#475569" strokeWidth="1" />
                  <line x1="100" y1="-5" x2="100" y2="5" stroke="#475569" strokeWidth="2" />
                  <text x="50" y="-8" fill="#475569" fontSize="10" fontFamily="monospace" textAnchor="middle">
                    5.0 km (2.7 NM)
                  </text>
                </g>
              </svg>
            </div>

            {/* Interactive Sector Selector Footer */}
            <div className="z-10 pt-3 border-t border-ink-tertiary/10 flex items-center justify-between text-xs font-mono">
              <span className="text-ink-tertiary">SELECT REGION:</span>
              <div className="flex gap-2">
                {SECTORS.map((sector) => (
                  <button
                    key={sector.id}
                    onClick={() => setSelectedSector(sector.id)}
                    className={cn(
                      "px-2.5 py-1 rounded text-[11px] transition-all",
                      selectedSector === sector.id
                        ? "bg-ink-primary text-white font-semibold"
                        : "bg-ink-primary/5 text-ink-secondary hover:bg-ink-primary/10"
                    )}
                  >
                    {sector.name.split(' ')[0]} ({sector.area})
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Telemetry & Bonn Agreement Characterization */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Primary Metrics Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="char-metric p-4 rounded-xl bg-surface border border-ink-tertiary/15">
                <Metric label="TOTAL SURFACE AREA" value="18.4" unit="km² ±2.1" />
              </div>
              <div className="char-metric p-4 rounded-xl bg-surface border border-ink-tertiary/15">
                <Metric label="POLYGON PERIMETER" value="22.7" unit="km ±1.8" />
              </div>
              <div className="char-metric p-4 rounded-xl bg-surface border border-ink-tertiary/15">
                <Metric label="MAJOR AXIS AZIMUTH" value="47°" unit="NE" />
              </div>
              <div className="char-metric p-4 rounded-xl bg-surface border border-ink-tertiary/15">
                <Metric label="ESTIMATED DISCHARGE AGE" value="12–20" unit="hrs" />
              </div>
            </div>

            {/* Selected Sector Detail Card */}
            <div className="char-metric p-5 rounded-xl bg-surface-subtle border border-ink-tertiary/20 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-ink-tertiary tracking-wider">
                  INSPECTED SECTOR
                </span>
                <span className="text-xs font-mono font-bold text-ocean">
                  {currentSectorData.area} ({Math.round((parseFloat(currentSectorData.area) / 18.4) * 100)}% of total)
                </span>
              </div>

              <h4 className="font-display text-lg font-bold text-ink-primary">
                {currentSectorData.name}
              </h4>

              <div className="flex flex-wrap gap-2 text-[11px] font-mono">
                <span className="bg-ink-primary/5 px-2 py-0.5 rounded text-ink-primary border border-ink-tertiary/15">
                  Thickness: {currentSectorData.thickness}
                </span>
                <span className="bg-marine/10 px-2 py-0.5 rounded text-marine font-semibold">
                  {currentSectorData.bonnCode}
                </span>
              </div>

              <p className="text-xs font-body text-ink-secondary leading-relaxed">
                {currentSectorData.description}
              </p>
            </div>

            {/* Volumetric Estimation & Confidence */}
            <div className="char-metric p-5 rounded-xl bg-surface border border-ink-tertiary/15 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-ink-tertiary uppercase tracking-wider">
                  MINIMUM VOLUME ESTIMATE (BONN)
                </span>
                <span className="font-mono text-sm font-bold text-ink-primary">
                  142 metric tons (~165 m³)
                </span>
              </div>

              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-ink-tertiary">SEGMENTATION CONFIDENCE</span>
                  <span className="text-verified font-bold">0.942 (HIGH)</span>
                </div>
                <ConfidenceBar value={0.942} />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <StatusBadge variant="success" status="CALIBRATED AGAINST RADAR BACKSCATTER" />
                <span className="text-[10px] font-mono text-ink-tertiary">Sentinel-1A SAR</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Chapter06Characterize;
