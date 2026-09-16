'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { ConfidenceBar } from '@/components/ui/ConfidenceBar';
import { cn } from '@/lib/utils';
import { CheckCircle2, XCircle, ChevronRight } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function Chapter05Validation() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 60%',
        toggleActions: 'play none none reverse',
      }
    });

    tl.fromTo('.val-header', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 });
    
    tl.fromTo('.val-step', 
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, stagger: 0.4 }
    );
    
    tl.fromTo('.val-reveal',
      { scale: 0.9, opacity: 0, y: 20 },
      { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: 'back.out(1.2)' },
      '+=0.2'
    );
  }, { scope: containerRef });

  const steps = [
    { label: 'Observed Signal', status: 'CONFIRMED', icon: CheckCircle2, color: 'text-marine' },
    { label: 'Look-alike Analysis', desc: 'Wind Slick: 4.1% · Biogenic: 1.8%', status: 'RULED OUT', icon: XCircle, color: 'text-ink-tertiary' },
    { label: 'Temporal Context', desc: 'No recent weather events', status: 'CONSISTENT', icon: CheckCircle2, color: 'text-marine' },
    { label: 'SAR Feature Analysis', desc: 'Dark patch, low backscatter, sharp boundary', status: 'CONSISTENT', icon: CheckCircle2, color: 'text-marine' },
  ];

  return (
    <section ref={containerRef} className="chapter-section min-h-screen relative flex items-center p-8 md:p-16">
      <div className="z-10 w-full max-w-5xl mx-auto flex flex-col items-center">
        <div className="val-header mb-12">
          <SectionLabel title="ANOMALY VALIDATION" align="center" />
        </div>
        
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 border-l border-ink-tertiary/20 pl-6 relative">
            {steps.map((step, i) => (
              <div key={i} className="val-step relative">
                <div className="absolute -left-[29px] top-1 bg-surface p-0.5">
                  <step.icon size={18} className={cn("bg-surface", step.color)} />
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-sm font-semibold text-ink-primary">{step.label}</span>
                  {step.desc && <span className="text-xs text-ink-secondary mt-1">{step.desc}</span>}
                  <span className={cn("text-xs font-mono font-bold mt-2", step.color)}>{step.status}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="val-reveal flex flex-col items-center justify-center p-8 rounded-2xl bg-white shadow-sm border border-ink-tertiary/10">
            <span className="font-mono text-sm text-ink-tertiary uppercase tracking-widest mb-4">OIL PROBABILITY</span>
            <div className="flex items-baseline mb-6">
              <span className="font-display text-7xl font-bold text-ocean">
                <AnimatedCounter value={94} />
              </span>
              <span className="font-display text-5xl font-bold text-ocean">.2%</span>
            </div>
            
            <div className="w-full mb-6">
              <ConfidenceBar value={0.942} label="Confidence Score" />
            </div>
            
            <div className="text-center space-y-1">
              <div className="text-sm font-semibold text-ink-primary">Classification: HIGH CONFIDENCE</div>
              <div className="text-xs text-ink-tertiary">Not definitive — field verification recommended</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
