'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { AnimatedCounter, SectionLabel, Telemetry } from '@/components/ui';
import { cn } from '@/lib/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function Chapter11AIS() {
  const containerRef = useRef<HTMLElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const labelsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
      },
    });

    const steps = [
      { num: 247, label: 'VESSELS IN AREA', desc: 'Total tracked entities' },
      { num: 84, label: 'TEMPORAL FILTER', desc: 'Present within 24h window' },
      { num: 18, label: 'PROXIMITY FILTER', desc: 'Within 15km of probable origin' },
      { num: 5, label: 'TRAJECTORY MATCH', desc: 'Consistent trajectory with origin' },
      { num: 3, label: 'DRIFT COMPATIBLE', desc: 'Drift model confirms compatibility' },
    ];

    // Note: We can't easily animate AnimatedCounter value via GSAP scrub natively without state,
    // so we'll orchestrate 5 distinct sets of labels that fade in/out, 
    // and let the user scroll control the timeline.
    
    // As a simplification for GSAP timeline, we'll fade the items
    const elements = gsap.utils.toArray('.filter-step');
    elements.forEach((el: any, i) => {
      if (i === 0) return; // First is visible initially
      tl.fromTo(
        el,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1 },
        `+=0.5`
      );
      if (i < elements.length - 1) {
        tl.to(el, { opacity: 0, y: -20, duration: 1 }, `+=1`);
      }
    });

  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="chapter-section min-h-screen relative flex flex-col items-center justify-center py-24"
    >
      <div className="absolute top-12 left-0 w-full flex justify-center">
        <SectionLabel title="AIS RECONSTRUCTION" />
      </div>
      
      <div className="max-w-3xl mx-auto text-center px-6">
        <p className="font-body text-ink-secondary text-lg mb-16">
          247 vessels entered the investigation window.
        </p>

        <div className="relative h-64 flex flex-col items-center justify-center">
          {/* Step 1 */}
          <div className="filter-step absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-8xl md:text-9xl font-display font-bold text-ink-primary tabular-nums tracking-tighter">
              247
            </div>
            <h4 className="text-xl font-display text-ink-tertiary uppercase tracking-widest mt-6">
              VESSELS IN AREA
            </h4>
            <p className="font-body text-sm text-ink-secondary mt-2">
              Total tracked entities
            </p>
          </div>

          {/* Step 2 */}
          <div className="filter-step absolute inset-0 flex flex-col items-center justify-center opacity-0">
            <div className="text-8xl md:text-9xl font-display font-bold text-ocean tabular-nums tracking-tighter">
              84
            </div>
            <h4 className="text-xl font-display text-ink-tertiary uppercase tracking-widest mt-6">
              TEMPORAL FILTER
            </h4>
            <p className="font-body text-sm text-ink-secondary mt-2">
              Present within 24h window
            </p>
          </div>

          {/* Step 3 */}
          <div className="filter-step absolute inset-0 flex flex-col items-center justify-center opacity-0">
            <div className="text-8xl md:text-9xl font-display font-bold text-marine tabular-nums tracking-tighter">
              18
            </div>
            <h4 className="text-xl font-display text-ink-tertiary uppercase tracking-widest mt-6">
              PROXIMITY FILTER
            </h4>
            <p className="font-body text-sm text-ink-secondary mt-2">
              Within 15km of probable origin
            </p>
          </div>

          {/* Step 4 */}
          <div className="filter-step absolute inset-0 flex flex-col items-center justify-center opacity-0">
            <div className="text-8xl md:text-9xl font-display font-bold text-amber-500 tabular-nums tracking-tighter">
              5
            </div>
            <h4 className="text-xl font-display text-ink-tertiary uppercase tracking-widest mt-6">
              TRAJECTORY MATCH
            </h4>
            <p className="font-body text-sm text-ink-secondary mt-2">
              Consistent trajectory with origin
            </p>
          </div>

          {/* Step 5 */}
          <div className="filter-step absolute inset-0 flex flex-col items-center justify-center opacity-0">
            <div className="text-8xl md:text-9xl font-display font-bold text-red-600 tabular-nums tracking-tighter">
              3
            </div>
            <h4 className="text-xl font-display text-ink-tertiary uppercase tracking-widest mt-6">
              DRIFT COMPATIBLE
            </h4>
            <p className="font-body text-sm text-ink-secondary mt-2">
              Drift model confirms compatibility
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
