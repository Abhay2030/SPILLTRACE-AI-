'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SectionLabel } from '@/components/ui';
import { cn } from '@/lib/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  'OBSERVE', 'DETECT', 'VALIDATE', 'TRACE', 'ATTRIBUTE', 'ASSESS', 'RESPOND', 'MONITOR'
];

export function Chapter18Monitoring() {
  const containerRef = useRef<HTMLElement>(null);
  const cycleRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(() => {
    // Initial entrance animation
    gsap.from('.cycle-node', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 60%',
      },
      scale: 0,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'back.out(1.5)',
      onComplete: () => {
        // Start continuous loop
        const tl = gsap.timeline({ repeat: -1 });
        cycleRef.current = tl;
        
        steps.forEach((_, i) => {
          tl.to(`.node-${i}`, {
            scale: 1.2,
            backgroundColor: '#0369A1', // ocean
            color: '#fff',
            boxShadow: '0 0 15px rgba(3, 105, 161, 0.5)',
            duration: 0.4,
          })
          .to(`.node-${i}`, {
            scale: 1,
            backgroundColor: '#FAFAF9', // surface
            color: '#0F172A', // ink-primary
            boxShadow: 'none',
            duration: 0.4,
          }, '+=0.5'); // Hold for a moment
        });
      }
    });

    return () => {
      if (cycleRef.current) cycleRef.current.kill();
    };
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="chapter-section min-h-screen relative flex flex-col items-center justify-center py-24 px-4 overflow-hidden"
    >
      <div className="absolute top-12 left-0 w-full flex justify-center">
        <SectionLabel title="CONTINUOUS OPERATIONS" />
      </div>

      <div className="text-center mb-16 max-w-3xl z-10 relative">
        <h2 className="text-4xl md:text-6xl font-display font-bold text-ink-primary mb-6 tracking-tight">
          The investigation doesn't end at attribution.
        </h2>
        <p className="font-body text-xl text-ink-secondary">
          SpillTrace operates as a continuous intelligence loop, refining assessments with each new satellite pass.
        </p>
      </div>

      <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
        {/* Circle path */}
        <div className="absolute inset-8 rounded-full border-2 border-dashed border-ink-tertiary/30 animate-[spin_60s_linear_infinite]" />
        
        {/* Nodes */}
        {steps.map((step, i) => {
          const angle = (i * (360 / steps.length)) - 90; // -90 to start at top
          const rad = angle * (Math.PI / 180);
          // R = 150 (half of 300) or 200 (half of 400) for responsive
          // Using percentages for positioning to make it responsive
          const x = 50 + 50 * Math.cos(rad);
          const y = 50 + 50 * Math.sin(rad);

          return (
            <div 
              key={step}
              className={cn(
                "cycle-node absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full bg-surface border-2 border-ink-tertiary/20 text-ink-primary font-mono text-[10px] md:text-xs font-bold tracking-wider w-20 h-20 md:w-24 md:h-24 shadow-sm transition-colors duration-300",
                `node-${i}`
              )}
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              {step}
            </div>
          );
        })}
      </div>
    </section>
  );
}
