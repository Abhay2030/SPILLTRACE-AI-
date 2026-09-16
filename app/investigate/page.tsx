'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { DataModeIndicator } from '@/components/ui/DataModeIndicator';
import { Timeline } from '@/components/ui/Timeline';
import { DEMO_INCIDENT } from '@/data/demo-incident';
import { DEMO_VESSELS } from '@/data/demo-vessels';
import { cn } from '@/lib/utils';
import { formatNumber, formatCoordinate } from '@/lib/utils';
import { LucideChevronDown, LucideChevronUp } from 'lucide-react';

const InvestigationMap = dynamic(() => import('@/components/maps/InvestigationMap'), { 
  ssr: false,
  loading: () => (
    <div className="relative h-full bg-navy/5 rounded-lg overflow-hidden flex items-center justify-center">
      <div className="text-center">
        <p className="text-ink-tertiary font-mono text-sm">INVESTIGATION MAP LOADING...</p>
      </div>
    </div>
  )
});

const STAGES = ['DETECT', 'VALIDATE', 'TRACE', 'ATTRIBUTE', 'ASSESS', 'RESPOND', 'MONITOR'];

export default function InvestigatePage() {
  const [activeStageIndex, setActiveStageIndex] = useState(3);
  
  const [panels, setPanels] = useState({
    summary: true,
    satellite: true,
    analysis: true,
    origin: true,
    candidates: true,
    evidence: true,
    threat: true,
  });

  const togglePanel = (panel: keyof typeof panels) => {
    setPanels(prev => ({ ...prev, [panel]: !prev[panel] }));
  };

  const PanelHeader = ({ title, panelKey }: { title: string, panelKey: keyof typeof panels }) => (
    <button 
      onClick={() => togglePanel(panelKey)}
      className="flex items-center justify-between w-full p-3 bg-surface border-b border-surface-subtle"
    >
      <span className="font-display font-medium text-sm text-ink-primary">{title}</span>
      {panels[panelKey] ? <LucideChevronUp size={16} /> : <LucideChevronDown size={16} />}
    </button>
  );

  return (
    <div className="flex flex-col h-screen pt-16 bg-surface overflow-hidden">
      <DataModeIndicator mode="DEMO" />
      
      {/* Top Bar: Stage Navigator */}
      <div className="flex items-center px-6 py-3 border-b border-surface-subtle bg-white shadow-sm shrink-0">
        <div className="flex space-x-6 overflow-x-auto hide-scrollbar">
          {STAGES.map((stage, i) => (
            <button
              key={stage}
              onClick={() => setActiveStageIndex(i)}
              className={cn(
                "px-4 py-1.5 rounded-full text-xs font-mono font-medium whitespace-nowrap transition-colors",
                i === activeStageIndex 
                  ? "bg-ocean text-white" 
                  : i < activeStageIndex 
                    ? "text-ink-primary underline decoration-ink-primary/30 underline-offset-4 hover:bg-surface-subtle" 
                    : "text-ink-tertiary hover:bg-surface-subtle"
              )}
            >
              {i + 1}. {stage}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Map Area (65%) */}
        <div className="w-[65%] h-full p-4">
          <InvestigationMap />
        </div>

        {/* Right: Investigation Panels (35%) */}
        <div className="w-[35%] h-full overflow-y-auto border-l border-surface-subtle bg-surface-subtle/30">
          <div className="flex flex-col space-y-4 p-4">
            
            <div className="bg-white border border-surface-subtle rounded-md overflow-hidden shadow-sm">
              <PanelHeader title="Incident Summary" panelKey="summary" />
              {panels.summary && (
                <div className="p-4 space-y-2 text-sm text-ink-secondary">
                  <div className="flex justify-between"><span className="font-medium text-ink-primary">ID</span> <span className="font-mono">{DEMO_INCIDENT.id}</span></div>
                  <div className="flex justify-between"><span className="font-medium text-ink-primary">Status</span> <span>{DEMO_INCIDENT.status}</span></div>
                  <div className="flex justify-between"><span className="font-medium text-ink-primary">Region</span> <span>{DEMO_INCIDENT.region}</span></div>
                </div>
              )}
            </div>

            <div className="bg-white border border-surface-subtle rounded-md overflow-hidden shadow-sm">
              <PanelHeader title="Vessel Candidates" panelKey="candidates" />
              {panels.candidates && (
                <div className="p-4 space-y-3">
                  {DEMO_VESSELS.slice(0, 3).map((candidate: any, i: number) => (
                    <div key={candidate.id} className="flex flex-col space-y-1 p-2 bg-surface rounded border border-surface-subtle">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-ink-primary text-sm">{candidate.name}</span>
                        <span className={cn("text-xs font-mono px-2 py-0.5 rounded", i === 0 ? "bg-critical/10 text-critical" : "bg-ocean/10 text-ocean")}>
                          {(candidate.evidenceScore).toFixed(1)}% Match
                        </span>
                      </div>
                      <span className="text-xs text-ink-secondary">IMO: {candidate.imo} | {candidate.type}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Additional panels can be added here following the same pattern */}

          </div>
        </div>
      </div>

      {/* Bottom: Timeline Bar */}
      <div className="h-16 border-t border-surface-subtle bg-white shrink-0 px-6 flex items-center">
        <Timeline 
          events={[
            { label: 'Detection', time: '08:00 UTC', status: 'past' },
            { label: 'Validation', time: '08:15 UTC', status: 'past' },
            { label: 'Origin Analysis', time: '08:30 UTC', status: 'past' },
            { label: 'AIS Match', time: '08:45 UTC', status: 'current' },
            { label: 'Attribution', time: 'Pending', status: 'future' },
          ]}
        />
      </div>
    </div>
  );
}
