'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Compass, Ship, Waves, ShieldCheck } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function Chapter02Watch() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      '.watch-stagger',
      { x: -40, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 65%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="chapter-section min-h-screen relative flex flex-col justify-end p-8 md:p-16 z-10 pointer-events-none"
    >
      <div className="max-w-xl space-y-6 pb-12 pointer-events-auto glass-card-cinematic p-8 sm:p-10 rounded-3xl">
        <div className="watch-stagger inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 text-xs font-mono tracking-widest uppercase shadow-[0_0_15px_rgba(6,182,212,0.3)]">
          <Compass size={13} className="text-cyan-400" />
          CHAPTER 02 · MARITIME SURVEILLANCE
        </div>

        <div className="watch-stagger space-y-1">
          <div className="font-mono text-xs text-cyan-400 uppercase tracking-widest font-bold">
            Vessels Tracked in Sector
          </div>
          <div className="flex items-baseline gap-4">
            <div className="font-display text-7xl md:text-8xl font-black text-white tracking-tight drop-shadow-[0_4px_25px_rgba(0,0,0,0.9)]">
              <AnimatedCounter value={247} />
            </div>
            <StatusBadge variant="info" status="LIVE FEED ACTIVE" pulse />
          </div>
        </div>

        <p className="watch-stagger font-body text-base md:text-lg text-slate-200 leading-relaxed max-w-lg font-medium">
          Arabian Sea international shipping corridor west of Goa. Continuous real-time tracking of ultra-large crude carriers, bulkers, and regional traffic.
        </p>

        {/* Telemetry card */}
        <div className="watch-stagger grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-900/90 border border-slate-700/80 shadow-2xl text-left">
          <div>
            <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-1 font-semibold">
              <Ship size={11} className="text-cyan-400" /> Sector Density
            </div>
            <div className="font-mono text-sm font-bold text-white mt-1">High Corridor</div>
            <div className="text-[10px] text-slate-300">Tanker Transit Lane</div>
          </div>
          <div>
            <div className="text-[10px] font-mono text-sky-400 uppercase tracking-wider flex items-center gap-1 font-semibold">
              <Waves size={11} className="text-sky-400" /> Sea State
            </div>
            <div className="font-mono text-sm font-bold text-white mt-1">Beaufort 3</div>
            <div className="text-[10px] text-slate-300">Swell 1.1m · 11 kts</div>
          </div>
          <div>
            <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider flex items-center gap-1 font-semibold">
              <ShieldCheck size={11} className="text-emerald-400" /> Coverage
            </div>
            <div className="font-mono text-sm font-bold text-white mt-1">94.2% Spatial</div>
            <div className="text-[10px] text-slate-300">Terrestrial + Sat AIS</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Chapter02Watch;
