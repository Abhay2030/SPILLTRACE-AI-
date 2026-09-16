'use client';

import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Shield, Anchor, Crosshair, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Scenario {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  primaryMetric: string;
  recoveryPct: number;
  assetsRequired: string;
  timeToDeploy: string;
  residualRisk: 'LOW' | 'MEDIUM' | 'HIGH';
  residualVariant: 'success' | 'warning' | 'critical';
  costEstimate: string;
  tacticalFocus: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: 'contain_east',
    title: 'CONTAIN EAST',
    subtitle: 'Eastern Deflection Booming',
    description: 'Deploys 2,400m offshore heavy boom curtains along the eastern flank to deflect slick away from the continental shelf and fishing grounds.',
    primaryMetric: '78% Total Containment',
    recoveryPct: 78,
    assetsRequired: '4 Response Units (2 OPVs + 2 Tugs)',
    timeToDeploy: '2.5 Hours to Station',
    residualRisk: 'MEDIUM',
    residualVariant: 'warning',
    costEstimate: '₹42 Lakhs ($50,000)',
    tacticalFocus: 'Deflection into offshore deep-water recovery zone',
  },
  {
    id: 'protect_coast',
    title: 'PROTECT COAST',
    subtitle: 'Ecological Sanctuary Barrier',
    description: 'Establishes a double-layered physical containment barrier 40 km offshore from Netrani Island Marine Sanctuary and Karwar nursery banks.',
    primaryMetric: '95% Coastal Protection',
    recoveryPct: 95,
    assetsRequired: '6 Units (3 Coast Guard + 3 Skimmers)',
    timeToDeploy: '3.0 Hours to Station',
    residualRisk: 'LOW',
    residualVariant: 'success',
    costEstimate: '₹68 Lakhs ($82,000)',
    tacticalFocus: 'Strict isolation of marine biodiversity receptors',
  },
  {
    id: 'intercept_drift',
    title: 'INTERCEPT DRIFT',
    subtitle: 'High-Speed Pelagic Skimming',
    description: 'Direct open-ocean interception deploying weir skimmers into the heaviest Bonn Code 4/5 core slick along the 142° drift vector.',
    primaryMetric: '62% Mechanical Recovery',
    recoveryPct: 62,
    assetsRequired: '3 Specialized Skimmer Vessels',
    timeToDeploy: '4.5 Hours to Station',
    residualRisk: 'HIGH',
    residualVariant: 'critical',
    costEstimate: '₹55 Lakhs ($66,000)',
    tacticalFocus: 'Direct physical removal of concentrated emulsion',
  },
];

export function Chapter17Simulation() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<string>(SCENARIOS[1].id); // Default to Protect Coast

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 50%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.fromTo('.sim-header', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 });
    tl.fromTo('.scenario-tab-btn', { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, stagger: 0.1 }, '-=0.3');
    tl.fromTo('.sim-content-box', { scale: 0.96, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6 }, '-=0.2');
  }, { scope: containerRef });

  const currentScenario = SCENARIOS.find((s) => s.id === activeTab) || SCENARIOS[1];

  return (
    <section
      ref={containerRef}
      className="chapter-section min-h-screen relative flex flex-col justify-center p-6 md:p-12 lg:p-16"
    >
      <div className="z-10 w-full max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <div className="sim-header text-center space-y-3">
          <SectionLabel title="PREDICTIVE RESPONSE SIMULATION" align="center" />
          <h2 className="font-display font-bold text-4xl md:text-6xl text-ink-primary tracking-tight">
            Test Before You Act.
          </h2>
          <p className="font-body text-base md:text-lg text-ink-secondary max-w-2xl mx-auto">
            Simulate intervention strategies against real-time drift models and asset capabilities before committing operational resources.
          </p>
        </div>

        {/* 3 Scenario Switcher Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SCENARIOS.map((scenario) => {
            const isSelected = scenario.id === activeTab;
            return (
              <button
                key={scenario.id}
                onClick={() => setActiveTab(scenario.id)}
                className={cn(
                  "scenario-tab-btn text-left p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between gap-3",
                  isSelected
                    ? "bg-surface border-ocean shadow-md ring-2 ring-ocean/30"
                    : "bg-surface border-ink-tertiary/20 hover:border-ink-tertiary/40 shadow-sm"
                )}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] text-ink-tertiary uppercase font-bold tracking-wider">
                      {scenario.subtitle}
                    </span>
                    <StatusBadge variant={scenario.residualVariant} status={scenario.residualRisk} />
                  </div>
                  <h4 className="font-display text-lg font-bold text-ink-primary">
                    {scenario.title}
                  </h4>
                </div>

                <div className="pt-3 border-t border-ink-tertiary/10 flex justify-between items-end">
                  <span className="font-mono text-sm font-bold text-ocean">
                    {scenario.primaryMetric}
                  </span>
                  <span className="font-mono text-xs text-ink-tertiary">
                    {scenario.timeToDeploy.split(' ')[0]} h ETA
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Scenario Simulation Workbench */}
        <div className="sim-content-box bg-surface rounded-2xl border border-ink-tertiary/20 p-6 md:p-8 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Narrative & Tactical Directives */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="font-mono text-xs text-ocean font-bold uppercase tracking-wider block mb-1">
                OPERATIONAL DIRECTIVE · {currentScenario.title}
              </span>
              <h3 className="font-display text-2xl font-bold text-ink-primary">
                {currentScenario.subtitle}
              </h3>
            </div>

            <p className="font-body text-sm text-ink-secondary leading-relaxed">
              {currentScenario.description}
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-surface-subtle rounded-xl border border-ink-tertiary/15">
                <span className="font-mono text-[10px] text-ink-tertiary uppercase block">
                  ASSETS MOBILIZED
                </span>
                <span className="font-display text-sm font-bold text-ink-primary mt-1 block">
                  {currentScenario.assetsRequired}
                </span>
              </div>

              <div className="p-4 bg-surface-subtle rounded-xl border border-ink-tertiary/15">
                <span className="font-mono text-[10px] text-ink-tertiary uppercase block">
                  ESTIMATED DEPLOYMENT TIME
                </span>
                <span className="font-display text-sm font-bold text-ink-primary mt-1 block">
                  {currentScenario.timeToDeploy}
                </span>
              </div>
            </div>

            <div className="p-3.5 bg-ink-primary/5 rounded-xl border border-ink-tertiary/10 text-xs font-mono text-ink-secondary">
              <strong className="text-ink-primary">Tactical Goal:</strong> {currentScenario.tacticalFocus}
            </div>
          </div>

          {/* Right: Outcome Scorecard & Efficiency Ring */}
          <div className="lg:col-span-5 bg-surface-subtle rounded-xl p-6 border border-ink-tertiary/15 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-ink-tertiary uppercase tracking-wider">PROJECTED EFFECTIVENESS</span>
                <span className="font-bold text-verified">SIMULATED SUCCESS</span>
              </div>

              <div>
                <div className="flex justify-between items-baseline mb-2 font-mono">
                  <span className="text-xs text-ink-secondary">Target Containment</span>
                  <span className="text-3xl font-display font-bold text-ocean">
                    {currentScenario.recoveryPct}%
                  </span>
                </div>
                <div className="w-full bg-ink-tertiary/20 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-ocean h-full rounded-full transition-all duration-700"
                    style={{ width: `${currentScenario.recoveryPct}%` }}
                  />
                </div>
              </div>

              <div className="space-y-2 text-xs font-mono pt-2">
                <div className="flex justify-between">
                  <span className="text-ink-secondary">Estimated Intervention Cost</span>
                  <span className="font-bold text-ink-primary">{currentScenario.costEstimate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-secondary">Ecological Residual Exposure</span>
                  <StatusBadge variant={currentScenario.residualVariant} status={currentScenario.residualRisk} />
                </div>
              </div>
            </div>

            <button
              onClick={() => window.location.href = '/response'}
              className="w-full py-3 bg-ink-primary hover:bg-ink-primary/90 text-white rounded-xl font-mono text-xs font-bold tracking-wider transition-colors flex items-center justify-center gap-2 mt-4"
            >
              EXECUTE SIMULATED STRATEGY <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Chapter17Simulation;
