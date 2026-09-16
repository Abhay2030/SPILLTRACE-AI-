'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { cn } from '@/lib/utils';
import { AlertTriangle } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function Chapter10Threat() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 50%',
        toggleActions: 'play none none reverse',
      }
    });

    tl.fromTo('.threat-header', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 });
    
    tl.fromTo('.risk-card', 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.15, ease: 'power2.out' }
    );
    
    tl.fromTo('.overall-risk', 
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.5)' },
      '-=0.2'
    );

    gsap.to('.risk-pulse', {
      scale: 1.05,
      opacity: 0.7,
      repeat: -1,
      yoyo: true,
      duration: 1.2,
    });
  }, { scope: containerRef });

  const risks = [
    { title: 'ECOLOGICAL RISK', status: 'danger' as const, label: 'HIGH', desc: 'Active biodiversity zone. Coral reef proximity.' },
    { title: 'COASTAL EXPOSURE', status: 'warning' as const, label: 'MEDIUM', desc: 'Nearest coast: 180 km. Low immediate risk.' },
    { title: 'FISHING IMPACT', status: 'danger' as const, label: 'HIGH', desc: 'Active fishing season. 12+ registered vessels in zone.' },
    { title: 'PROTECTED AREAS', status: 'warning' as const, label: 'MEDIUM', desc: 'Netrani Island Marine Sanctuary: 42 km' },
    { title: 'PORT PROXIMITY', status: 'success' as const, label: 'LOW', desc: 'Mormugao Port: 185 km, Karwar: 95 km' },
  ];

  return (
    <section ref={containerRef} className="chapter-section min-h-screen relative flex items-center p-8 md:p-16 bg-[#0a0a0a]/5">
      <div className="z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 flex flex-col justify-center space-y-8">
          <div className="threat-header space-y-4">
            <SectionLabel title="THREAT ASSESSMENT" />
            <h2 className="font-display font-bold text-5xl md:text-7xl text-ink-primary">
              What's at risk?
            </h2>
          </div>
          
          <div className="overall-risk bg-critical/10 border border-critical/20 p-8 rounded-2xl relative overflow-hidden mt-8">
            <div className="risk-pulse absolute inset-0 bg-critical/10 blur-xl"></div>
            <div className="relative z-10 flex flex-col items-start gap-4">
              <div className="flex items-center gap-3 text-critical">
                <AlertTriangle size={32} />
                <span className="font-mono font-bold tracking-widest text-lg">OVERALL RISK</span>
              </div>
              <div className="font-display text-6xl font-bold text-critical">HIGH</div>
              <p className="text-ink-secondary text-sm mt-4">
                Risk assessment based on spatial analysis. Field verification required for precise impact.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 auto-rows-max">
          {risks.map((risk, i) => (
            <div key={i} className="risk-card bg-surface border border-ink-tertiary/20 p-6 rounded-xl flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <span className="font-mono text-xs font-bold text-ink-primary tracking-widest">{risk.title}</span>
                <StatusBadge variant={risk.status} status={risk.label} />
              </div>
              <p className="text-sm text-ink-secondary leading-relaxed">
                {risk.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
