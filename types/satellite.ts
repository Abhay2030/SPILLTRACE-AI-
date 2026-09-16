import type { BoundingBox, Coordinate, DataMode } from './common';

export type SatelliteId = 'SENTINEL-1A' | 'SENTINEL-1B' | 'SENTINEL-2A' | 'SENTINEL-2B' | 'RADARSAT-2';
export type SensorType = 'SAR' | 'OPTICAL' | 'MULTISPECTRAL';

export interface SatelliteObservation {
  id: string;
  satellite: SatelliteId;
  sensor: SensorType;
  timestamp: string;
  resolution: number; // meters
  swathWidth: number; // km
  incidenceAngle: number; // degrees
  polarization: string;
  boundingBox: BoundingBox;
  thumbnailUrl?: string;
  dataMode: DataMode;
}

export interface ScanFootprint {
  center: Coordinate;
  width: number;
  height: number;
  angle: number;
}
