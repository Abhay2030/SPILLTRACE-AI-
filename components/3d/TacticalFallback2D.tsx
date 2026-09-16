'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Compass, Wind, Navigation, Radio, AlertTriangle } from 'lucide-react';

export default function TacticalFallback2D() {
  const [chapter, setChapter] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight || 1;
      const cur = Math.max(1, Math.min(20, Math.floor(scrollY / vh + 1)));
      setChapter(cur);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 z-0 bg-[#060D1A] overflow-hidden pointer-events-none select-none">
      {/* 1. Tactical Nautical Graticule & Bathymetric Chart SVG */}
      <svg
        className="w-full h-full opacity-60"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="nautical-grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#0E2B4B" strokeWidth="0.75" />
            <circle cx="80" cy="80" r="1.5" fill="#1E4976" />
          </pattern>
          <radialGradient id="slick-core-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0F172A" stopOpacity="0.95" />
            <stop offset="35%" stopColor="#1E293B" stopOpacity="0.85" />
            <stop offset="70%" stopColor="#06B6D4" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Base Cartographic Grid */}
        <rect width="100%" height="100%" fill="url(#nautical-grid)" />

        {/* Bathymetry Contours */}
        <g stroke="#0E3860" fill="none" strokeWidth="1" strokeDasharray="3 4">
          <path d="M 0,250 Q 300,280 600,220 T 1200,310" opacity="0.4" />
          <path d="M 0,420 Q 350,450 700,390 T 1200,480" opacity="0.5" />
          <path d="M 0,600 Q 400,640 800,580 T 1200,670" opacity="0.3" />
        </g>

        {/* Coastline Silhouette (Western India / Konkan Coast on East side) */}
        <g fill="#0B1A2F" stroke="#1D4E89" strokeWidth="1.5">
          <path d="M 980,0 C 950,120 920,240 940,360 C 960,480 910,600 930,720 C 940,760 970,800 990,800 L 1200,800 L 1200,0 Z" />
        </g>

        {/* EEZ Boundary Line (200 NM) */}
        <path
          d="M 680,0 C 650,150 620,300 640,480 C 660,620 620,720 630,800"
          fill="none"
          stroke="#0284C7"
          strokeWidth="1.2"
          strokeDasharray="6 6"
          opacity="0.5"
        />
        <text x="650" y="60" fill="#0284C7" fontSize="10" fontFamily="monospace" opacity="0.7">
          INDIA EEZ (200 NM LIMIT)
        </text>

        {/* SAR Swath Footprint (Sentinel-1 VV Swath: ~250km corridor) */}
        <g opacity={chapter >= 3 ? 0.85 : 0.2}>
          <polygon
            points="380,80 680,140 520,720 220,660"
            fill="#0369A1"
            fillOpacity="0.08"
            stroke="#0284C7"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <text x="390" y="105" fill="#38BDF8" fontSize="11" fontFamily="monospace">
            SENTINEL-1 C-SAR SWATH (VV/VH POLARIZATION)
          </text>
        </g>

        {/* Candidate A (MT Horizon Trader) AIS Trajectory */}
        <g opacity={chapter >= 11 ? 1 : 0.35}>
          {/* Historical verified track */}
          <path
            d="M 320,180 L 440,320 L 510,405"
            fill="none"
            stroke="#10B981"
            strokeWidth="2"
          />
          {/* AIS Gap / Dark Activity Corridor */}
          <path
            d="M 510,405 L 590,500"
            fill="none"
            stroke="#F59E0B"
            strokeWidth="2.5"
            strokeDasharray="5 5"
          />
          {/* Resumed track */}
          <path
            d="M 590,500 L 670,610 L 740,710"
            fill="none"
            stroke="#10B981"
            strokeWidth="2"
          />

          {/* AIS Gap Callout */}
          <g transform="translate(560, 440)">
            <rect x="0" y="0" width="130" height="26" rx="4" fill="#0F172A" stroke="#F59E0B" strokeWidth="1" />
            <text x="8" y="17" fill="#F59E0B" fontSize="10" fontFamily="monospace" fontWeight="bold">
              AIS GAP: 14.2 HRS
            </text>
          </g>

          {/* Vessel Position Marker */}
          <circle cx="740" cy="710" r="5" fill="#10B981" />
          <circle cx="740" cy="710" r="10" fill="none" stroke="#10B981" strokeWidth="1" opacity="0.6" />
          <text x="755" y="714" fill="#E2E8F0" fontSize="11" fontFamily="monospace">
            MT HORIZON TRADER (IMO 9234567)
          </text>
        </g>

        {/* Oil Slick Polygon & Bonn Agreement Grading */}
        <g transform="translate(550, 460)" opacity={chapter >= 4 ? 1 : 0.15}>
          {/* Outer Silvery Sheen (Code 1) */}
          <ellipse cx="0" cy="0" rx="90" ry="42" fill="url(#slick-core-grad)" transform="rotate(-28)" />

          {/* Metallic & Heavy Sheen (Code 3-4) */}
          <ellipse
            cx="-6"
            cy="4"
            rx="52"
            ry="24"
            fill="#1E293B"
            fillOpacity="0.8"
            stroke="#06B6D4"
            strokeWidth="1"
            transform="rotate(-28)"
          />

          {/* Continuous Emulsion Core (Bonn Code 5) */}
          <ellipse
            cx="-12"
            cy="8"
            rx="28"
            ry="14"
            fill="#090D16"
            stroke="#E11D48"
            strokeWidth="1.2"
            transform="rotate(-28)"
          />

          {/* Centroid Crosshair */}
          <path d="M -15,0 L 15,0 M 0,-15 L 0,15" stroke="#38BDF8" strokeWidth="1" />
          <circle cx="0" cy="0" r="4" fill="none" stroke="#38BDF8" strokeWidth="1" />

          {/* Centroid Tag */}
          <g transform="translate(30, -30)">
            <line x1="-30" y1="30" x2="0" y2="0" stroke="#38BDF8" strokeWidth="1" strokeDasharray="2 2" />
            <rect x="0" y="-12" width="180" height="40" rx="4" fill="#08101E" stroke="#0284C7" strokeWidth="1" />
            <text x="8" y="4" fill="#E2E8F0" fontSize="10" fontFamily="monospace" fontWeight="bold">
              SPILL CENTROID (15°28&apos;N, 72°05&apos;E)
            </text>
            <text x="8" y="18" fill="#38BDF8" fontSize="9" fontFamily="monospace">
              BONN CODE 5: 185 m³ EMULSION
            </text>
          </g>
        </g>

        {/* Reverse Lagrangian Drift Vector (Chapter 07+) */}
        {chapter >= 7 && (
          <g stroke="#06B6D4" strokeWidth="2" strokeDasharray="4 3" opacity="0.9">
            <line x1="550" y1="460" x2="520" y2="415" />
            <polygon points="520,415 528,422 522,427" fill="#06B6D4" />
            <text x="440" y="435" fill="#06B6D4" fontSize="10" fontFamily="monospace">
              BACKWARD TRAJECTORY (-18h)
            </text>
          </g>
        )}
      </svg>

      {/* 2. Tactical HUD Corner Telemetry */}
      <div className="absolute top-20 right-6 flex flex-col items-end gap-2 text-right">
        <div className="flex items-center gap-2 px-3 py-1 bg-sky-950/80 border border-sky-600/40 rounded text-sky-400 font-mono text-[10px]">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
          2D GEOSPATIAL TACTICAL MODE · HARDWARE 3D STANDBY
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-3 w-64 shadow-2xl backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 mb-2">
            <span className="text-[10px] font-mono uppercase text-slate-400">Tactical Telemetry</span>
            <span className="text-[10px] font-mono text-cyan-400">CH {String(chapter).padStart(2, '0')}/20</span>
          </div>

          <div className="space-y-1.5 text-[11px] font-mono text-slate-300">
            <div className="flex justify-between">
              <span className="text-slate-500">SECTOR:</span>
              <span className="text-slate-200">Arabian Sea (15.28°N, 72.05°E)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">SENSOR:</span>
              <span className="text-sky-400">Sentinel-1 C-SAR (VV)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">BONN CODE:</span>
              <span className="text-amber-400">Level 5 (Continuous True Oil)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">SUSPECT:</span>
              <span className="text-emerald-400">MT Horizon Trader (0.94)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Tactical Scale Indicator */}
      <div className="absolute bottom-24 left-6 flex items-center gap-3 font-mono text-[10px] text-slate-500 bg-slate-900/70 border border-slate-800 px-3 py-1.5 rounded">
        <Compass className="w-3.5 h-3.5 text-cyan-400" />
        <span>WGS 84 MERCATOR PROJECTION</span>
        <span className="text-slate-700">|</span>
        <span>0 — 50 NM</span>
        <div className="w-16 h-1 bg-slate-700 flex">
          <div className="w-8 h-full bg-cyan-400" />
        </div>
      </div>
    </div>
  );
}
