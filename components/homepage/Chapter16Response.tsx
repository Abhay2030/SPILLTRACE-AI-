'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SectionLabel, StatusBadge, DataModeIndicator } from '@/components/ui';
import { cn } from '@/lib/utils';
import { Anchor, ShieldAlert, Waves, Plane, Crosshair, Helicopter } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const assets = [
  { name: 'ICG Vikram (Coast Guard)', status: 'AVAILABLE', variant: 'verified', icon: Anchor },
  { name: 'Oil Boom Unit Alpha', status: 'STANDBY', variant: 'neutral', icon: ShieldAlert },
  { name: 'Skimmer Vessel Nirmala', status: 'EN ROUTE', variant: 'caution', icon: Waves },
  { name: 'Surveillance Drone SR-04', status: 'DEPLOYED', variant: 'verified', icon: Plane },
  { name: 'Monitoring Buoy MB-12', status: 'AVAILABLE', variant: 'verified', icon: Crosshair },
  { name: 'Helicopter HAL-07', status: 'STANDBY', variant: 'neutral', icon: Helicopter },
];

export function Chapter16Response() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from('.response-asset', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 50%',
      },
      x: 50,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
    });
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="chapter-section min-h-screen relative flex flex-col justify-center py-24 px-4 md:px-12 lg:px-24 bg-surface"
    >
      <div className="absolute top-12 left-0 w-full flex justify-center">
        <SectionLabel title="RESPONSE PLANNING" />
      </div>

      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Summary */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-display font-medium text-ink-primary">
            From attribution to action.
          </h2>
          <p className="font-body text-ink-secondary text-lg">
            Once origin is verified, SpillTrace automatically matches current drift models against available regional assets to generate optimized intervention strategies.
          </p>
          <div className="mt-4 p-6 bg-surface border border-ink-tertiary/20 rounded-xl space-y-4">
             <div className="flex justify-between items-center text-sm">
                <span className="text-ink-secondary">Recommended Strategy</span>
                <span className="font-mono font-bold text-ocean">COASTAL DEFENSE</span>
             </div>
             <div className="flex justify-between items-center text-sm">
                <span className="text-ink-secondary">Time to Intercept</span>
                <span className="font-mono text-ink-primary">4h 30m</span>
             </div>
             <div className="flex justify-between items-center text-sm">
                <span className="text-ink-secondary">Containment Est.</span>
                <span className="font-mono text-verified">92%</span>
             </div>
          </div>
        </div>

        {/* Right: Assets */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {assets.map((asset, idx) => {
            const Icon = asset.icon;
            return (
              <div key={idx} className="asset-card p-5 bg-white border border-ink-tertiary/20 rounded-xl flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <span className="text-ocean"><Icon className="w-4 h-4" /></span>
                    <span className="font-mono text-sm font-bold text-ink-primary tracking-wide">{asset.name}</span>
                  </div>
                  <StatusBadge variant={asset.variant as any} status={asset.status} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="absolute bottom-8 left-8">
        <DataModeIndicator mode="DEMO" />
      </div>
    </section>
  );
}
