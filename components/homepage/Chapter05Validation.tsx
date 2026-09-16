'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { ConfidenceBar } from '@/components/ui/ConfidenceBar';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { CheckCircle2, XCircle, ShieldAlert, FileCheck, Wind, Waves, Droplet, HelpCircle } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function Chapter05Validation() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 60%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.fromTo('.val-header', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' });
    tl.fromTo('.lookalike-card', { x: -25, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, stagger: 0.12, ease: 'power2.out' }, '-=0.2');
    tl.fromTo('.val-summary-card', { scale: 0.95, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.7, ease: 'back.out(1.2)' }, '-=0.3');
  }, { scope: containerRef });

  const lookalikes = [
    {
      source: 'Wind-Shadow / Coastal Shelter',
      risk: '4.1%',
      status: 'RULED OUT',
      reason: 'Sustained offshore wind speed (5.6 m/s / 11 kts) exceeds calm-pocket threshold.',
      icon: Wind,
      compatible: false,
    },
    {
      source: 'Low-Wind Calm Sea Surface',
      risk: '2.4%',
      status: 'RULED OUT',
      reason: 'Ambient radar return (-12 dB) confirms presence of background capillary waves.',
      icon: Waves,
      compatible: false,
    },
    {
      source: 'Natural Biogenic / Algal Slick',
      risk: '1.8%',
      status: 'RULED OUT',
      reason: 'MODIS/Sentinel-3 chlorophyll-a concentration normal; boundary too cohesive.',
      icon: Droplet,
      compatible: false,
    },
    {
      source: 'Vessel Turbulent Wake',
      risk: '0.9%',
      status: 'RULED OUT',
      reason: 'Width (>2.8 km) and morphology inconsistent with Kelvin wake dissipation.',
      icon: HelpCircle,
      compatible: false,
    },
    {
      source: 'Mineral / Heavy Crude Hydrocarbon',
      risk: '94.2%',
      status: 'CONFIRMED',
      reason: 'Sharp gradient damping, dark patch contrast, and longitudinal stretching.',
      icon: CheckCircle2,
      compatible: true,
    },
  ];

  return (
    <section
      ref={containerRef}
      className="chapter-section min-h-screen relative flex flex-col justify-center items-center p-6 md:p-16 z-10"
    >
      <div className="w-full max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="val-header text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-border-subtle text-ink-tertiary text-xs font-mono tracking-widest uppercase">
            <FileCheck size={12} className="text-ocean" />
            CHAPTER 05 · LOOK-ALIKE REJECTION & CONFIDENCE
          </div>
          <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-ink-primary tracking-tight">
            Scientific anomaly validation.
          </h2>
          <p className="font-body text-base sm:text-lg text-ink-secondary max-w-2xl mx-auto leading-relaxed">
            SAR dark spots can arise from meteorological phenomena. SpillTrace systematically validates observations against physical look-alikes before initiating vessel attribution.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Lookalike Pipeline Evaluation */}
          <div className="lg:col-span-7 space-y-3">
            <div className="text-xs font-mono font-medium text-ink-tertiary uppercase tracking-wider px-1">
              Multi-Factor Look-Alike Validation Pipeline
            </div>

            <div className="space-y-2.5">
              {lookalikes.map((item, i) => (
                <div
                  key={i}
                  className={`lookalike-card p-4 rounded-xl border transition-all ${
                    item.compatible
                      ? 'bg-ocean/5 border-ocean/30 shadow-subtle'
                      : 'bg-white/80 backdrop-blur border-border-subtle hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2.5">
                      <item.icon
                        size={16}
                        className={item.compatible ? 'text-ocean' : 'text-ink-tertiary'}
                      />
                      <span className="font-display font-semibold text-sm text-ink-primary">
                        {item.source}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-medium text-ink-secondary">
                        {item.risk}
                      </span>
                      <StatusBadge
                        variant={item.compatible ? 'success' : 'neutral'}
                        status={item.status}
                        size="sm"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-ink-secondary pl-6 leading-relaxed">
                    {item.reason}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Probabilistic Assessment Card */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-white border border-border shadow-elevated text-center">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface text-ink-secondary text-xs font-mono uppercase tracking-wider mb-6">
                <ShieldAlert size={12} className="text-ocean" />
                Bayesian Detection Classification
              </div>

              <div className="space-y-1 mb-6">
                <span className="font-mono text-xs text-ink-tertiary uppercase tracking-widest block">
                  Oil Probability
                </span>
                <div className="flex items-baseline justify-center font-display font-bold text-6xl sm:text-7xl text-ocean tracking-tight">
                  <AnimatedCounter value={94} />
                  <span>.2%</span>
                </div>
              </div>

              <div className="space-y-4 text-left p-4 rounded-xl bg-surface border border-border-subtle mb-6">
                <div>
                  <div className="flex justify-between text-xs font-mono text-ink-secondary mb-1">
                    <span>Detection Confidence</span>
                    <span className="font-semibold text-verified">HIGH (0.942)</span>
                  </div>
                  <ConfidenceBar value={0.942} size="sm" />
                </div>
                <div>
                  <div className="flex justify-between text-xs font-mono text-ink-secondary mb-1">
                    <span>False-Positive / Look-Alike Risk</span>
                    <span className="font-semibold text-verified">LOW (4.1%)</span>
                  </div>
                  <ConfidenceBar value={0.041} size="sm" />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border-subtle text-left">
              <div className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-verified mt-1.5 shrink-0" />
                <p className="text-xs text-ink-secondary leading-relaxed">
                  <strong className="text-ink-primary font-medium">Investigative Confidence Note:</strong>{' '}
                  Classification passes operational screening criteria for backtrack drift reconstruction. Field maritime confirmation recommended before formal notice.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Chapter05Validation;
