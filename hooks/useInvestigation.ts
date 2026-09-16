'use client'

import { useState } from 'react';
// Import types from common when available, placeholder for now
type InvestigationStage = 'detection' | 'validation' | 'analysis' | 'attribution' | 'response';

export function useInvestigation() {
  const [stage, setStage] = useState<InvestigationStage>('detection');
  const [selectedIncidentId, setSelectedIncidentId] = useState<string | null>(null);
  const [activeLayers, setActiveLayers] = useState<string[]>(['spill_layer']);
  const [selectedVesselId, setSelectedVesselId] = useState<string | null>(null);
  const [timelinePosition, setTimelinePosition] = useState<number>(0);

  const toggleLayer = (layerId: string) => {
    setActiveLayers(prev => 
      prev.includes(layerId) 
        ? prev.filter(id => id !== layerId)
        : [...prev, layerId]
    );
  };

  const reset = () => {
    setStage('detection');
    setSelectedIncidentId(null);
    setActiveLayers(['spill_layer']);
    setSelectedVesselId(null);
    setTimelinePosition(0);
  };

  return {
    stage,
    selectedIncidentId,
    activeLayers,
    selectedVesselId,
    timelinePosition,
    setStage,
    selectIncident: setSelectedIncidentId,
    toggleLayer,
    selectVessel: setSelectedVesselId,
    setTimelinePosition,
    reset,
  };
}
