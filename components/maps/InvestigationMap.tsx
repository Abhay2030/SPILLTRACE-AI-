'use client';

import React, { useRef, useEffect, useState } from 'react';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { DEMO_INCIDENT } from '@/data/demo-incident';
import { DEMO_SPILL_POLYGON, DEMO_DRIFT_TIMESTEPS } from '@/data/demo-spill';
import { DEMO_VESSELS } from '@/data/demo-vessels';
import { Layers, Eye, EyeOff, Maximize2, Compass, Crosshair, AlertTriangle, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface InvestigationMapProps {
  selectedVesselId?: string;
  onSelectVessel?: (id: string) => void;
  activeStage?: number;
}

export default function InvestigationMap({
  selectedVesselId = 'VESSEL-A-001',
  onSelectVessel,
  activeStage = 3,
}: InvestigationMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);

  // Layer visibility state
  const [layers, setLayers] = useState({
    swath: true,
    spill: true,
    origin: true,
    drift: true,
    aisTracks: true,
    darkContact: true,
  });

  const toggleLayer = (layerKey: keyof typeof layers) => {
    const newState = !layers[layerKey];
    setLayers((prev) => ({ ...prev, [layerKey]: newState }));

    if (!map.current) return;

    const layerMap: Record<keyof typeof layers, string[]> = {
      swath: ['swath-fill', 'swath-outline'],
      spill: ['spill-fill', 'spill-outline'],
      origin: ['origin-fill', 'origin-outline'],
      drift: ['drift-line', 'drift-forward-line'],
      aisTracks: ['track-a-line', 'track-a-gap-line', 'track-b-line'],
      darkContact: ['dark-vessel-circle'],
    };

    const targetLayerIds = layerMap[layerKey] || [];
    targetLayerIds.forEach((id) => {
      if (map.current?.getLayer(id)) {
        map.current.setLayoutProperty(id, 'visibility', newState ? 'visible' : 'none');
      }
    });
  };

  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    // Convert DEMO_SPILL_POLYGON { lat, lng } to GeoJSON [lng, lat]
    const spillGeoCoords = DEMO_SPILL_POLYGON.map((p) => [p.lng, p.lat]);
    if (
      spillGeoCoords.length > 0 &&
      (spillGeoCoords[0][0] !== spillGeoCoords[spillGeoCoords.length - 1][0] ||
        spillGeoCoords[0][1] !== spillGeoCoords[spillGeoCoords.length - 1][1])
    ) {
      spillGeoCoords.push(spillGeoCoords[0]); // Ensure closed ring
    }

    // Origin ellipse approximation polygon (~6.4 km radius around [72.048, 15.281])
    const originLng = 72.048;
    const originLat = 15.281;
    const ellipsePoints: [number, number][] = [];
    const numPoints = 32;
    for (let i = 0; i <= numPoints; i++) {
      const angle = (i / numPoints) * 2 * Math.PI;
      const dx = 0.058 * Math.cos(angle); // ~6.4 km lng
      const dy = 0.035 * Math.sin(angle); // ~3.8 km lat
      ellipsePoints.push([originLng + dx, originLat + dy]);
    }

    // Sentinel-1A Swath bounding box (250 km)
    const swathCoords: [number, number][] = [
      [71.2, 16.2],
      [73.1, 16.2],
      [73.1, 14.4],
      [71.2, 14.4],
      [71.2, 16.2],
    ];

    // Vessel A (Horizon Trader) full track
    const vesselA = DEMO_VESSELS[0];
    const trackACoords = vesselA.aisTrack.map((pt: any) => [pt.lng, pt.lat]);

    // Vessel A Gap Segment (T-14h to T-12h gap across origin)
    const trackAGapCoords = [
      [71.85, 15.55],
      [72.05, 15.28],
      [72.15, 15.15],
    ];

    // Vessel B (Pacific Voyager) track
    const vesselB = DEMO_VESSELS[1];
    const trackBCoords = vesselB.aisTrack.map((pt: any) => [pt.lng, pt.lat]);

    // Forward Drift forecast trajectory
    const forwardDriftCoords = DEMO_INCIDENT.driftForecast.forwardPoints.map((pt: any) => [pt.lng, pt.lat]);

    // Initialize MapLibre
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://demotiles.maplibre.org/style.json',
      center: [72.1, 15.25], // Arabian Sea central incident coordinates
      zoom: 8.5,
      attributionControl: false,
    });

    map.current.addControl(new maplibregl.NavigationControl({ showCompass: true, showZoom: true }), 'top-right');

    map.current.on('load', () => {
      if (!map.current) return;

      // 1. Swath Footprint Source & Layer
      map.current.addSource('swath-source', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: { name: 'Sentinel-1A SAR Swath' },
          geometry: { type: 'Polygon', coordinates: [swathCoords] },
        },
      });

      map.current.addLayer({
        id: 'swath-fill',
        type: 'fill',
        source: 'swath-source',
        paint: {
          'fill-color': '#0284C7',
          'fill-opacity': 0.05,
        },
      });

      map.current.addLayer({
        id: 'swath-outline',
        type: 'line',
        source: 'swath-source',
        paint: {
          'line-color': '#0284C7',
          'line-width': 1.5,
          'line-dasharray': [4, 4],
        },
      });

      // 2. Probable Origin Ellipse Source & Layer
      map.current.addSource('origin-source', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: { name: 'Probable Origin Zone (±6.4 km)' },
          geometry: { type: 'Polygon', coordinates: [ellipsePoints] },
        },
      });

      map.current.addLayer({
        id: 'origin-fill',
        type: 'fill',
        source: 'origin-source',
        paint: {
          'fill-color': '#06B6D4',
          'fill-opacity': 0.18,
        },
      });

      map.current.addLayer({
        id: 'origin-outline',
        type: 'line',
        source: 'origin-source',
        paint: {
          'line-color': '#06B6D4',
          'line-width': 2,
          'line-dasharray': [3, 2],
        },
      });

      // 3. Spill Polygon Source & Layers
      map.current.addSource('spill-source', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: { name: 'Segmented Oil Slick (18.4 km²)', area: '18.4 km²' },
          geometry: { type: 'Polygon', coordinates: [spillGeoCoords] },
        },
      });

      map.current.addLayer({
        id: 'spill-fill',
        type: 'fill',
        source: 'spill-source',
        paint: {
          'fill-color': '#0B132B',
          'fill-opacity': 0.75,
        },
      });

      map.current.addLayer({
        id: 'spill-outline',
        type: 'line',
        source: 'spill-source',
        paint: {
          'line-color': '#06B6D4',
          'line-width': 2.5,
        },
      });

      // 4. Forward Drift Vector Source & Layer
      map.current.addSource('drift-forward-source', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: { name: 'Forward Drift Forecast (24h)' },
          geometry: { type: 'LineString', coordinates: forwardDriftCoords },
        },
      });

      map.current.addLayer({
        id: 'drift-forward-line',
        type: 'line',
        source: 'drift-forward-source',
        paint: {
          'line-color': '#F59E0B',
          'line-width': 2.5,
          'line-dasharray': [4, 2],
        },
      });

      // 5. AIS Tracks (Vessel A & B)
      map.current.addSource('track-a-source', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: { vessel: 'MV Horizon Trader' },
          geometry: { type: 'LineString', coordinates: trackACoords },
        },
      });

      map.current.addLayer({
        id: 'track-a-line',
        type: 'line',
        source: 'track-a-source',
        paint: {
          'line-color': '#DC2626',
          'line-width': 2.5,
        },
      });

      // 6. AIS Track A Gap Segment (2-hour Dark Gap in Amber)
      map.current.addSource('track-a-gap-source', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: { alert: '2-Hour AIS Transponder Silence' },
          geometry: { type: 'LineString', coordinates: trackAGapCoords },
        },
      });

      map.current.addLayer({
        id: 'track-a-gap-line',
        type: 'line',
        source: 'track-a-gap-source',
        paint: {
          'line-color': '#F59E0B',
          'line-width': 3.5,
          'line-dasharray': [2, 2],
        },
      });

      // 7. Track B Source & Layer
      map.current.addSource('track-b-source', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: { vessel: 'MV Pacific Voyager' },
          geometry: { type: 'LineString', coordinates: trackBCoords },
        },
      });

      map.current.addLayer({
        id: 'track-b-line',
        type: 'line',
        source: 'track-b-source',
        paint: {
          'line-color': '#64748B',
          'line-width': 1.8,
          'line-dasharray': [3, 2],
        },
      });

      // 8. Dark Vessel Contact Anomaly
      map.current.addSource('dark-vessel-source', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: { title: 'Unmatched Radar Echo #DRK-04' },
          geometry: { type: 'Point', coordinates: [72.24, 15.38] },
        },
      });

      map.current.addLayer({
        id: 'dark-vessel-circle',
        type: 'circle',
        source: 'dark-vessel-source',
        paint: {
          'circle-radius': 7,
          'circle-color': '#F59E0B',
          'circle-stroke-width': 2,
          'circle-stroke-color': '#FFFFFF',
        },
      });

      // Interactive Markers
      // Origin Marker
      const originEl = document.createElement('div');
      originEl.className =
        'w-6 h-6 rounded-full bg-marine/30 border-2 border-marine flex items-center justify-center cursor-pointer shadow-md';
      originEl.innerHTML = '<div class="w-2 h-2 rounded-full bg-marine animate-ping"></div>';
      new maplibregl.Marker({ element: originEl })
        .setLngLat([originLng, originLat])
        .setPopup(
          new maplibregl.Popup({ offset: 15 }).setHTML(`
            <div class="p-2 font-mono text-xs text-ink-primary">
              <strong class="text-marine block">PROBABLE ORIGIN ZONE</strong>
              <span>15.281°N, 72.048°E</span><br/>
              <span class="text-ink-tertiary">Uncertainty: ±6.4 km (78% conf)</span>
            </div>
          `)
        )
        .addTo(map.current);

      // Spill Centroid Marker
      const spillCentroidEl = document.createElement('div');
      spillCentroidEl.className =
        'w-5 h-5 rounded-full bg-ocean border-2 border-white flex items-center justify-center cursor-pointer shadow-md';
      new maplibregl.Marker({ element: spillCentroidEl })
        .setLngLat([72.115, 15.342])
        .setPopup(
          new maplibregl.Popup({ offset: 15 }).setHTML(`
            <div class="p-2 font-mono text-xs text-ink-primary">
              <strong class="text-ocean block">OBSERVED OIL SLICK</strong>
              <span>15.342°N, 72.115°E</span><br/>
              <span class="text-ink-tertiary">Area: 18.4 km² · Bonn Code 4/5</span>
            </div>
          `)
        )
        .addTo(map.current);

      // Vessel A (Horizon Trader) Intercept Marker
      const vesselAEl = document.createElement('div');
      vesselAEl.className =
        'w-6 h-6 rounded-full bg-critical border-2 border-white flex items-center justify-center cursor-pointer shadow-md text-[10px] text-white font-bold font-mono';
      vesselAEl.innerText = 'A';
      new maplibregl.Marker({ element: vesselAEl })
        .setLngLat([72.05, 15.28])
        .setPopup(
          new maplibregl.Popup({ offset: 15 }).setHTML(`
            <div class="p-2 font-mono text-xs text-ink-primary">
              <strong class="text-critical block">MV HORIZON TRADER</strong>
              <span>Score: 91.4% (PRIMARY CANDIDATE)</span><br/>
              <span class="text-ink-tertiary">Flag: Panama · Tanker (115,000 DWT)</span><br/>
              <span class="text-amber-600 font-bold">2-Hour AIS Silence Gap</span>
            </div>
          `)
        )
        .addTo(map.current);
    });

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  // Camera preset handlers
  const zoomToSpill = () => {
    map.current?.flyTo({ center: [72.115, 15.342], zoom: 9.5, speed: 1.2 });
  };

  const zoomToOrigin = () => {
    map.current?.flyTo({ center: [72.048, 15.281], zoom: 10.2, speed: 1.2 });
  };

  const zoomToFleet = () => {
    map.current?.flyTo({ center: [72.1, 15.25], zoom: 7.8, speed: 1.2 });
  };

  return (
    <div className="relative h-full w-full rounded-2xl overflow-hidden border border-ink-tertiary/20 shadow-sm bg-surface">
      <div ref={mapContainer} className="absolute inset-0" />

      {/* Top Left: Title Badge & Status */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2 pointer-events-none">
        <div className="bg-surface/95 backdrop-blur-md px-3.5 py-2.5 rounded-xl shadow-sm border border-ink-tertiary/20">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-verified animate-pulse" />
            <p className="text-ink-primary font-mono text-xs font-bold tracking-wider uppercase">
              TACTICAL INVESTIGATION MAP
            </p>
          </div>
          <p className="text-ink-secondary text-[11px] font-mono mt-0.5">
            Sector: Arabian Sea · Sentinel-1A SAR + Class-A AIS
          </p>
        </div>
      </div>

      {/* Top Right: Camera Presets */}
      <div className="absolute top-4 right-14 z-10 flex items-center gap-1.5 bg-surface/95 backdrop-blur-md p-1.5 rounded-xl border border-ink-tertiary/20 shadow-sm">
        <button
          onClick={zoomToSpill}
          className="px-2.5 py-1 rounded text-[11px] font-mono font-semibold text-ink-secondary hover:text-ink-primary hover:bg-surface-subtle transition-colors"
          title="Zoom to Spill Slick"
        >
          SPILL
        </button>
        <button
          onClick={zoomToOrigin}
          className="px-2.5 py-1 rounded text-[11px] font-mono font-semibold text-ink-secondary hover:text-ink-primary hover:bg-surface-subtle transition-colors"
          title="Zoom to Probable Origin"
        >
          ORIGIN
        </button>
        <button
          onClick={zoomToFleet}
          className="px-2.5 py-1 rounded text-[11px] font-mono font-semibold text-ink-secondary hover:text-ink-primary hover:bg-surface-subtle transition-colors"
          title="Reset to Regional Fleet"
        >
          FLEET
        </button>
      </div>

      {/* Bottom Bar: Layer Toggles & Legend */}
      <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-2 bg-surface/95 backdrop-blur-md px-4 py-2.5 rounded-xl border border-ink-tertiary/20 shadow-sm text-xs font-mono">
        <div className="flex items-center gap-4">
          <span className="text-ink-tertiary font-bold flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" /> LAYERS:
          </span>

          <button
            onClick={() => toggleLayer('spill')}
            className={cn(
              "flex items-center gap-1.5 px-2 py-0.5 rounded transition-all",
              layers.spill ? "text-ink-primary font-bold bg-ink-primary/5" : "text-ink-tertiary line-through opacity-60"
            )}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#0B132B] border border-ocean" />
            Spill Polygon
          </button>

          <button
            onClick={() => toggleLayer('origin')}
            className={cn(
              "flex items-center gap-1.5 px-2 py-0.5 rounded transition-all",
              layers.origin ? "text-ink-primary font-bold bg-ink-primary/5" : "text-ink-tertiary line-through opacity-60"
            )}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-marine" />
            Origin Zone
          </button>

          <button
            onClick={() => toggleLayer('aisTracks')}
            className={cn(
              "flex items-center gap-1.5 px-2 py-0.5 rounded transition-all",
              layers.aisTracks ? "text-ink-primary font-bold bg-ink-primary/5" : "text-ink-tertiary line-through opacity-60"
            )}
          >
            <span className="w-2.5 h-1 rounded bg-critical" />
            AIS Tracks
          </button>

          <button
            onClick={() => toggleLayer('drift')}
            className={cn(
              "flex items-center gap-1.5 px-2 py-0.5 rounded transition-all",
              layers.drift ? "text-ink-primary font-bold bg-ink-primary/5" : "text-ink-tertiary line-through opacity-60"
            )}
          >
            <span className="w-2.5 h-1 rounded bg-amber-500" />
            Drift Forecast
          </button>
        </div>

        <div className="flex items-center gap-2 text-ink-tertiary text-[11px]">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span>2-hr AIS Silent Gap Detected</span>
        </div>
      </div>
    </div>
  );
}
