'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { ShieldAlert, AlertTriangle, Fish, Anchor, Clock, Trees } from 'lucide-react';
import { cn } from '@/lib/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ThreatEntity {
  id: string;
  name: string;
  category: string;
  distanceKm: number;
  direction: string;
  severity: 'critical' | 'warning' | 'success';
  statusLabel: string;
  timeToImpact: string;
  impactDetails: string;
  icon: React.ComponentType<{ className?: string }>;
}

const THREATS: ThreatEntity[] = [
  {
    id: 'netrani',
    name: 'Netrani Island Marine Sanctuary',
    category: 'ECOLOGICAL HABITAT',
    distanceKm: 42,
    direction: 'ENE',
    severity: 'warning',
    statusLabel: 'ELEVATED WATCH',
    timeToImpact: '28–34 hrs (Peripheral eddy)',
    impactDetails: 'Pristine coral reef ecosystem and migratory passage for whale sharks and sea turtles. High conservation value.',
    icon: Trees,
  },
  {
    id: 'karwar',
    name: 'Karwar Artisanal Trawling Fleet',
    category: 'COMMERCIAL FISHERIES',
    distanceKm: 95,
    direction: 'E',
    severity: 'critical',
    statusLabel: 'HIGH IMPACT',
    timeToImpact: 'Immediate notice required',
    impactDetails: 'Peak mackerel and oil sardine harvesting season with 80+ small artisanal fishing craft active in coastal shelf zone.',
    icon: Fish,
  },
  {
    id: 'shipping',
    name: 'International Tanker Transit Lane',
    category: 'MARITIME INFRASTRUCTURE',
    distanceKm: 18,
    direction: 'W',
    severity: 'warning',
    statusLabel: 'ACTIVE HAZARD',
    timeToImpact: 'Immediate',
    impactDetails: 'Major Arabian Sea hydrocarbon transit corridor handling 45+ deep-draft commercial vessels daily. Collision & secondary hazard.',
    icon: Anchor,
  },
  {
    id: 'goa',
    name: 'Goa Coastal Tourism & Estuaries',
    category: 'COASTAL POPULATION',
    distanceKm: 180,
    direction: 'NE',
    severity: 'success',
    statusLabel: 'LOW IMMEDIATE RISK',
    timeToImpact: '> 72 hrs (< 1% probability)',
    impactDetails: 'Current drift vector (142° SSE) carries slick parallel to coastline, sparing nearshore beaches and mangrove estuaries.',
    icon: ShieldAlert,
  },
];

export function Chapter10Threat() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 50%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.fromTo('.threat-header', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 });
    tl.fromTo('.overall-risk-card', { scale: 0.95, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.2)' }, '-=0.2');
    tl.fromTo('.threat-item', { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.12 }, '-=0.4');
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="chapter-section min-h-screen relative flex items-center justify-center p-6 md:p-12 lg:p-16"
    >
      <div className="z-10 w-full max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <div className="threat-header text-center space-y-3">
          <SectionLabel title="GEOSPATIAL THREAT & EXPOSURE AUDIT" align="center" />
          <h2 className="font-display font-bold text-4xl md:text-6xl text-ink-primary tracking-tight">
            What's at Risk?
          </h2>
          <p className="font-body text-base md:text-lg text-ink-secondary max-w-2xl mx-auto">
            Real-time overlay of maritime habitats, fishing banks, and shipping channels intersecting the trajectory envelope.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Overall Risk Assessment Panel */}
          <div className="lg:col-span-5 flex flex-col justify-between p-8 bg-surface rounded-2xl border border-critical/30 shadow-sm relative overflow-hidden">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-critical/10 flex items-center justify-center text-critical">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <span className="font-mono text-xs text-ink-tertiary uppercase tracking-wider block">
                    COMPOSITE ASSESSMENT
                  </span>
                  <h3 className="font-display text-2xl font-bold text-ink-primary">
                    OVERALL THREAT: HIGH
                  </h3>
                </div>
              </div>

              <div className="p-4 bg-critical/5 rounded-xl border border-critical/20 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs font-semibold text-critical">ECOLOGICAL EXPOSURE</span>
                  <span className="font-mono text-xs font-bold text-critical">TIER 1 (IMMEDIATE)</span>
                </div>
                <p className="text-xs font-body text-ink-secondary leading-relaxed">
                  While shoreline beaching risk is low (&lt; 2%), high-density pelagic fishing and sanctuary proximity mandate rapid containment before mousse formation.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-ink-secondary">Biodiversity Sensitivity Score</span>
                  <span className="font-bold text-critical">8.4 / 10</span>
                </div>
                <div className="w-full bg-ink-tertiary/15 h-2 rounded-full overflow-hidden">
                  <div className="bg-critical h-full rounded-full w-[84%]" />
                </div>
              </div>
            </div>

            {/* Response Urgency Window Clock */}
            <div className="mt-8 pt-6 border-t border-ink-tertiary/15 flex items-center gap-4 bg-surface-subtle p-4 rounded-xl">
              <Clock className="w-8 h-8 text-amber-500 shrink-0" />
              <div>
                <span className="font-mono text-[11px] text-ink-tertiary uppercase block">
                  ACTION WINDOW BEFORE EMULSIFICATION
                </span>
                <span className="font-mono text-xl font-bold text-ink-primary">
                  &lt; 36 Hours Remaining
                </span>
              </div>
            </div>
          </div>

          {/* Right: Sensitive Receptors Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {THREATS.map((threat) => {
              const Icon = threat.icon;
              return (
                <div
                  key={threat.id}
                  className="threat-item p-5 bg-surface rounded-xl border border-ink-tertiary/15 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between gap-3"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-ink-primary/5 flex items-center justify-center text-ink-primary">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="font-mono text-[10px] text-ink-tertiary uppercase tracking-wider">
                          {threat.category}
                        </span>
                      </div>
                      <StatusBadge variant={threat.severity} status={threat.statusLabel} />
                    </div>

                    <h4 className="font-display text-base font-bold text-ink-primary mb-1">
                      {threat.name}
                    </h4>

                    <p className="text-xs font-body text-ink-secondary leading-relaxed">
                      {threat.impactDetails}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-ink-tertiary/10 flex items-center justify-between font-mono text-xs">
                    <span className="text-ink-secondary">
                      Distance: <strong className="text-ink-primary">{threat.distanceKm} km</strong> {threat.direction}
                    </span>
                    <span className="text-ink-tertiary text-[11px]">
                      {threat.timeToImpact}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Chapter10Threat;
