'use client';

import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Metric } from '@/components/ui/Metric';
import { Filter, Users, Clock, Navigation, Compass, AlertCircle, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface FilterStage {
  step: number;
  count: number;
  label: string;
  subhead: string;
  criteria: string;
  reductionPct: string;
  badge: string;
  badgeVariant: 'neutral' | 'verified' | 'caution' | 'critical';
}

const STAGES: FilterStage[] = [
  {
    step: 1,
    count: 247,
    label: 'SURVEILLANCE FLEET',
    subhead: 'All active AIS transponders in Arabian Sea incident sector',
    criteria: 'Spatial bounding box 50 NM around observation point',
    reductionPct: 'Baseline (100%)',
    badge: 'RAW FLEET',
    badgeVariant: 'neutral',
  },
  {
    step: 2,
    count: 84,
    label: 'TEMPORAL WINDOW FILTER',
    subhead: 'Vessels operating within estimated release age (12–20h ± 4h)',
    criteria: 'Transmission recorded between T-24h and T0',
    reductionPct: '-66% excluded',
    badge: 'TIME COINCIDENT',
    badgeVariant: 'neutral',
  },
  {
    step: 3,
    count: 18,
    label: 'PROXIMITY CORRIDOR FILTER',
    subhead: 'Vessels with track line passing within origin uncertainty radius',
    criteria: 'Distance of closest approach (DCA) ≤ 15.0 km from centroid',
    reductionPct: '-79% excluded',
    badge: 'PROXIMATE',
    badgeVariant: 'caution',
  },
  {
    step: 4,
    count: 5,
    label: 'TRAJECTORY INTERSECTION',
    subhead: 'Kinematic alignment with backtracked oil origin ellipse',
    criteria: 'Direct spatial intersection with 80% origin probability field',
    reductionPct: '-72% excluded',
    badge: 'INTERSECTING',
    badgeVariant: 'caution',
  },
  {
    step: 5,
    count: 3,
    label: 'DRIFT RECONCILIATION',
    subhead: 'Hydrodynamically compatible release candidates',
    criteria: 'Speed, heading, and cargo profile compatible with discharge',
    reductionPct: 'Final Candidates',
    badge: 'ATTRIBUTION CANDIDATES',
    badgeVariant: 'critical',
  },
];

export function Chapter11AIS() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeStageIdx, setActiveStageIdx] = useState<number>(4); // Default to final stage 3 vessels

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 50%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.fromTo('.ais-header', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 });
    tl.fromTo('.ais-stepper', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '-=0.3');
    tl.fromTo('.ais-counter-box', { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.2)' }, '-=0.2');
  }, { scope: containerRef });

  const activeStage = STAGES[activeStageIdx];

  return (
    <section
      ref={containerRef}
      className="chapter-section min-h-screen relative flex items-center justify-center p-6 md:p-12 lg:p-16"
    >
      <div className="z-10 w-full max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="ais-header text-center space-y-3">
          <SectionLabel title="AIS KINEMATIC RECONSTRUCTION" align="center" />
          <h2 className="font-display font-bold text-4xl md:text-6xl text-ink-primary tracking-tight">
            247 Vessels to 3 Candidates.
          </h2>
          <p className="font-body text-base md:text-lg text-ink-secondary max-w-2xl mx-auto">
            A multi-stage deterministic filtering funnel sifts through regional maritime transponder telemetry to isolate candidate polluters.
          </p>
        </div>

        {/* Funnel Stepper Navigation */}
        <div className="ais-stepper w-full bg-surface rounded-2xl border border-ink-tertiary/20 p-4 md:p-6 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {STAGES.map((s, idx) => {
              const isSelected = idx === activeStageIdx;
              return (
                <button
                  key={s.step}
                  onClick={() => setActiveStageIdx(idx)}
                  className={cn(
                    "p-3 rounded-xl text-left border transition-all duration-200 flex flex-col justify-between gap-2",
                    isSelected
                      ? "bg-ocean/10 border-ocean shadow-sm ring-1 ring-ocean/50"
                      : "bg-surface border-ink-tertiary/15 hover:border-ink-tertiary/40"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-ink-tertiary font-bold">
                      STAGE 0{s.step}
                    </span>
                    <span
                      className={cn(
                        "font-mono text-xs font-bold px-1.5 py-0.5 rounded",
                        isSelected ? "bg-ocean text-white" : "bg-ink-primary/5 text-ink-secondary"
                      )}
                    >
                      {s.count}
                    </span>
                  </div>
                  <span className="font-display text-xs font-bold text-ink-primary line-clamp-1">
                    {s.label.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Stage Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Large Animated Counter Card */}
          <div className="ais-counter-box lg:col-span-5 bg-surface rounded-2xl border border-ink-tertiary/20 p-8 shadow-sm flex flex-col items-center justify-center text-center space-y-4 relative overflow-hidden">
            <div className="font-mono text-xs text-ink-tertiary uppercase tracking-widest">
              QUALIFYING MARITIME TARGETS
            </div>

            <div className="font-display font-bold text-7xl md:text-9xl text-ink-primary tracking-tighter tabular-nums transition-all">
              {activeStage.count}
            </div>

            <div className="space-y-1">
              <StatusBadge variant={activeStage.badgeVariant} status={activeStage.badge} />
              <p className="font-mono text-xs text-ink-tertiary pt-2">
                {activeStage.reductionPct}
              </p>
            </div>
          </div>

          {/* Detailed Criteria & Pipeline Breakdown */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 bg-surface rounded-2xl border border-ink-tertiary/20 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-ocean font-bold uppercase tracking-wider">
                  STAGE 0{activeStage.step} EVALUATION
                </span>
                <span className="font-mono text-xs text-ink-tertiary">
                  STEP {activeStage.step} OF 5
                </span>
              </div>

              <h3 className="font-display text-2xl font-bold text-ink-primary">
                {activeStage.label}
              </h3>

              <p className="text-sm font-body text-ink-secondary leading-relaxed">
                {activeStage.subhead}
              </p>

              <div className="p-4 bg-surface-subtle rounded-xl border border-ink-tertiary/15 space-y-1.5">
                <span className="font-mono text-[11px] text-ink-tertiary uppercase font-bold block">
                  ALGORITHMIC SELECTION CRITERIA
                </span>
                <p className="font-mono text-xs text-ink-primary font-medium">
                  &gt; {activeStage.criteria}
                </p>
              </div>
            </div>

            {/* Quick Summary Pill Bar */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-4 bg-surface rounded-xl border border-ink-tertiary/15 text-center">
                <span className="font-mono text-[10px] text-ink-tertiary uppercase block">TOTAL EXCLUDED</span>
                <span className="font-mono text-lg font-bold text-ink-primary">
                  {247 - activeStage.count}
                </span>
              </div>
              <div className="p-4 bg-surface rounded-xl border border-ink-tertiary/15 text-center">
                <span className="font-mono text-[10px] text-ink-tertiary uppercase block">RETENTION RATE</span>
                <span className="font-mono text-lg font-bold text-marine">
                  {((activeStage.count / 247) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="p-4 bg-surface rounded-xl border border-ink-tertiary/15 text-center">
                <span className="font-mono text-[10px] text-ink-tertiary uppercase block">VERIFICATION</span>
                <span className="font-mono text-lg font-bold text-verified">
                  DETERMINISTIC
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Chapter11AIS;
