'use client';

import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { cn } from '@/lib/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function Chapter07Rewind() {
  const containerRef = useRef<HTMLElement>(null);
  const [timeLabel, setTimeLabel] = useState('T0');

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=150%',
        scrub: 1,
        pin: true,
        onUpdate: (self) => {
          const progress = self.progress;
          if (progress < 0.2) setTimeLabel('T0');
          else if (progress < 0.4) setTimeLabel('T-6h');
          else if (progress < 0.6) setTimeLabel('T-12h');
          else if (progress < 0.8) setTimeLabel('T-18h');
          else setTimeLabel('T-24h');
        }
      }
    });

    // Timeline scrubber animation
    tl.to('.scrub-handle', { left: '0%', ease: 'none', duration: 1 }, 0);
    tl.to('.scrub-track-fill', { width: '0%', ease: 'none', duration: 1 }, 0);

    // Initial Headline fades out
    tl.to('.headline-initial', { opacity: 0, y: -30, duration: 0.2 }, 0.1);
    
    // Final text fades in at the end
    tl.fromTo('.reveal-content', 
      { opacity: 0, y: 30, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.3 }, 
      0.7
    );
    
    // Pulse animation for marker
    gsap.to('.glow-marker', {
      boxShadow: '0 0 20px 5px rgba(6, 182, 212, 0.4)',
      scale: 1.1,
      repeat: -1,
      yoyo: true,
      duration: 1,
    });
  }, { scope: containerRef });

  const markers = ['T-24h', 'T-18h', 'T-12h', 'T-6h', 'T0'];

  return (
    <section ref={containerRef} className="chapter-section h-screen relative flex flex-col items-center justify-center p-8 bg-transparent text-center overflow-hidden">
      <div className="z-10 w-full max-w-4xl flex flex-col items-center justify-center h-full">
        
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <h1 className="headline-initial font-display font-bold text-6xl md:text-8xl text-ink-primary tracking-tighter">
            REWIND THE OCEAN.
          </h1>
        </div>

        <div className="reveal-content absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-0">
          <div className="glow-marker w-4 h-4 bg-marine rounded-full mb-8"></div>
          <h2 className="font-display font-bold text-5xl md:text-7xl text-ocean mb-6">
            Probable origin zone.
          </h2>
          <p className="font-body text-xl md:text-2xl text-ink-secondary max-w-xl mx-auto mb-8">
            The drift model traces the spill to its most likely source.
          </p>
          <StatusBadge variant="warning" status="SIMULATED" />
        </div>

        {/* Timeline Scrubber UI */}
        <div className="absolute bottom-24 w-full max-w-3xl px-8 z-20">
          <div className="flex justify-between mb-4 font-mono text-sm text-ink-tertiary">
            {markers.map((m) => (
              <span key={m} className={cn("transition-colors duration-300", timeLabel === m ? "text-marine font-bold" : "")}>
                {m}
              </span>
            ))}
          </div>
          <div className="relative h-2 bg-ink-tertiary/20 rounded-full w-full">
            <div className="scrub-track-fill absolute top-0 right-0 h-full bg-marine/30 rounded-full w-full origin-right"></div>
            <div className="scrub-handle absolute top-1/2 -translate-y-1/2 left-full -ml-3 w-6 h-6 bg-marine rounded-full border-4 border-surface shadow-[0_0_15px_rgba(6,182,212,0.6)]"></div>
          </div>
          <div className="mt-8 text-center">
            <span className="font-mono text-2xl font-bold text-marine">{timeLabel}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
