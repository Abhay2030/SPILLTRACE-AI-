import type { Coordinate, DataMode, UncertainValue } from './common';

export interface DriftPoint {
  position: Coordinate;
  timestamp: string;
  uncertainty: number; // km
}

export interface DriftPath {
  points: DriftPoint[];
  direction: 'BACKWARD' | 'FORWARD';
}

export interface ProbabilityZone {
  center: Coordinate;
  radius: number;
  probability: number;
}

export interface OriginProbability {
  zones: ProbabilityZone[];
  mostProbable: Coordinate;
  confidence: number;
  uncertainty: UncertainValue;
}

export interface DriftForecast {
  backtrack: DriftPath;
  forward: DriftPath;
  origin: OriginProbability;
  oceanModel: string;
  windModel: string;
  timestamp: string;
  dataMode: DataMode;
}

export interface DriftTimeStep {
  time: string;
  label: string;
  spillPolygon: Coordinate[][];
  uncertaintyRadius: number;
}
