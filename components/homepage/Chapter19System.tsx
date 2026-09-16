'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SectionLabel } from '@/components/ui';
import { Satellite, BrainCircuit, Waves, Navigation, Network, ShieldAlert, RadioTower } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const pipeline = [
  { icon: Satellite, title: 'SATELLITE OBSERVATION', desc: 'Sentinel-1A SAR imagery acquisition' },
  { icon: BrainCircuit, title: 'AI DETECTION', desc: 'Automated dark vessel and slick detection' },
  { icon: Waves, title: 'OCEAN PHYSICS', desc: 'MetOcean current and wind modeling' },
  { icon: Navigation, title: 'AIS INTELLIGENCE', desc: 'Historical trajectory reconstruction' },
  { icon: Network, title: 'EVIDENCE SYNTHESIS', desc: 'Multi-modal correlation engine' },
  { icon: ShieldAlert, title: 'RISK ASSESSMENT', desc: 'Impact and vulnerability scoring' },
  { icon: RadioTower, title: 'RESPONSE COORDINATION', desc: 'Asset deployment planning' },
];

export function Chapter19System() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 50%',
      },
    });

    tl.from('.pipe-node', {
      y: 30,
      opacity: 0,
      duration: 0.5,
      stagger: 0.15,
      ease: 'power2.out',
    });

    tl.from('.pipe-line', {
      scaleY: 0,
      transformOrigin: 'top',
      duration: 1,
      ease: 'power1.inOut',
    }, '-=1');

    tl.from('.pipe-tagline', {
      opacity: 0,
      y: 20,
      duration: 0.8,
    }, '-=0.2');

  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="chapter-section min-h-screen relative flex flex-col items-center py-24 px-4 bg-surface"
    >
      <div className="absolute top-12 left-0 w-full flex justify-center">
        <SectionLabel title="COMPLETE SYSTEM" />
      </div>

      <div className="text-center mb-16">
        <h2 className="text-5xl md:text-7xl font-display font-bold text-ink-primary tracking-tight">
          The full picture.
        </h2>
      </div>

      <div className="relative flex flex-col items-center max-w-lg mx-auto w-full">
        <div className="pipe-line absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-1 bg-gradient-to-b from-ocean via-marine to-teal-500 rounded-full" />
        
        {pipeline.map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className="pipe-node relative flex items-center justify-center w-full py-6">
              {/* Left/Right alternating layout for text, center icon */}
              <div className="flex-1 flex justify-end pr-8">
                {i % 2 === 0 && (
                  <div className="text-right">
                    <h4 className="font-display font-bold text-ink-primary text-sm md:text-base tracking-wide">{item.title}</h4>
                    <p className="font-body text-xs md:text-sm text-ink-secondary">{item.desc}</p>
                  </div>
                )}
              </div>
              
              <div className="w-12 h-12 rounded-full bg-white border-2 border-ink-tertiary/20 flex items-center justify-center z-10 shadow-sm shrink-0">
                <Icon className="w-5 h-5 text-ink-primary" />
              </div>
              
              <div className="flex-1 pl-8">
                {i % 2 !== 0 && (
                  <div className="text-left">
                    <h4 className="font-display font-bold text-ink-primary text-sm md:text-base tracking-wide">{item.title}</h4>
                    <p className="font-body text-xs md:text-sm text-ink-secondary">{item.desc}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="pipe-tagline mt-20 text-center">
        <p className="font-mono text-sm tracking-widest text-ink-tertiary uppercase">
          AI-Powered Maritime Forensics & Response Intelligence
        </p>
      </div>
    </section>
  );
}
