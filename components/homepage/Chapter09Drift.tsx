'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Metric } from '@/components/ui/Metric';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function Chapter09Drift() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 50%',
        toggleActions: 'play none none reverse',
      }
    });

    tl.fromTo('.drift-header', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 });
    
    // Wedge expansion
    tl.fromTo('.wedge-6h', { scale: 0, opacity: 0, transformOrigin: 'top left' }, { scale: 1, opacity: 1, duration: 0.4 });
    tl.fromTo('.wedge-12h', { scale: 0, opacity: 0, transformOrigin: 'top left' }, { scale: 1, opacity: 1, duration: 0.4 });
    tl.fromTo('.wedge-24h', { scale: 0, opacity: 0, transformOrigin: 'top left' }, { scale: 1, opacity: 1, duration: 0.5 });
    
    tl.fromTo('.drift-arrow', { strokeDashoffset: 300 }, { strokeDashoffset: 0, duration: 1, ease: 'power2.out' }, '-=0.5');
    tl.fromTo('.drift-label', { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.4, stagger: 0.2 }, '-=0.8');

    tl.fromTo('.drift-metric', 
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
      '-=0.5'
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="chapter-section min-h-screen relative flex flex-col p-8 md:p-16 justify-center">
      <div className="z-10 w-full max-w-6xl mx-auto space-y-16">
        <div className="drift-header text-center space-y-4">
          <SectionLabel title="DRIFT FORECAST" align="center" />
          <h2 className="font-display font-bold text-5xl md:text-7xl text-ink-primary">
            Where will it go next?
          </h2>
        </div>

        <div className="relative w-full max-w-3xl mx-auto aspect-[16/9] flex items-center justify-center">
          <svg viewBox="0 0 600 400" className="w-full h-full overflow-visible">
            <g transform="translate(100, 50)">
              {/* Origin dot */}
              <circle cx="0" cy="0" r="6" fill="#0F172A" />
              <text x="-20" y="5" className="font-mono text-xs font-bold" textAnchor="end">T0</text>
              
              {/* 6h wedge */}
              <path className="wedge-6h" d="M0,0 L100,60 A120,120 0 0,0 120,-20 Z" fill="rgba(6, 182, 212, 0.4)" />
              <text x="110" y="80" className="drift-label font-mono text-xs fill-ink-secondary">+6h</text>
              
              {/* 12h wedge */}
              <path className="wedge-12h" d="M0,0 L200,140 A260,260 0 0,0 250,-30 L120,-20 A120,120 0 0,1 100,60 Z" fill="rgba(6, 182, 212, 0.2)" />
              <text x="230" y="160" className="drift-label font-mono text-xs fill-ink-secondary">+12h</text>
              
              {/* 24h wedge */}
              <path className="wedge-24h" d="M0,0 L350,260 A450,450 0 0,0 450,-40 L250,-30 A260,260 0 0,1 200,140 Z" fill="rgba(6, 182, 212, 0.05)" stroke="#06B6D4" strokeWidth="1" strokeDasharray="4 4" />
              <text x="380" y="280" className="drift-label font-mono text-xs fill-ink-secondary">+24h</text>

              {/* Central Arrow */}
              <path className="drift-arrow" d="M0,0 Q150,60 380,120" fill="none" stroke="#0F172A" strokeWidth="3" markerEnd="url(#arrowhead)" strokeDasharray="300" strokeDashoffset="300" />
              
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#0F172A" />
                </marker>
              </defs>
            </g>
          </svg>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 border-t border-ink-tertiary/20 pt-8">
          <div className="drift-metric col-span-2 md:col-span-1"><Metric label="FORECAST HORIZON" value="24" unit="h" /></div>
          <div className="drift-metric"><Metric label="UNCERTAINTY" value="Expanding" trend="up" /></div>
          <div className="drift-metric"><Metric label="CURRENT DIRECTION" value="142°" unit="SSE" /></div>
          <div className="drift-metric"><Metric label="CURRENT SPEED" value="0.8" unit="kts" /></div>
          <div className="drift-metric flex flex-col justify-center">
            <span className="font-mono text-xs text-ink-tertiary uppercase tracking-widest mb-1">MODEL</span>
            <span className="font-mono font-bold text-ink-primary">HYCOM + ERA5 Wind</span>
          </div>
        </div>
        
        <p className="drift-metric text-center text-sm text-ink-tertiary mx-auto max-w-2xl mt-4">
          Forecast uncertainty increases with time. Continuous satellite updates narrow predictions.
        </p>
      </div>
    </section>
  );
}
