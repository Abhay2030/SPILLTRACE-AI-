'use client';

import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { RefreshCw, Satellite, Radio, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface LoopStep {
  id: string;
  name: string;
  role: string;
  cadence: string;
  description: string;
}

const LOOP_STEPS: LoopStep[] = [
  { id: 'obs', name: 'OBSERVE', role: 'Wide-Area SAR Ingest', cadence: 'Every 6–12 hrs', description: 'Continuous polar-orbit SAR satellite constellations acquire multi-channel backscatter over Indian EEZ.' },
  { id: 'det', name: 'DETECT', role: 'Automated Anomaly Scan', cadence: 'Near-Real-Time (< 5m)', description: 'Adaptive thresholding filters maritime clutter and isolates dark backscatter candidates.' },
  { id: 'val', name: 'VALIDATE', role: 'Look-Alike Elimination', cadence: 'Instantaneous', description: 'Rules out biogenic algal slicks, wind shadows, and bathymetric anomalies with 94.2% precision.' },
  { id: 'tra', name: 'TRACE', role: 'Hydrodynamic Backtracking', cadence: '10,000 Particles', description: 'Unwinds currents and surface wind leeway to derive the probabilistic discharge envelope.' },
  { id: 'att', name: 'ATTRIBUTE', role: 'Vessel Interception', cadence: 'Deterministic', description: 'Correlates transponder kinematics and transponder gaps to identify culprit vessels.' },
  { id: 'ass', name: 'ASSESS', role: 'Threat & Ecological Audit', cadence: 'Dynamic', description: 'Overlays trajectory vectors against marine sanctuaries, fishing zones, and coastal infrastructure.' },
  { id: 'res', name: 'RESPOND', role: 'Asset Coordination', cadence: 'Decision Support', description: 'Dispatches Coast Guard patrol vessels, booms, and skimmers with optimal intercept trajectories.' },
  { id: 'mon', name: 'MONITOR', role: 'Continuous Surveillance', cadence: 'Persistent Loop', description: 'Succeeding satellite passes verify cleanup efficiency and update weathering states.' },
];

export function Chapter18Monitoring() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeStepId, setActiveStepId] = useState<string>('mon');

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 50%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.fromTo('.monitor-header', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 });
    tl.fromTo('.loop-pill', { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, stagger: 0.08, ease: 'back.out(1.2)' }, '-=0.3');
    tl.fromTo('.overpass-card', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '-=0.2');
  }, { scope: containerRef });

  const activeStep = LOOP_STEPS.find((s) => s.id === activeStepId) || LOOP_STEPS[7];

  return (
    <section
      ref={containerRef}
      className="chapter-section min-h-screen relative flex items-center justify-center p-6 md:p-12 lg:p-16"
    >
      <div className="z-10 w-full max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <div className="monitor-header text-center space-y-3">
          <SectionLabel title="CONTINUOUS INTELLIGENCE FEEDBACK LOOP" align="center" />
          <h2 className="font-display font-bold text-4xl md:text-6xl text-ink-primary tracking-tight">
            The Investigation Doesn't End at Attribution.
          </h2>
          <p className="font-body text-base md:text-lg text-ink-secondary max-w-2xl mx-auto">
            SpillTrace operates as an uninterrupted maritime surveillance cycle, refining hydrodynamic drift models and verifying containment with every subsequent satellite overpass.
          </p>
        </div>

        {/* 8-Step Closed Loop Stepper Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
          {LOOP_STEPS.map((step, idx) => {
            const isSelected = activeStepId === step.id;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStepId(step.id)}
                className={cn(
                  "loop-pill p-3.5 rounded-xl border transition-all duration-200 text-left flex flex-col justify-between gap-2",
                  isSelected
                    ? "bg-surface border-ocean ring-2 ring-ocean/30 shadow-md"
                    : "bg-surface border-ink-tertiary/15 hover:border-ink-tertiary/40 shadow-sm"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-ink-tertiary font-bold">
                    0{idx + 1}
                  </span>
                  {idx === 7 && (
                    <RefreshCw className="w-3 h-3 text-ocean animate-spin" />
                  )}
                </div>
                <div>
                  <h5 className="font-display text-xs font-bold text-ink-primary">
                    {step.name}
                  </h5>
                  <span className="font-mono text-[9px] text-ink-secondary block truncate">
                    {step.role.split(' ')[0]}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Step Detail & Next Overpass Telemetry */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Active Step Deep Dive Card */}
          <div className="lg:col-span-7 bg-surface rounded-2xl border border-ink-tertiary/20 p-6 md:p-8 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs text-ocean font-bold uppercase tracking-wider">
                  PIPELINE PHASE · {activeStep.name}
                </span>
                <span className="font-mono text-xs text-ink-tertiary">
                  UPDATE CADENCE: {activeStep.cadence}
                </span>
              </div>
              <h3 className="font-display text-2xl font-bold text-ink-primary">
                {activeStep.role}
              </h3>
              <p className="text-sm font-body text-ink-secondary mt-3 leading-relaxed">
                {activeStep.description}
              </p>
            </div>

            <div className="pt-4 border-t border-ink-tertiary/15 flex items-center justify-between font-mono text-xs text-ink-tertiary">
              <span>Status: <strong className="text-verified">ACTIVE SURVEILLANCE</strong></span>
              <span className="text-ocean">SELECT ANY PHASE TO INSPECT</span>
            </div>
          </div>

          {/* Next Satellite Revisit Telemetry */}
          <div className="overpass-card lg:col-span-5 bg-surface rounded-2xl border border-ink-tertiary/20 p-6 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs text-ink-tertiary uppercase tracking-wider">
                  NEXT SATELLITE REVISIT
                </span>
                <StatusBadge variant="verified" status="SCHEDULED" />
              </div>
              <h4 className="font-display text-xl font-bold text-ink-primary">
                Sentinel-1B Polar Pass
              </h4>
              <p className="text-xs font-mono text-ink-secondary mt-1">
                Orbit: Descending Pass #4821 · Sensor: C-SAR
              </p>
            </div>

            <div className="p-4 bg-surface-subtle rounded-xl border border-ink-tertiary/15 space-y-2">
              <div className="flex justify-between items-baseline font-mono text-xs">
                <span className="text-ink-secondary">COUNTDOWN TO ACQUISITION</span>
                <span className="font-mono text-2xl font-bold text-ocean">14h 22m</span>
              </div>
              <div className="w-full bg-ink-tertiary/20 h-1.5 rounded-full overflow-hidden">
                <div className="bg-ocean h-full w-[65%]" />
              </div>
            </div>

            <div className="text-[11px] font-mono text-ink-tertiary leading-relaxed">
              New radar data will verify boomed containment efficiency and automatically calibrate remaining slick thickness.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Chapter18Monitoring;
