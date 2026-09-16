'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SectionLabel } from '@/components/ui';
import { cn } from '@/lib/utils';
import { Satellite, Droplet, Crosshair, Waves, Wind, Navigation, Ship, Route, FileSearch } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function Chapter15Evidence() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 50%',
      },
    });

    tl.from('.graph-edge', {
      strokeDashoffset: 200,
      strokeDasharray: 200,
      duration: 1.5,
      ease: 'power2.inOut',
      stagger: 0.1,
    });

    tl.from('.graph-node', {
      scale: 0,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'back.out(1.5)',
    }, '-=1');
    
    tl.from('.graph-label', {
      opacity: 0,
      y: 5,
      duration: 0.4,
      stagger: 0.05,
    }, '-=0.5');

  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="chapter-section min-h-screen relative flex flex-col items-center justify-center py-24 px-4 overflow-hidden"
    >
      <div className="absolute top-12 left-0 w-full flex justify-center">
        <SectionLabel title="EVIDENCE NETWORK" />
      </div>

      <div className="text-center z-10 mb-8 pointer-events-none">
        <h2 className="text-5xl md:text-7xl font-display font-bold text-ink-primary tracking-tight">
          Connected intelligence.
        </h2>
      </div>

      <div className="relative w-full max-w-4xl aspect-[4/3] md:aspect-video flex items-center justify-center">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 600">
          {/* Edges */}
          <g fill="none" stroke="currentColor" strokeWidth="1.5" className="text-ink-tertiary/30">
            <path className="graph-edge" d="M 400 150 L 400 250" /> {/* Satellite -> Spill */}
            <path className="graph-edge" d="M 400 250 L 400 350" /> {/* Spill -> Origin */}
            <path className="graph-edge" d="M 400 350 L 250 450" /> {/* Origin -> Vessel A */}
            <path className="graph-edge" d="M 400 350 L 550 450" /> {/* Origin -> Vessel B */}
            <path className="graph-edge" d="M 200 250 L 400 350" /> {/* Ocean -> Origin */}
            <path className="graph-edge" d="M 600 250 L 400 350" /> {/* Wind -> Origin */}
            <path className="graph-edge" d="M 100 450 L 250 450" /> {/* AIS -> Vessel A */}
            <path className="graph-edge" d="M 700 450 L 550 450" /> {/* AIS -> Vessel B */}
            <path className="graph-edge" d="M 250 450 L 400 550" /> {/* Vessel A -> Evidence */}
            <path className="graph-edge" strokeDasharray="4,4" d="M 550 450 L 400 550" /> {/* Vessel B -> Evidence */}
            <path className="graph-edge" d="M 150 350 L 250 450" /> {/* Trajectory -> Vessel A */}
          </g>

          {/* Labels for edges */}
          <g className="text-[10px] font-mono fill-ink-secondary">
            <text x="410" y="200" className="graph-label">DETECTS</text>
            <text x="410" y="300" className="graph-label">BACKTRACKS TO</text>
            <text x="300" y="390" className="graph-label">MATCH (94%)</text>
            <text x="470" y="390" className="graph-label">MISMATCH (62%)</text>
            <text x="280" y="510" className="graph-label">ATTRIBUTES</text>
          </g>

          {/* Nodes (using absolute positioning in HTML for icons, but SVG circles here) */}
          <g className="graph-node-circles">
            <circle cx="400" cy="150" r="24" className="graph-node fill-ocean/10 stroke-ocean stroke-2" />
            <circle cx="400" cy="250" r="24" className="graph-node fill-ink-primary stroke-ink-primary stroke-2" />
            <circle cx="400" cy="350" r="24" className="graph-node fill-caution/10 stroke-caution stroke-2" />
            <circle cx="200" cy="250" r="20" className="graph-node fill-teal-500/10 stroke-teal-500 stroke-2" />
            <circle cx="600" cy="250" r="20" className="graph-node fill-sky-500/10 stroke-sky-500 stroke-2" />
            <circle cx="100" cy="450" r="20" className="graph-node fill-marine/10 stroke-marine stroke-2" />
            <circle cx="700" cy="450" r="20" className="graph-node fill-marine/10 stroke-marine stroke-2" />
            <circle cx="250" cy="450" r="28" className="graph-node fill-verified/10 stroke-verified stroke-[3px]" />
            <circle cx="550" cy="450" r="28" className="graph-node fill-critical/10 stroke-critical stroke-[3px]" />
            <circle cx="150" cy="350" r="18" className="graph-node fill-cyan-500/10 stroke-cyan-500 stroke-2" />
            <circle cx="400" cy="550" r="24" className="graph-node fill-surface stroke-ink-primary stroke-2" />
          </g>
        </svg>

        {/* HTML Overlays for Icons and Text */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[25%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <Satellite className="w-6 h-6 text-ocean graph-node" />
            <span className="graph-label mt-5 text-[10px] font-mono font-bold tracking-wider text-ink-primary">SATELLITE</span>
          </div>
          
          <div className="absolute top-[41.6%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <Droplet className="w-6 h-6 text-surface graph-node" />
            <span className="graph-label mt-5 text-[10px] font-mono font-bold tracking-wider text-ink-primary">SPILL</span>
          </div>

          <div className="absolute top-[58.3%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <Crosshair className="w-6 h-6 text-caution graph-node" />
            <span className="graph-label mt-5 text-[10px] font-mono font-bold tracking-wider text-ink-primary">ORIGIN ZONE</span>
          </div>

          <div className="absolute top-[41.6%] left-[25%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <Waves className="w-5 h-5 text-teal-500 graph-node" />
            <span className="graph-label mt-4 text-[10px] font-mono font-bold tracking-wider text-ink-primary">CURRENTS</span>
          </div>

          <div className="absolute top-[41.6%] left-[75%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <Wind className="w-5 h-5 text-sky-500 graph-node" />
            <span className="graph-label mt-4 text-[10px] font-mono font-bold tracking-wider text-ink-primary">WIND</span>
          </div>

          <div className="absolute top-[75%] left-[12.5%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <Navigation className="w-5 h-5 text-marine graph-node" />
            <span className="graph-label mt-4 text-[10px] font-mono font-bold tracking-wider text-ink-primary">AIS DATA</span>
          </div>

          <div className="absolute top-[75%] left-[87.5%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <Navigation className="w-5 h-5 text-marine graph-node" />
            <span className="graph-label mt-4 text-[10px] font-mono font-bold tracking-wider text-ink-primary">AIS DATA</span>
          </div>

          <div className="absolute top-[75%] left-[31.25%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <Ship className="w-7 h-7 text-verified graph-node" />
            <span className="graph-label mt-6 text-[10px] font-mono font-bold tracking-wider text-ink-primary">VESSEL A</span>
          </div>

          <div className="absolute top-[75%] left-[68.75%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <Ship className="w-7 h-7 text-critical graph-node" />
            <span className="graph-label mt-6 text-[10px] font-mono font-bold tracking-wider text-ink-primary">VESSEL B</span>
          </div>

          <div className="absolute top-[58.3%] left-[18.75%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <Route className="w-4 h-4 text-cyan-500 graph-node" />
            <span className="graph-label mt-3 text-[10px] font-mono font-bold tracking-wider text-ink-primary">TRAJECTORY</span>
          </div>

          <div className="absolute top-[91.6%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <FileSearch className="w-6 h-6 text-ink-primary graph-node" />
            <span className="graph-label mt-5 text-[10px] font-mono font-bold tracking-wider text-ink-primary">EVIDENCE DOSSIER</span>
          </div>
        </div>
      </div>
    </section>
  );
}
