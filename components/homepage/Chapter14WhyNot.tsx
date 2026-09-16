'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SectionLabel, DataModeIndicator } from '@/components/ui';
import { cn } from '@/lib/utils';
import { Check, X, Minus } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function Chapter14WhyNot() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 60%',
      },
    });

    tl.from('.comp-row', {
      y: 20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out',
    });

    tl.from('.contradiction', {
      x: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power2.out',
    }, '-=0.3');

  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="chapter-section min-h-screen relative flex flex-col justify-center py-24 px-4 md:px-12 lg:px-24 bg-surface"
    >
      <div className="absolute top-12 left-0 w-full flex justify-center">
        <SectionLabel title="COMPARATIVE ANALYSIS" />
      </div>

      <div className="mb-12 text-center md:text-left">
        <h2 className="text-4xl md:text-6xl font-display font-bold text-ink-primary mb-4 tracking-tight">
          Why not Vessel B?
        </h2>
        <p className="text-lg md:text-xl font-body text-ink-secondary">
          MV Pacific Voyager was considered and deprioritized.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Comparison visual table */}
        <div className="lg:col-span-7 bg-white border border-ink-tertiary/20 rounded-2xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-3 bg-ink-tertiary/5 border-b border-ink-tertiary/20 p-4">
            <div className="font-display font-medium text-xs text-ink-secondary uppercase tracking-wider">Factor</div>
            <div className="font-display font-medium text-xs text-ink-primary uppercase tracking-wider text-center">Vessel A (Horizon)</div>
            <div className="font-display font-medium text-xs text-ink-secondary uppercase tracking-wider text-center">Vessel B (Pacific)</div>
          </div>
          
          <div className="divide-y divide-ink-tertiary/10">
            {[
              { factor: 'Temporal Match', a: '92%', aGood: true, b: '74%', bGood: false, bIcon: X },
              { factor: 'Spatial Match', a: '89%', aGood: true, b: '71%', bGood: 'neutral', bIcon: Minus },
              { factor: 'Drift Compatibility', a: '94%', aGood: true, b: '62%', bGood: false, bIcon: X },
              { factor: 'Trajectory', a: '87%', aGood: true, b: '65%', bGood: false, bIcon: X },
              { factor: 'AIS Coverage', a: 'Complete', aGood: true, b: 'Gaps', bGood: false, bIcon: X },
              { factor: 'Missing Data', a: 'LOW', aGood: true, b: 'MEDIUM', bGood: 'neutral', bIcon: Minus },
            ].map((row, i) => (
              <div key={i} className="comp-row grid grid-cols-3 p-4 items-center hover:bg-ink-tertiary/5 transition-colors">
                <div className="font-body text-sm font-medium text-ink-primary">{row.factor}</div>
                <div className="flex items-center justify-center gap-2">
                  <span className="font-mono text-sm text-ink-primary">{row.a}</span>
                  <Check className="w-4 h-4 text-verified" />
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className={cn("font-mono text-sm", row.bGood === false ? "text-critical" : "text-caution")}>{row.b}</span>
                  {row.bGood === false ? (
                    <X className="w-4 h-4 text-critical" />
                  ) : (
                    <Minus className="w-4 h-4 text-caution" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contradictions */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <h3 className="font-display font-medium text-xl text-ink-primary mb-2">Key contradictions for Vessel B:</h3>
          
          <div className="contradiction flex gap-4 p-5 bg-critical/5 border border-critical/20 rounded-xl">
            <X className="w-6 h-6 text-critical shrink-0 mt-0.5" />
            <p className="font-body text-sm text-ink-secondary leading-relaxed">
              <strong className="text-ink-primary font-medium block mb-1">Timing mismatch</strong>
              Vessel B passed origin zone 6 hours before estimated spill age.
            </p>
          </div>

          <div className="contradiction flex gap-4 p-5 bg-critical/5 border border-critical/20 rounded-xl">
            <X className="w-6 h-6 text-critical shrink-0 mt-0.5" />
            <p className="font-body text-sm text-ink-secondary leading-relaxed">
              <strong className="text-ink-primary font-medium block mb-1">Distance variance</strong>
              Closest approach was 8.2 km from probable origin center.
            </p>
          </div>

          <div className="contradiction flex gap-4 p-5 bg-critical/5 border border-critical/20 rounded-xl">
            <X className="w-6 h-6 text-critical shrink-0 mt-0.5" />
            <p className="font-body text-sm text-ink-secondary leading-relaxed">
              <strong className="text-ink-primary font-medium block mb-1">Drift model divergence</strong>
              62% compatibility does not meet attribution threshold.
            </p>
          </div>

          <div className="mt-8 p-4 border-l-2 border-ocean bg-ocean/5">
            <p className="font-body text-sm text-ink-secondary italic">
              "SpillTrace attributes based on evidence convergence, not proximity alone."
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-8">
        <DataModeIndicator mode="DEMO" />
      </div>
    </section>
  );
}
