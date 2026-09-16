'use client';

import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { StatusBadge } from '@/components/ui/StatusBadge';
import {
  Anchor,
  ShieldAlert,
  Waves,
  Plane,
  Crosshair,
  Helicopter,
  Flame,
  Magnet,
  Sun,
  Bot,
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ResponseAsset {
  id: string;
  name: string;
  category: string;
  status: 'AVAILABLE' | 'EN ROUTE' | 'DEPLOYED' | 'STANDBY';
  variant: 'verified' | 'caution' | 'critical' | 'neutral';
  base: string;
  eta: string;
  speed: string;
  capacity: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface TechItem {
  id: string;
  name: string;
  tier: 'ESTABLISHED' | 'EMERGING RESEARCH (2026)' | 'FUTURE CONCEPT';
  tierVariant: 'neutral' | 'caution' | 'verified';
  icon: React.ComponentType<{ className?: string }>;
  efficiency: string;
  seaState: string;
  speed: string;
  summary: string;
  envImpact: string;
  constraint: string;
}

const RESPONSE_TECHNOLOGIES: TechItem[] = [
  {
    id: 'booms',
    name: 'Heavy Ocean Inflatable Booms',
    tier: 'ESTABLISHED',
    tierVariant: 'neutral',
    icon: ShieldAlert,
    efficiency: '70–85% Containment',
    seaState: 'Beaufort 3–4 (< 1.5m waves)',
    speed: 'Towed 1–3 knots',
    summary: 'Curtain-draft physical barrier directing slick towards skimming pocket or away from critical coastal nursery zones.',
    envImpact: 'Zero chemical footprint; physical barrier only',
    constraint: 'Vulnerable to vortex entrainment failure at towing speeds > 0.75 knots',
  },
  {
    id: 'skimmers',
    name: 'Dynamic Oleophilic & Weir Skimmers',
    tier: 'ESTABLISHED',
    tierVariant: 'neutral',
    icon: Waves,
    efficiency: '80–92% Oil Recovery',
    seaState: 'Beaufort 2–4',
    speed: '120 m³/hr throughput',
    summary: 'Mechanical recovery separating floating hydrocarbon layer from seawater via rotating oleophilic drums and weir crests.',
    envImpact: 'Zero toxic additives; retrieved oil can be re-refined',
    constraint: 'Efficiency degrades significantly when oil emulsifies into chocolate mousse',
  },
  {
    id: 'in_situ',
    name: 'Controlled In-Situ Burning (ISB)',
    tier: 'ESTABLISHED',
    tierVariant: 'neutral',
    icon: Flame,
    efficiency: '90–95% Hydrocarbon Removal',
    seaState: 'Beaufort 1–3 (< 1.0m waves)',
    speed: 'Rapid volume elimination',
    summary: 'Thermal destruction of corralled thick slicks (> 3mm) using fire-resistant booms and aerial heli-torch igniters.',
    envImpact: 'Atmospheric PM2.5 and soot plume; leaves dense tar residue',
    constraint: 'Requires fresh un-weathered crude with < 25% water content and offshore winds',
  },
  {
    id: 'magnetic_sorbent',
    name: 'Superhydrophobic Magnetic Sorbents',
    tier: 'EMERGING RESEARCH (2026)',
    tierVariant: 'caution',
    icon: Magnet,
    efficiency: '96–99% Selective Uptake',
    seaState: 'Beaufort 1–5 (Robust)',
    speed: 'Uptake 45x own dry weight',
    summary: 'Engineered polyurethane/Fe3O4 magnetic sponge matrices that selectively absorb oil while repelling water, retrievable via magnetic dredges.',
    envImpact: 'Recyclable for > 50 cycles; minimal micro-plastic shedding',
    constraint: 'Production scaling and high-speed offshore magnetic recovery grid logistics',
  },
  {
    id: 'photothermal',
    name: 'Photothermal Solar-Assisted Sponges',
    tier: 'EMERGING RESEARCH (2026)',
    tierVariant: 'caution',
    icon: Sun,
    efficiency: '85% Viscosity Reduction',
    seaState: 'Beaufort 1–4',
    speed: '3.8x faster crude uptake',
    summary: 'Solar-absorbing MXene and graphene functionalized foams that harness sunlight to locally heat heavy crude oil, reducing viscosity for instant absorption.',
    envImpact: 'Passive solar energy activation; zero carbon burn emissions',
    constraint: 'Dependent on solar irradiance (> 600 W/m²); reduced efficiency at night or heavy overcast',
  },
  {
    id: 'predictive_intercept',
    name: 'Predictive Trajectory Interception',
    tier: 'FUTURE CONCEPT',
    tierVariant: 'verified',
    icon: Crosshair,
    efficiency: '94% Intercept Probability',
    seaState: 'Adaptive to forecast',
    speed: 'Real-time AI pre-positioning',
    summary: 'Autonomous hydrodynamic routing engine calculates where the slick centroid will be 4–8 hours ahead, vectoring vessels to intercept before spread.',
    envImpact: 'Reduces asset transit fuel consumption by 38% and avoids late-stage coastal washing',
    constraint: 'Requires coupled high-resolution metocean inputs (INCOIS + ECMWF boundary data)',
  },
  {
    id: 'usv_swarms',
    name: 'Autonomous Adaptive Recovery Swarms',
    tier: 'FUTURE CONCEPT',
    tierVariant: 'verified',
    icon: Bot,
    efficiency: 'Continuous 24/7 Operations',
    seaState: 'Beaufort 0–5',
    speed: 'Coordinated mesh network',
    summary: 'Decentralized fleet of Unmanned Surface Vessels (USVs) towing miniaturized boom gates, coordinated by aerial surveillance UAV telemetry.',
    envImpact: 'Zero crew hazard in hazardous volatile organic compound (VOC) exposure zones',
    constraint: 'Autonomous maritime collision avoidance certification and battery endurance limits',
  },
];

const ASSETS: ResponseAsset[] = [
  {
    id: 'vikram',
    name: 'ICGS Vikram',
    category: 'Offshore Patrol Vessel',
    status: 'EN ROUTE',
    variant: 'caution',
    base: 'Goa Coast Guard Base',
    eta: '3h 15m',
    speed: '22 knots',
    capacity: 'Command & Dispersant Spray System',
    icon: Anchor,
  },
  {
    id: 'nirmala',
    name: 'Skimmer Nirmala',
    category: 'High-Capacity Oil Recovery Vessel',
    status: 'AVAILABLE',
    variant: 'verified',
    base: 'Mormugao Port Trust',
    eta: '4h 45m',
    speed: '12 knots',
    capacity: '120 m³/hr Weir Skimming Capacity',
    icon: Waves,
  },
  {
    id: 'boom_alpha',
    name: 'Offshore Boom Unit Alpha',
    category: 'Heavy Ocean Inflatable Boom',
    status: 'DEPLOYED',
    variant: 'verified',
    base: 'Karwar Depot',
    eta: 'On Station',
    speed: 'Towed 4 kts',
    capacity: '1,500m Curtain Barrier (Sea State 4)',
    icon: ShieldAlert,
  },
  {
    id: 'sr04',
    name: 'Surveillance Drone SR-04',
    category: 'Maritime UAS',
    status: 'DEPLOYED',
    variant: 'verified',
    base: 'INS Hansa, Dabolim',
    eta: 'On Station',
    speed: '85 knots',
    capacity: 'Dual LWIR/EO Thermal Sensor Payload',
    icon: Plane,
  },
  {
    id: 'hal07',
    name: 'Coast Guard Chetak CG-802',
    category: 'Maritime Recon Helicopter',
    status: 'STANDBY',
    variant: 'neutral',
    base: 'ICG Air Station Daman',
    eta: '1h 10m',
    speed: '110 knots',
    capacity: 'Visual Validation & Dispersant Release',
    icon: Helicopter,
  },
  {
    id: 'buoy12',
    name: 'Drifter Buoy MB-12',
    category: 'Telemetry Ocean Drifter',
    status: 'AVAILABLE',
    variant: 'verified',
    base: 'INCOIS Moored Array',
    eta: 'Immediate (Telemetry active)',
    speed: 'Passive Drifting',
    capacity: 'Real-time GPS Lagrangian Surface Tracking',
    icon: Crosshair,
  },
];

export function Chapter16Response() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<'dispatch' | 'tech_matrix'>('dispatch');
  const [selectedAssetId, setSelectedAssetId] = useState<string>('vikram');
  const [selectedTechId, setSelectedTechId] = useState<string>('predictive_intercept');

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 50%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.fromTo('.response-header', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 });
      tl.fromTo('.response-main-panel', { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '-=0.3');
    },
    { scope: containerRef }
  );

  const activeAsset = ASSETS.find((a) => a.id === selectedAssetId) || ASSETS[0];
  const activeTech = RESPONSE_TECHNOLOGIES.find((t) => t.id === selectedTechId) || RESPONSE_TECHNOLOGIES[0];

  return (
    <section
      ref={containerRef}
      className="chapter-section min-h-screen relative flex items-center justify-center p-6 md:p-12 lg:p-16"
    >
      <div className="z-10 w-full max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="response-header text-center space-y-3">
          <SectionLabel title="RESPONSE COORDINATION & TECHNOLOGY SUITE" align="center" />
          <h2 className="font-display font-bold text-4xl md:text-6xl text-ink-primary tracking-tight">
            From Attribution to Containment.
          </h2>
          <p className="font-body text-base md:text-lg text-ink-secondary max-w-3xl mx-auto">
            SpillTrace connects maritime enforcement directly with regional containment assets. Evaluate established recovery methods, 2026 scientific breakthroughs, and AI-directed interception.
          </p>

          {/* Mode Switcher Tabs */}
          <div className="flex justify-center pt-2">
            <div className="inline-flex p-1 bg-surface-subtle border border-ink-tertiary/20 rounded-xl">
              <button
                onClick={() => setActiveTab('dispatch')}
                className={cn(
                  'px-5 py-2 rounded-lg font-mono text-xs font-bold transition-all',
                  activeTab === 'dispatch'
                    ? 'bg-ocean text-white shadow-sm'
                    : 'text-ink-secondary hover:text-ink-primary'
                )}
              >
                TACTICAL ASSET DISPATCH
              </button>
              <button
                onClick={() => setActiveTab('tech_matrix')}
                className={cn(
                  'px-5 py-2 rounded-lg font-mono text-xs font-bold transition-all',
                  activeTab === 'tech_matrix'
                    ? 'bg-ocean text-white shadow-sm'
                    : 'text-ink-secondary hover:text-ink-primary'
                )}
              >
                RESPONSE TECH MATURITY MATRIX
              </button>
            </div>
          </div>
        </div>

        {/* TAB 1: Tactical Asset Dispatch */}
        {activeTab === 'dispatch' && (
          <div className="response-main-panel grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Mission Plan Overview */}
            <div className="lg:col-span-5 bg-surface rounded-2xl border border-ink-tertiary/20 p-6 shadow-sm space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-ink-tertiary uppercase tracking-wider">
                    OPERATIONAL INTERCEPT PLAN
                  </span>
                  <StatusBadge variant="verified" status="RECOMMENDED" />
                </div>
                <h3 className="font-display text-2xl font-bold text-ink-primary">
                  DEFLECTION & RECOVERY VECTOR
                </h3>
                <p className="text-xs font-mono text-ink-secondary mt-1">
                  Target Centroid: 15.17°N, 72.11°E (Projected +6h) · Drift: 142° @ 0.94 kt
                </p>
              </div>

              <div className="p-4 bg-surface-subtle rounded-xl border border-ink-tertiary/15 space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-ink-secondary">Optimal Interception Window</span>
                  <span className="font-bold text-ink-primary">4h 30m</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-ink-secondary">Projected Volume Recovered</span>
                  <span className="font-bold text-verified">92% Containment</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-ink-secondary">Primary Ecological Receptor</span>
                  <span className="font-bold text-ocean">Netrani Island Marine Sanctuary</span>
                </div>
                <div className="flex justify-between items-center text-[10px] text-ink-tertiary pt-1 border-t border-ink-tertiary/10">
                  <span>Data Status:</span>
                  <span className="font-bold">DEMO MODE · SIMULATED OPERATIONAL SCENARIO</span>
                </div>
              </div>

              {/* Selected Asset Details */}
              <div className="p-4 bg-ocean/5 rounded-xl border border-ocean/20 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-ocean uppercase font-bold">
                    ACTIVE ASSET SELECTION
                  </span>
                  <span className="font-mono text-xs font-bold text-ink-primary">
                    ETA: {activeAsset.eta}
                  </span>
                </div>
                <h4 className="font-display text-base font-bold text-ink-primary">
                  {activeAsset.name}
                </h4>
                <p className="text-xs font-body text-ink-secondary">
                  {activeAsset.capacity}
                </p>
                <div className="text-[11px] font-mono text-ink-tertiary pt-1">
                  Home Base: {activeAsset.base} · Maximum Transit: {activeAsset.speed}
                </div>
              </div>

              <Link
                href="/response"
                className="w-full py-3 bg-ocean hover:bg-ocean/90 text-white rounded-xl font-mono text-xs font-bold tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                LAUNCH OPERATIONAL DISPATCH SIMULATOR &rarr;
              </Link>
            </div>

            {/* Right: Asset Fleet Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {ASSETS.map((asset) => {
                const Icon = asset.icon;
                const isSelected = selectedAssetId === asset.id;
                return (
                  <div
                    key={asset.id}
                    onClick={() => setSelectedAssetId(asset.id)}
                    className={cn(
                      'p-4 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between gap-3',
                      isSelected
                        ? 'bg-surface border-ocean ring-1 ring-ocean/50 shadow-md'
                        : 'bg-surface border-ink-tertiary/15 hover:border-ink-tertiary/30 shadow-sm'
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-ink-primary/5 flex items-center justify-center text-ocean">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h5 className="font-display text-xs font-bold text-ink-primary">
                            {asset.name}
                          </h5>
                          <span className="font-mono text-[10px] text-ink-tertiary">
                            {asset.category}
                          </span>
                        </div>
                      </div>
                      <StatusBadge variant={asset.variant} status={asset.status} />
                    </div>

                    <div className="pt-2 border-t border-ink-tertiary/10 flex items-center justify-between text-[11px] font-mono">
                      <span className="text-ink-secondary">
                        ETA: <strong className="text-ink-primary">{asset.eta}</strong>
                      </span>
                      <span className="text-ink-tertiary">{asset.speed}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: Response Technology Maturity Matrix */}
        {activeTab === 'tech_matrix' && (
          <div className="response-main-panel space-y-6">
            {/* Tech Selector Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
              {RESPONSE_TECHNOLOGIES.map((tech) => {
                const Icon = tech.icon;
                const isSelected = selectedTechId === tech.id;
                return (
                  <button
                    key={tech.id}
                    onClick={() => setSelectedTechId(tech.id)}
                    className={cn(
                      'p-3 rounded-xl border text-left flex flex-col justify-between gap-2 transition-all',
                      isSelected
                        ? 'bg-surface border-ocean ring-2 ring-ocean/30 shadow-sm'
                        : 'bg-surface border-ink-tertiary/15 hover:border-ink-tertiary/30'
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <Icon className={cn('w-4 h-4', isSelected ? 'text-ocean' : 'text-ink-tertiary')} />
                      <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-surface-subtle text-ink-secondary">
                        {tech.tier.includes('ESTABLISHED') ? 'EST' : tech.tier.includes('2026') ? '2026' : 'AI'}
                      </span>
                    </div>
                    <span className="font-display text-xs font-bold text-ink-primary line-clamp-1">
                      {tech.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected Technology Deep Dive Card */}
            <div className="bg-surface rounded-2xl border border-ink-tertiary/20 p-6 md:p-8 shadow-sm space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-ink-tertiary/15 pb-6">
                <div>
                  <div className="flex items-center gap-3">
                    <StatusBadge variant={activeTech.tierVariant} status={activeTech.tier} />
                    <span className="font-mono text-xs text-ink-tertiary">
                      CATEGORY: MARITIME OIL SPILL RESPONSE
                    </span>
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-ink-primary mt-2">
                    {activeTech.name}
                  </h3>
                </div>
                <div className="flex items-center gap-4 font-mono text-xs bg-surface-subtle p-3 rounded-xl border border-ink-tertiary/10">
                  <div>
                    <span className="text-ink-tertiary block text-[10px]">RECOVERY RATING</span>
                    <strong className="text-verified">{activeTech.efficiency}</strong>
                  </div>
                  <div className="h-8 w-px bg-ink-tertiary/20" />
                  <div>
                    <span className="text-ink-tertiary block text-[10px]">SEA STATE TOLERANCE</span>
                    <strong className="text-ink-primary">{activeTech.seaState}</strong>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h5 className="font-mono text-xs uppercase font-bold text-ink-secondary">
                    MECHANISM & OPERATIONAL SUMMARY
                  </h5>
                  <p className="font-body text-sm text-ink-secondary leading-relaxed">
                    {activeTech.summary}
                  </p>
                </div>
                <div className="space-y-2">
                  <h5 className="font-mono text-xs uppercase font-bold text-ink-secondary">
                    ENVIRONMENTAL FOOTPRINT & TRADE-OFFS
                  </h5>
                  <p className="font-body text-sm text-ink-secondary leading-relaxed">
                    {activeTech.envImpact}
                  </p>
                </div>
                <div className="space-y-2">
                  <h5 className="font-mono text-xs uppercase font-bold text-caution">
                    OPERATIONAL CONSTRAINTS & LIMITS
                  </h5>
                  <p className="font-body text-sm text-ink-secondary leading-relaxed">
                    {activeTech.constraint}
                  </p>
                </div>
              </div>

              {/* Technology Comparison Matrix Table */}
              <div className="overflow-x-auto pt-4 border-t border-ink-tertiary/10">
                <table className="w-full text-left font-mono text-xs">
                  <thead>
                    <tr className="border-b border-ink-tertiary/20 text-ink-tertiary uppercase text-[10px]">
                      <th className="py-2.5 px-3">Technology System</th>
                      <th className="py-2.5 px-3">Maturity Level</th>
                      <th className="py-2.5 px-3">Recovery Efficiency</th>
                      <th className="py-2.5 px-3">Sea State Limit</th>
                      <th className="py-2.5 px-3">Deployment Speed</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink-tertiary/10">
                    {RESPONSE_TECHNOLOGIES.map((item) => (
                      <tr
                        key={item.id}
                        onClick={() => setSelectedTechId(item.id)}
                        className={cn(
                          'cursor-pointer transition-colors',
                          item.id === selectedTechId ? 'bg-ocean/5 font-bold' : 'hover:bg-surface-subtle'
                        )}
                      >
                        <td className="py-2.5 px-3 text-ink-primary">{item.name}</td>
                        <td className="py-2.5 px-3">
                          <span
                            className={cn(
                              'px-2 py-0.5 rounded text-[10px]',
                              item.tier.includes('ESTABLISHED')
                                ? 'bg-surface-subtle text-ink-secondary'
                                : item.tier.includes('2026')
                                ? 'bg-amber-500/10 text-amber-600'
                                : 'bg-cyan-500/10 text-cyan-600'
                            )}
                          >
                            {item.tier}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-verified">{item.efficiency}</td>
                        <td className="py-2.5 px-3 text-ink-secondary">{item.seaState}</td>
                        <td className="py-2.5 px-3 text-ink-tertiary">{item.speed}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Chapter16Response;
