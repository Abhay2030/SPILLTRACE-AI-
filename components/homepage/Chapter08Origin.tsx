'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ConfidenceBar } from '@/components/ui/ConfidenceBar';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Metric } from '@/components/ui/Metric';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function Chapter08Origin() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 60%',
        toggleActions: 'play none none reverse',
      }
    });

    tl.fromTo('.origin-header', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 });
    
    tl.fromTo('.prob-ring-3', { scale: 0, opacity: 0 }, { scale: 1, opacity: 0.1, duration: 0.8, ease: 'back.out(1.2)' });
    tl.fromTo('.prob-ring-2', { scale: 0, opacity: 0 }, { scale: 1, opacity: 0.3, duration: 0.6, ease: 'back.out(1.2)' }, '-=0.4');
    tl.fromTo('.prob-ring-1', { scale: 0, opacity: 0 }, { scale: 1, opacity: 0.6, duration: 0.4, ease: 'back.out(1.2)' }, '-=0.3');
    
    tl.fromTo('.ring-label', { opacity: 0 }, { opacity: 1, duration: 0.5, stagger: 0.2 }, '-=0.2');

    tl.fromTo('.origin-metric', 
      { x: 30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
      '-=0.8'
    );

    gsap.to('.origin-center', {
      scale: 1.2,
      opacity: 0.8,
      repeat: -1,
      yoyo: true,
      duration: 1,
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="chapter-section min-h-screen relative flex items-center p-8 md:p-16">
      <div className="z-10 w-full max-w-6xl mx-auto flex flex-col items-center">
        <div className="origin-header text-center mb-16 space-y-4">
          <SectionLabel title="ORIGIN ANALYSIS" align="center" />
          <h2 className="font-display font-bold text-5xl md:text-7xl text-ink-primary">
            Probable origin zone.
          </h2>
        </div>
        
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Visual: Probability Rings */}
          <div className="relative aspect-square flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="prob-ring-3 absolute w-[80%] h-[80%] rounded-full border border-marine bg-marine/10 flex items-start justify-center pt-4">
                <span className="ring-label font-mono text-xs text-marine/60">P&gt;20%</span>
              </div>
              <div className="prob-ring-2 absolute w-[50%] h-[50%] rounded-full border border-marine bg-marine/20 flex items-start justify-center pt-4">
                <span className="ring-label font-mono text-xs text-marine/80">P&gt;50%</span>
              </div>
              <div className="prob-ring-1 absolute w-[20%] h-[20%] rounded-full border-2 border-marine bg-marine/40 flex items-start justify-center pt-2">
                <span className="ring-label font-mono text-[10px] text-marine font-bold">P&gt;80%</span>
              </div>
              <div className="origin-center absolute w-3 h-3 bg-marine rounded-full shadow-[0_0_15px_#06B6D4]"></div>
            </div>
          </div>

          {/* Metrics Sidebar */}
          <div className="space-y-8 bg-surface/50 p-8 rounded-2xl border border-ink-tertiary/10 backdrop-blur-sm">
            <div className="origin-metric">
              <span className="font-mono text-xs text-ink-tertiary mb-2 block uppercase tracking-widest">Most Probable Origin</span>
              <div className="font-mono text-2xl font-bold text-ink-primary bg-ink-primary/5 p-4 rounded-lg inline-block">
                15.28°N, 72.05°E
              </div>
            </div>
            
            <div className="origin-metric space-y-3">
              <div className="flex justify-between items-end">
                <span className="font-mono text-xs text-ink-tertiary uppercase tracking-widest">Confidence</span>
                <span className="font-mono font-bold text-marine">78%</span>
              </div>
              <ConfidenceBar value={0.78} />
            </div>
            
            <div className="origin-metric">
              <Metric label="UNCERTAINTY" value="±6.4" unit="km" />
            </div>

            <div className="origin-metric pt-6 border-t border-ink-tertiary/20 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-ink-secondary">OCEAN MODEL</span>
                <StatusBadge variant="success" status="Available" />
              </div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-ink-secondary">WIND MODEL</span>
                <StatusBadge variant="success" status="Available" />
              </div>
            </div>
            
            <p className="origin-metric text-xs text-ink-tertiary mt-6 italic">
              Uncertainty reflects model limitations and environmental complexity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
