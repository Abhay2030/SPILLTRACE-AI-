import type { Coordinate, DataMode, RiskLevel } from './common';

export type ResponseAssetType = 'VESSEL' | 'BOOM' | 'SKIMMER' | 'DRONE' | 'MONITORING_UNIT' | 'HELICOPTER';

export interface ResponseAsset {
  id: string;
  type: ResponseAssetType;
  name: string;
  position: Coordinate;
  status: 'AVAILABLE' | 'DEPLOYED' | 'EN_ROUTE' | 'STANDBY';
  eta?: string;
}

export interface ProtectedZone {
  name: string;
  coordinates: Coordinate[];
}

export interface ResponseScenario {
  id: string;
  name: string;
  description: string;
  assets: ResponseAsset[];
  predictedPath: Coordinate[][];
  protectedZones: ProtectedZone[];
  estimatedContainment: number;
  risk: RiskLevel;
}

export interface ResponsePlan {
  scenarios: ResponseScenario[];
  activeScenario?: string;
  timestamp: string;
  dataMode: DataMode;
}
