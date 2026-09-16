'use client';

import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Telemetry } from '@/components/ui/Telemetry';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function Chapter04SAR() {
  const containerRef = useRef<HTMLElement>(null);
  const [segComplete, setSegComplete] = useState(false);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 50%',
        toggleActions: 'play none none reverse',
      }
    });

    tl.fromTo('.sar-header', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.2 });
    
    tl.fromTo('.sar-view',
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: 'power3.out' }
    );
    
    // Draw segmentation boundary
    tl.fromTo('.seg-path',
      { strokeDashoffset: 1000 },
      { strokeDashoffset: 0, duration: 1.5, ease: 'power1.inOut', onComplete: () => setSegComplete(true) }
    );

    tl.fromTo('.sar-telemetry', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }, '-=0.5');

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="chapter-section min-h-screen relative flex flex-col items-center justify-center p-8">
      <div className="z-10 w-full max-w-4xl mx-auto flex flex-col items-center space-y-8">
        <div className="sar-header text-center space-y-4">
          <SectionLabel title="SYNTHETIC APERTURE RADAR" align="center" />
          <h2 className="font-display font-bold text-4xl md:text-6xl text-ink-primary">
            See what the ocean surface hides.
          </h2>
        </div>

        <div className="sar-view relative w-full aspect-[21/9] bg-[#0a0a0a] rounded-xl overflow-hidden border border-ink-tertiary/30 shadow-2xl">
          {/* CSS Noise Texture Overlay */}
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>
          
          {/* SVG Overlay */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice">
            <path 
              className="seg-path"
              d="M 300 150 Q 350 120 400 160 T 500 180 Q 550 200 520 250 T 400 280 Q 320 270 280 220 T 300 150"
              fill="rgba(6, 182, 212, 0.1)"
              stroke="#06B6D4"
              strokeWidth="2"
              strokeDasharray="1000"
              strokeDashoffset="1000"
            />
            {segComplete && (
              <g className="animate-in fade-in duration-500">
                <circle cx="410" cy="210" r="4" fill="#06B6D4" />
                <line x1="410" y1="210" x2="480" y2="100" stroke="#06B6D4" strokeWidth="1" strokeDasharray="4 4" />
                <text x="490" y="95" fill="#06B6D4" className="font-mono text-xs font-bold" letterSpacing="0.1em">DARK PATCH ANOMALY</text>
              </g>
            )}
          </svg>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 w-full justify-center text-sm md:text-base">
          <div className="sar-telemetry"><Telemetry items={[{label: "BACKSCATTER", value: "-18.4 dB"}]} /></div>
          <div className="sar-telemetry"><Telemetry items={[{label: "CONTRAST RATIO", value: "4.2"}]} /></div>
          <div className="sar-telemetry"><Telemetry items={[{label: "TEXTURE", value: "SMOOTH"}]} /></div>
        </div>
        
        <div className="sar-telemetry font-mono text-xs flex items-center gap-2">
          {segComplete ? (
            <span className="text-marine flex items-center gap-2"><Check size={14} /> Segmentation complete</span>
          ) : (
            <span className="text-ink-tertiary animate-pulse">AI segmentation in progress...</span>
          )}
        </div>
      </div>
    </section>
  );
}
