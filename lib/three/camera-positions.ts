export interface CameraKeyframe {
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
  duration?: number;
}

export const CHAPTER_CAMERAS: Record<number, CameraKeyframe> = {
  1: { position: [0, 0, 7.5], target: [0, 0, 0], fov: 45 },
  2: { position: [1.2, 0.8, 5.0], target: [0.8, 0.2, 0.8], fov: 48 },
  3: { position: [1.8, 1.4, 3.8], target: [1.2, 0.3, 1.0], fov: 50 },
  4: { position: [1.9, 0.6, 2.7], target: [1.35, 0.3, 1.0], fov: 52 },
  5: { position: [1.85, 0.5, 2.5], target: [1.35, 0.3, 1.0], fov: 52 },
  6: { position: [1.8, 0.45, 2.3], target: [1.35, 0.3, 1.0], fov: 54 },
  7: { position: [2.1, 0.7, 3.2], target: [1.3, 0.35, 1.1], fov: 48 },
  8: { position: [1.9, 0.5, 2.6], target: [1.35, 0.35, 1.1], fov: 50 },
  9: { position: [2.0, 0.6, 3.0], target: [1.3, 0.3, 1.2], fov: 48 },
  10: { position: [2.3, 1.1, 3.8], target: [1.2, 0.2, 1.0], fov: 46 },
  11: { position: [2.2, 0.9, 3.4], target: [1.2, 0.2, 1.0], fov: 48 },
  12: { position: [1.9, 0.5, 2.6], target: [1.35, 0.3, 1.0], fov: 50 },
  13: { position: [1.75, 0.4, 2.2], target: [1.38, 0.32, 1.0], fov: 54 },
  14: { position: [1.8, 0.45, 2.4], target: [1.35, 0.3, 1.05], fov: 52 },
  15: { position: [2.1, 0.7, 3.2], target: [1.2, 0.25, 0.9], fov: 48 },
  16: { position: [2.4, 1.0, 3.6], target: [1.2, 0.25, 1.0], fov: 46 },
  17: { position: [2.2, 0.8, 3.2], target: [1.2, 0.25, 1.0], fov: 48 },
  18: { position: [1.8, 0.6, 3.8], target: [0.8, 0.2, 0.5], fov: 48 },
  19: { position: [0.8, 0.5, 5.5], target: [0, 0, 0], fov: 46 },
  20: { position: [0, 0, 7.5], target: [0, 0, 0], fov: 45 },
};
