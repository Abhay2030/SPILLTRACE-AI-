'use client';
import { useRef, useEffect } from 'react';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { DEMO_INCIDENT } from '@/data/demo-incident';

export default function InvestigationMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://demotiles.maplibre.org/style.json',
      center: [72.1, 15.2], // Arabian Sea
      zoom: 7,
      attributionControl: false
    });

    map.current.on('load', () => {
      // Add simple sources and layers for demo
      map.current?.addSource('spill-polygon', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: DEMO_INCIDENT.geometry
        }
      });

      map.current?.addLayer({
        id: 'spill-fill',
        type: 'fill',
        source: 'spill-polygon',
        paint: {
          'fill-color': '#0f172a',
          'fill-opacity': 0.6
        }
      });

      map.current?.addLayer({
        id: 'spill-outline',
        type: 'line',
        source: 'spill-polygon',
        paint: {
          'line-color': '#06b6d4',
          'line-width': 2
        }
      });
      
      // Pulse animation for origin point
      const originCoord = DEMO_INCIDENT.originEstimate?.coordinates;
      if (originCoord) {
         new maplibregl.Marker({ color: '#dc2626' })
          .setLngLat([originCoord[0], originCoord[1]])
          .addTo(map.current!);
      }
    });

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  return (
    <div className="relative h-full w-full rounded-lg overflow-hidden border border-surface-subtle shadow-inner">
      <div ref={mapContainer} className="absolute inset-0" />
      
      {/* Map overlay elements */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <div className="bg-white/90 backdrop-blur px-3 py-2 rounded-md shadow-sm border border-surface-subtle">
          <p className="text-ink-primary font-mono text-sm font-semibold">INVESTIGATION MAP</p>
          <p className="text-ink-secondary text-xs mt-0.5">MapLibre GL · Interactive</p>
        </div>
      </div>
    </div>
  );
}
