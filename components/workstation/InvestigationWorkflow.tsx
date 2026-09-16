'use client';

import { useAppStore } from '@/lib/state/useAppStore';
import { INVESTIGATION_STEPS } from '@/data/seed-data';
import { CheckCircle2, Circle, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function InvestigationWorkflow() {
  const workflowStep = useAppStore(state => state.workflowStep);
  const setWorkflowStep = useAppStore(state => state.setWorkflowStep);

  return (
    <div className="absolute left-6 top-6 bottom-32 w-80 pointer-events-auto flex flex-col gap-4">
      <div className="glass-card-cinematic p-4 border border-border-subtle rounded-xl flex items-center justify-between shadow-subtle">
        <div>
          <h2 className="font-mono text-xs text-ink-tertiary uppercase tracking-wider mb-1">Active Case</h2>
          <div className="font-display font-bold text-lg text-ink-primary">ST-2026-0042</div>
        </div>
        <div className="px-2 py-1 rounded bg-ocean/10 text-ocean text-xs font-mono font-bold uppercase">
          DEMO
        </div>
      </div>

      <div className="glass-card-cinematic p-5 border border-border-subtle rounded-xl flex-1 overflow-y-auto custom-scrollbar shadow-subtle">
        <h3 className="font-mono text-xs text-ink-tertiary uppercase tracking-wider mb-6">Investigation Workflow</h3>
        
        <div className="relative">
          {/* Vertical line connecting steps */}
          <div className="absolute left-[11px] top-4 bottom-4 w-px bg-border-subtle/50" />
          
          <div className="flex flex-col gap-6">
            {INVESTIGATION_STEPS.map((step) => {
              const isActive = workflowStep === step.id;
              const isPast = workflowStep > step.id;
              
              return (
                <button
                  key={step.id}
                  onClick={() => setWorkflowStep(step.id)}
                  className={`relative z-10 flex items-start gap-4 text-left transition-opacity hover:opacity-100 ${
                    isActive ? 'opacity-100' : isPast ? 'opacity-70' : 'opacity-40'
                  }`}
                >
                  <div className="mt-0.5 bg-surface rounded-full">
                    {isPast ? (
                      <CheckCircle2 className="w-6 h-6 text-verified" />
                    ) : isActive ? (
                      <div className="relative flex items-center justify-center w-6 h-6 rounded-full border-2 border-ocean">
                        <div className="w-2 h-2 bg-ocean rounded-full animate-pulse" />
                      </div>
                    ) : (
                      <Circle className="w-6 h-6 text-ink-tertiary" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className={`font-mono text-xs font-bold uppercase mb-1 ${isActive ? 'text-ocean' : 'text-ink-primary'}`}>
                      {String(step.id).padStart(2, '0')} // {step.title}
                    </div>
                    {isActive && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        className="text-sm text-ink-secondary leading-relaxed"
                      >
                        {step.description}
                      </motion.div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
