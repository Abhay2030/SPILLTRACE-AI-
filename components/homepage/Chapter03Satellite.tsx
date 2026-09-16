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
        <div className="space-y-6">
          <div className="sat-anim inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-border-subtle text-ink-tertiary text-xs font-mono tracking-widest uppercase">
            <Satellite size={12} className="text-ocean" />
            CHAPTER 03 · SATELLITE ACQUISITION
          </div>

          <div className="sat-anim">
            <h2 className="font-display text-5xl md:text-7xl font-bold text-ink-primary tracking-tight">
              SENTINEL-1A
            </h2>
            <p className="font-mono text-sm text-ocean mt-1 font-medium">
              C-BAND SYNTHETIC APERTURE RADAR (SAR)
            </p>
          </div>

          <p className="sat-anim font-body text-base md:text-lg text-ink-secondary leading-relaxed max-w-lg">
            Descending orbit pass over Sector 15. Active microwave pulses penetrate persistent cloud cover, scanning sea-surface roughness across a 250-kilometer swath.
          </p>

          {/* Telemetry Parameter Grid */}
          <div className="sat-anim grid grid-cols-2 gap-3 p-4 rounded-xl bg-white/85 backdrop-blur-md border border-border-subtle shadow-card text-left max-w-lg">
            <div>
              <div className="text-[10px] font-mono text-ink-tertiary uppercase">Acquisition Timestamp</div>
              <div className="font-mono text-xs font-semibold text-ink-primary mt-0.5">2026-09-14 03:42:00 UTC</div>
            </div>
            <div>
              <div className="text-[10px] font-mono text-ink-tertiary uppercase">Spatial Resolution</div>
              <div className="font-mono text-xs font-semibold text-ink-primary mt-0.5">10 × 10 m / pixel</div>
            </div>
            <div>
              <div className="text-[10px] font-mono text-ink-tertiary uppercase">Polarization Channels</div>
              <div className="font-mono text-xs font-semibold text-ink-primary mt-0.5">VV + VH Dual-Pol</div>
            </div>
            <div>
              <div className="text-[10px] font-mono text-ink-tertiary uppercase">Target Sector</div>
              <div className="font-mono text-xs font-semibold text-ink-primary mt-0.5">15.2°N, 72.1°E</div>
            </div>
          </div>

          {/* Scientific Anomaly Detection Notification */}
          <div className="anomaly-banner flex items-center justify-between p-4 rounded-xl bg-caution/10 border border-caution/25 max-w-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-caution/15 flex items-center justify-center text-caution">
                <AlertCircle size={18} />
              </div>
              <div>
                <div className="font-mono text-xs font-bold text-ink-primary tracking-wide">
                  RADAR BACKSCATTER ANOMALY IDENTIFIED
                </div>
                <div className="text-xs text-ink-secondary mt-0.5">
                  Surface capillary wave damping · ID: ST-2026-0042
                </div>
              </div>
            </div>
            <StatusBadge variant="warning" status="EVALUATING" />
          </div>
        </div>

        {/* Right: Sensor Swath Footprint Illustration */}
        <div className="sat-anim hidden md:flex flex-col items-center justify-center p-8">
          <div className="w-full max-w-md p-6 rounded-2xl bg-white/75 backdrop-blur-md border border-border shadow-elevated text-left space-y-4">
            <div className="flex justify-between items-center text-xs font-mono text-ink-tertiary border-b border-border-subtle pb-3">
              <span className="flex items-center gap-1.5 text-ocean">
                <Radio size={12} className="animate-pulse" /> SENSOR FOOTPRINT
              </span>
              <span>250 KM SWATH</span>
            </div>
            <div className="aspect-[16/10] bg-navy/5 rounded-lg border border-ocean/20 relative overflow-hidden flex items-center justify-center">
              {/* Animated scanning radar beam line */}
              <div className="absolute inset-0 bg-gradient-to-b from-ocean/0 via-ocean/10 to-ocean/0 animate-subtle-pulse" />
              <div className="text-center p-4">
                <Eye size={28} className="mx-auto text-ocean/60 mb-2" />
                <p className="font-mono text-xs text-ink-secondary font-medium">ESA SENTINEL-1A · C-SAR</p>
                <p className="text-[11px] text-ink-tertiary mt-1">Interferometric Wide Swath Mode</p>
              </div>
              <div className="absolute bottom-3 right-3 font-mono text-[9px] text-ink-tertiary bg-white/80 px-2 py-0.5 rounded border border-border-subtle">
                PASS #41872
              </div>
            </div>
            <p className="text-xs text-ink-secondary leading-relaxed">
              Oil slicks suppress wind-generated capillary ocean ripples, creating distinct low-backscatter dark patches on radar sensors regardless of day, night, or fog.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Chapter03Satellite;
