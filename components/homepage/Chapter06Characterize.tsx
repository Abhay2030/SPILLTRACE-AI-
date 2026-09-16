'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ConfidenceBar } from '@/components/ui/ConfidenceBar';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Metric } from '@/components/ui/Metric';
import { cn } from '@/lib/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function Chapter06Characterize() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 50%',
        toggleActions: 'play none none reverse',
      }
    });

    tl.fromTo('.char-header', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 });
    
    tl.fromTo('.spill-outline', 
      { strokeDashoffset: 800 },
      { strokeDashoffset: 0, duration: 2, ease: 'power2.inOut' },
      '-=0.3'
    );
    
    tl.fromTo('.spill-fill', { opacity: 0 }, { opacity: 1, duration: 1 }, '-=1');
    tl.fromTo('.spill-labels', { opacity: 0 }, { opacity: 1, duration: 0.5 }, '-=0.5');

    tl.fromTo('.char-metric', 
      { x: 30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
      '-=1.5'
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="chapter-section min-h-screen relative flex items-center p-8 md:p-16">
      <div className="z-10 w-full max-w-6xl mx-auto">
        <div className="char-header mb-12">
          <SectionLabel title="SPILL CHARACTERIZATION" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-square md:aspect-[4/3] bg-ink-primary/5 rounded-2xl flex items-center justify-center p-8 border border-ink-tertiary/20">
            <svg viewBox="0 0 400 400" className="w-full h-full max-w-sm">
              <path 
                className="spill-fill"
                d="M150,120 Q220,100 280,150 T320,250 Q300,320 220,300 T120,260 Q80,200 150,120 Z" 
                fill="rgba(15, 23, 42, 0.8)" 
              />
              <path 
                className="spill-outline"
                d="M150,120 Q220,100 280,150 T320,250 Q300,320 220,300 T120,260 Q80,200 150,120 Z" 
                fill="none"
                stroke="#06B6D4" 
                strokeWidth="2"
                strokeDasharray="800"
                strokeDashoffset="800"
              />
              
              <g className="spill-labels">
                {/* Scale bar */}
                <line x1="50" y1="350" x2="150" y2="350" stroke="#475569" strokeWidth="2" />
                <line x1="50" y1="345" x2="50" y2="355" stroke="#475569" strokeWidth="2" />
                <line x1="150" y1="345" x2="150" y2="355" stroke="#475569" strokeWidth="2" />
                <text x="100" y="340" fill="#475569" fontSize="12" fontFamily="monospace" textAnchor="middle">5 km</text>
                
                {/* Orientation Compass */}
                <circle cx="340" cy="60" r="20" fill="none" stroke="#94A3B8" strokeWidth="1" />
                <line x1="340" y1="40" x2="340" y2="80" stroke="#94A3B8" strokeWidth="1" />
                <line x1="320" y1="60" x2="360" y2="60" stroke="#94A3B8" strokeWidth="1" />
                <line x1="340" y1="60" x2="354" y2="46" stroke="#06B6D4" strokeWidth="2" /> {/* 47 deg approx */}
                <text x="340" y="32" fill="#94A3B8" fontSize="10" fontFamily="monospace" textAnchor="middle">N</text>
                <text x="365" y="42" fill="#06B6D4" fontSize="10" fontFamily="monospace">47°</text>
              </g>
            </svg>
          </div>

          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="char-metric"><Metric label="AREA" value="18.4" unit="km² ±2.1" /></div>
              <div className="char-metric"><Metric label="PERIMETER" value="22.7" unit="km ±1.8" /></div>
              <div className="char-metric"><Metric label="ORIENTATION" value="47°" /></div>
              <div className="char-metric"><Metric label="ESTIMATED AGE" value="12–20" unit="h" /></div>
            </div>
            
            <div className="char-metric space-y-4 pt-4 border-t border-ink-tertiary/20">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-ink-tertiary">CONFIDENCE</span>
                <span className="font-mono text-sm font-bold text-ink-primary">0.94</span>
              </div>
              <ConfidenceBar value={0.94} />
            </div>
            
            <div className="char-metric">
              <StatusBadge variant="success" status="DETECTION QUALITY: HIGH" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
