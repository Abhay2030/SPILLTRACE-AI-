export type ConfidenceLevel = 'high' | 'medium' | 'low';
export type DataStatus = 'available' | 'partial' | 'error' | 'unavailable';
export type DataMode = 'DEMO' | 'REAL' | 'SIMULATED' | 'UNAVAILABLE';

export interface Coordinate {
  lat: number;
  lng: number;
}

export interface BoundingBox {
  north: number;
  south: number;
  east: number;
  west: number;
}

export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

export interface UncertainValue {
  value: number;
  unit: string;
  marginOfError?: number;
}
