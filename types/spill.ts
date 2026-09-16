import type { BoundingBox, ConfidenceLevel, Coordinate, DataMode, UncertainValue } from './common';

export interface SpillGeometry {
  polygonCoordinates: Coordinate[][];
  area: UncertainValue;
  perimeter: UncertainValue;
  orientation: number; // degrees
  centroid: Coordinate;
  boundingBox: BoundingBox;
}

export interface LookalikeResult {
  source: string; // e.g., 'WIND_SLICK', 'BIOGENIC', 'LOW_WIND'
  probability: number;
  evidence: string;
}

export interface SpillClassification {
  type: 'OIL' | 'LOOKALIKE' | 'UNCERTAIN';
  oilProbability: number; // 0-1
  lookalikeAnalysis: LookalikeResult[];
  validationScore: number;
}

export interface SpillCharacterization {
  geometry: SpillGeometry;
  classification: SpillClassification;
  estimatedAge: UncertainValue;
  detectionQuality: ConfidenceLevel;
  timestamp: string;
  dataMode: DataMode;
}
