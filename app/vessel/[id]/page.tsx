import { Metadata } from 'next';
import { DataModeIndicator } from '@/components/ui/DataModeIndicator';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { ConfidenceBar } from '@/components/ui/ConfidenceBar';
import { DEMO_VESSELS } from '@/data/demo-vessels';
import { LucideCheckCircle, LucideAlertTriangle, LucideShip } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Vessel Profile | SpillTrace AI',
};

export default async function VesselPage({ params }: { params: { id: string } }) {
  const id = (await params).id;
  const vessel = DEMO_VESSELS[0]; // Mock for now

  return (
    <div className="min-h-screen bg-surface pt-20 pb-12 px-6 lg:px-12 max-w-7xl mx-auto">
      <DataModeIndicator mode="DEMO" />
      
      <div className="flex flex-col md:flex-row md:items-start justify-between mb-8 gap-4 border-b border-surface-subtle pb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-h2 font-display text-ink-primary">{vessel.name}</h1>
            <span className="px-2.5 py-0.5 rounded text-xs font-medium bg-surface-subtle text-ink-secondary border border-surface-subtle">
              {vessel.type}
            </span>
          </div>
          <p className="text-ink-secondary flex items-center gap-2 font-mono text-sm">
            <span>IMO: {vessel.imo}</span>
            <span>·</span>
            <span>MMSI: {vessel.mmsi}</span>
            <span>·</span>
            <span>Flag: {vessel.flag}</span>
          </p>
        </div>
        <div className="flex flex-col items-end">
           <span className="text-sm text-ink-tertiary mb-1">Investigation Status</span>
           <StatusBadge variant="info" status="ACTIVE" size="md" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Col */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl border border-surface-subtle p-6 shadow-sm">
            <h3 className="font-display font-medium text-ink-primary mb-4 flex items-center gap-2">
               <LucideShip size={18} /> Identity Details
            </h3>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between border-b border-surface-subtle pb-2">
                <dt className="text-ink-secondary">Length</dt>
                <dd className="font-mono text-ink-primary">{vessel.length}m</dd>
              </div>
              <div className="flex justify-between border-b border-surface-subtle pb-2">
                <dt className="text-ink-secondary">Missing Data</dt>
                <dd className="font-mono text-ink-primary">{vessel.missingData}</dd>
              </div>
              <div className="flex justify-between pt-1">
                <dt className="text-ink-secondary">Status</dt>
                <dd className="font-mono text-ink-primary">{vessel.status}</dd>
              </div>
            </dl>
          </div>

          <div className="bg-white rounded-xl border border-surface-subtle p-6 shadow-sm">
            <h3 className="font-display font-medium text-ink-primary mb-4">Compatibility Scores</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-ink-secondary">Temporal Alignment</span>
                  <span className="font-mono">{vessel.compatibility.temporal}%</span>
                </div>
                <ConfidenceBar value={vessel.compatibility.temporal / 100} />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-ink-secondary">Spatial Intersection</span>
                  <span className="font-mono">{vessel.compatibility.spatial}%</span>
                </div>
                <ConfidenceBar value={vessel.compatibility.spatial / 100} />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-ink-secondary">Drift Mechanics</span>
                  <span className="font-mono">{vessel.compatibility.drift}%</span>
                </div>
                <ConfidenceBar value={vessel.compatibility.drift / 100} />
              </div>
            </div>
          </div>
        </div>

        {/* Right Col */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-surface-subtle p-1 shadow-sm h-64 relative flex items-center justify-center overflow-hidden">
             <div className="absolute inset-0 bg-navy/5 flex flex-col items-center justify-center">
                 <p className="text-ink-secondary font-mono text-sm">AIS TRACK VISUALIZATION</p>
                 <p className="text-ink-tertiary text-xs mt-1">MapLibre GL integration required</p>
             </div>
          </div>

          <div className="bg-white rounded-xl border border-surface-subtle p-6 shadow-sm">
            <h3 className="font-display font-medium text-ink-primary mb-4">Evidentiary Graph</h3>
            
            <div className="space-y-6">
               <div>
                  <h4 className="text-sm font-medium text-verified flex items-center gap-2 mb-3">
                     <LucideCheckCircle size={16} /> Supporting Evidence
                  </h4>
                  <div className="space-y-3">
                     <div className="p-3 bg-surface border border-surface-subtle rounded-md flex justify-between items-center">
                        <span className="text-sm text-ink-primary">AIS track intersects spill origin estimate</span>
                        <div className="w-20"><ConfidenceBar value={0.95} /></div>
                     </div>
                     <div className="p-3 bg-surface border border-surface-subtle rounded-md flex justify-between items-center">
                        <span className="text-sm text-ink-primary">Speed drop matches typical discharge profile</span>
                        <div className="w-20"><ConfidenceBar value={0.82} /></div>
                     </div>
                  </div>
               </div>

               <div>
                  <h4 className="text-sm font-medium text-critical flex items-center gap-2 mb-3">
                     <LucideAlertTriangle size={16} /> Contradicting Evidence
                  </h4>
                  <div className="space-y-3">
                     <div className="p-3 bg-surface border border-surface-subtle rounded-md flex justify-between items-center">
                        <span className="text-sm text-ink-primary">Reported draft change inconsistent with volume</span>
                        <div className="w-20"><ConfidenceBar value={0.45} /></div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
