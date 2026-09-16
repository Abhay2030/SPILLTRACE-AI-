'use client';

import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { ConfidenceBar } from '@/components/ui/ConfidenceBar';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Metric } from '@/components/ui/Metric';
import { Crosshair, HelpCircle, ShieldCheck, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function Chapter08Origin() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeZone, setActiveZone] = useState<number>(80);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 60%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.fromTo('.origin-header', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 });

    tl.fromTo('.prob-ring-3', { scale: 0, opacity: 0 }, { scale: 1, opacity: 0.15, duration: 0.8, ease: 'back.out(1.2)' });
    tl.fromTo('.prob-ring-2', { scale: 0, opacity: 0 }, { scale: 1, opacity: 0.35, duration: 0.6, ease: 'back.out(1.2)' }, '-=0.4');
    tl.fromTo('.prob-ring-1', { scale: 0, opacity: 0 }, { scale: 1, opacity: 0.65, duration: 0.4, ease: 'back.out(1.2)' }, '-=0.3');

    tl.fromTo('.ring-annotation', { opacity: 0, y: 5 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.15 }, '-=0.2');
    tl.fromTo('.origin-metric', { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, stagger: 0.1 }, '-=0.8');

    gsap.to('.origin-center', {
      scale: 1.3,
      opacity: 0.9,
      repeat: -1,
      yoyo: true,
      duration: 1.2,
      ease: 'sine.inOut',
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="chapter-section min-h-screen relative flex items-center justify-center p-6 md:p-12 lg:p-16"
    >
      <div className="z-10 w-full max-w-6xl mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="origin-header text-center mb-12 space-y-3">
          <SectionLabel title="ORIGIN PROBABILITY DENSITY FIELD" align="center" />
          <h2 className="font-display font-bold text-4xl md:text-6xl text-ink-primary tracking-tight">
            Probable Origin Zone.
          </h2>
          <p className="font-body text-base md:text-lg text-ink-secondary max-w-2xl mx-auto">
            SpillTrace rejects fake pinpoint certainty. Instead, it computes an authentic Bayesian probability distribution derived from 10,000 Monte Carlo backward simulations.
          </p>
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Visual: Probabilistic Ellipsoid Field */}
          <div className="lg:col-span-7 relative aspect-[4/3] bg-surface rounded-2xl p-6 border border-ink-tertiary/20 shadow-sm flex flex-col justify-between overflow-hidden">
            {/* Field Telemetry Header */}
            <div className="z-10 flex items-center justify-between text-xs font-mono border-b border-ink-tertiary/10 pb-3">
              <div className="flex items-center gap-2">
                <Crosshair className="w-4 h-4 text-marine" />
                <span className="font-bold text-ink-primary">CENTROID: 15.281°N, 72.048°E</span>
              </div>
              <span className="text-ink-tertiary">BATHYMETRY: 1,420 m DEPTH</span>
            </div>

            {/* Interactive Probability Field SVG */}
            <div className="relative w-full h-full flex items-center justify-center my-auto">
              <svg viewBox="0 0 460 320" className="w-full h-full max-h-[300px] select-none">
                <defs>
                  {/* Radial gradient for Gaussian dispersion */}
                  <radialGradient id="gaussProb" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.5" />
                    <stop offset="40%" stopColor="#0891B2" stopOpacity="0.25" />
                    <stop offset="80%" stopColor="#0284C7" stopOpacity="0.08" />
                    <stop offset="100%" stopColor="#0284C7" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Grid markings */}
                <g stroke="#94A3B8" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.3">
                  <line x1="230" y1="20" x2="230" y2="300" />
                  <line x1="30" y1="160" x2="430" y2="160" />
                  <circle cx="230" cy="160" r="130" fill="none" />
                </g>

                {/* Outer Ellipse P > 20% */}
                <g
                  className="cursor-pointer"
                  onClick={() => setActiveZone(20)}
                >
                  <ellipse
                    cx="230"
                    cy="160"
                    rx="140"
                    ry="80"
                    fill="url(#gaussProb)"
                    stroke="#0284C7"
                    strokeWidth={activeZone === 20 ? '2' : '1'}
                    strokeDasharray="4 4"
                    className="prob-ring-3 transition-all"
                  />
                  <text x="350" y="100" fill="#0284C7" fontSize="10" fontFamily="monospace" fontWeight="600">
                    P &gt; 20% (±9.5 km)
                  </text>
                </g>

                {/* Mid Ellipse P > 50% */}
                <g
                  className="cursor-pointer"
                  onClick={() => setActiveZone(50)}
                >
                  <ellipse
                    cx="230"
                    cy="160"
                    rx="95"
                    ry="55"
                    fill="rgba(8, 145, 178, 0.2)"
                    stroke="#0891B2"
                    strokeWidth={activeZone === 50 ? '2.5' : '1.5'}
                    className="prob-ring-2 transition-all"
                  />
                  <text x="305" y="130" fill="#0891B2" fontSize="10" fontFamily="monospace" fontWeight="700">
                    P &gt; 50% (±6.4 km)
                  </text>
                </g>

                {/* Core Ellipse P > 80% */}
                <g
                  className="cursor-pointer"
                  onClick={() => setActiveZone(80)}
                >
                  <ellipse
                    cx="230"
                    cy="160"
                    rx="55"
                    ry="32"
                    fill="rgba(6, 182, 212, 0.45)"
                    stroke="#06B6D4"
                    strokeWidth={activeZone === 80 ? '3' : '2'}
                    className="prob-ring-1 transition-all"
                  />
                  <text x="230" y="145" fill="#FFFFFF" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                    P &gt; 80% (±4.2 km)
                  </text>
                </g>

                {/* Peak Centroid Node */}
                <circle cx="230" cy="160" r="4" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.5" className="origin-center" />
              </svg>
            </div>

            {/* Bottom Zone Switcher */}
            <div className="z-10 pt-3 border-t border-ink-tertiary/10 flex items-center justify-between text-xs font-mono">
              <span className="text-ink-tertiary">CLICK CONTOUR TO INSPECT:</span>
              <div className="flex gap-2">
                {[80, 50, 20].map((zone) => (
                  <button
                    key={zone}
                    onClick={() => setActiveZone(zone)}
                    className={cn(
                      "px-2.5 py-1 rounded text-[11px] transition-all",
                      activeZone === zone
                        ? "bg-marine text-white font-bold"
                        : "bg-ink-primary/5 text-ink-secondary hover:bg-ink-primary/10"
                    )}
                  >
                    P &gt; {zone}%
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Metrics & Uncertainty Disclosures */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 bg-surface rounded-2xl border border-ink-tertiary/20 shadow-sm space-y-6">
              <div className="origin-metric">
                <span className="font-mono text-xs text-ink-tertiary mb-1 block uppercase tracking-wider">
                  PRIMARY ORIGIN COORDINATE
                </span>
                <div className="font-mono text-2xl font-bold text-ink-primary bg-surface-subtle p-3 rounded-lg border border-ink-tertiary/15">
                  15.281°N, 72.048°E
                </div>
              </div>

              <div className="origin-metric space-y-2">
                <div className="flex justify-between items-end text-xs font-mono">
                  <span className="text-ink-tertiary uppercase tracking-wider">ORIGIN CONFIDENCE</span>
                  <span className="font-bold text-marine">78.4% (HIGH)</span>
                </div>
                <ConfidenceBar value={0.784} />
              </div>

              <div className="origin-metric grid grid-cols-2 gap-4 pt-2">
                <Metric label="SEMI-MAJOR AXIS" value="±6.4" unit="km" />
                <Metric label="CONFIDENCE INTERVAL" value="95%" unit="2-sigma" />
              </div>

              {/* Model Verification Sources */}
              <div className="origin-metric pt-4 border-t border-ink-tertiary/15 space-y-3">
                <span className="font-mono text-xs text-ink-tertiary uppercase tracking-wider block">
                  PHYSICS ENGINE INPUTS
                </span>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-ink-secondary">INCOIS Arabian Sea Hydrodynamics</span>
                  <StatusBadge variant="success" status="VERIFIED" />
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-ink-secondary">ECMWF ERA5 Atmospheric Boundary</span>
                  <StatusBadge variant="success" status="VERIFIED" />
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-ink-secondary">Stokes Drift Wave Radiation</span>
                  <StatusBadge variant="success" status="VERIFIED" />
                </div>
              </div>
            </div>

            {/* Scientific Integrity Notice */}
            <div className="origin-metric p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-xs font-body text-ink-secondary leading-relaxed">
                <strong className="text-ink-primary font-medium block">Scientific Integrity Commitment:</strong>
                Real-world ocean dynamics involve turbulent sub-mesoscale eddies and wind variance. SpillTrace reports uncertainty envelopes rather than false precision to ensure legally defensible maritime evidence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Chapter08Origin;
