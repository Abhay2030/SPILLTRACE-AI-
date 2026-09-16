'use client';

import { useAppStore } from '@/lib/state/useAppStore';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function InvestigationTimeline() {
  const timelineHour = useAppStore(state => state.timelineHour);
  const setTimelineHour = useAppStore(state => state.setTimelineHour);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        const current = useAppStore.getState().timelineHour;
        if (current >= 24) {
          setIsPlaying(false);
          setTimelineHour(24);
        } else {
          setTimelineHour(current + 1);
        }
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isPlaying, setTimelineHour]);

  return (
    <div className="absolute left-6 right-6 bottom-6 h-20 pointer-events-auto glass-card-cinematic border border-border-subtle rounded-xl shadow-subtle flex items-center px-6 gap-6">
      
      {/* Controls */}
      <div className="flex items-center gap-2">
        <button 
          onClick={() => setTimelineHour(-24)}
          className="p-2 text-ink-tertiary hover:text-ink-primary transition-colors"
        >
          <SkipBack className="w-5 h-5" />
        </button>
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-3 bg-ocean text-white rounded-full hover:bg-ocean/90 transition-colors shadow-md"
        >
          {isPlaying ? <Pause className="w-5 h-5" fill="currentColor" /> : <Play className="w-5 h-5 ml-0.5" fill="currentColor" />}
        </button>
        <button 
          onClick={() => setTimelineHour(24)}
          className="p-2 text-ink-tertiary hover:text-ink-primary transition-colors"
        >
          <SkipForward className="w-5 h-5" />
        </button>
      </div>

      {/* Scrubber */}
      <div className="flex-1 relative flex items-center h-full">
        {/* Track */}
        <div className="absolute left-0 right-0 h-1 bg-border-subtle rounded-full overflow-hidden">
           <div 
             className="absolute top-0 bottom-0 left-0 bg-ocean transition-all duration-300"
             style={{ width: `${((timelineHour + 24) / 48) * 100}%` }}
           />
        </div>

        {/* Playhead */}
        <div 
          className="absolute top-1/2 -mt-2 w-4 h-4 bg-white border-2 border-ocean rounded-full shadow-md transition-all duration-300 cursor-pointer hover:scale-110"
          style={{ left: `calc(${((timelineHour + 24) / 48) * 100}% - 8px)` }}
        />

        {/* T0 Marker */}
        <div className="absolute top-1/2 left-1/2 w-0.5 h-3 -mt-1.5 bg-ink-tertiary pointer-events-none" />
        <div className="absolute top-2/3 left-1/2 -translate-x-1/2 text-[10px] font-mono text-ink-tertiary mt-1">
          T-ZERO (DETECTION)
        </div>
      </div>

      {/* Time Display */}
      <div className="w-32 text-right">
        <div className="font-mono text-xl font-bold text-ink-primary">
          {timelineHour < 0 ? `T${timelineHour}H` : timelineHour === 0 ? 'T-ZERO' : `T+${timelineHour}H`}
        </div>
        <div className="text-[10px] font-mono text-ink-tertiary uppercase mt-1">
          Simulated Time
        </div>
      </div>
    </div>
  );
}
