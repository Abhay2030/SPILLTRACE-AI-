'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Play, CheckCircle2, Radar, BrainCircuit, Activity, Database } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

export default function ProcessingPipeline() {
  const [stage, setStage] = useState<'idle' | 'acquiring' | 'analyzing' | 'complete'>('idle');
  const [progress, setProgress] = useState(0);

  const startPipeline = () => {
    setStage('acquiring');
    setProgress(0);
    
    // Simulate acquisition
    let p = 0;
    const interval = setInterval(() => {
      p += 5;
      setProgress(p);
      if (p >= 40) {
        setStage('analyzing');
      }
      if (p >= 100) {
        clearInterval(interval);
        setStage('complete');
      }
    }, 150);
  };

  return (
    <div className="bg-white rounded-2xl border border-ink-tertiary/20 shadow-sm overflow-hidden mb-6">
      <div className="p-4 bg-surface-subtle border-b border-ink-tertiary/10 flex items-center justify-between font-mono text-xs">
        <span className="font-bold text-ink-primary flex items-center gap-2">
          <Radar className="w-4 h-4 text-ocean" />
          SAR ACQUISITION & AI PIPELINE
        </span>
        <span className="text-ink-tertiary">Sentinel-1A (C-SAR)</span>
      </div>

      <div className="p-1 lg:p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Interactive Image Viewer */}
        <div className="relative aspect-square lg:aspect-[4/3] rounded-xl overflow-hidden bg-ink-primary">
          <AnimatePresence>
            {stage === 'idle' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-white/50"
              >
                <Radar className="w-12 h-12 mb-3 opacity-20" />
                <p className="font-mono text-xs tracking-wider">AWAITING SENSOR FEED</p>
              </motion.div>
            )}
            
            {stage !== 'idle' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0"
              >
                <Image 
                  src="/sar-image.jpg" 
                  alt="Sentinel-1 SAR Oil Spill"
                  fill
                  className="object-cover grayscale"
                />
                
                {/* AI Mask Overlay */}
                {stage === 'complete' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0 bg-verified/20 mix-blend-color"
                  />
                )}
                
                {/* Scanning line effect */}
                {stage === 'analyzing' && (
                  <motion.div 
                    animate={{ y: ['0%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    className="absolute top-0 left-0 right-0 h-1 bg-ocean shadow-[0_0_15px_rgba(30,160,255,0.8)]"
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right: Pipeline Controls & Status */}
        <div className="flex flex-col justify-between p-4 lg:p-0">
          <div className="space-y-4">
            <h3 className="font-display font-bold text-xl text-ink-primary">
              Feature Extraction Engine
            </h3>
            <p className="text-sm text-ink-secondary">
              Automated ingestion of raw C-band SAR telemetry. The neural classifier segments the image and assigns confidence scores based on dampening ratios.
            </p>

            <div className="space-y-3 font-mono text-xs mt-6">
              <div className="flex items-center gap-3">
                <Database className={cn("w-4 h-4", stage !== 'idle' ? "text-ocean" : "text-ink-tertiary")} />
                <span className={stage !== 'idle' ? "text-ink-primary" : "text-ink-tertiary"}>
                  1. Fetch Sentinel-1 Telemetry
                </span>
                {stage !== 'idle' && progress >= 15 && <CheckCircle2 className="w-3 h-3 text-verified ml-auto" />}
              </div>
              <div className="flex items-center gap-3">
                <Activity className={cn("w-4 h-4", stage === 'analyzing' || stage === 'complete' ? "text-ocean" : "text-ink-tertiary")} />
                <span className={stage === 'analyzing' || stage === 'complete' ? "text-ink-primary" : "text-ink-tertiary"}>
                  2. Apply Multi-feature Discriminator
                </span>
                {progress >= 60 && <CheckCircle2 className="w-3 h-3 text-verified ml-auto" />}
              </div>
              <div className="flex items-center gap-3">
                <BrainCircuit className={cn("w-4 h-4", stage === 'complete' ? "text-ocean" : "text-ink-tertiary")} />
                <span className={stage === 'complete' ? "text-ink-primary font-bold" : "text-ink-tertiary"}>
                  3. Extrapolate Slick Polygon
                </span>
                {stage === 'complete' && <CheckCircle2 className="w-3 h-3 text-verified ml-auto" />}
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            {stage !== 'idle' && (
              <div className="w-full bg-surface-subtle rounded-full h-1.5 overflow-hidden">
                <motion.div 
                  className="bg-ocean h-full"
                  initial={{ width: 0 }}
                  animate={{ width: progress + '%' }}
                />
              </div>
            )}
            
            <button
              onClick={startPipeline}
              disabled={stage !== 'idle'}
              className={cn(
                "w-full py-3 rounded-xl font-mono text-xs font-bold transition-colors flex items-center justify-center gap-2",
                stage === 'idle' ? "bg-ink-primary hover:bg-ink-secondary text-white" :
                stage === 'complete' ? "bg-verified/10 text-verified border border-verified/20" :
                "bg-surface-subtle text-ink-tertiary cursor-not-allowed"
              )}
            >
              {stage === 'idle' ? (
                <>
                  <Play className="w-4 h-4" />
                  INITIATE DETECTION PIPELINE
                </>
              ) : stage === 'complete' ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  PIPELINE COMPLETE
                </>
              ) : (
                'PROCESSING TELEMETRY...'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}