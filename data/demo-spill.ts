// Spill geometry and drift timesteps

export const DEMO_SPILL_POLYGON = [
  { lat: 15.22, lng: 72.08 },
  { lat: 15.23, lng: 72.09 },
  { lat: 15.235, lng: 72.10 },
  { lat: 15.23, lng: 72.115 },
  { lat: 15.21, lng: 72.12 },
  { lat: 15.19, lng: 72.115 },
  { lat: 15.18, lng: 72.105 },
  { lat: 15.185, lng: 72.09 },
  { lat: 15.195, lng: 72.08 },
  { lat: 15.21, lng: 72.075 },
  { lat: 15.22, lng: 72.08 }
];

export const DEMO_DRIFT_TIMESTEPS: any[] = [
  {
    timeLabel: 'T-24h',
    timestamp: '2026-09-13T03:42:00Z',
    centerLat: 15.30,
    centerLng: 72.02,
    uncertaintyRadiusKm: 8.5
  },
  {
    timeLabel: 'T-18h',
    timestamp: '2026-09-13T09:42:00Z',
    centerLat: 15.28,
    centerLng: 72.04,
    uncertaintyRadiusKm: 6.0
  },
  {
    timeLabel: 'T-12h',
    timestamp: '2026-09-13T15:42:00Z',
    centerLat: 15.26,
    centerLng: 72.06,
    uncertaintyRadiusKm: 4.2
  },
  {
    timeLabel: 'T-6h',
    timestamp: '2026-09-13T21:42:00Z',
    centerLat: 15.23,
    centerLng: 72.08,
    uncertaintyRadiusKm: 2.5
  },
  {
    timeLabel: 'T0 (Detection)',
    timestamp: '2026-09-14T03:42:00Z',
    centerLat: 15.20,
    centerLng: 72.10,
    uncertaintyRadiusKm: 1.0,
    polygon: DEMO_SPILL_POLYGON
  },
  {
    timeLabel: 'T+6h',
    timestamp: '2026-09-14T09:42:00Z',
    centerLat: 15.17,
    centerLng: 72.11,
    uncertaintyRadiusKm: 3.5
  },
  {
    timeLabel: 'T+12h',
    timestamp: '2026-09-14T15:42:00Z',
    centerLat: 15.13,
    centerLng: 72.125,
    uncertaintyRadiusKm: 5.8
  },
  {
    timeLabel: 'T+24h',
    timestamp: '2026-09-15T03:42:00Z',
    centerLat: 15.05,
    centerLng: 72.15,
    uncertaintyRadiusKm: 10.2
  }
];
