'use client';

import { ShieldCheck, AlertTriangle, Info, Map, Clock, Radio, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

export default function AttributionExplainability({ vessel }: { vessel: any }) {
  const isPrimary = vessel.id === 'VESSEL-A-001';
  
  const factors = [
    {
      category: 'Spatial Intersection',
      icon: <Map className="w-4 h-4" />,
      score: vessel.compatibility.spatial,
      weight: 35,
      detail: isPrimary ? 'Vessel trajectory perfectly intersects the backtrack probability cone at T-8H.' : 'Vessel passed 14.5km outside the primary backtrack radius.',
      color: isPrimary ? 'text-critical bg-critical/10' : 'text-verified bg-verified/10'
    },
    {
      category: 'Temporal Alignment',
      icon: <Clock className="w-4 h-4" />,
      score: vessel.compatibility.temporal,
      weight: 30,
      detail: isPrimary ? 'Presence coincides exactly with the estimated oil discharge window (12-20h ago).' : 'Passed through the area 6 hours prior to the estimated discharge window.',
      color: isPrimary ? 'text-critical bg-critical/10' : 'text-verified bg-verified/10'
    },
    {
      category: 'AIS Reliability',
      icon: <Radio className="w-4 h-4" />,
      score: isPrimary ? 12 : 98,
      weight: 20,
      detail: isPrimary ? 'Detected a 2-hour AIS transmission gap during transit through the origin zone.' : 'Continuous, uninterrupted AIS Class-A transponder signals.',
      color: isPrimary ? 'text-critical bg-critical/10' : 'text-verified bg-verified/10'
    },
    {
      category: 'Behavioral Anomaly',
      icon: <Search className="w-4 h-4" />,
      score: isPrimary ? 88 : 15,
      weight: 15,
      detail: isPrimary ? 'Unexplained speed reduction from 12.5 kts to 4 kts matching operational discharge profile.' : 'Steady transit speed maintained across the entire sector.',
      color: isPrimary ? 'text-critical bg-critical/10' : 'text-verified bg-verified/10'
    }
  ];

  return (
    <div className="bg-white rounded-2xl border border-ink-tertiary/20 shadow-sm overflow-hidden">
      <div className="p-4 bg-surface-subtle border-b border-ink-tertiary/10 flex items-center justify-between font-mono text-xs">
        <span className="font-bold text-ink-primary flex items-center gap-2">
          <Info className="w-4 h-4 text-ocean" />
          WHY THIS VESSEL? — ATTRIBUTION EXPLAINABILITY
        </span>
      </div>

      <div className="p-6 space-y-6">
        <p className="text-sm text-ink-secondary">
          The Attribution Index of <strong className="text-ink-primary">{vessel.evidenceScore.toFixed(1)}%</strong> is calculated using a weighted probabilistic graphical model. Below is the evidentiary breakdown.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {factors.map((factor, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-4 rounded-xl border border-ink-tertiary/15 bg-surface-subtle/50 space-y-3"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-ink-primary">
                  <div className={cn("p-1.5 rounded-md", factor.color)}>
                    {factor.icon}
                  </div>
                  {factor.category}
                </div>
                <div className="text-right">
                  <span className="font-mono text-lg font-bold text-ink-primary block leading-none">
                    {factor.score}%
                  </span>
                  <span className="font-mono text-[9px] text-ink-tertiary uppercase">
                    Weight: {factor.weight}%
                  </span>
                </div>
              </div>
              <p className="text-xs text-ink-secondary border-t border-ink-tertiary/10 pt-2">
                {factor.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}