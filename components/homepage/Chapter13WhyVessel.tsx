'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SectionLabel, ConfidenceBar, StatusBadge } from '@/components/ui';
import { cn } from '@/lib/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const evidenceChain = [
  { title: 'SATELLITE OBSERVATION', desc: 'Sentinel-1A detected anomaly at 03:42 UTC', conf: 'HIGH', type: 'verified' },
  { title: 'OIL SPILL CONFIRMED', desc: '94.2% probability, 18.4 km²', conf: 'HIGH', type: 'verified' },
  { title: 'ORIGIN ZONE TRACED', desc: 'Drift model backtrack to 15.28°N, 72.05°E', conf: 'MEDIUM', type: 'caution' },
  { title: 'AIS POSITION MATCH', desc: 'Vessel passed through origin zone at T-14h', conf: 'HIGH', type: 'verified' },
  { title: 'AIS GAP DETECTED', desc: '2-hour transmission gap near origin', conf: 'MEDIUM', type: 'caution' },
  { title: 'DRIFT COMPATIBILITY', desc: '94% match with ocean current model', conf: 'HIGH', type: 'verified' },
];

export function Chapter13WhyVessel() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 50%',
      },
    });

    tl.from('.evidence-node', {
      x: -30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power2.out',
    });

    tl.from('.evidence-line', {
      scaleY: 0,
      transformOrigin: 'top',
      duration: 0.8,
      ease: 'power1.inOut',
    }, '-=1');

    tl.from('.compat-bar', {
      scaleX: 0,
      transformOrigin: 'left',
      duration: 1,
      stagger: 0.1,
      ease: 'power3.out',
    }, '-=0.5');

  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="chapter-section min-h-screen relative flex flex-col justify-center py-24 px-4 md:px-12 lg:px-24"
    >
      <div className="absolute top-12 left-0 w-full flex justify-center">
        <SectionLabel title="EVIDENCE EXPLANATION" />
      </div>

      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: Text */}
        <div className="space-y-8 pr-8">
          <h2 className="text-4xl md:text-5xl font-display font-medium text-ink-primary">
            Why Candidate A?
          </h2>
          <p className="font-body text-lg text-ink-secondary leading-relaxed">
            SpillTrace’s attribution engine doesn’t just output a score—it provides a verifiable evidentiary chain. 
          </p>
          <p className="font-body text-lg text-ink-secondary leading-relaxed">
            By combining satellite timestamps, AIS trajectory intersections, and hydrodynamic backward-tracking, the model isolates <span className="font-bold text-ocean">MV Horizon Trader</span> as the only vessel mathematically capable of generating the observed anomaly.
          </p>

          <div className="flex flex-col gap-4 mt-8">
            {evidenceChain.map((item, idx) => (
              <div key={idx} className="evidence-node flex gap-4 items-start p-4 bg-surface rounded-lg border border-ink-tertiary/20">
                <div className="w-2 h-2 rounded-full bg-ocean mt-2 flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-ink-primary text-sm">{item.title}</span>
                    <StatusBadge variant={item.type as any} size="sm" status={item.conf} />
                  </div>
                  <p className="text-xs text-ink-secondary">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Compatibility Breakdown */}
        <div className="bg-surface-elevated p-8 rounded-2xl border border-border shadow-card space-y-6">
          <h3 className="text-xl font-display font-medium text-ink-primary mb-4">
            Compatibility Breakdown
          </h3>

          <div>
            <div className="flex justify-between mb-2">
              <span className="font-body text-sm text-ink-secondary">Temporal Compatibility</span>
              <span className="font-mono text-sm">92%</span>
            </div>
            <div className="w-full bg-ink-tertiary/20 h-2 rounded-full overflow-hidden">
              <div className="compat-bar bg-ocean h-full rounded-full w-[92%]"></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <span className="font-body text-sm text-ink-secondary">Spatial Compatibility</span>
              <span className="font-mono text-sm">89%</span>
            </div>
            <div className="w-full bg-ink-tertiary/20 h-2 rounded-full overflow-hidden">
              <div className="compat-bar bg-ocean h-full rounded-full w-[89%]"></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="font-body text-sm text-ink-secondary">Drift Compatibility</span>
              <span className="font-mono text-sm">94%</span>
            </div>
            <div className="w-full bg-ink-tertiary/20 h-2 rounded-full overflow-hidden">
              <div className="compat-bar bg-marine h-full rounded-full w-[94%]"></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="font-body text-sm text-ink-secondary">Trajectory Consistency</span>
              <span className="font-mono text-sm">87%</span>
            </div>
            <div className="w-full bg-ink-tertiary/20 h-2 rounded-full overflow-hidden">
              <div className="compat-bar bg-ocean h-full rounded-full w-[87%]"></div>
            </div>
          </div>

          <div className="pt-4 border-t border-border/50">
            <div className="flex justify-between items-center">
              <span className="font-body text-sm text-ink-secondary">Missing Data Factor</span>
              <StatusBadge variant="success" status="LOW" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Chapter13WhyVessel;

