'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SectionLabel, DataModeIndicator, StatusBadge, ConfidenceBar } from '@/components/ui';
import { cn } from '@/lib/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const candidates = [
  {
    id: 'A',
    name: 'MV Horizon Trader',
    score: 91.4,
    status: 'SUSPECT',
    statusVariant: 'critical',
    flag: 'Panama',
    type: 'Tanker',
  },
  {
    id: 'B',
    name: 'MV Pacific Voyager',
    score: 68.7,
    status: 'UNDER REVIEW',
    statusVariant: 'caution',
    flag: 'Liberia',
    type: 'Cargo',
  },
  {
    id: 'C',
    name: 'FV Sea Fortune',
    score: 54.2,
    status: 'INCONCLUSIVE',
    statusVariant: 'neutral',
    flag: 'India',
    type: 'Fishing',
  }
];

export function Chapter12Candidates() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from('.candidate-card', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 60%',
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out',
    });
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="chapter-section min-h-screen relative flex flex-col items-center justify-center py-24 px-4"
    >
      <div className="absolute top-12 left-0 w-full flex justify-center">
        <SectionLabel title="CANDIDATE VESSELS" />
      </div>

      <div className="w-full max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-display font-medium text-ink-primary text-center mb-16">
          3 vessels remain under investigation.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {candidates.map((candidate, idx) => (
            <div 
              key={candidate.id} 
              className="candidate-card bg-surface border border-ink-tertiary/20 rounded-xl p-8 shadow-sm flex flex-col relative overflow-hidden"
            >
              <div className="absolute top-4 right-6 text-sm font-mono text-ink-tertiary">
                #{idx + 1}
              </div>
              <div className="text-xs font-mono text-ink-secondary mb-2 tracking-widest uppercase">
                Candidate {candidate.id}
              </div>
              <h3 className="text-2xl font-display font-medium text-ink-primary mb-6">
                {candidate.name}
              </h3>

              <div className="mb-8">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm font-body text-ink-secondary">Evidence Score</span>
                  <span className="text-2xl font-mono text-ink-primary">{candidate.score}</span>
                </div>
                <ConfidenceBar value={candidate.score / 100} className="h-2" />
              </div>

              <div className="mt-auto pt-6 border-t border-ink-tertiary/20 flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-body text-ink-secondary">Status</span>
                  <StatusBadge variant={candidate.statusVariant as any} status={candidate.status} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs font-body text-ink-secondary">Flag</div>
                    <div className="text-sm font-medium text-ink-primary">{candidate.flag}</div>
                  </div>
                  <div>
                    <div className="text-xs font-body text-ink-secondary">Type</div>
                    <div className="text-sm font-medium text-ink-primary">{candidate.type}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-8">
        <DataModeIndicator mode="DEMO" />
      </div>
    </section>
  );
}
