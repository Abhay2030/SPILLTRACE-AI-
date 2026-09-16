'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { DataModeIndicator } from '@/components/ui';
import Link from 'next/link';
import { ArrowRight, Compass, Shield, BarChart3 } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function Chapter20Final() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from('.final-anim-elem', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 70%',
      },
      y: 35,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="chapter-section min-h-screen relative flex flex-col items-center justify-center p-6 md:p-12 lg:p-16 bg-surface-elevated text-ink-primary border-t border-ink-tertiary/20"
    >
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center space-y-8 my-auto">
        <div className="final-anim-elem inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ocean/10 text-ocean text-xs font-mono font-bold tracking-wider">
          <Compass className="w-3.5 h-3.5" />
          <span>MARITIME SURVEILLANCE WORKSTATION READY</span>
        </div>

        <h2 className="final-anim-elem text-5xl sm:text-7xl md:text-8xl font-display font-bold tracking-tight text-ink-primary">
          From Space<br />to Suspect.
        </h2>

        <p className="final-anim-elem font-body text-lg md:text-xl text-ink-secondary max-w-2xl leading-relaxed">
          SpillTrace AI bridges satellite radar observation, hydrodynamic ocean transport, and vessel kinematics to provide fast, explainable, and court-admissible maritime attribution.
        </p>

        {/* Action Button Group */}
        <div className="final-anim-elem flex flex-col sm:flex-row gap-4 items-center justify-center w-full max-w-lg pt-4">
          <Link
            href="/investigate"
            className="w-full sm:w-auto px-8 py-4 bg-ocean hover:bg-ocean/90 text-white rounded-xl font-mono text-xs font-bold tracking-wider transition-all shadow-md flex items-center justify-center gap-2 group"
          >
            START INVESTIGATION
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/analytics"
            className="w-full sm:w-auto px-6 py-4 bg-surface border border-ink-tertiary/20 hover:border-ink-tertiary/40 hover:bg-surface-subtle text-ink-primary rounded-xl font-mono text-xs font-bold tracking-wider transition-all flex items-center justify-center gap-2"
          >
            <BarChart3 className="w-4 h-4 text-ink-secondary" />
            SYSTEM ANALYTICS
          </Link>

          <Link
            href="/about"
            className="w-full sm:w-auto px-6 py-4 bg-surface border border-ink-tertiary/20 hover:border-ink-tertiary/40 hover:bg-surface-subtle text-ink-primary rounded-xl font-mono text-xs font-bold tracking-wider transition-all flex items-center justify-center gap-2"
          >
            <Shield className="w-4 h-4 text-ink-secondary" />
            METHODOLOGY
          </Link>
        </div>
      </div>

      {/* SIH 2026 Credentials & Disclaimer Footer */}
      <div className="w-full max-w-6xl mx-auto pt-12 mt-auto border-t border-ink-tertiary/15 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-ink-tertiary">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
          <span className="font-bold text-ink-secondary">Smart India Hackathon 2026</span>
          <span className="hidden sm:inline">·</span>
          <span>Problem ID: SIH26143</span>
          <span className="hidden sm:inline">·</span>
          <span>Ministry of Ports, Shipping and Waterways / ICG</span>
        </div>

        <DataModeIndicator mode="DEMO" />
      </div>
    </section>
  );
}

export default Chapter20Final;
