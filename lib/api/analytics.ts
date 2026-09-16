import type { DetectionStats, ConfidenceDistribution, SystemPerformance } from './types';

export interface AnalyticsAPI {
  getDetectionStats(): Promise<DetectionStats[]>;
  getConfidenceDistribution(): Promise<ConfidenceDistribution[]>;
  getSystemPerformance(): Promise<SystemPerformance[]>;
}

export const analyticsAPI: AnalyticsAPI = {
  async getDetectionStats() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [
      { date: '2026-09-10', value: 12 },
      { date: '2026-09-11', value: 15 },
      { date: '2026-09-12', value: 9 },
      { date: '2026-09-13', value: 22 },
      { date: '2026-09-14', value: 18 },
    ];
  },
  
  async getConfidenceDistribution() {
    await new Promise(resolve => setTimeout(resolve, 400));
    return [
      { label: '< 50%', value: 5 },
      { label: '50-80%', value: 15 },
      { label: '80-95%', value: 45 },
      { label: '> 95%', value: 35 },
    ];
  },
  
  async getSystemPerformance() {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [
      { metric: 'Avg Detection Time (min)', value: 42 },
      { metric: 'False Positive Rate (%)', value: 2.4 },
      { metric: 'Coverage Area (M km²)', value: 14.5 },
    ];
  }
};
