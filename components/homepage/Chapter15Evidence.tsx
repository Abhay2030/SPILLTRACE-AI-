'use client';

import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Satellite, Droplet, Crosshair, Waves, Wind, Navigation, Ship, FileSearch, CheckCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface GraphNode {
  id: string;
  label: string;
  category: string;
  cx: number;
  cy: number;
  icon: React.ComponentType<{ className?: string }>;
  status: string;
  badgeVariant: 'verified' | 'critical' | 'caution' | 'neutral';
  summary: string;
  provenance: string;
}

const GRAPH_NODES: GraphNode[] = [
  {
    id: 'satellite',
    label: 'SENTINEL-1A',
    category: 'RADAR SENSOR',
    cx: 400,
    cy: 80,
    icon: Satellite,
    status: 'ACQUIRED',
    badgeVariant: 'verified',
    summary: 'C-Band Synthetic Aperture Radar capture at 03:42 UTC. Dual-pol VV+VH swath 250 km.',
    provenance: 'ESA Copernicus Open Access Hub · Level-1 GRD',
  },
  {
    id: 'spill',
    label: 'SLICK GEOMETRY',
    category: 'TARGET DETECTION',
    cx: 400,
    cy: 190,
    icon: Droplet,
    status: '18.4 km²',
    badgeVariant: 'verified',
    summary: 'Multi-lobed oil slick identified via CFAR adaptive thresholding and ResNet-UNet segmentation. Confidence 94.2%.',
    provenance: 'SpillTrace DeepSAR Segmentation Pipeline',
  },
  {
    id: 'origin',
    label: 'ORIGIN FIELD',
    category: 'BACKTRACKING',
    cx: 400,
    cy: 300,
    icon: Crosshair,
    status: '15.28°N, 72.05°E',
    badgeVariant: 'caution',
    summary: 'Lagrangian 10,000-particle reverse advection with ±6.4 km 95% Bayesian uncertainty envelope.',
    provenance: 'INCOIS ASRCM + ERA5 Surface Wind Forcing',
  },
  {
    id: 'currents',
    label: 'CURRENTS',
    category: 'METOCEAN',
    cx: 200,
    cy: 190,
    icon: Waves,
    status: '0.38 m/s NE',
    badgeVariant: 'neutral',
    summary: 'Arabian Sea coastal circulation vectoring northeastward at 0.38 m/s into Konkan basin.',
    provenance: 'INCOIS Regional Hydrodynamic Model',
  },
  {
    id: 'wind',
    label: 'WIND LEEWAY',
    category: 'METOCEAN',
    cx: 600,
    cy: 190,
    icon: Wind,
    status: '14 kts SW',
    badgeVariant: 'neutral',
    summary: 'Surface boundary layer wind vector at 235° generating 3.1% surface slick drift leeway.',
    provenance: 'ECMWF ERA5 Reanalysis 10m Winds',
  },
  {
    id: 'ais_fleet',
    label: 'AIS TELEMETRY',
    category: 'SIGNAL INTEL',
    cx: 140,
    cy: 420,
    icon: Navigation,
    status: '247 VESSELS',
    badgeVariant: 'neutral',
    summary: 'Class-A maritime transponder telemetry stream filtered through 5-stage deterministic funnel.',
    provenance: 'Indian Coastal Radar & Satellite AIS Gateway',
  },
  {
    id: 'vessel_a',
    label: 'MV HORIZON TRADER',
    category: 'ATTRIBUTED VESSEL',
    cx: 300,
    cy: 420,
    icon: Ship,
    status: '91.4% SUSPECT',
    badgeVariant: 'critical',
    summary: 'Coincident in time and space with 2-hour transponder gap and deceleration. Conforms 94% to drift.',
    provenance: 'Multi-Modal Evidence Synthesis Engine',
  },
  {
    id: 'vessel_b',
    label: 'MV PACIFIC VOYAGER',
    category: 'EXCLUDED VESSEL',
    cx: 500,
    cy: 420,
    icon: Ship,
    status: '68.7% EXCLUDED',
    badgeVariant: 'neutral',
    summary: 'Deprioritized due to 6-hour temporal mismatch, 8.2 km offset, and 100% AIS broadcast continuity.',
    provenance: 'Exculpatory Evidence Verification Module',
  },
  {
    id: 'dossier',
    label: 'LEGAL DOSSIER',
    category: 'INVESTIGATION CASE',
    cx: 400,
    cy: 530,
    icon: FileSearch,
    status: 'CASE READY',
    badgeVariant: 'verified',
    summary: 'Forensic PDF incident package formatted for Indian Coast Guard and port state maritime prosecution.',
    provenance: 'SpillTrace Automated Enforcement Dossier',
  },
];

export function Chapter15Evidence() {
  const containerRef = useRef<HTMLElement>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string>('vessel_a');

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 50%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.fromTo('.evidence-header', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 });
    tl.fromTo('.network-edge', { strokeDashoffset: 300, strokeDasharray: 300 }, { strokeDashoffset: 0, duration: 1.2, stagger: 0.05, ease: 'power2.inOut' }, '-=0.3');
    tl.fromTo('.network-node-elem', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'back.out(1.5)' }, '-=0.8');
    tl.fromTo('.inspector-panel', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '-=0.4');
  }, { scope: containerRef });

  const activeNode = GRAPH_NODES.find((n) => n.id === selectedNodeId) || GRAPH_NODES[6];

  return (
    <section
      ref={containerRef}
      className="chapter-section min-h-screen relative flex flex-col justify-center p-6 md:p-12 lg:p-16"
    >
      <div className="z-10 w-full max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="evidence-header text-center space-y-3">
          <SectionLabel title="MULTI-MODAL FORENSIC GRAPH" align="center" />
          <h2 className="font-display font-bold text-4xl md:text-6xl text-ink-primary tracking-tight">
            Connected Intelligence.
          </h2>
          <p className="font-body text-base md:text-lg text-ink-secondary max-w-2xl mx-auto">
            Click any node in the forensic intelligence graph to inspect its evidentiary provenance, verification parameters, and analytical relationships.
          </p>
        </div>

        {/* SVG Interactive Graph Canvas */}
        <div className="relative w-full max-w-4xl mx-auto aspect-[16/10] bg-surface rounded-2xl border border-ink-tertiary/20 shadow-sm p-4 overflow-hidden flex items-center justify-center">
          <svg viewBox="0 0 800 600" className="w-full h-full select-none">
            {/* Connecting Edges */}
            <g fill="none" strokeWidth="2" className="transition-all">
              {/* Satellite -> Spill */}
              <line x1="400" y1="80" x2="400" y2="190" stroke="#0284C7" strokeOpacity="0.6" className="network-edge" />
              {/* Spill -> Origin */}
              <line x1="400" y1="190" x2="400" y2="300" stroke="#06B6D4" strokeOpacity="0.6" className="network-edge" />
              {/* Currents -> Origin */}
              <line x1="200" y1="190" x2="400" y2="300" stroke="#0D9488" strokeOpacity="0.5" className="network-edge" />
              {/* Wind -> Origin */}
              <line x1="600" y1="190" x2="400" y2="300" stroke="#0284C7" strokeOpacity="0.5" className="network-edge" />
              {/* AIS -> Vessel A */}
              <line x1="140" y1="420" x2="300" y2="420" stroke="#94A3B8" strokeOpacity="0.6" className="network-edge" />
              {/* Origin -> Vessel A (Match) */}
              <line x1="400" y1="300" x2="300" y2="420" stroke="#DC2626" strokeWidth="2.5" strokeOpacity="0.8" className="network-edge" />
              {/* Origin -> Vessel B (Mismatch) */}
              <line x1="400" y1="300" x2="500" y2="420" stroke="#94A3B8" strokeDasharray="5 5" strokeOpacity="0.5" className="network-edge" />
              {/* Vessel A -> Legal Dossier */}
              <line x1="300" y1="420" x2="400" y2="530" stroke="#DC2626" strokeWidth="2.5" strokeOpacity="0.8" className="network-edge" />
              {/* Vessel B -> Legal Dossier (Excluded line) */}
              <line x1="500" y1="420" x2="400" y2="530" stroke="#94A3B8" strokeDasharray="3 3" strokeOpacity="0.3" className="network-edge" />
            </g>

            {/* Interactive Nodes */}
            {GRAPH_NODES.map((node) => {
              const isSelected = selectedNodeId === node.id;
              const Icon = node.icon;
              return (
                <g
                  key={node.id}
                  className="network-node-elem cursor-pointer transition-transform duration-200"
                  onClick={() => setSelectedNodeId(node.id)}
                  transform={`translate(${node.cx}, ${node.cy})`}
                >
                  {/* Outer selection ring */}
                  {isSelected && (
                    <circle
                      cx="0"
                      cy="0"
                      r="34"
                      fill="none"
                      stroke="#06B6D4"
                      strokeWidth="2"
                      className="animate-pulse"
                    />
                  )}

                  {/* Node background circle */}
                  <circle
                    cx="0"
                    cy="0"
                    r="26"
                    className={cn(
                      "transition-all duration-200",
                      node.badgeVariant === 'critical'
                        ? "fill-critical/10 stroke-critical stroke-2"
                        : node.badgeVariant === 'verified'
                        ? "fill-ocean/10 stroke-ocean stroke-2"
                        : "fill-surface stroke-ink-tertiary/40 stroke-2",
                      isSelected ? "filter drop-shadow(0 0 10px rgba(6,182,212,0.6))" : "hover:stroke-ocean"
                    )}
                  />

                  {/* Node Label Text */}
                  <text
                    x="0"
                    y="40"
                    fill="#0F172A"
                    fontSize="11"
                    fontFamily="monospace"
                    fontWeight={isSelected ? 'bold' : '600'}
                    textAnchor="middle"
                  >
                    {node.label}
                  </text>
                  <text
                    x="0"
                    y="53"
                    fill="#64748B"
                    fontSize="9"
                    fontFamily="monospace"
                    textAnchor="middle"
                  >
                    {node.status}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Selected Node Inspector Drawer Card */}
        <div className="inspector-panel w-full max-w-4xl mx-auto bg-surface rounded-2xl border border-ink-tertiary/20 p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-ink-tertiary/15 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-ink-primary/5 flex items-center justify-center text-ink-primary">
                <activeNode.icon className="w-5 h-5" />
              </div>
              <div>
                <span className="font-mono text-[10px] text-ink-tertiary uppercase tracking-wider block">
                  {activeNode.category}
                </span>
                <h4 className="font-display text-xl font-bold text-ink-primary">
                  {activeNode.label}
                </h4>
              </div>
            </div>

            <StatusBadge variant={activeNode.badgeVariant} status={activeNode.status} />
          </div>

          <p className="text-sm font-body text-ink-secondary leading-relaxed">
            {activeNode.summary}
          </p>

          <div className="flex items-center justify-between pt-2 text-xs font-mono text-ink-tertiary border-t border-ink-tertiary/10">
            <span>PROVENANCE: <strong className="text-ink-secondary">{activeNode.provenance}</strong></span>
            <span className="text-marine font-bold">CLICK OTHER NODES TO EXPLORE</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Chapter15Evidence;
