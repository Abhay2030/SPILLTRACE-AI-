'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Check, X, Minus, AlertTriangle, ShieldCheck, Scale } from 'lucide-react';
import { cn } from '@/lib/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ComparisonRow {
  factor: string;
  dimension: string;
  vesselA: { value: string; pass: boolean };
  vesselB: { value: string; pass: boolean; note?: string };
}

const COMPARISONS: ComparisonRow[] = [
  {
    factor: 'TEMPORAL INTERSECTION',
    dimension: 'Time Coincidence',
    vesselA: { value: '92% (Coincident at T-14h)', pass: true },
    vesselB: { value: '74% (6 hours premature)', pass: false, note: 'Passed before release window' },
  },
  {
    factor: 'CLOSEST APPROACH (DCA)',
    dimension: 'Spatial Proximity',
    vesselA: { value: '1.2 km from Centroid', pass: true },
    vesselB: { value: '8.2 km from Centroid', pass: false, note: 'Outside 80% origin ellipse' },
  },
  {
    factor: 'HYDRODYNAMIC DRIFT CONFORMANCE',
    dimension: 'Drift Physics',
    vesselA: { value: '94% Lagrangian Fit', pass: true },
    vesselB: { value: '62% Model Divergence', pass: false, note: 'Slick would have drifted elsewhere' },
  },
  {
    factor: 'AIS INTEGRITY & BEHAVIOR',
    dimension: 'Signal Intelligence',
    vesselA: { value: '2-Hour Dark Gap Flagged', pass: false },
    vesselB: { value: '100% Broadcast Continuity', pass: true, note: 'Normal commercial pattern' },
  },
  {
    factor: 'SPEED PROFILE & VARIANCE',
    dimension: 'Kinematic Profile',
    vesselA: { value: '3.4 kt Deceleration', pass: false },
    vesselB: { value: 'Steady 15.2 kts Cruise', pass: true, note: 'No slowdown or loitering' },
  },
];

export function Chapter14WhyNot() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 50%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.fromTo('.why-not-header', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 });
    tl.fromTo('.comp-table-row', { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, stagger: 0.1 }, '-=0.3');
    tl.fromTo('.contradiction-card', { x: 25, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, stagger: 0.12 }, '-=0.5');
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="chapter-section min-h-screen relative flex items-center justify-center p-6 md:p-12 lg:p-16"
    >
      <div className="z-10 w-full max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <div className="why-not-header text-center space-y-3">
          <SectionLabel title="EXCULPATORY EVIDENCE & COUNTER-ANALYSIS" align="center" />
          <h2 className="font-display font-bold text-4xl md:text-6xl text-ink-primary tracking-tight">
            Why Not Vessel B?
          </h2>
          <p className="font-body text-base md:text-lg text-ink-secondary max-w-2xl mx-auto">
            Proximity alone is not guilt. SpillTrace prevents false accusations by evaluating physical and temporal contradictions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Scientific Side-by-Side Comparison Table */}
          <div className="lg:col-span-7 bg-surface rounded-2xl border border-ink-tertiary/20 shadow-sm overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-12 bg-surface-subtle border-b border-ink-tertiary/15 p-4 text-xs font-mono">
              <div className="col-span-5 font-bold text-ink-tertiary uppercase tracking-wider">
                EVALUATION FACTOR
              </div>
              <div className="col-span-3 text-center font-bold text-ocean">
                VESSEL A (HORIZON)
              </div>
              <div className="col-span-4 text-center font-bold text-ink-tertiary">
                VESSEL B (PACIFIC)
              </div>
            </div>

            {/* Comparison Rows */}
            <div className="divide-y divide-ink-tertiary/10 text-xs font-mono">
              {COMPARISONS.map((row, idx) => (
                <div
                  key={idx}
                  className="comp-table-row grid grid-cols-12 p-4 items-center hover:bg-surface-subtle/50 transition-colors"
                >
                  <div className="col-span-5">
                    <span className="font-bold text-ink-primary block">{row.factor}</span>
                    <span className="text-[10px] text-ink-tertiary">{row.dimension}</span>
                  </div>

                  {/* Vessel A Cell */}
                  <div className="col-span-3 text-center">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 font-bold",
                        row.vesselA.pass ? "text-verified" : "text-critical"
                      )}
                    >
                      {row.vesselA.pass ? (
                        <Check className="w-3.5 h-3.5" />
                      ) : (
                        <AlertTriangle className="w-3.5 h-3.5" />
                      )}
                      {row.vesselA.value.split(' ')[0]}
                    </span>
                  </div>

                  {/* Vessel B Cell */}
                  <div className="col-span-4 text-center">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 font-bold",
                        row.vesselB.pass ? "text-verified" : "text-critical"
                      )}
                    >
                      {row.vesselB.pass ? (
                        <Check className="w-3.5 h-3.5" />
                      ) : (
                        <X className="w-3.5 h-3.5" />
                      )}
                      {row.vesselB.value.split(' ')[0]}
                    </span>
                    {row.vesselB.note && (
                      <span className="block text-[10px] text-ink-tertiary mt-0.5">
                        {row.vesselB.note}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Table Footer Summary */}
            <div className="p-4 bg-surface-subtle border-t border-ink-tertiary/15 flex items-center justify-between text-xs font-mono">
              <span className="text-ink-tertiary">ATTRIBUTION STATUS:</span>
              <div className="flex gap-4">
                <span className="text-critical font-bold">Vessel A: 91.4% (SOURCE_VESSEL)</span>
                <span className="text-ink-tertiary font-bold">Vessel B: 68.7% (EXCLUDED)</span>
              </div>
            </div>
          </div>

          {/* Right: Contradiction Cards & Legal Defensibility */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="font-display text-lg font-bold text-ink-primary">
              Three Fatal Contradictions for Vessel B:
            </h3>

            <div className="contradiction-card p-4 bg-surface rounded-xl border border-ink-tertiary/15 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-critical">
                <X className="w-4 h-4 text-critical" />
                <span>CONTRADICTION 1: 6-HOUR TEMPORAL OFFSET</span>
              </div>
              <p className="text-xs font-body text-ink-secondary leading-relaxed pl-6">
                MV Pacific Voyager cleared the sector at 06:00 UTC, well before estimated slick release (12–16h prior to SAR observation). Had it released oil, the slick would have drifted 35 km farther southeast.
              </p>
            </div>

            <div className="contradiction-card p-4 bg-surface rounded-xl border border-ink-tertiary/15 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-critical">
                <X className="w-4 h-4 text-critical" />
                <span>CONTRADICTION 2: 8.2 KM SPATIAL DISCREPANCY</span>
              </div>
              <p className="text-xs font-body text-ink-secondary leading-relaxed pl-6">
                Its closest approach remained strictly outside the 80% Bayesian origin confidence ellipse. Wind drift cannot reconcile this spatial separation.
              </p>
            </div>

            <div className="contradiction-card p-4 bg-surface rounded-xl border border-ink-tertiary/15 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-verified">
                <ShieldCheck className="w-4 h-4 text-verified" />
                <span>EXCULPATORY AIS CONTINUITY</span>
              </div>
              <p className="text-xs font-body text-ink-secondary leading-relaxed pl-6">
                Broadcast regular 10-second AIS pings with steady 15.2-knot transit and consistent commercial navigational heading. No anomalous loitering.
              </p>
            </div>

            {/* Core SIH Judging Philosophy Pill */}
            <div className="p-4 bg-ocean/5 border border-ocean/20 rounded-xl flex items-start gap-3">
              <Scale className="w-5 h-5 text-ocean shrink-0 mt-0.5" />
              <p className="text-xs font-body text-ink-secondary italic leading-relaxed">
                "SpillTrace upholds the presumption of innocence in maritime law. Rigorous rejection of near-miss vessels is as essential as attributing the actual offender."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Chapter14WhyNot;
