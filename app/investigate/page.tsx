'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { DataModeIndicator } from '@/components/ui/DataModeIndicator';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { ConfidenceBar } from '@/components/ui/ConfidenceBar';
import { DEMO_INCIDENT } from '@/data/demo-incident';
import { DEMO_VESSELS } from '@/data/demo-vessels';
import { cn } from '@/lib/utils';
import {
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Ship,
  Droplet,
  Compass,
  FileText,
  ShieldCheck,
  ExternalLink,
  Radio,
  Clock,
} from 'lucide-react';
import Link from 'next/link';

const InvestigationMap = dynamic(() => import('@/components/maps/InvestigationMap'), {
  ssr: false,
  loading: () => (
    <div className="relative h-full bg-surface-subtle rounded-2xl border border-ink-tertiary/20 flex items-center justify-center">
      <div className="text-center font-mono text-xs text-ink-tertiary">
        <span className="animate-pulse block mb-2">INITIALIZING GEOSPATIAL RADAR WORKSTATION...</span>
        <span>MapLibre GL · Arabian Sea Sector</span>
      </div>
    </div>
  ),
});

const STAGES = [
  '1. DETECT',
  '2. VALIDATE',
  '3. TRACE',
  '4. ATTRIBUTE',
  '5. ASSESS',
  '6. RESPOND',
  '7. MONITOR',
];

export default function InvestigatePage() {
  const [activeStageIndex, setActiveStageIndex] = useState<number>(3); // Default Stage 4: ATTRIBUTE
  const [selectedVesselId, setSelectedVesselId] = useState<string>('VESSEL-A-001');

  const [panels, setPanels] = useState({
    incident: true,
    spill: true,
    origin: true,
    candidates: true,
    darkVessel: true,
    threat: false,
  });

  const togglePanel = (key: keyof typeof panels) => {
    setPanels((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const selectedVessel = DEMO_VESSELS.find((v: any) => v.id === selectedVesselId) || DEMO_VESSELS[0];

  return (
    <div className="flex flex-col h-screen pt-16 bg-surface overflow-hidden select-none">
      {/* Top Bar: Mission Status & Stage Switcher */}
      <div className="flex items-center justify-between px-6 py-2.5 border-b border-ink-tertiary/15 bg-white shadow-sm shrink-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-verified animate-ping" />
          <span className="font-mono text-xs font-bold text-ink-primary tracking-wider">
            CASE #{DEMO_INCIDENT.id}
          </span>
          <span className="text-ink-tertiary text-xs">|</span>
          <span className="font-mono text-xs text-ocean font-semibold">
            ARABIAN SEA SECTOR (15.3°N, 72.1°E)
          </span>
        </div>

        {/* Stage Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto hide-scrollbar">
          {STAGES.map((stg, i) => (
            <button
              key={stg}
              onClick={() => setActiveStageIndex(i)}
              className={cn(
                "px-3 py-1 rounded-lg text-xs font-mono font-semibold whitespace-nowrap transition-all",
                i === activeStageIndex
                  ? "bg-ocean text-white shadow-sm"
                  : i < activeStageIndex
                  ? "bg-ocean/10 text-ocean hover:bg-ocean/20"
                  : "text-ink-tertiary hover:text-ink-primary hover:bg-surface-subtle"
              )}
            >
              {stg}
            </button>
          ))}
        </div>

        <DataModeIndicator mode="DEMO" />
      </div>

      {/* Main Workspace Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: MapLibre Tactical Map (65%) */}
        <div className="w-[66%] h-full p-4 flex flex-col">
          <InvestigationMap
            selectedVesselId={selectedVesselId}
            onSelectVessel={(id) => setSelectedVesselId(id)}
            activeStage={activeStageIndex}
          />
        </div>

        {/* Right: Forensic Intelligence Sidebar (34%) */}
        <div className="w-[34%] h-full overflow-y-auto border-l border-ink-tertiary/15 bg-surface-subtle/40 p-4 space-y-3.5">
          {/* Incident Telemetry Summary */}
          <div className="bg-white border border-ink-tertiary/20 rounded-xl overflow-hidden shadow-sm">
            <button
              onClick={() => togglePanel('incident')}
              className="flex items-center justify-between w-full p-3.5 bg-surface-subtle border-b border-ink-tertiary/10 font-mono text-xs font-bold text-ink-primary"
            >
              <div className="flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-ocean" />
                <span>INCIDENT DOSSIER SUMMARY</span>
              </div>
              {panels.incident ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {panels.incident && (
              <div className="p-4 space-y-2.5 text-xs font-mono text-ink-secondary">
                <div className="flex justify-between">
                  <span className="text-ink-tertiary">Incident ID</span>
                  <span className="font-bold text-ink-primary">{DEMO_INCIDENT.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-tertiary">Sensor Observation</span>
                  <span className="font-bold text-ocean">Sentinel-1A (C-SAR)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-tertiary">Acquisition Timestamp</span>
                  <span className="text-ink-primary">2026-09-14 03:42:00 UTC</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-tertiary">Enforcement Status</span>
                  <StatusBadge variant="critical" status="UNDER ATTRIBUTION" />
                </div>
              </div>
            )}
          </div>

          {/* Spill Characterization Panel */}
          <div className="bg-white border border-ink-tertiary/20 rounded-xl overflow-hidden shadow-sm">
            <button
              onClick={() => togglePanel('spill')}
              className="flex items-center justify-between w-full p-3.5 bg-surface-subtle border-b border-ink-tertiary/10 font-mono text-xs font-bold text-ink-primary"
            >
              <div className="flex items-center gap-2">
                <Droplet className="w-3.5 h-3.5 text-ocean" />
                <span>SLICK MORPHOMETRY (BONN)</span>
              </div>
              {panels.spill ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {panels.spill && (
              <div className="p-4 space-y-3 text-xs font-mono">
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 bg-surface-subtle rounded-lg border border-ink-tertiary/10">
                    <span className="text-[10px] text-ink-tertiary uppercase block">SURFACE AREA</span>
                    <span className="text-sm font-bold text-ink-primary">18.4 km² ±2.1</span>
                  </div>
                  <div className="p-2.5 bg-surface-subtle rounded-lg border border-ink-tertiary/10">
                    <span className="text-[10px] text-ink-tertiary uppercase block">MIN VOLUME</span>
                    <span className="text-sm font-bold text-ink-primary">142 MT (~165 m³)</span>
                  </div>
                </div>

                <div className="space-y-1 pt-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-ink-tertiary">Segmentation Confidence</span>
                    <span className="text-verified font-bold">94.2%</span>
                  </div>
                  <ConfidenceBar value={0.942} />
                </div>
              </div>
            )}
          </div>

          {/* Candidate Vessels Dossier Panel */}
          <div className="bg-white border border-ink-tertiary/20 rounded-xl overflow-hidden shadow-sm">
            <button
              onClick={() => togglePanel('candidates')}
              className="flex items-center justify-between w-full p-3.5 bg-surface-subtle border-b border-ink-tertiary/10 font-mono text-xs font-bold text-ink-primary"
            >
              <div className="flex items-center gap-2">
                <Ship className="w-3.5 h-3.5 text-critical" />
                <span>CANDIDATE VESSELS (3 ISOLATED)</span>
              </div>
              {panels.candidates ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {panels.candidates && (
              <div className="p-4 space-y-3">
                {DEMO_VESSELS.map((vessel: any, idx: number) => {
                  const isSelected = selectedVesselId === vessel.id;
                  return (
                    <div
                      key={vessel.id}
                      onClick={() => setSelectedVesselId(vessel.id)}
                      className={cn(
                        "p-3 rounded-xl border transition-all cursor-pointer space-y-2",
                        isSelected
                          ? "bg-ocean/5 border-ocean ring-1 ring-ocean/40 shadow-sm"
                          : "bg-surface border-ink-tertiary/15 hover:border-ink-tertiary/30"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-display font-bold text-sm text-ink-primary">
                          {vessel.name}
                        </span>
                        <span
                          className={cn(
                            "font-mono text-xs font-bold px-2 py-0.5 rounded",
                            idx === 0
                              ? "bg-critical/10 text-critical"
                              : idx === 1
                              ? "bg-amber-500/10 text-amber-600"
                              : "bg-ink-primary/5 text-ink-secondary"
                          )}
                        >
                          {vessel.evidenceScore.toFixed(1)}% Match
                        </span>
                      </div>

                      <div className="flex items-center justify-between font-mono text-[11px] text-ink-secondary">
                        <span>{vessel.flag} · {vessel.type}</span>
                        <span>IMO {vessel.imo}</span>
                      </div>

                      {idx === 0 && (
                        <div className="p-2 bg-amber-500/10 rounded border border-amber-500/20 text-[11px] font-mono text-amber-700">
                          2-hr transponder silence gap across origin
                        </div>
                      )}

                      <div className="flex justify-end pt-1">
                        <Link
                          href={`/vessel/${vessel.id}`}
                          className="flex items-center gap-1 font-mono text-[11px] font-bold text-ocean hover:text-ocean/80"
                        >
                          FULL REPORT <ExternalLink className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Dark Vessel Contact / Unmatched Radar Echo Panel */}
          <div className="bg-white border border-amber-500/30 rounded-xl overflow-hidden shadow-sm">
            <button
              onClick={() => togglePanel('darkVessel')}
              className="flex items-center justify-between w-full p-3.5 bg-amber-500/5 border-b border-amber-500/20 font-mono text-xs font-bold text-amber-700"
            >
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                <span>UNMATCHED RADAR ECHO (#DRK-04)</span>
              </div>
              {panels.darkVessel ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {panels.darkVessel && (
              <div className="p-4 space-y-2 text-xs font-mono text-ink-secondary">
                <p className="leading-relaxed">
                  High-intensity SAR radar backscatter contact detected at 15.38°N, 72.24°E without active AIS transponder broadcast.
                </p>
                <div className="flex justify-between pt-1">
                  <span className="text-ink-tertiary">Estimated Length</span>
                  <span className="font-bold text-ink-primary">~65 meters (Fishing / Cargo)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-tertiary">Attribution Impact</span>
                  <span className="font-bold text-amber-600">Secondary Watch</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Mission Timeline */}
      <div className="h-14 border-t border-ink-tertiary/15 bg-white shrink-0 px-6 flex items-center justify-between font-mono text-xs">
        <div className="flex items-center gap-6 text-ink-secondary">
          <span className="flex items-center gap-1.5 text-verified font-bold">
            <ShieldCheck className="w-4 h-4" /> T-24h INCEPTION RECONSTRUCTED
          </span>
          <span className="hidden sm:inline text-ink-tertiary">|</span>
          <span className="hidden sm:inline">ORIGIN: 15.281°N, 72.048°E (±6.4 km)</span>
          <span className="hidden sm:inline text-ink-tertiary">|</span>
          <span className="hidden sm:inline text-critical font-bold">PRIMARY SUSPECT: MV HORIZON TRADER</span>
        </div>

        <Link
          href="/response"
          className="px-4 py-2 bg-ocean hover:bg-ocean/90 text-white rounded-lg text-xs font-mono font-bold tracking-wider transition-colors"
        >
          GO TO RESPONSE &rarr;
        </Link>
      </div>
    </div>
  );
}
