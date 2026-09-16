// SpillTrace AI - Deterministic Seed Data (ST-2026-0042)
// For V6.0 Interactive Shell

export const ACTIVE_INCIDENT = {
  id: 'ST-2026-0042',
  region: 'Arabian Sea',
  coordinates: { lat: 15.3, lng: 72.1 },
  spillArea_km2: 18.4,
  oilProbability: 0.942,
  originConfidence: 0.78,
  detectionTime: '2026-09-14T08:24:00Z',
  status: 'INVESTIGATION_ACTIVE',
};

// Represents the 11-step investigation narrative
export const INVESTIGATION_STEPS = [
  { id: 1, title: 'Observe', description: 'Satellite pass scheduling & imagery acquisition.' },
  { id: 2, title: 'Detect', description: 'C-SAR anomaly detection over ocean surface.' },
  { id: 3, title: 'Validate', description: 'Look-alike classification and probability scoring.' },
  { id: 4, title: 'Characterize', description: 'Spill geometry, volume estimation, and weathering.' },
  { id: 5, title: 'Trace', description: 'Hydrodynamic backtracking and origin reconstruction.' },
  { id: 6, title: 'Correlate', description: 'AIS trajectory intersection with origin zone.' },
  { id: 7, title: 'Attribute', description: 'Candidate ranking and digital evidence aggregation.' },
  { id: 8, title: 'Verify', description: 'Cross-sensor optical/SAR confirmation.' },
  { id: 9, title: 'Assess', description: 'Coastal threat and environmental risk modeling.' },
  { id: 10, title: 'Respond', description: 'Deployment of mechanical and conditional countermeasures.' },
  { id: 11, title: 'Monitor', description: 'Closed-loop satellite re-tasking and validation.' }
];

// Candidates for 'Why This Vessel' comparison
export const CANDIDATE_VESSELS = [
  {
    id: 'V-001-ALPHA',
    name: 'MT OCEANIC PIONEER',
    type: 'Crude Oil Tanker',
    mmsi: '419000123',
    speed: 12.4,
    heading: 142,
    matchConfidence: 0.94,
    evidence: [
      { id: 'E1', type: 'SUPPORTING', text: 'AIS track intersects origin zone at T-14H.' },
      { id: 'E2', type: 'SUPPORTING', text: 'Speed reduction anomaly (12kts -> 4kts) detected.' },
      { id: 'E3', type: 'SUPPORTING', text: 'Optical cross-match confirms hull signature.' },
    ]
  },
  {
    id: 'V-002-BRAVO',
    name: 'MV GLOBAL TRADER',
    type: 'Bulk Carrier',
    mmsi: '419000456',
    speed: 14.1,
    heading: 138,
    matchConfidence: 0.32,
    evidence: [
      { id: 'E4', type: 'SUPPORTING', text: 'AIS track intersects origin zone at T-15H.' },
      { id: 'E5', type: 'CONTRADICTING', text: 'Draft analysis indicates no cargo discharge.' },
      { id: 'E6', type: 'MISSING', text: 'No optical confirmation available.' },
    ]
  },
  {
    id: 'V-003-CHARLIE',
    name: 'FV SEA HORSE',
    type: 'Fishing Vessel',
    mmsi: '419000789',
    speed: 8.5,
    heading: 45,
    matchConfidence: 0.12,
    evidence: [
      { id: 'E7', type: 'SUPPORTING', text: 'Present in sector during T-12H.' },
      { id: 'E8', type: 'CONTRADICTING', text: 'Vessel size insufficient for spill volume.' },
    ]
  }
];
