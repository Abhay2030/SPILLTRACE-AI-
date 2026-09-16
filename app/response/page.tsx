'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { DataModeIndicator } from '@/components/ui/DataModeIndicator';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { DEMO_RESPONSE_SCENARIOS } from '@/data/demo-response';
import { cn } from '@/lib/utils';
import {
  Wind,
  Waves,
  ShieldCheck,
  Anchor,
  Plane,
  CheckCircle2,
  Clock,
  ArrowRight,
  AlertTriangle,
} from 'lucide-react';

const InvestigationMap = dynamic(() => import('@/components/maps/InvestigationMap'), {
  ssr: false,
  loading: () => (
    <div className="relative h-full bg-surface-subtle rounded-2xl border border-ink-tertiary/20 flex items-center justify-center">
      <div className="text-center font-mono text-xs text-ink-tertiary">
        <span className="animate-pulse block mb-2">INITIALIZING RESPONSE TACTICAL MAP...</span>
        <span>MapLibre GL · Arabian Sea Asset Network</span>
      </div>
    </div>
  ),
});

export default function ResponsePage() {
  const [activeScenarioId, setActiveScenarioId] = useState<string>(DEMO_RESPONSE_SCENARIOS[0].id);
  const [isDeployed, setIsDeployed] = useState<boolean>(false);

  const activeScenario =
    DEMO_RESPONSE_SCENARIOS.find((s: any) => s.id === activeScenarioId) || DEMO_RESPONSE_SCENARIOS[0];

  const handleDeploy = () => {
    setIsDeployed(true);
    setTimeout(() => {
      setIsDeployed(false);
    }, 4000);
  };

  return (
    <div className="flex flex-col h-screen pt-16 bg-surface overflow-hidden select-none">
      {/* Top Banner */}
      <div className="flex items-center justify-between px-6 py-2.5 border-b border-ink-tertiary/15 bg-white shadow-sm shrink-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-ocean animate-ping" />
          <span className="font-mono text-xs font-bold text-ink-primary tracking-wider uppercase">
            INCIDENT RESPONSE & DISPATCH DECISION SUPPORT
          </span>
          <span className="text-ink-tertiary text-xs">|</span>
          <span className="font-mono text-xs text-ink-secondary">
            CASE #ST-2026-0042 · INDIAN COAST GUARD OPERATIONS
          </span>
        </div>

        <DataModeIndicator mode="DEMO" />
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left: Tactical Response Map (64%) */}
        <div className="w-[64%] h-full p-4 flex flex-col">
          <InvestigationMap />
        </div>

        {/* Right: Response Management Workbench (36%) */}
        <div className="w-[36%] h-full overflow-y-auto border-l border-ink-tertiary/15 bg-surface-subtle/30 p-6 space-y-6">
          <div>
            <span className="font-mono text-xs text-ocean font-bold uppercase tracking-wider block mb-1">
              MARITIME LOGISTICS ENGINE
            </span>
            <h2 className="font-display font-bold text-2xl text-ink-primary">
              Response Strategy Coordinator
            </h2>
            <p className="text-xs font-body text-ink-secondary mt-1">
              Automated resource allocation matching projected slick trajectories against regional Coast Guard and port assets.
            </p>
          </div>

          {/* Environmental Conditions */}
          <div className="grid grid-cols-2 gap-3 font-mono text-xs">
            <div className="flex items-center gap-2.5 p-3 bg-white rounded-xl border border-ink-tertiary/15 shadow-sm">
              <Wind className="w-4 h-4 text-sky-500" />
              <div>
                <span className="text-[10px] text-ink-tertiary block">SURFACE WIND</span>
                <span className="font-bold text-ink-primary">14 kts @ 235° SW</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5 p-3 bg-white rounded-xl border border-ink-tertiary/15 shadow-sm">
              <Waves className="w-4 h-4 text-teal-500" />
              <div>
                <span className="text-[10px] text-ink-tertiary block">INCOIS SWELL</span>
                <span className="font-bold text-ink-primary">1.4m (State 3)</span>
              </div>
            </div>
          </div>

          {/* Scenarios Selection */}
          <div className="space-y-3">
            <span className="text-xs font-mono text-ink-tertiary uppercase tracking-wider block font-bold">
              INTERVENTION SCENARIOS
            </span>

            <div className="space-y-3">
              {DEMO_RESPONSE_SCENARIOS.map((scenario: any) => {
                const isSelected = activeScenarioId === scenario.id;
                return (
                  <button
                    key={scenario.id}
                    onClick={() => setActiveScenarioId(scenario.id)}
                    className={cn(
                      "w-full text-left p-4 rounded-xl border transition-all duration-200 space-y-2",
                      isSelected
                        ? "bg-white border-ocean ring-1 ring-ocean/40 shadow-md"
                        : "bg-white/70 border-ink-tertiary/15 hover:border-ink-tertiary/30 shadow-sm"
                    )}
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-display font-bold text-sm text-ink-primary">
                        {scenario.name}
                      </span>
                      <StatusBadge
                        variant={scenario.priority === 'HIGH' ? 'critical' : 'verified'}
                        status={`${scenario.priority} PRIORITY`}
                      />
                    </div>
                    <p className="text-xs font-body text-ink-secondary leading-relaxed">
                      {scenario.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Scenario Impact Breakdown */}
          <div className="bg-white rounded-xl p-5 border border-ink-tertiary/20 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-ink-tertiary/10 pb-3">
              <h4 className="font-display text-sm font-bold text-ink-primary">
                Tactical Impact: {activeScenario.name}
              </h4>
              <span className="font-mono text-xs font-bold text-ocean">
                {activeScenario.predictedOutcome}
              </span>
            </div>

            <div className="space-y-2">
              <span className="font-mono text-[10px] text-ink-tertiary uppercase font-bold block">
                COMMITTED REGIONAL ASSETS
              </span>
              <div className="space-y-1.5">
                {activeScenario.assetsRequired.map((assetId: string, i: number) => (
                  <div
                    key={i}
                    className="text-xs font-mono text-ink-secondary flex items-center justify-between p-2 bg-surface-subtle rounded-lg"
                  >
                    <span className="flex items-center gap-2">
                      <Anchor className="w-3.5 h-3.5 text-ocean" />
                      {assetId}
                    </span>
                    <span className="text-[10px] text-verified font-bold">READY</span>
                  </div>
                ))}
              </div>
            </div>

            {isDeployed ? (
              <div className="p-3 bg-verified/10 border border-verified/30 rounded-xl text-center font-mono text-xs text-verified font-bold flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                DISPATCH ORDER TRANSMITTED TO ICG COMMAND
              </div>
            ) : (
              <button
                onClick={handleDeploy}
                className="w-full py-3 bg-ocean hover:bg-ocean/90 text-white rounded-xl font-mono text-xs font-bold tracking-wider transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                DEPLOY INTERVENTION PLAN &rarr;
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
