export interface CameraKeyframe {
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
  duration?: number;
}

export const CHAPTER_CAMERAS: Record<number, CameraKeyframe> = {
  1: { position: [0, 0, 8], target: [0, 0, 0], fov: 45 },
  2: { position: [2, 0.5, 4], target: [2, 0, 0], fov: 50 },
  3: { position: [3, 2, 5], target: [2, 0, 0], fov: 45 },
  4: { position: [2.5, 0.3, 2.5], target: [2.5, 0, 0], fov: 55 },
  5: { position: [2.5, 0.2, 2.2], target: [2.5, 0, 0], fov: 55 },
  6: { position: [2.5, 0.1, 2.0], target: [2.5, 0, 0], fov: 58 },
  7: { position: [2.5, 0.5, 3.0], target: [2.5, 0, 0], fov: 50 },
  8: { position: [2.3, 0.3, 2.5], target: [2.3, 0, 0], fov: 52 },
  9: { position: [2.5, 0.4, 3.0], target: [2.7, 0, 0], fov: 50 },
  10: { position: [2.5, 1.0, 4.0], target: [2.5, 0, 0], fov: 48 },
  11: { position: [2.5, 0.8, 3.5], target: [2.5, 0, 0], fov: 50 },
  12: { position: [2.5, 0.3, 2.5], target: [2.5, 0, 0], fov: 52 },
  13: { position: [2.6, 0.2, 2.0], target: [2.6, 0, 0], fov: 55 },
  14: { position: [2.4, 0.2, 2.0], target: [2.4, 0, 0], fov: 55 },
  15: { position: [2.5, 0.5, 3.5], target: [2.5, 0, 0], fov: 50 },
  16: { position: [2.5, 1.0, 4.0], target: [2.5, 0, 0], fov: 48 },
  17: { position: [2.5, 0.8, 3.5], target: [2.5, 0, 0], fov: 50 },
  18: { position: [2.5, 0.5, 3.0], target: [2.5, 0, 0], fov: 52 },
  19: { position: [0, 0.5, 6], target: [0, 0, 0], fov: 50 },
  20: { position: [0, 0, 8], target: [0, 0, 0], fov: 45 },
};
