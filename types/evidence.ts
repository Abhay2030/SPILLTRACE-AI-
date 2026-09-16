import type { ConfidenceLevel, Coordinate } from './common';

export type EvidenceType = 'SATELLITE_OBS' | 'SPILL_DETECTION' | 'ORIGIN_ANALYSIS' | 'AIS_TRACK' | 'DRIFT_MATCH' | 'TEMPORAL_MATCH' | 'SPATIAL_MATCH' | 'BEHAVIORAL';
export type EvidenceStatus = 'SUPPORTING' | 'CONTRADICTING' | 'NEUTRAL' | 'INSUFFICIENT';

export interface EvidenceItem {
  id: string;
  type: EvidenceType;
  source: string;
  timestamp: string;
  location?: Coordinate;
  description: string;
  confidence: ConfidenceLevel;
  status: EvidenceStatus;
  details: Record<string, unknown>;
  relationship: string;
}

export interface EvidenceChain {
  items: EvidenceItem[];
  overallConfidence: number;
  supportingCount: number;
  contradictingCount: number;
}

export interface EvidenceGraphNode {
  id: string;
  type: string;
  label: string;
  x?: number;
  y?: number;
  data?: Record<string, unknown>;
}

export interface EvidenceGraphEdge {
  source: string;
  target: string;
  label?: string;
  weight?: number;
  type: EvidenceStatus;
}

export interface EvidenceGraph {
  nodes: EvidenceGraphNode[];
  edges: EvidenceGraphEdge[];
}
