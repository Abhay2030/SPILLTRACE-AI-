'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Satellite, Radio, Eye, AlertCircle } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function Chapter03Satellite() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 60%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.fromTo(
      '.sat-anim',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: 'power2.out' }
    );

    tl.fromTo(
      '.anomaly-banner',
      { scale: 0.95, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: 'power2.out' },
      '+=0.2'
    );
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="chapter-section min-h-screen relative flex items-center p-8 md:p-16 z-10"
    >
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Telemetry Column */}
        <div className="space-y-6 glass-card-cinematic p-8 sm:p-10 rounded-3xl">
          <div className="sat-anim inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 text-xs font-mono tracking-widest uppercase shadow-[0_0_15px_rgba(6,182,212,0.3)]">
            <Satellite size={13} className="text-cyan-400" />
            CHAPTER 03 · SATELLITE ACQUISITION
          </div>

          <div className="sat-anim">
            <h2 className="font-display text-5xl md:text-7xl font-black text-white tracking-tight drop-shadow-[0_4px_25px_rgba(0,0,0,0.95)]">
              SENTINEL-1A
            </h2>
            <p className="font-mono text-sm text-cyan-300 mt-1 font-bold tracking-wider">
              C-BAND SYNTHETIC APERTURE RADAR (SAR)
            </p>
          </div>

          <p className="sat-anim font-body text-base md:text-lg text-slate-200 leading-relaxed max-w-lg font-medium">
            Descending orbit pass over Sector 15. Active microwave pulses penetrate persistent cloud cover, scanning sea-surface roughness across a 250-kilometer swath.
          </p>

          {/* Telemetry Parameter Grid */}
          <div className="sat-anim grid grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-900/90 border border-slate-700/80 shadow-2xl text-left max-w-lg">
            <div>
              <div className="text-[10px] font-mono text-cyan-400 uppercase font-semibold">Acquisition Timestamp</div>
              <div className="font-mono text-xs font-bold text-white mt-0.5">2026-09-14 03:42:00 UTC</div>
            </div>
            <div>
              <div className="text-[10px] font-mono text-sky-400 uppercase font-semibold">Spatial Resolution</div>
              <div className="font-mono text-xs font-bold text-white mt-0.5">10 × 10 m / pixel</div>
            </div>
            <div>
              <div className="text-[10px] font-mono text-cyan-400 uppercase font-semibold">Polarization Channels</div>
              <div className="font-mono text-xs font-bold text-white mt-0.5">VV + VH Dual-Pol</div>
            </div>
            <div>
              <div className="text-[10px] font-mono text-emerald-400 uppercase font-semibold">Target Sector</div>
              <div className="font-mono text-xs font-bold text-white mt-0.5">15.2°N, 72.1°E</div>
            </div>
          </div>

          {/* Scientific Anomaly Detection Notification */}
          <div className="anomaly-banner flex items-center justify-between p-4 rounded-2xl bg-amber-950/85 border border-amber-500/50 shadow-[0_0_25px_rgba(245,158,11,0.2)] max-w-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400">
                <AlertCircle size={20} />
              </div>
              <div>
                <div className="font-mono text-xs font-black text-amber-300 tracking-wide">
                  RADAR BACKSCATTER ANOMALY IDENTIFIED
                </div>
                <div className="text-xs text-amber-200/80 mt-0.5 font-mono">
                  Surface capillary wave damping · ID: ST-2026-0042
                </div>
              </div>
            </div>
            <StatusBadge variant="warning" status="EVALUATING" />
          </div>
        </div>

        {/* Right: Sensor Swath Footprint Illustration */}
        <div className="sat-anim hidden md:flex flex-col items-center justify-center p-8">
          <div className="w-full max-w-md p-6 rounded-3xl glass-card-cinematic text-left space-y-4 shadow-2xl">
            <div className="flex justify-between items-center text-xs font-mono text-cyan-300 border-b border-slate-700/80 pb-3">
              <span className="flex items-center gap-1.5 font-bold">
                <Radio size={14} className="animate-pulse text-cyan-400" /> SENSOR FOOTPRINT
              </span>
              <span className="text-slate-200">250 KM SWATH</span>
            </div>
            <div className="aspect-[16/10] bg-slate-900/90 rounded-xl border border-cyan-500/30 relative overflow-hidden flex items-center justify-center">
              {/* Animated scanning radar beam line */}
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/0 via-cyan-500/20 to-cyan-500/0 animate-subtle-pulse" />
              <div className="text-center p-4">
                <Eye size={32} className="mx-auto text-cyan-400 mb-2" />
                <p className="font-mono text-xs text-white font-bold">ESA SENTINEL-1A · C-SAR</p>
                <p className="text-[11px] text-cyan-200/80 mt-1 font-mono">Interferometric Wide Swath Mode</p>
              </div>
              <div className="absolute bottom-3 right-3 font-mono text-[9px] text-cyan-300 bg-slate-950/80 px-2 py-0.5 rounded border border-cyan-500/40">
                PASS #41872
              </div>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-medium">
              Oil slicks suppress wind-generated capillary ocean ripples, creating distinct low-backscatter dark patches on radar sensors regardless of day, night, or fog.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Chapter03Satellite;
