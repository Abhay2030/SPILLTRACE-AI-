'use client';
import { useState } from 'react';
import { DataModeIndicator } from '@/components/ui/DataModeIndicator';
import { DEMO_RESPONSE_SCENARIOS } from '@/data/demo-response';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { LucideWind, LucideWaves, LucideAlertTriangle } from 'lucide-react';

export default function ResponsePage() {
  const [activeScenarioId, setActiveScenarioId] = useState(DEMO_RESPONSE_SCENARIOS[0].id);

  const activeScenario = DEMO_RESPONSE_SCENARIOS.find((s: any) => s.id === activeScenarioId) || DEMO_RESPONSE_SCENARIOS[0];

  return (
    <div className="flex flex-col h-screen pt-16 bg-surface overflow-hidden">
      <DataModeIndicator mode="DEMO" />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Map Area (60%) */}
        <div className="w-[60%] h-full p-4">
          <div className="relative h-full bg-navy/5 rounded-lg overflow-hidden border border-surface-subtle flex flex-col items-center justify-center">
             <div className="text-center z-10 p-6 bg-white/80 backdrop-blur rounded shadow-sm">
                <p className="text-ink-primary font-display font-medium text-lg">Response Map Placeholder</p>
                <p className="text-ink-secondary text-sm mt-1">Shows spill trajectory and asset deployment</p>
             </div>
             {/* Map grids */}
             <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 opacity-10 pointer-events-none">
                {Array.from({length: 64}).map((_, i) => <div key={i} className="border border-ocean" />)}
             </div>
          </div>
        </div>

        {/* Right: Response Controls (40%) */}
        <div className="w-[40%] h-full overflow-y-auto border-l border-surface-subtle bg-white">
          <div className="p-6">
            <h2 className="text-h3 font-display text-ink-primary mb-6">Response Decision Support</h2>
            
            {/* Environment Conditions */}
            <div className="flex gap-4 mb-8">
               <div className="flex items-center gap-2 text-sm text-ink-secondary bg-surface px-3 py-2 rounded-md border border-surface-subtle">
                  <LucideWind size={16} /> 12 kts NE
               </div>
               <div className="flex items-center gap-2 text-sm text-ink-secondary bg-surface px-3 py-2 rounded-md border border-surface-subtle">
                  <LucideWaves size={16} /> 1.2m Swell
               </div>
            </div>

            {/* Scenarios */}
            <h3 className="text-sm font-medium text-ink-secondary uppercase tracking-wider mb-3">Intervention Scenarios</h3>
            <div className="space-y-3 mb-8">
              {DEMO_RESPONSE_SCENARIOS.map((scenario: any) => (
                <button
                  key={scenario.id}
                  onClick={() => setActiveScenarioId(scenario.id)}
                  className={cn(
                    "w-full text-left p-4 rounded-lg border transition-all",
                    activeScenarioId === scenario.id
                      ? "border-ocean bg-ocean/5 shadow-sm"
                      : "border-surface-subtle bg-surface hover:bg-surface-subtle/50"
                  )}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium text-ink-primary">{scenario.name}</span>
                    <span className="text-xs font-mono bg-white px-2 py-1 rounded border border-surface-subtle">{scenario.priority} PRIORITY</span>
                  </div>
                  <p className="text-sm text-ink-secondary">{scenario.description}</p>
                </button>
              ))}
            </div>

            {/* Active Scenario Details */}
            <div className="bg-surface rounded-xl p-5 border border-surface-subtle">
               <h3 className="font-medium text-ink-primary mb-4">Estimated Impact: {activeScenario.name}</h3>
               
               <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-ink-secondary">Predicted Outcome</span>
                      <span className="font-mono text-ocean">{activeScenario.predictedOutcome}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-surface-subtle">
                    <h4 className="text-sm font-medium text-ink-primary mb-3">Required Assets</h4>
                    <ul className="space-y-2">
                      {activeScenario.assetsRequired.map((assetId: string, i: number) => (
                        <li key={i} className="text-sm text-ink-secondary flex items-center gap-2">
                           <div className="w-1.5 h-1.5 rounded-full bg-ocean"></div>
                           {assetId}
                        </li>
                      ))}
                    </ul>
                  </div>
               </div>
            </div>

            <div className="mt-8">
               <Button className="w-full justify-center">Deploy Plan: {activeScenario.name}</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
