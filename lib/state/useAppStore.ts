import { create } from 'zustand';

export type Sector = 'Arabian Sea' | 'Bay of Bengal' | 'Indian Ocean' | 'Mediterranean' | 'North Atlantic' | 'Custom Region';

interface AppState {
  // Global Context
  sector: Sector;
  setSector: (sector: Sector) => void;
  
  // Incident Context
  activeIncidentId: string | null;
  setActiveIncident: (id: string | null) => void;
  
  // Investigation Workflow (Steps 1 to 11)
  workflowStep: number;
  setWorkflowStep: (step: number) => void;
  
  // Selection Context
  selectedVesselId: string | null;
  setSelectedVessel: (id: string | null) => void;
  
  // Timeline (Hours from T0, typically -24 to +24)
  timelineHour: number;
  setTimelineHour: (hour: number) => void;
  
  // View Modes
  presentationMode: boolean;
  setPresentationMode: (active: boolean) => void;
  focusMode: boolean;
  setFocusMode: (active: boolean) => void;
  
  // Global Actions
  resetDemo: () => void;
}

const initialState = {
  sector: 'Arabian Sea' as Sector,
  activeIncidentId: 'ST-2026-0042',
  workflowStep: 1, // 1: Observe
  selectedVesselId: null,
  timelineHour: 0, // T0
  presentationMode: false,
  focusMode: false,
};

export const useAppStore = create<AppState>((set) => ({
  ...initialState,
  
  setSector: (sector) => set({ sector }),
  setActiveIncident: (id) => set({ activeIncidentId: id }),
  setWorkflowStep: (step) => set({ workflowStep: step }),
  setSelectedVessel: (id) => set({ selectedVesselId: id }),
  setTimelineHour: (hour) => set({ timelineHour: hour }),
  
  setPresentationMode: (active) => set({ presentationMode: active }),
  setFocusMode: (active) => set({ focusMode: active }),
  
  resetDemo: () => set({ ...initialState }),
}));
