import type { ConfidenceLevel, Coordinate } from './common';

export type VesselType = 'TANKER' | 'CARGO' | 'FISHING' | 'PASSENGER' | 'TUG' | 'OTHER';

export interface VesselIdentity {
  mmsi: string;
  imo?: string;
  name: string;
  callsign?: string;
  flag: string;
  type: VesselType;
  length?: number;
  beam?: number;
  draft?: number;
}

export interface AISPosition {
  coordinate: Coordinate;
  timestamp: string;
  speed: number; // knots
  course: number; // degrees
  heading?: number;
  status: string;
}

export interface AISGap {
  start: string;
  end: string;
  lastKnown: Coordinate;
  firstAfter: Coordinate;
}

export interface AISTrack {
  vesselId: string;
  positions: AISPosition[];
  gaps: AISGap[];
}

export interface VesselCandidate {
  vessel: VesselIdentity;
  track: AISTrack;
  evidenceScore: number; // 0-100
  temporalCompatibility: number;
  spatialCompatibility: number;
  driftCompatibility: number;
  trajectoryConsistency: number;
  missingDataScore: ConfidenceLevel;
  rank: number;
  investigationStatus: 'CANDIDATE' | 'UNDER_REVIEW' | 'CLEARED' | 'INCONCLUSIVE';
}
