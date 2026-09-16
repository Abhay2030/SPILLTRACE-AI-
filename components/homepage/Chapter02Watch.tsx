'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { Telemetry } from '@/components/ui/Telemetry';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { cn } from '@/lib/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function Chapter02Watch() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      '.stagger-item',
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="chapter-section min-h-screen relative flex flex-col justify-end p-8 md:p-16">
      <div className="max-w-2xl z-10 space-y-8 pb-12">
        <div className="stagger-item">
          <SectionLabel title="MARITIME SURVEILLANCE" />
        </div>
        
        <div className="stagger-item space-y-2">
          <div className="font-mono text-sm text-ink-tertiary">VESSELS IN AREA</div>
          <div className="font-display text-7xl font-bold text-ink-primary">
            <AnimatedCounter value={247} />
          </div>
        </div>
        
        <div className="stagger-item flex flex-col gap-4">
          <Telemetry items={[
            { label: "REGION", value: "Arabian Sea" },
            { label: "COVERAGE", value: "94.2%" },
            { label: "AIS", value: "ACTIVE" }
          ]} />
        </div>
        
        <div className="stagger-item pt-4">
          <StatusBadge variant="info" status="MONITORING" />
        </div>
      </div>
    </section>
  );
}
