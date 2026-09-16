// Vessel candidates for DEMO mode
// Region: Arabian Sea west of Goa, India

export const DEMO_VESSELS: any[] = [
  {
    id: 'VESSEL-A-001',
    name: 'MV Horizon Trader',
    imo: '9876543',
    mmsi: '538006789',
    flag: 'Panama',
    type: 'Tanker',
    length: 228,
    evidenceScore: 91.4,
    compatibility: {
      temporal: 92,
      spatial: 89,
      drift: 94,
      trajectory: 87
    },
    missingData: 'LOW',
    status: 'SUSPECT',
    dataMode: 'DEMO',
    aisTrack: [
      { lat: 16.00, lng: 71.50, timestamp: '2026-09-13T08:00:00Z', speed: 12, heading: 145 },
      { lat: 15.80, lng: 71.65, timestamp: '2026-09-13T10:00:00Z', speed: 12.5, heading: 145 },
      { lat: 15.55, lng: 71.85, timestamp: '2026-09-13T12:00:00Z', speed: 12, heading: 146 },
      // Gap near origin
      { lat: 15.15, lng: 72.15, timestamp: '2026-09-13T15:30:00Z', speed: 11, heading: 145 },
      { lat: 14.90, lng: 72.35, timestamp: '2026-09-13T18:00:00Z', speed: 12, heading: 144 },
      { lat: 14.65, lng: 72.55, timestamp: '2026-09-13T20:30:00Z', speed: 12.2, heading: 145 },
      { lat: 14.30, lng: 72.85, timestamp: '2026-09-14T00:00:00Z', speed: 12, heading: 145 },
    ]
  },
  {
    id: 'VESSEL-B-002',
    name: 'MV Pacific Voyager',
    imo: '9654321',
    mmsi: '636015842',
    flag: 'Liberia',
    type: 'Cargo',
    length: 189,
    evidenceScore: 68.7,
    compatibility: {
      temporal: 74,
      spatial: 71,
      drift: 62,
      trajectory: 65
    },
    missingData: 'MEDIUM',
    status: 'UNDER_REVIEW',
    dataMode: 'DEMO',
    aisTrack: [
      { lat: 15.80, lng: 72.50, timestamp: '2026-09-13T02:00:00Z', speed: 15, heading: 220 },
      { lat: 15.50, lng: 72.25, timestamp: '2026-09-13T04:30:00Z', speed: 15.2, heading: 220 },
      { lat: 15.32, lng: 72.11, timestamp: '2026-09-13T06:00:00Z', speed: 15, heading: 222 }, // Passed 8km from origin, but timing is 7-8h before estimated spill
      { lat: 15.10, lng: 71.95, timestamp: '2026-09-13T08:00:00Z', speed: 15, heading: 220 },
      { lat: 14.80, lng: 71.70, timestamp: '2026-09-13T10:30:00Z', speed: 15.5, heading: 219 },
    ]
  },
  {
    id: 'VESSEL-C-003',
    name: 'FV Sea Fortune',
    imo: '8912345',
    mmsi: '419000456',
    flag: 'India',
    type: 'Fishing',
    length: 34,
    evidenceScore: 54.2,
    compatibility: {
      temporal: 82,
      spatial: 45,
      drift: 38,
      trajectory: 51
    },
    missingData: 'HIGH',
    status: 'INCONCLUSIVE',
    dataMode: 'DEMO',
    aisTrack: [
      { lat: 15.10, lng: 72.40, timestamp: '2026-09-13T09:00:00Z', speed: 4, heading: 90 },
      { lat: 15.12, lng: 72.45, timestamp: '2026-09-13T11:00:00Z', speed: 3.5, heading: 120 },
      { lat: 15.08, lng: 72.50, timestamp: '2026-09-13T14:00:00Z', speed: 4.2, heading: 180 },
      { lat: 15.05, lng: 72.45, timestamp: '2026-09-13T18:00:00Z', speed: 3, heading: 270 },
      { lat: 15.02, lng: 72.40, timestamp: '2026-09-13T22:00:00Z', speed: 4, heading: 320 },
    ]
  }
];
