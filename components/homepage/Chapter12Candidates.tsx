'use client';

import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { ConfidenceBar } from '@/components/ui/ConfidenceBar';
import { Ship, AlertTriangle, ExternalLink, ShieldCheck, ChevronRight, Anchor } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface CandidateVessel {
  id: string;
  slug: string;
  name: string;
  imo: string;
  mmsi: string;
  flag: string;
  type: string;
  lengthM: number;
  dwtTons: string;
  evidenceScore: number;
  status: string;
  statusVariant: 'critical' | 'warning' | 'neutral' | 'success';
  rank: number;
  highlightAnomaly: string;
  temporalFit: number;
  spatialFit: number;
  driftFit: number;
}

const CANDIDATES: CandidateVessel[] = [
  {
    id: 'VESSEL-A',
    slug: 'VESSEL-A-001',
    name: 'MV Horizon Trader',
    imo: '9876543',
    mmsi: '538006789',
    flag: 'Panama',
    type: 'Crude Oil Tanker',
    lengthM: 228,
    dwtTons: '115,000 DWT',
    evidenceScore: 91.4,
    status: 'PRIMARY SUSPECT',
    statusVariant: 'critical',
    rank: 1,
    highlightAnomaly: '2-hour AIS dark transmission gap with 3.2 kt speed drop directly intersecting the 80% origin ellipse.',
    temporalFit: 92,
    spatialFit: 89,
    driftFit: 94,
  },
  {
    id: 'VESSEL-B',
    slug: 'VESSEL-B-002',
    name: 'MV Pacific Voyager',
    imo: '9654321',
    mmsi: '636015842',
    flag: 'Liberia',
    type: 'Container Ship',
    lengthM: 189,
    dwtTons: '34,000 DWT',
    evidenceScore: 68.7,
    status: 'UNDER REVIEW (DEPRIORITIZED)',
    statusVariant: 'warning',
    rank: 2,
    highlightAnomaly: 'Continuous AIS pinging. Passed 8.2 km north of centroid 6 hours prior to release window.',
    temporalFit: 74,
    spatialFit: 71,
    driftFit: 62,
  },
  {
    id: 'VESSEL-C',
    slug: 'VESSEL-C-003',
    name: 'FV Sea Fortune',
    imo: '8912345',
    mmsi: '419000456',
    flag: 'India',
    type: 'Deep Sea Trawler',
    lengthM: 34,
    dwtTons: '220 DWT',
    evidenceScore: 54.2,
    status: 'INCONCLUSIVE / LOW RISK',
    statusVariant: 'neutral',
    rank: 3,
    highlightAnomaly: 'Low volumetric fuel capacity (< 15 metric tons). Incompatible with 142 metric ton discharge estimate.',
    temporalFit: 82,
    spatialFit: 45,
    driftFit: 38,
  },
];

export function Chapter12Candidates() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeCandidateId, setActiveCandidateId] = useState<string>('VESSEL-A');

  useGSAP(() => {
    gsap.from('.candidate-dossier-card', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 60%',
      },
      y: 40,
      opacity: 0,
      duration: 0.7,
      stagger: 0.15,
      ease: 'power3.out',
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="chapter-section min-h-screen relative flex flex-col justify-center p-6 md:p-12 lg:p-16"
    >
      <div className="z-10 w-full max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <SectionLabel title="FORENSIC CANDIDATE DOSSIER" align="center" />
          <h2 className="font-display font-bold text-4xl md:text-6xl text-ink-primary tracking-tight">
            3 Candidate Vessels.
          </h2>
          <p className="font-body text-base md:text-lg text-ink-secondary max-w-2xl mx-auto">
            Algorithmic attribution evaluates temporal coincidence, spatial proximity, and hydrodynamic drift compatibility against vessel profiles.
          </p>
        </div>

        {/* 3 Dossier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CANDIDATES.map((vessel) => {
            const isSelected = activeCandidateId === vessel.id;
            return (
              <div
                key={vessel.id}
                onClick={() => setActiveCandidateId(vessel.id)}
                className={cn(
                  "candidate-dossier-card rounded-2xl p-6 border transition-all duration-300 flex flex-col justify-between cursor-pointer",
                  isSelected
                    ? "bg-surface border-ocean shadow-lg ring-2 ring-ocean/40"
                    : "bg-surface border-ink-tertiary/20 hover:border-ink-tertiary/40 shadow-sm"
                )}
              >
                <div className="space-y-4">
                  {/* Top Rank Badge & Flag */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-ink-tertiary font-bold tracking-wider">
                      CANDIDATE 0{vessel.rank}
                    </span>
                    <StatusBadge variant={vessel.statusVariant} status={vessel.status} />
                  </div>

                  {/* Vessel Name & Flag */}
                  <div>
                    <h3 className="font-display text-xl font-bold text-ink-primary mb-1">
                      {vessel.name}
                    </h3>
                    <div className="flex items-center gap-2 font-mono text-xs text-ink-secondary">
                      <span className="bg-ink-primary/5 px-2 py-0.5 rounded border border-ink-tertiary/15">
                        {vessel.flag}
                      </span>
                      <span>{vessel.type}</span>
                    </div>
                  </div>

                  {/* Evidence Score Pill */}
                  <div className="p-4 bg-surface-subtle rounded-xl border border-ink-tertiary/15 space-y-2">
                    <div className="flex justify-between items-end text-xs font-mono">
                      <span className="text-ink-tertiary uppercase">ATTRIBUTION SCORE</span>
                      <span className="font-display text-2xl font-bold text-ink-primary">
                        {vessel.evidenceScore}
                        <span className="text-xs text-ink-secondary font-mono"> / 100</span>
                      </span>
                    </div>
                    <ConfidenceBar value={vessel.evidenceScore / 100} />
                  </div>

                  {/* Key Anomaly Quote */}
                  <div className="p-3.5 bg-ink-primary/5 rounded-xl border border-ink-tertiary/10">
                    <span className="font-mono text-[10px] text-ink-tertiary uppercase font-bold block mb-1">
                      CRITICAL ANOMALY:
                    </span>
                    <p className="text-xs font-body text-ink-secondary leading-relaxed">
                      {vessel.highlightAnomaly}
                    </p>
                  </div>

                  {/* Kinematic Compatibility Breakdown */}
                  <div className="space-y-2 text-xs font-mono pt-1">
                    <div className="flex justify-between">
                      <span className="text-ink-secondary">Temporal Alignment</span>
                      <span className="font-bold text-ink-primary">{vessel.temporalFit}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-ink-secondary">Spatial Proximity</span>
                      <span className="font-bold text-ink-primary">{vessel.spatialFit}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-ink-secondary">Drift Match</span>
                      <span className="font-bold text-marine">{vessel.driftFit}%</span>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="mt-6 pt-4 border-t border-ink-tertiary/15 flex items-center justify-between">
                  <div className="font-mono text-[11px] text-ink-tertiary">
                    IMO {vessel.imo}
                  </div>
                  <Link
                    href={`/vessel/${vessel.slug}`}
                    className="flex items-center gap-1 font-mono text-xs font-bold text-ocean hover:text-ocean/80 transition-colors"
                  >
                    FULL PROFILE <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Chapter12Candidates;
