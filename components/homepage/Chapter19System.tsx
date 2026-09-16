'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Satellite, BrainCircuit, Waves, Navigation, Network, ShieldAlert, RadioTower, Database, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface PipelineStage {
  step: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  description: string;
  specs: string;
}

const SYSTEM_PIPELINE: PipelineStage[] = [
  {
    step: '01',
    icon: Satellite,
    title: 'SPACEBORNE SENSOR INGESTION',
    subtitle: 'Multi-Mission Constellation Feed',
    description: 'Automated polling of ESA Sentinel-1 (C-band SAR) and ISRO RISAT/EOS-04 missions covering the 2.37 million km² Indian Exclusive Economic Zone.',
    specs: 'Resolution: 10m · Polarizations: VV+VH · Swath: 250km',
  },
  {
    step: '02',
    icon: BrainCircuit,
    title: 'NEURAL ANOMALY SEGMENTATION',
    subtitle: 'Adaptive CFAR & Deep Computer Vision',
    description: 'Lee-Sigma speckle filtering followed by ResNet-UNet dual-channel semantic segmentation to delineate oil slick boundaries with 94.2% precision.',
    specs: 'Inference latency: < 4.2s per scene · Bonn code thickness',
  },
  {
    step: '03',
    icon: Waves,
    title: 'METOCEAN FORCING ENGINE',
    subtitle: 'Coupled Hydrodynamics & Wave Drift',
    description: 'High-resolution INCOIS regional circulation models coupled with ECMWF ERA5 boundary layer winds and WaveWatch III Stokes drift radiation stresses.',
    specs: 'Horizontal grid: 1/12° · Leeway coefficient: 3.1%',
  },
  {
    step: '04',
    icon: Navigation,
    title: 'AIS KINEMATIC INTEGRATION',
    subtitle: 'Maritime Transponder Sifting',
    description: 'Ingests Class-A/B vessel transponder messages, reconstructing historical routes and flagging suspicious transponder silent gaps and anomalous decelerations.',
    specs: 'Coverage: 247 regional vessels · 5-stage deterministic filter',
  },
  {
    step: '05',
    icon: Network,
    title: 'MULTI-MODAL ATTRIBUTOR ENGINE',
    subtitle: 'Probabilistic Evidence Graph',
    description: 'Bayesian evidence fusion correlates the backward-traced origin probability field against candidate vessel spatio-temporal trajectories.',
    specs: 'Outputs legally defensible attribution index with uncertainty',
  },
  {
    step: '06',
    icon: FileText,
    title: 'FORENSIC DOSSIER GENERATION',
    subtitle: 'Admissible Maritime Prosecution Brief',
    description: 'Synthesizes satellite imagery, hydrodynamic run logs, AIS tracks, and vessel particulars into an immutable, court-admissible PDF investigation dossier.',
    specs: 'Format: Maritime Enforcement Standard · ICG & DG Shipping',
  },
];

export function Chapter19System() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 50%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.fromTo('.system-header', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 });
    tl.fromTo('.pipeline-card', { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 }, '-=0.3');
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="chapter-section min-h-screen relative flex flex-col justify-center p-6 md:p-12 lg:p-16"
    >
      <div className="z-10 w-full max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="system-header text-center space-y-3">
          <SectionLabel title="END-TO-END INTELLIGENCE ARCHITECTURE" align="center" />
          <h2 className="font-display font-bold text-4xl md:text-6xl text-ink-primary tracking-tight">
            The Complete Intelligence Pipeline.
          </h2>
          <p className="font-body text-base md:text-lg text-ink-secondary max-w-2xl mx-auto">
            From orbit to courtroom. An integrated, multi-disciplinary software architecture combining satellite remote sensing, ocean physics, and maritime law enforcement.
          </p>
        </div>

        {/* Closed-Loop Intelligence Cycle Diagram Banner */}
        <div className="p-6 bg-surface rounded-2xl border border-ocean/30 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-ink-tertiary/15 pb-3">
            <span className="font-mono text-xs font-bold text-ocean uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-ocean animate-ping" />
              CLOSED-LOOP OPERATIONAL INTELLIGENCE CYCLE
            </span>
            <span className="font-mono text-[11px] text-ink-tertiary">
              Full Feedback Iteration: 12h to 24h Orbit Cycle
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-1">
            <div className="p-3 bg-surface-subtle rounded-xl border border-ink-tertiary/15 space-y-1">
              <span className="font-mono text-[10px] text-ink-tertiary uppercase font-bold block">
                01 DETECTION
              </span>
              <h5 className="font-display text-xs font-bold text-ink-primary">SAR Ingestion</h5>
              <p className="text-[11px] font-body text-ink-secondary">Sentinel-1 C-SAR dampening delineation</p>
            </div>

            <div className="p-3 bg-surface-subtle rounded-xl border border-ink-tertiary/15 space-y-1">
              <span className="font-mono text-[10px] text-ink-tertiary uppercase font-bold block">
                02 ATTRIBUTION
              </span>
              <h5 className="font-display text-xs font-bold text-ink-primary">AIS Correlation</h5>
              <p className="text-[11px] font-body text-ink-secondary">Reverse drift trajectory candidate match</p>
            </div>

            <div className="p-3 bg-surface-subtle rounded-xl border border-ink-tertiary/15 space-y-1">
              <span className="font-mono text-[10px] text-ink-tertiary uppercase font-bold block">
                03 FORECASTING
              </span>
              <h5 className="font-display text-xs font-bold text-ink-primary">Forward Drift</h5>
              <p className="text-[11px] font-body text-ink-secondary">72h receptor exposure & impact cone</p>
            </div>

            <div className="p-3 bg-surface-subtle rounded-xl border border-ink-tertiary/15 space-y-1">
              <span className="font-mono text-[10px] text-ink-tertiary uppercase font-bold block">
                04 INTERVENTION
              </span>
              <h5 className="font-display text-xs font-bold text-ink-primary">Asset Dispatch</h5>
              <p className="text-[11px] font-body text-ink-secondary">AI-directed predictive interception</p>
            </div>

            <div className="p-3 bg-ocean/10 rounded-xl border border-ocean/30 space-y-1">
              <span className="font-mono text-[10px] text-ocean uppercase font-bold block">
                05 LOOP CLOSURE
              </span>
              <h5 className="font-display text-xs font-bold text-ocean">Satellite Re-Pass</h5>
              <p className="text-[11px] font-body text-ink-secondary">Quantitative containment validation</p>
            </div>
          </div>
        </div>

        {/* 6-Stage Architecture Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SYSTEM_PIPELINE.map((stage) => {
            const Icon = stage.icon;
            return (
              <div
                key={stage.step}
                className="pipeline-card p-6 bg-surface rounded-2xl border border-ink-tertiary/20 shadow-sm flex flex-col justify-between gap-4 hover:border-ocean/40 transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-ink-primary/5 flex items-center justify-center text-ocean">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs font-bold text-ink-tertiary">
                      PHASE {stage.step}
                    </span>
                  </div>

                  <div>
                    <span className="font-mono text-[10px] text-ink-tertiary uppercase font-bold tracking-wider block">
                      {stage.subtitle}
                    </span>
                    <h4 className="font-display text-base font-bold text-ink-primary mt-0.5">
                      {stage.title}
                    </h4>
                  </div>

                  <p className="text-xs font-body text-ink-secondary leading-relaxed">
                    {stage.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-ink-tertiary/10 font-mono text-[10px] text-ink-tertiary">
                  {stage.specs}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Chapter19System;
