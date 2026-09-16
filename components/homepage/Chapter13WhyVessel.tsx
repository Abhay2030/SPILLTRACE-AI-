'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ConfidenceBar } from '@/components/ui/ConfidenceBar';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { CheckCircle2, AlertOctagon, Radio, Gauge, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface EvidenceNode {
  title: string;
  category: string;
  description: string;
  confidence: string;
  badgeVariant: 'verified' | 'caution' | 'critical';
  icon: React.ComponentType<{ className?: string }>;
}

const EVIDENCE_CHAIN: EvidenceNode[] = [
  {
    title: 'SATELLITE RADAR CONFIRMATION',
    category: 'REMOTE SENSING',
    description: 'Sentinel-1A C-SAR dual-pol backscatter reveals 18.4 km² slick with -18.4 dB dampening contrast at 03:42 UTC.',
    confidence: 'CONFIRMED (0.94)',
    badgeVariant: 'verified',
    icon: CheckCircle2,
  },
  {
    title: 'BACKTRACK ORIGIN INTERSECTION',
    category: 'HYDRODYNAMICS',
    description: 'Lagrangian reverse particle advection places origin at 15.281°N, 72.048°E at T-14h. Horizon Trader was dead-center.',
    confidence: 'HIGH FIT (94%)',
    badgeVariant: 'verified',
    icon: CheckCircle2,
  },
  {
    title: '2-HOUR AIS SILENCE ANOMALY',
    category: 'SIGNAL INTELLIGENCE',
    description: 'Transponder ceased broadcasts from 13:30 to 15:30 UTC directly inside the probable origin zone. Unreported transponder blackout.',
    confidence: 'CRITICAL ANOMALY',
    badgeVariant: 'critical',
    icon: AlertOctagon,
  },
  {
    title: 'SPEED REDUCTION KINEMATICS',
    category: 'VESSEL TELEMETRY',
    description: 'Speed decelerated from cruise 12.5 kts to 9.1 kts prior to blackout. Characteristic profile of slow-speed bilge or slop discharge.',
    confidence: 'CORROBORATED',
    badgeVariant: 'caution',
    icon: Gauge,
  },
  {
    title: 'CARGO RISK COMPATIBILITY',
    category: 'VESSEL SPECIFICATION',
    description: 'Crude Oil Tanker (115,000 DWT) carrying heavy crude en route from Persian Gulf to Colombo. In ballast / cargo tank cleaning phase.',
    confidence: 'CONSISTENT',
    badgeVariant: 'verified',
    icon: ShieldCheck,
  },
];

export function Chapter13WhyVessel() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 50%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.fromTo('.why-header', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 });
    tl.fromTo('.evidence-step', { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, stagger: 0.12 }, '-=0.3');
    tl.fromTo('.compat-panel', { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6 }, '-=0.6');
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="chapter-section min-h-screen relative flex items-center justify-center p-6 md:p-12 lg:p-16"
    >
      <div className="z-10 w-full max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <div className="why-header text-center space-y-3">
          <SectionLabel title="EVIDENTIARY ATTRIBUTION CHAIN" align="center" />
          <h2 className="font-display font-bold text-4xl md:text-6xl text-ink-primary tracking-tight">
            Why Candidate A?
          </h2>
          <p className="font-body text-base md:text-lg text-ink-secondary max-w-2xl mx-auto">
            Attribution is not a black-box judgment. SpillTrace constructs an auditable, multi-modal evidence chain linking satellite, ocean, and signal intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: 5-Stage Evidentiary Narrative Chain */}
          <div className="lg:col-span-7 space-y-4">
            {EVIDENCE_CHAIN.map((node, idx) => {
              const Icon = node.icon;
              return (
                <div
                  key={idx}
                  className="evidence-step p-5 bg-surface rounded-xl border border-ink-tertiary/20 shadow-sm flex items-start gap-4 hover:border-ink-tertiary/40 transition-colors"
                >
                  <div
                    className={cn(
                      "w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5",
                      node.badgeVariant === 'critical'
                        ? "bg-critical/10 text-critical"
                        : node.badgeVariant === 'caution'
                        ? "bg-caution/10 text-caution"
                        : "bg-verified/10 text-verified"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[10px] text-ink-tertiary uppercase tracking-wider">
                        {node.category}
                      </span>
                      <StatusBadge variant={node.badgeVariant} status={node.confidence} />
                    </div>

                    <h4 className="font-display text-base font-bold text-ink-primary">
                      {node.title}
                    </h4>

                    <p className="text-xs font-body text-ink-secondary leading-relaxed pt-1">
                      {node.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Quantitative Compatibility Scorecard */}
          <div className="compat-panel lg:col-span-5 bg-surface rounded-2xl border border-ink-tertiary/20 p-6 shadow-sm space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs text-ink-tertiary uppercase tracking-wider">
                  VESSEL ATTRIBUTION INDEX
                </span>
                <StatusBadge variant="critical" status="PRIMARY SUSPECT" />
              </div>

              <h3 className="font-display text-2xl font-bold text-ink-primary">
                MV Horizon Trader
              </h3>
              <p className="text-xs font-mono text-ink-secondary">
                Panama Flag · Tanker · IMO 9876543
              </p>
            </div>

            {/* Evidence Score */}
            <div className="p-4 bg-surface-subtle rounded-xl border border-ink-tertiary/15 space-y-2">
              <div className="flex justify-between items-baseline font-mono text-xs">
                <span className="text-ink-tertiary">OVERALL ATTRIBUTION SCORE</span>
                <span className="font-display text-3xl font-bold text-critical">91.4%</span>
              </div>
              <ConfidenceBar value={0.914} />
            </div>

            {/* Sub-score bars */}
            <div className="space-y-3 font-mono text-xs">
              <span className="text-ink-tertiary uppercase text-[10px] tracking-wider block">
                CORRELATION DIMENSIONS
              </span>

              <div className="space-y-1">
                <div className="flex justify-between text-ink-secondary">
                  <span>Temporal Compatibility</span>
                  <span className="font-bold text-ink-primary">92%</span>
                </div>
                <div className="w-full bg-ink-tertiary/15 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-ocean h-full w-[92%]" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-ink-secondary">
                  <span>Spatial Proximity (DCA 1.2 km)</span>
                  <span className="font-bold text-ink-primary">89%</span>
                </div>
                <div className="w-full bg-ink-tertiary/15 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-ocean h-full w-[89%]" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-ink-secondary">
                  <span>Hydrodynamic Drift Conformance</span>
                  <span className="font-bold text-marine">94%</span>
                </div>
                <div className="w-full bg-ink-tertiary/15 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-marine h-full w-[94%]" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-ink-secondary">
                  <span>Kinematic Behavior & AIS Continuity</span>
                  <span className="font-bold text-critical">87% (Flagged)</span>
                </div>
                <div className="w-full bg-ink-tertiary/15 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full w-[87%]" />
                </div>
              </div>
            </div>

            {/* Forensic Case Navigation Button */}
            <div className="pt-2">
              <Link
                href="/vessel/VESSEL-A-001"
                className="w-full py-3 bg-ocean hover:bg-ocean/90 text-white rounded-xl font-mono text-xs font-bold tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                OPEN COMPLETE FORENSIC REPORT <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Chapter13WhyVessel;
