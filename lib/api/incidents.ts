// @ts-ignore
import type { Incident } from '@/types/incident';
import type { TimelineEvent } from './types';

// Mock data since we can't import properly yet
const DEMO_INCIDENT: any = { id: 'inc-demo-1', title: 'Demo Spill Incident' };

export interface IncidentAPI {
  getIncident(id: string): Promise<any>;
  listIncidents(filters?: { status?: string; region?: string; limit?: number }): Promise<any[]>;
  getIncidentTimeline(id: string): Promise<TimelineEvent[]>;
}

export const incidentAPI: IncidentAPI = {
  async getIncident(id: string) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return DEMO_INCIDENT;
  },
  
  async listIncidents(filters) {
    await new Promise(resolve => setTimeout(resolve, 600));
    return [DEMO_INCIDENT];
  },
  
  async getIncidentTimeline(id: string) {
    await new Promise(resolve => setTimeout(resolve, 400));
    return [
      {
        timestamp: '2026-09-14T03:42:00Z',
        label: 'Anomaly Detected',
        description: 'Sentinel-1 SAR identified surface slick anomaly.',
        type: 'detection',
        status: 'completed',
      },
      {
        timestamp: '2026-09-14T04:15:00Z',
        label: 'AI Validation',
        description: 'SpillTrace AI confirmed >90% probability of marine oil spill.',
        type: 'validation',
        status: 'completed',
      }
    ];
  }
};
