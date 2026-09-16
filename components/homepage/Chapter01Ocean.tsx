'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowDown, Play, Compass, Radio, Satellite, Clock } from 'lucide-react';
import { Button } from '@/components/ui/Button';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function Chapter01Ocean() {
  const containerRef = useRef<HTMLElement>(null);
  const [timeUtc, setTimeUtc] = useState('03:42:18 UTC');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTimeUtc(
        now.toISOString().substring(11, 19) + ' UTC'
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      },
    });

    tl.fromTo(
      '.hero-telemetry',
      { y: -15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
    );

    tl.fromTo(
      '.hero-title',
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.0, ease: 'power3.out' },
      '-=0.4'
    );

    tl.fromTo(
      '.hero-sub',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
      '-=0.6'
    );

    tl.fromTo(
      '.hero-ctas',
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
      '-=0.5'
    );

    tl.fromTo(
      '.hero-hud',
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out' },
      '-=0.4'
    );

    gsap.to('.scroll-indicator', {
      y: 6,
      repeat: -1,
      yoyo: true,
      duration: 1.8,
      ease: 'power1.inOut',
    });
  }, { scope: containerRef });

  const scrollToInvestigation = () => {
    const nextChapter = window.innerHeight;
    window.scrollTo({ top: nextChapter, behavior: 'smooth' });
  };

  return (
    <section
      ref={containerRef}
      className="chapter-section min-h-screen relative flex flex-col justify-between items-center p-6 md:p-12 z-10"
    >
      {/* Top telemetry bar */}
      <div className="hero-telemetry w-full max-w-6xl flex justify-between items-center pt-2 text-[11px] font-mono tracking-wider text-ink-tertiary">
        <div className="flex items-center gap-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-verified animate-pulse" />
          <span className="text-ink-secondary font-medium">SURVEILLANCE SECTOR: ARABIAN SEA</span>
        </div>
        <div className="hidden sm:flex items-center gap-6">
          <span className="flex items-center gap-1.5">
            <Radio size={12} className="text-marine" /> AIS RECEPTION: NOMINAL
          </span>
          <span className="flex items-center gap-1.5">
            <Satellite size={12} className="text-ocean" /> ORBIT: SENTINEL-1A
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={12} className="text-ink-secondary" /> {timeUtc}
          </span>
        </div>
      </div>

      {/* Hero Central Focus */}
      <div className="max-w-4xl mx-auto text-center my-auto px-4 py-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ocean/5 border border-ocean/15 text-ocean text-xs font-mono tracking-widest uppercase mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-ocean" />
          Smart India Hackathon 2026 · SIH26143
        </div>

        <h1 className="hero-title font-display font-bold text-5xl sm:text-6xl md:text-8xl text-ink-primary tracking-tight leading-[1.05] mb-6">
          SPILLTRACE AI
          <span className="block text-3xl sm:text-4xl md:text-5xl font-medium text-ink-secondary mt-2 tracking-normal">
            From Space to Suspect.
          </span>
        </h1>

        <p className="hero-sub font-body text-lg sm:text-xl text-ink-secondary max-w-2xl mx-auto leading-relaxed mb-10">
          AI-powered maritime forensics and response intelligence. Reconstructing oil spill origins by fusing satellite radar with vessel kinematics and ocean physics.
        </p>

        {/* Primary CTAs */}
        <div className="hero-ctas flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/investigate">
            <Button size="lg" className="px-8 py-3.5 text-sm uppercase tracking-wider font-semibold shadow-elevated">
              Start Investigation
            </Button>
          </Link>
          <Button
            variant="secondary"
            size="lg"
            onClick={scrollToInvestigation}
            className="px-6 py-3.5 text-sm uppercase tracking-wider text-ink-primary hover:bg-white/80 backdrop-blur-sm border-border"
          >
            <Play size={14} className="mr-2 fill-current text-ocean" />
            Watch Investigation
          </Button>
        </div>
      </div>

      {/* Bottom Mission-Control Telemetry Ribbon */}
      <div className="hero-hud w-full max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 pb-4">
        <div className="p-3.5 rounded-xl bg-white/70 backdrop-blur-md border border-border-subtle shadow-subtle text-left">
          <div className="text-[10px] font-mono text-ink-tertiary uppercase tracking-widest flex items-center gap-1.5 mb-1">
            <Compass size={11} className="text-ocean" /> Target Coordinates
          </div>
          <div className="font-mono text-xs font-semibold text-ink-primary">15.28°N, 72.05°E</div>
          <div className="text-[10px] text-ink-secondary mt-0.5">Goa Offshore (~180 km West)</div>
        </div>

        <div className="p-3.5 rounded-xl bg-white/70 backdrop-blur-md border border-border-subtle shadow-subtle text-left">
          <div className="text-[10px] font-mono text-ink-tertiary uppercase tracking-widest flex items-center gap-1.5 mb-1">
            <Satellite size={11} className="text-marine" /> Sensor Modality
          </div>
          <div className="font-mono text-xs font-semibold text-ink-primary">C-Band SAR (10m)</div>
          <div className="text-[10px] text-ink-secondary mt-0.5">Dual-Pol VV+VH StripMap</div>
        </div>

        <div className="p-3.5 rounded-xl bg-white/70 backdrop-blur-md border border-border-subtle shadow-subtle text-left">
          <div className="text-[10px] font-mono text-ink-tertiary uppercase tracking-widest flex items-center gap-1.5 mb-1">
            <Radio size={11} className="text-verified" /> Traffic Density
          </div>
          <div className="font-mono text-xs font-semibold text-ink-primary">247 Tracked Vessels</div>
          <div className="text-[10px] text-ink-secondary mt-0.5">24h Correlation Window</div>
        </div>

        <div className="p-3.5 rounded-xl bg-white/70 backdrop-blur-md border border-border-subtle shadow-subtle text-left">
          <div className="text-[10px] font-mono text-ink-tertiary uppercase tracking-widest flex items-center gap-1.5 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-verified" /> System Mode
          </div>
          <div className="font-mono text-xs font-semibold text-ink-primary">DEMO · SIMULATED</div>
          <div className="text-[10px] text-ink-secondary mt-0.5">Incident ID: ST-2026-0042</div>
        </div>
      </div>

      {/* Subtle Scroll Down Prompt */}
      <div
        onClick={scrollToInvestigation}
        className="scroll-indicator cursor-pointer text-ink-tertiary hover:text-ocean transition-colors flex flex-col items-center gap-1 mt-2"
        role="button"
        aria-label="Scroll to investigation"
      >
        <span className="text-[10px] font-mono tracking-widest uppercase">INVESTIGATION CHAPTERS</span>
        <ArrowDown size={14} />
      </div>
    </section>
  );
}

export default Chapter01Ocean;
