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
      className="chapter-section min-h-screen relative flex flex-col justify-between items-center p-6 md:p-12 z-10 select-none"
    >
      {/* Top Aerospace Telemetry Ribbon */}
      <div className="hero-telemetry w-full max-w-6xl flex justify-between items-center py-2.5 px-6 rounded-full bg-slate-950/80 backdrop-blur-xl border border-cyan-500/30 shadow-[0_4px_25px_rgba(0,0,0,0.7)] text-xs font-mono text-slate-200">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
          </span>
          <span className="text-white font-bold tracking-wider">SECTOR: ARABIAN SEA (BRAVO-4)</span>
        </div>
        <div className="hidden sm:flex items-center gap-6">
          <span className="flex items-center gap-1.5">
            <Radio size={13} className="text-cyan-400" />
            <span className="text-cyan-200 font-semibold">AIS: NOMINAL (247 TGT)</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Satellite size={13} className="text-sky-400" />
            <span className="text-sky-200 font-semibold">ORBIT: SENTINEL-1A (C-SAR)</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={13} className="text-amber-400" />
            <span className="text-amber-300 font-bold">{timeUtc}</span>
          </span>
        </div>
      </div>

      {/* Hero Central Focus: Translucent Aerospace Glassmorphic Plate allowing 3D Earth to shine through */}
      <div className="max-w-4xl mx-auto text-center my-auto px-6 py-8 sm:px-10 sm:py-10 rounded-3xl bg-slate-950/45 backdrop-blur-md border border-cyan-500/25 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_30px_rgba(6,182,212,0.15)] relative overflow-hidden">
        {/* Ambient Radial Illumination */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-cyan-500/15 blur-3xl pointer-events-none rounded-full" />

        {/* Hackathon Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-400/50 text-cyan-300 text-xs sm:text-sm font-mono tracking-widest uppercase mb-6 shadow-[0_0_20px_rgba(6,182,212,0.4)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
          </span>
          Smart India Hackathon 2026 · SIH26143
        </div>

        {/* Cinematic Title & Tagline */}
        <h1 className="hero-title font-display font-black text-6xl sm:text-7xl md:text-9xl text-white tracking-tight leading-none mb-3 drop-shadow-[0_10px_35px_rgba(0,0,0,0.95)]">
          SPILLTRACE AI
          <span className="block text-3xl sm:text-5xl md:text-6xl font-extrabold mt-3 tracking-tight text-cinematic-cyan drop-shadow-[0_4px_25px_rgba(6,182,212,0.7)]">
            From Space to Candidate.
          </span>
        </h1>

        {/* Mission Statement */}
        <p className="hero-sub font-body text-base sm:text-xl md:text-2xl text-slate-100 max-w-2xl mx-auto leading-relaxed mt-6 mb-10 font-medium drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
          AI-powered maritime forensics and response intelligence. Reconstructing oil spill origins by fusing satellite radar with vessel kinematics and ocean physics.
        </p>

        {/* Primary Action Buttons */}
        <div className="hero-ctas flex flex-col sm:flex-row items-center justify-center gap-5">
          <Link href="/" className="w-full sm:w-auto">
            <button className="group relative w-full sm:w-auto inline-flex items-center justify-center px-9 py-4 rounded-xl text-white font-bold text-sm sm:text-base uppercase tracking-wider bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-[0_0_35px_rgba(6,182,212,0.6)] border border-cyan-300/60 hover:scale-105 transition-all duration-300 cursor-pointer">
              <Compass className="w-5 h-5 mr-2 group-hover:rotate-45 transition-transform" />
              Start Investigation
            </button>
          </Link>
          <button
            onClick={scrollToInvestigation}
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl text-white font-bold text-sm sm:text-base uppercase tracking-wider bg-slate-900/85 hover:bg-slate-800 border border-slate-700 hover:border-cyan-400 backdrop-blur-xl shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer text-slate-100"
          >
            <Play size={16} className="mr-2.5 fill-current text-cyan-400" />
            Watch Investigation
          </button>
        </div>
      </div>

      {/* Bottom Mission-Control Telemetry HUD Cards */}
      <div className="hero-hud w-full max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 pb-4">
        <div className="glass-card-cinematic rounded-2xl p-4 sm:p-5 text-left group hover:border-cyan-400/60 transition-all">
          <div className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-2 font-bold mb-1">
            <Compass size={13} className="text-cyan-400 group-hover:rotate-45 transition-transform" />
            Target Coordinates
          </div>
          <div className="font-mono text-base sm:text-lg font-black text-white drop-shadow">15.28°N, 72.05°E</div>
          <div className="text-xs text-slate-300 font-medium mt-0.5">Goa Offshore (~180 km West)</div>
        </div>

        <div className="glass-card-cinematic rounded-2xl p-4 sm:p-5 text-left group hover:border-cyan-400/60 transition-all">
          <div className="text-[11px] font-mono text-sky-400 uppercase tracking-widest flex items-center gap-2 font-bold mb-1">
            <Satellite size={13} className="text-sky-400" />
            Sensor Modality
          </div>
          <div className="font-mono text-base sm:text-lg font-black text-white drop-shadow">C-Band SAR (10m)</div>
          <div className="text-xs text-slate-300 font-medium mt-0.5">Dual-Pol VV+VH StripMap</div>
        </div>

        <div className="glass-card-cinematic rounded-2xl p-4 sm:p-5 text-left group hover:border-cyan-400/60 transition-all">
          <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-widest flex items-center gap-2 font-bold mb-1">
            <Radio size={13} className="text-emerald-400" />
            Traffic Density
          </div>
          <div className="font-mono text-base sm:text-lg font-black text-white drop-shadow">247 Tracked Vessels</div>
          <div className="text-xs text-slate-300 font-medium mt-0.5">24h Correlation Window</div>
        </div>

        <div className="glass-card-cinematic rounded-2xl p-4 sm:p-5 text-left group hover:border-cyan-400/60 transition-all">
          <div className="text-[11px] font-mono text-amber-400 uppercase tracking-widest flex items-center gap-2 font-bold mb-1">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            System Mode
          </div>
          <div className="font-mono text-base sm:text-lg font-black text-white drop-shadow">DEMO · SIMULATED</div>
          <div className="text-xs text-slate-300 font-medium mt-0.5">Incident ID: ST-2026-0042</div>
        </div>
      </div>

      {/* Cinematic Scroll Down Indicator */}
      <div
        onClick={scrollToInvestigation}
        className="scroll-indicator cursor-pointer text-cyan-400 hover:text-cyan-300 transition-colors flex flex-col items-center gap-1.5 mt-2 drop-shadow-[0_0_15px_rgba(6,182,212,0.8)]"
        role="button"
        aria-label="Scroll to investigation"
      >
        <span className="text-[11px] font-mono tracking-widest uppercase font-bold">INVESTIGATION TIMELINE</span>
        <ArrowDown size={16} className="animate-bounce" />
      </div>
    </section>
  );
}

export default Chapter01Ocean;
