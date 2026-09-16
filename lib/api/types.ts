export interface TimelineEvent {
  timestamp: string;
  label: string;
  description: string;
  type: 'detection' | 'validation' | 'analysis' | 'attribution' | 'response';
  status: 'completed' | 'active' | 'pending';
}

export interface DetectionStats {
  date: string;
  value: number;
}

export interface ConfidenceDistribution {
  label: string;
  value: number;
}

export interface SystemPerformance {
  metric: string;
  value: number;
}
