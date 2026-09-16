import { Metadata } from 'next';
import { DataModeIndicator } from '@/components/ui/DataModeIndicator';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { ConfidenceBar } from '@/components/ui/ConfidenceBar';
import { Button } from '@/components/ui/Button';
import { DEMO_INCIDENT } from '@/data/demo-incident';
import { DEMO_VESSELS } from '@/data/demo-vessels';
import { formatTimestamp, formatArea } from '@/lib/utils';
import { LucideDownload, LucideMap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Incident Details | SpillTrace AI',
};

export default async function IncidentPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = resolvedParams.id || 'ST-2026-0042';
  const incident = DEMO_INCIDENT;

  const area = incident.spillCharacterization?.areaKm2 ?? 18.4;
  const confidence = incident.spillCharacterization?.oilProbability ?? 0.942;
  const origin = incident.driftForecast?.originZone;
  const evidence = incident.evidenceChain?.distribution;

  return (
    <div className="min-h-screen bg-surface pt-24 pb-12 px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="flex justify-end mb-4">
        <DataModeIndicator mode="DEMO" />
      </div>
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-h2 font-display text-ink-primary">{id}</h1>
            <StatusBadge variant="info" status={incident.status} />
          </div>
          <p className="text-ink-secondary flex items-center gap-2">
            <span>{formatTimestamp(incident.detectedAt)}</span>
            <span>·</span>
            <span>{incident.region}</span>
          </p>
        </div>
        <Button variant="secondary" className="flex items-center gap-2">
          <LucideDownload size={16} />
          Export Investigation Report
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-navy/5 rounded-xl border border-surface-subtle p-6 flex flex-col items-center justify-center min-h-[220px] text-center relative overflow-hidden">
            <LucideMap className="text-ocean mb-2" size={32} />
            <span className="font-mono text-xs text-ink-tertiary">SPATIAL FOOTPRINT</span>
            <span className="text-sm font-medium text-ink-primary mt-1">15.20°N, 72.10°E</span>
            <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 pointer-events-none opacity-10">
              {Array.from({length: 36}).map((_, i) => <div key={i} className="border border-ocean/50" />)}
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-surface-subtle p-5 shadow-sm space-y-4">
            <h3 className="font-display font-medium text-ink-primary">Spill Characterization</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-ink-secondary">Area</span>
                <span className="font-mono text-ink-primary">{formatArea(area)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-ink-secondary">Classification</span>
                <span className="font-medium text-ink-primary">CONFIRMED HYDROCARBON</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-ink-secondary">Est. Spill Age</span>
                <span className="font-mono text-ink-primary">{incident.spillCharacterization?.estimatedAgeHours ?? 14} hours</span>
              </div>
              <div className="pt-2 border-t border-surface-subtle">
                <span className="text-sm text-ink-secondary mb-2 block">Detection Confidence</span>
                <ConfidenceBar value={confidence} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-surface-subtle p-5 shadow-sm space-y-4">
            <h3 className="font-display font-medium text-ink-primary">Threat Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-ink-secondary">Ecological Risk</span>
                <StatusBadge variant="danger" status={incident.threatAssessment?.ecologicalRisk ?? 'HIGH'} size="sm" />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-ink-secondary">Coastal Exposure</span>
                <StatusBadge variant="warning" status={incident.threatAssessment?.coastalExposure ?? 'MEDIUM'} size="sm" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-xl border border-surface-subtle p-6 shadow-sm">
            <h3 className="font-display font-medium text-ink-primary mb-4">Vessel Candidates</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-surface-subtle text-ink-tertiary">
                    <th className="pb-2 font-medium">Vessel</th>
                    <th className="pb-2 font-medium">IMO</th>
                    <th className="pb-2 font-medium">Type</th>
                    <th className="pb-2 font-medium">Match Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-subtle">
                  {DEMO_VESSELS.slice(0, 3).map((candidate: any) => (
                    <tr key={candidate.id} className="group">
                      <td className="py-3 font-medium text-ink-primary group-hover:text-ocean transition-colors">
                        <a href={`/vessel/${candidate.id}`}>{candidate.name}</a>
                      </td>
                      <td className="py-3 font-mono text-ink-secondary">{candidate.imo}</td>
                      <td className="py-3 text-ink-secondary">{candidate.type}</td>
                      <td className="py-3">
                        <div className="w-24">
                          <ConfidenceBar value={candidate.evidenceScore / 100} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-surface-subtle p-6 shadow-sm">
              <h3 className="font-display font-medium text-ink-primary mb-2">Evidence Summary</h3>
              <p className="text-sm text-ink-secondary mb-4">Aggregated findings from all forensic layers.</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 rounded bg-verified/10 text-verified text-sm">
                  <span>Supporting Items</span>
                  <span className="font-mono font-bold">{evidence?.supporting ?? 7}</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-critical/10 text-critical text-sm">
                  <span>Contradicting Items</span>
                  <span className="font-mono font-bold">{evidence?.contradicting ?? 1}</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-gray-100 text-ink-secondary text-sm">
                  <span>Neutral Observations</span>
                  <span className="font-mono font-bold">{evidence?.neutral ?? 2}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-surface-subtle p-6 shadow-sm">
              <h3 className="font-display font-medium text-ink-primary mb-2">Origin Analysis</h3>
              <div className="space-y-2 text-sm mt-4">
                <div className="flex justify-between">
                  <span className="text-ink-secondary">Est. Coordinates</span>
                  <span className="font-mono text-ink-primary">
                    {origin ? `${origin.centerLat.toFixed(2)}°N, ${origin.centerLng.toFixed(2)}°E` : '15.28°N, 72.05°E'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-secondary">Uncertainty Radius</span>
                  <span className="font-mono text-ink-primary">{origin?.uncertaintyKm ?? 6.4} km</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-secondary">Backtrack Drift Confidence</span>
                  <span className="font-mono text-ink-primary">{((origin?.confidence ?? 0.78) * 100).toFixed(0)}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
