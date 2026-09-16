import type { DataMode, RiskLevel, UncertainValue } from './common';
import type { SatelliteObservation } from './satellite';
import type { SpillCharacterization } from './spill';
import type { DriftForecast } from './drift';
import type { VesselCandidate } from './vessel';
import type { EvidenceChain } from './evidence';

export type IncidentStatus = 'DETECTED' | 'VALIDATING' | 'CONFIRMED' | 'INVESTIGATING' | 'ATTRIBUTED' | 'RESPONDING' | 'MONITORING' | 'CLOSED';

export interface ProtectedAreaRisk {
  name: string;
  distance: UncertainValue;
  risk: RiskLevel;
}

export interface PortProximity {
  name: string;
  distance: number;
}

export interface ThreatAssessment {
  ecologicalRisk: RiskLevel;
  coastalExposure: RiskLevel;
  protectedAreas: ProtectedAreaRisk[];
  fishingImpact: RiskLevel;
  portProximity: PortProximity[];
  overallRisk: RiskLevel;
}

export interface FilterStage {
  label: string;
  count: number;
  criteria: string;
}

export interface Incident {
  id: string;
  status: IncidentStatus;
  detectedAt: string;
  updatedAt: string;
  region: string;
  satellite: SatelliteObservation;
  spill: SpillCharacterization;
  drift: DriftForecast;
  candidates: VesselCandidate[];
  evidence: EvidenceChain;
  threat: ThreatAssessment;
  totalVesselsAnalyzed: number;
  filterStages: FilterStage[];
  dataMode: DataMode;
}
