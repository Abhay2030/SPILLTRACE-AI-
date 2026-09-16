'use client';

import { useAppStore } from '@/lib/state/useAppStore';
import { CANDIDATE_VESSELS } from '@/data/seed-data';
import { ShieldAlert, Crosshair, Map, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function WorkstationContextPanel() {
  const workflowStep = useAppStore(state => state.workflowStep);
  const selectedVesselId = useAppStore(state => state.selectedVesselId);
  const setSelectedVessel = useAppStore(state => state.setSelectedVessel);

  return (
    <div className="absolute right-6 top-6 bottom-32 w-80 pointer-events-auto flex flex-col gap-4">
      
      <div className="glass-card-cinematic p-4 border border-border-subtle rounded-xl flex items-center justify-between shadow-subtle">
         <div className="flex items-center gap-2 text-alert">
           <ShieldAlert className="w-4 h-4" />
           <span className="font-mono text-xs font-bold uppercase tracking-wider">System Status</span>
         </div>
         <span className="font-mono text-xs text-ink-secondary">ONLINE</span>
      </div>

      <AnimatePresence mode="wait">
        {workflowStep === 7 && (
          <motion.div
            key="candidates"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="glass-card-cinematic border border-border-subtle rounded-xl flex-1 flex flex-col shadow-subtle overflow-hidden"
          >
            <div className="p-4 border-b border-border-subtle bg-surface-subtle/50">
              <h3 className="font-mono text-xs font-bold text-ink-primary uppercase tracking-wider flex items-center gap-2">
                <Crosshair className="w-4 h-4" />
                Attribution Candidates
              </h3>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 custom-scrollbar">
              {CANDIDATE_VESSELS.map(vessel => (
                <button
                  key={vessel.id}
                  onClick={() => setSelectedVessel(vessel.id)}
                  className={
                    selectedVesselId === vessel.id 
                      ? 'w-full text-left p-3 rounded-lg border transition-all border-ocean bg-ocean/10' 
                      : 'w-full text-left p-3 rounded-lg border transition-all border-border-subtle hover:border-ink-tertiary bg-surface/50'
                  }
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-mono text-xs font-bold text-ink-primary">{vessel.name}</span>
                    <span className={
                      vessel.matchConfidence > 0.8 ? 'font-mono text-[10px] px-1.5 py-0.5 rounded bg-alert/10 text-alert' : 
                      vessel.matchConfidence > 0.3 ? 'font-mono text-[10px] px-1.5 py-0.5 rounded bg-warning/10 text-warning' : 'font-mono text-[10px] px-1.5 py-0.5 rounded bg-surface-elevated text-ink-secondary'
                    }>
                      {(vessel.matchConfidence * 100).toFixed(1)}% MATCH
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px] font-mono text-ink-secondary">
                    <span>{vessel.type}</span>
                    <span>MMSI: {vessel.mmsi}</span>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {workflowStep === 4 && (
          <motion.div
            key="characterization"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="glass-card-cinematic p-5 border border-border-subtle rounded-xl flex flex-col shadow-subtle gap-4"
          >
            <h3 className="font-mono text-xs font-bold text-ink-primary uppercase tracking-wider flex items-center gap-2">
              <Map className="w-4 h-4" />
              Spill Geometry
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-surface-subtle rounded-lg border border-border-subtle">
                <div className="text-[10px] font-mono text-ink-tertiary uppercase mb-1">Total Area</div>
                <div className="font-display font-bold text-xl text-ink-primary">18.4<span className="text-sm text-ink-secondary"> km2</span></div>
              </div>
              <div className="p-3 bg-surface-subtle rounded-lg border border-border-subtle">
                <div className="text-[10px] font-mono text-ink-tertiary uppercase mb-1">Confidence</div>
                <div className="font-display font-bold text-xl text-verified">94.2<span className="text-sm text-ink-secondary">%</span></div>
              </div>
            </div>

            <div className="mt-4 p-3 border border-ocean/30 bg-ocean/5 rounded-lg">
              <div className="flex items-center gap-2 text-ocean text-xs font-mono font-bold uppercase mb-2">
                <Activity className="w-3.5 h-3.5" />
                SAR Signature Verified
              </div>
              <p className="text-sm text-ink-secondary">Look-alike analysis confirms high probability of anthropogenic crude oil discharge rather than natural biogenic film.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}