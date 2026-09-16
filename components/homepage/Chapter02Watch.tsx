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
      <div className="max-w-xl space-y-6 pb-12 pointer-events-auto">
        <div className="watch-stagger inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-border-subtle text-ink-tertiary text-xs font-mono tracking-widest uppercase">
          <Compass size={12} className="text-ocean" />
          CHAPTER 02 · MARITIME SURVEILLANCE
        </div>

        <div className="watch-stagger space-y-1">
          <div className="font-mono text-xs text-ink-secondary uppercase tracking-widest">
            Vessels Tracked in Sector
          </div>
          <div className="flex items-baseline gap-4">
            <div className="font-display text-7xl md:text-8xl font-bold text-ink-primary tracking-tight">
              <AnimatedCounter value={247} />
            </div>
            <StatusBadge variant="info" status="LIVE FEED ACTIVE" pulse />
          </div>
        </div>

        <p className="watch-stagger font-body text-base md:text-lg text-ink-secondary leading-relaxed max-w-lg">
          Arabian Sea international shipping corridor west of Goa. High density transit of ultra-large crude carriers, bulkers, and regional traffic.
        </p>

        {/* Telemetry card */}
        <div className="watch-stagger grid grid-cols-3 gap-3 p-4 rounded-xl bg-white/80 backdrop-blur-md border border-border-subtle shadow-card text-left">
          <div>
            <div className="text-[10px] font-mono text-ink-tertiary uppercase tracking-wider flex items-center gap-1">
              <Ship size={10} className="text-ocean" /> Sector Density
            </div>
            <div className="font-mono text-sm font-semibold text-ink-primary mt-1">High Corridor</div>
            <div className="text-[10px] text-ink-secondary">Tanker Transit Lane</div>
          </div>
          <div>
            <div className="text-[10px] font-mono text-ink-tertiary uppercase tracking-wider flex items-center gap-1">
              <Waves size={10} className="text-marine" /> Sea State
            </div>
            <div className="font-mono text-sm font-semibold text-ink-primary mt-1">Beaufort 3</div>
            <div className="text-[10px] text-ink-secondary">Swell 1.1m · Wind 11 kts</div>
          </div>
          <div>
            <div className="text-[10px] font-mono text-ink-tertiary uppercase tracking-wider flex items-center gap-1">
              <ShieldCheck size={10} className="text-verified" /> Coverage
            </div>
            <div className="font-mono text-sm font-semibold text-ink-primary mt-1">94.2% Spatial</div>
            <div className="text-[10px] text-ink-secondary">Terrestrial + Sat AIS</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Chapter02Watch;
