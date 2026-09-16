'use client';

import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Anchor, ShieldAlert, Waves, Plane, Crosshair, Helicopter, Clock, CheckCircle } from 'lucide-react';
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
  const [selectedAssetId, setSelectedAssetId] = useState<string>('vikram');

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 50%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.fromTo('.response-header', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 });
    tl.fromTo('.response-summary-card', { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6 }, '-=0.3');
    tl.fromTo('.response-asset-card', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, stagger: 0.08 }, '-=0.5');
  }, { scope: containerRef });

  const activeAsset = ASSETS.find((a) => a.id === selectedAssetId) || ASSETS[0];

  return (
    <section
      ref={containerRef}
      className="chapter-section min-h-screen relative flex items-center justify-center p-6 md:p-12 lg:p-16"
    >
      <div className="z-10 w-full max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <div className="response-header text-center space-y-3">
          <SectionLabel title="RESPONSE COORDINATION & ASSET DISPATCH" align="center" />
          <h2 className="font-display font-bold text-4xl md:text-6xl text-ink-primary tracking-tight">
            From Attribution to Action.
          </h2>
          <p className="font-body text-base md:text-lg text-ink-secondary max-w-2xl mx-auto">
            SpillTrace connects maritime enforcement directly with regional containment assets, optimizing intercept trajectories and asset positioning.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Tactical Mission Summary Card */}
          <div className="response-summary-card lg:col-span-5 bg-surface rounded-2xl border border-ink-tertiary/20 p-6 shadow-sm space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs text-ink-tertiary uppercase tracking-wider">
                  MISSION PLAN IDENTIFIER
                </span>
                <StatusBadge variant="verified" status="RECOMMENDED" />
              </div>
              <h3 className="font-display text-2xl font-bold text-ink-primary">
                DEFLECTION & SKIMMING TACTICAL PLAN
              </h3>
              <p className="text-xs font-mono text-ink-secondary mt-1">
                Target Centroid: 15.17°N, 72.11°E (Projected +6h)
              </p>
            </div>

            <div className="p-4 bg-surface-subtle rounded-xl border border-ink-tertiary/15 space-y-3 font-mono text-xs">
              <div className="flex justify-between items-center">
                <span className="text-ink-secondary">Optimal Interception Window</span>
                <span className="font-bold text-ink-primary">4h 30m</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-ink-secondary">Estimated Oil Recovery</span>
                <span className="font-bold text-verified">92% Containment</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-ink-secondary">Primary Defense Target</span>
                <span className="font-bold text-ocean">Netrani Marine Sanctuary</span>
              </div>
            </div>

            {/* Inspected Asset Deep Dive */}
            <div className="p-4 bg-ocean/5 rounded-xl border border-ocean/20 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-ocean uppercase font-bold">
                  SELECTED ASSET DETAILS
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
                Base: {activeAsset.base} · Speed: {activeAsset.speed}
              </div>
            </div>

            <Link
              href="/response"
              className="w-full py-3 bg-ocean hover:bg-ocean/90 text-white rounded-xl font-mono text-xs font-bold tracking-wider transition-colors flex items-center justify-center gap-2"
            >
              LAUNCH FULL RESPONSE SIMULATOR &rarr;
            </Link>
          </div>

          {/* Right: Regional Assets Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {ASSETS.map((asset) => {
              const Icon = asset.icon;
              const isSelected = selectedAssetId === asset.id;
              return (
                <div
                  key={asset.id}
                  onClick={() => setSelectedAssetId(asset.id)}
                  className={cn(
                    "response-asset-card p-4 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between gap-3",
                    isSelected
                      ? "bg-surface border-ocean ring-1 ring-ocean/50 shadow-md"
                      : "bg-surface border-ink-tertiary/15 hover:border-ink-tertiary/30 shadow-sm"
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-ink-primary/5 flex items-center justify-center text-ocean">
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
                    <span className="text-ink-secondary">ETA: <strong className="text-ink-primary">{asset.eta}</strong></span>
                    <span className="text-ink-tertiary">{asset.speed}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Chapter16Response;
