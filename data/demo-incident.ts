import type { Incident, FilterStage, ThreatAssessment } from '@/types/incident';
import type { SatelliteObservation } from '@/types/satellite';
import type { SpillCharacterization } from '@/types/spill';
import type { DriftForecast } from '@/types/drift';
import type { EvidenceChain } from '@/types/evidence';

// Demo incident: ST-2026-0042
// Region: Arabian Sea, approximately 180 km west of Goa, India
// This is SIMULATED DATA for demonstration purposes only.

export const DEMO_INCIDENT: any = {
  id: 'ST-2026-0042',
  status: 'INVESTIGATING',
  detectedAt: '2026-09-14T03:42:00Z',
  updatedAt: '2026-09-14T14:18:00Z',
  region: 'Arabian Sea',
  dataMode: 'DEMO',
  totalVesselsAnalyzed: 247,
  filterStages: [
    { label: 'Vessels in Area', count: 247, criteria: 'Within 50km of detection zone' },
    { label: 'Temporal Filter', count: 84, criteria: 'Present within 24h window' },
    { label: 'Proximity Filter', count: 18, criteria: 'Within 15km of probable origin' },
    { label: 'Trajectory Match', count: 5, criteria: 'Consistent trajectory with origin' },
    { label: 'Drift Compatible', count: 3, criteria: 'Drift model confirms compatibility' },
  ],
  satelliteObservation: {
    satelliteId: 'Sentinel-1A',
    sensor: 'SAR',
    timestamp: '2026-09-14T03:42:00Z',
    resolution: '10m',
    swath: '250km',
    polarization: 'VV+VH',
    boundingBox: {
      north: 15.3,
      south: 15.1,
      east: 72.2,
      west: 72.0
    }
  },
  spillCharacterization: {
    areaKm2: 18.4,
    areaUncertaintyKm2: 2.1,
    perimeterKm: 22.7,
    perimeterUncertaintyKm: 1.8,
    orientationDegrees: 47,
    oilProbability: 0.942,
    estimatedAgeHours: 14,
    ageUncertaintyHours: 4,
    lookAlikeAnalysis: {
      windSlick: 0.04,
      biogenic: 0.02
    }
  },
  driftForecast: {
    backtrackPoints: [
      { lat: 15.20, lng: 72.10, timestamp: '2026-09-14T03:42:00Z' },
      { lat: 15.22, lng: 72.09, timestamp: '2026-09-13T23:00:00Z' },
      { lat: 15.24, lng: 72.08, timestamp: '2026-09-13T19:00:00Z' },
      { lat: 15.25, lng: 72.07, timestamp: '2026-09-13T15:00:00Z' },
      { lat: 15.27, lng: 72.06, timestamp: '2026-09-13T11:00:00Z' },
      { lat: 15.28, lng: 72.05, timestamp: '2026-09-13T03:42:00Z' }
    ],
    forwardPoints: [
      { lat: 15.20, lng: 72.10, timestamp: '2026-09-14T03:42:00Z' },
      { lat: 15.18, lng: 72.11, timestamp: '2026-09-14T08:00:00Z' },
      { lat: 15.15, lng: 72.12, timestamp: '2026-09-14T14:00:00Z' },
      { lat: 15.11, lng: 72.13, timestamp: '2026-09-14T20:00:00Z' },
      { lat: 15.06, lng: 72.15, timestamp: '2026-09-15T03:42:00Z' }
    ],
    originZone: {
      centerLat: 15.28,
      centerLng: 72.05,
      confidence: 0.78,
      uncertaintyKm: 6.4
    },
    probabilityZones: [
      { probability: 0.9, radiusKm: 2.5 },
      { probability: 0.75, radiusKm: 5.0 },
      { probability: 0.5, radiusKm: 8.5 }
    ]
  },
  threatAssessment: {
    ecologicalRisk: 'HIGH',
    coastalExposure: 'MEDIUM',
    protectedAreas: [
      { name: 'Netrani Island Marine Sanctuary', distanceKm: 42, riskLevel: 'MEDIUM' },
      { name: 'Goa coastline', distanceKm: 180, riskLevel: 'LOW' }
    ],
    fishingImpact: 'HIGH (active fishing season)',
    portProximity: [
      { name: 'Mormugao Port', distanceKm: 185 },
      { name: 'Karwar Port', distanceKm: 95 }
    ]
  },
  evidenceChain: {
    totalItems: 10,
    overallConfidence: 0.87,
    distribution: {
      supporting: 7,
      contradicting: 1,
      neutral: 2
    }
  }
};
