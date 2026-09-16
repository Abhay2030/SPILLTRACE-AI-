'use client';

import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SectionLabel } from '@/components/ui';
import { cn } from '@/lib/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const scenarios = [
  {
    id: 'contain',
    title: 'CONTAIN EAST',
    desc: 'Deploy boom array to contain eastern drift.',
    primaryMetric: '78% containment estimate',
    stats: {
      containment: '78%',
      assets: '4 Units',
      time: '2.5 hrs',
      risk: 'MEDIUM'
    }
  },
  {
    id: 'protect',
    title: 'PROTECT COAST',
    desc: 'Position assets to shield nearest coastline.',
    primaryMetric: '85% coastal protection',
    stats: {
      containment: '85%',
      assets: '6 Units',
      time: '3.0 hrs',
      risk: 'LOW'
    }
  },
  {
    id: 'intercept',
    title: 'INTERCEPT DRIFT',
    desc: 'Deploy skimmers along predicted drift path.',
    primaryMetric: '62% recovery estimate',
    stats: {
      containment: '62%',
      assets: '2 Vessels',
      time: '4.5 hrs',
      risk: 'HIGH'
    }
  }
];

export function Chapter17Simulation() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState(scenarios[0].id);

  useGSAP(() => {
    gsap.from('.scenario-card', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 60%',
      },
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
    });
  }, { scope: containerRef });

  const activeScenario = scenarios.find(s => s.id === activeTab)!;

  return (
    <section 
      ref={containerRef} 
      className="chapter-section min-h-screen relative flex flex-col justify-center py-24 px-4 max-w-6xl mx-auto"
    >
      <div className="absolute top-12 left-0 w-full flex justify-center">
        <SectionLabel title="SCENARIO ANALYSIS" />
      </div>

      <div className="mb-12 text-center">
        <h2 className="text-4xl md:text-6xl font-display font-bold text-ink-primary mb-4 tracking-tight">
          Test before you act.
        </h2>
        <p className="font-body text-ink-secondary text-lg">
          Evaluate multiple response strategies against current drift models.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {scenarios.map((scenario) => (
          <button
            key={scenario.id}
            onClick={() => setActiveTab(scenario.id)}
            className={cn(
              "scenario-card text-left p-6 rounded-xl border transition-all duration-300",
              activeTab === scenario.id 
                ? "bg-ocean/5 border-ocean shadow-md ring-1 ring-ocean" 
                : "bg-surface border-ink-tertiary/20 hover:border-ocean/50"
            )}
          >
            <h3 className="font-display font-bold text-lg text-ink-primary mb-2">
              {scenario.title}
            </h3>
            <p className="font-body text-sm text-ink-secondary mb-4 h-10">
              {scenario.desc}
            </p>
            <div className={cn(
              "font-mono text-xs font-bold px-3 py-1.5 rounded-full inline-block",
              activeTab === scenario.id ? "bg-ocean text-white" : "bg-ink-tertiary/10 text-ink-primary"
            )}>
              {scenario.primaryMetric}
            </div>
          </button>
        ))}
      </div>

      <div className="bg-white border border-ink-tertiary/20 rounded-2xl p-8 shadow-sm transition-all duration-500 ease-in-out relative overflow-hidden">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="text-xs font-mono text-ink-secondary uppercase tracking-wider mb-2">Est. Success</div>
            <div className="text-3xl font-display font-bold text-ink-primary">{activeScenario.stats.containment}</div>
          </div>
          <div>
            <div className="text-xs font-mono text-ink-secondary uppercase tracking-wider mb-2">Assets Req.</div>
            <div className="text-3xl font-display font-bold text-ink-primary">{activeScenario.stats.assets}</div>
          </div>
          <div>
            <div className="text-xs font-mono text-ink-secondary uppercase tracking-wider mb-2">Deploy Time</div>
            <div className="text-3xl font-display font-bold text-ink-primary">{activeScenario.stats.time}</div>
          </div>
          <div>
            <div className="text-xs font-mono text-ink-secondary uppercase tracking-wider mb-2">Risk Level</div>
            <div className={cn(
              "text-3xl font-display font-bold",
              activeScenario.stats.risk === 'HIGH' ? "text-critical" : 
              activeScenario.stats.risk === 'MEDIUM' ? "text-caution" : "text-verified"
            )}>
              {activeScenario.stats.risk}
            </div>
          </div>
        </div>
      </div>

      <p className="text-center font-mono text-xs text-ink-tertiary mt-8">
        SIMULATION ONLY — Results are model estimates.
      </p>
    </section>
  );
}
