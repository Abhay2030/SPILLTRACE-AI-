'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Telemetry } from '@/components/ui/Telemetry';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { cn } from '@/lib/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function Chapter03Satellite() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 50%',
        toggleActions: 'play none none reverse',
      }
    });

    tl.fromTo('.anim-item', 
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
    );
    
    tl.fromTo('.anomaly-alert',
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.5)' },
      '+=0.5' // wait a bit before anomaly
    );
    
    gsap.to('.anomaly-pulse', {
      opacity: 0.5,
      scale: 1.05,
      repeat: -1,
      yoyo: true,
      duration: 1.5,
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="chapter-section min-h-screen relative flex items-center p-8 md:p-16">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 z-10">
        <div className="space-y-8">
          <div className="anim-item">
            <SectionLabel title="SATELLITE OBSERVATION" />
          </div>
          
          <h2 className="anim-item font-display text-5xl md:text-7xl text-ocean tracking-wide font-bold">
            SENTINEL-1A
          </h2>
          
          <div className="space-y-3 pt-4 border-l-2 border-marine/20 pl-6">
            <div className="anim-item"><Telemetry items={[{label: "MODE", value: "SAR (Synthetic Aperture Radar)"}]} /></div>
            <div className="anim-item"><Telemetry items={[{label: "RESOLUTION", value: "10m"}]} /></div>
            <div className="anim-item"><Telemetry items={[{label: "SWATH", value: "250km"}]} /></div>
            <div className="anim-item"><Telemetry items={[{label: "POLARIZATION", value: "VV+VH"}]} /></div>
            <div className="anim-item"><Telemetry items={[{label: "TIME", value: "03:42 UTC"}]} /></div>
          </div>
          
          <div className="anomaly-alert pt-12 space-y-4">
            <div className="inline-block relative">
              <div className="anomaly-pulse absolute inset-0 bg-critical/20 rounded-lg blur-md"></div>
              <div className="relative font-mono font-bold text-xl md:text-2xl text-critical border border-critical/50 bg-critical/10 px-4 py-2 rounded-lg">
                ANOMALY DETECTED
              </div>
            </div>
            <div>
              <StatusBadge variant="warning" status="INVESTIGATING" />
            </div>
          </div>
        </div>
        <div className="hidden md:block">
          {/* 3D Satellite space */}
        </div>
      </div>
    </section>
  );
}
