// Evidence chain demo data

export const DEMO_EVIDENCE_ITEMS: any[] = [
  {
    id: 'SAT-OBS-001',
    type: 'SATELLITE_OBSERVATION',
    description: 'Sentinel-1A observation at 2026-09-14T03:42:00Z',
    stance: 'SUPPORTING',
    confidence: 'HIGH',
    timestamp: '2026-09-14T03:42:00Z'
  },
  {
    id: 'SPILL-DET-001',
    type: 'AI_DETECTION',
    description: 'AI spill detection (0.942 probability of oil)',
    stance: 'SUPPORTING',
    confidence: 'HIGH',
    timestamp: '2026-09-14T04:15:00Z'
  },
  {
    id: 'ORIG-001',
    type: 'ORIGIN_ANALYSIS',
    description: 'Origin zone analysis based on backtrack drift model',
    stance: 'SUPPORTING',
    confidence: 'MEDIUM',
    timestamp: '2026-09-14T06:30:00Z'
  },
  {
    id: 'AIS-001',
    type: 'AIS_TRACK',
    description: 'Vessel A (MV Horizon Trader) AIS track alignment with origin zone',
    stance: 'SUPPORTING',
    confidence: 'HIGH',
    timestamp: '2026-09-14T08:00:00Z'
  },
  {
    id: 'AIS-GAP-001',
    type: 'AIS_ANOMALY',
    description: 'Vessel A suspicious 2-hour AIS gap near estimated origin zone and time',
    stance: 'SUPPORTING',
    confidence: 'MEDIUM',
    timestamp: '2026-09-14T08:45:00Z'
  },
  {
    id: 'DRIFT-001',
    type: 'DRIFT_MATCH',
    description: 'Forward drift model matches Vessel A location at T-14h',
    stance: 'SUPPORTING',
    confidence: 'HIGH',
    timestamp: '2026-09-14T09:30:00Z'
  },
  {
    id: 'DRIFT-002',
    type: 'DRIFT_MISMATCH',
    description: 'Drift model contradicts Vessel B (MV Pacific Voyager) trajectory',
    stance: 'CONTRADICTING',
    confidence: 'MEDIUM',
    timestamp: '2026-09-14T10:15:00Z'
  },
  {
    id: 'TEMP-001',
    type: 'TEMPORAL_MATCH',
    description: 'Temporal compatibility high for Vessel A passing origin at estimated spill time',
    stance: 'SUPPORTING',
    confidence: 'HIGH',
    timestamp: '2026-09-14T11:00:00Z'
  },
  {
    id: 'BEHAV-001',
    type: 'BEHAVIORAL_ANOMALY',
    description: 'Vessel A speed reduction leading up to AIS gap',
    stance: 'SUPPORTING',
    confidence: 'LOW',
    timestamp: '2026-09-14T11:45:00Z'
  },
  {
    id: 'SPAT-002',
    type: 'SPATIAL_MISMATCH',
    description: 'Vessel C (FV Sea Fortune) distance from origin too far for primary suspect',
    stance: 'CONTRADICTING',
    confidence: 'HIGH',
    timestamp: '2026-09-14T12:30:00Z'
  }
];

export const DEMO_EVIDENCE_GRAPH: any = {
  nodes: DEMO_EVIDENCE_ITEMS.map(item => ({
    id: item.id,
    label: item.id,
    type: item.type,
    stance: item.stance,
    confidence: item.confidence
  })),
  edges: [
    { source: 'SAT-OBS-001', target: 'SPILL-DET-001', type: 'SUPPORTS' },
    { source: 'SPILL-DET-001', target: 'ORIG-001', type: 'SUPPORTS' },
    { source: 'ORIG-001', target: 'AIS-001', type: 'CORRELATES' },
    { source: 'ORIG-001', target: 'DRIFT-001', type: 'CORRELATES' },
    { source: 'AIS-001', target: 'AIS-GAP-001', type: 'RELATES' },
    { source: 'AIS-001', target: 'TEMP-001', type: 'SUPPORTS' },
    { source: 'AIS-GAP-001', target: 'BEHAV-001', type: 'RELATES' },
    { source: 'ORIG-001', target: 'DRIFT-002', type: 'CONTRADICTS' },
    { source: 'ORIG-001', target: 'SPAT-002', type: 'CONTRADICTS' }
  ]
};
