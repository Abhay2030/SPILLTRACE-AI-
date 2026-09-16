'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { DataModeIndicator } from '@/components/ui';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function Chapter20Final() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from('.final-element', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 70%',
      },
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
    });
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="chapter-section min-h-screen relative flex flex-col items-center justify-center py-24 px-4 bg-ink-primary text-surface"
    >
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
        <h2 className="final-element text-6xl md:text-8xl lg:text-9xl font-display font-bold mb-8 tracking-tighter text-white">
          From Space<br/>to Suspect.
        </h2>
        
        <p className="final-element font-body text-xl md:text-2xl text-surface/70 max-w-2xl mb-16 font-light leading-relaxed">
          Maritime intelligence for faster, explainable oil-spill investigation and response.
        </p>
        
        <div className="final-element flex flex-col sm:flex-row gap-6 items-center justify-center w-full max-w-md">
          <Link 
            href="/investigate"
            className="w-full sm:w-auto px-8 py-4 bg-ocean hover:bg-ocean/90 text-white rounded-full font-display font-bold tracking-wide transition-all flex items-center justify-center gap-2 group"
          >
            START INVESTIGATION
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link 
            href="/about"
            className="w-full sm:w-auto px-8 py-4 bg-transparent border border-surface/30 hover:border-surface/60 hover:bg-surface/10 text-white rounded-full font-display font-bold tracking-wide transition-all text-center"
          >
            EXPLORE SYSTEM
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 w-full px-8 flex justify-between items-end">
        <div className="font-mono text-xs text-surface/40">
          SpillTrace AI — Smart India Hackathon 2026 · SIH26143
        </div>
        <DataModeIndicator mode="DEMO" className="opacity-50" />
      </div>
    </section>
  );
}
