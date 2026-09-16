export interface CameraKeyframe {
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
  duration?: number;
}
export const CHAPTER_CAMERAS: Record<number, CameraKeyframe> = {
  // STATE 1: ORBIT — Real Earth in deep space
  1: { position: [0, 0, 7.8], target: [0, 0, 0], fov: 42 },

  // STATE 2: GLOBAL EARTH — Approaching atmosphere, continental silhouette
  2: { position: [0.8, 0.5, 5.6], target: [0.4, 0.15, 0.4], fov: 44 },

  // STATE 3: REGIONAL OCEAN — Sentinel-1 satellite pass enters orbit
  3: { position: [1.6, 1.0, 3.8], target: [1.1, 0.25, 0.9], fov: 44 },

  // STATE 4: MARITIME CORRIDOR — Passing cloud layer, C-SAR radar swath
  4: { position: [1.82, 0.55, 2.75], target: [1.32, 0.32, 1.05], fov: 46 },

  // STATE 4B: SAR ANOMALY VALIDATION
  5: { position: [1.80, 0.48, 2.55], target: [1.34, 0.32, 1.08], fov: 47 },

  // STATE 5: INCIDENT — Oil slick surface contamination layer emerges
  6: { position: [1.76, 0.42, 2.34], target: [1.35, 0.32, 1.10], fov: 48 },

  // STATE 6: OIL SPILL REWIND (Chapter 07) — Lagrangian backward streamlines
  7: { position: [1.95, 0.62, 2.85], target: [1.32, 0.32, 1.12], fov: 46 },

  // STATE 6B: ORIGIN PROBABILITY FIELD
  8: { position: [1.82, 0.50, 2.50], target: [1.34, 0.32, 1.10], fov: 47 },

  // STATE 6C: FORWARD DRIFT & THREAT CONE
  9: { position: [1.92, 0.58, 2.80], target: [1.30, 0.30, 1.15], fov: 46 },
  10: { position: [2.15, 0.85, 3.30], target: [1.25, 0.25, 1.05], fov: 45 },

  // STATE 7: CANDIDATE AIS INSPECTION (247 -> 84 -> 18 -> 5 -> 3)
  11: { position: [2.05, 0.70, 3.10], target: [1.25, 0.25, 1.05], fov: 46 },
  12: { position: [1.85, 0.50, 2.55], target: [1.33, 0.30, 1.08], fov: 48 },
  13: { position: [1.72, 0.38, 2.22], target: [1.36, 0.31, 1.12], fov: 50 }, // Why this vessel (Horizon Trader)
  14: { position: [1.78, 0.42, 2.35], target: [1.35, 0.30, 1.10], fov: 48 }, // Exculpatory (Pacific Voyager)
  15: { position: [1.98, 0.60, 2.90], target: [1.28, 0.26, 1.00], fov: 46 }, // Evidence chain

  // STATE 8: RESPONSE OPERATIONS & INTERCEPT (Chapters 16-18)
  16: { position: [2.10, 0.75, 3.20], target: [1.25, 0.26, 1.02], fov: 46 },
  17: { position: [2.00, 0.68, 2.95], target: [1.25, 0.26, 1.02], fov: 47 },
  18: { position: [1.85, 0.55, 3.40], target: [1.00, 0.20, 0.80], fov: 46 },

  // STATE 9: SYSTEM OVERVIEW & LOOP CLOSURE — Smooth cinematic zoom out to space
  19: { position: [0.90, 0.55, 5.80], target: [0.2, 0.1, 0.2], fov: 44 },
  20: { position: [0, 0, 7.8], target: [0, 0, 0], fov: 42 },
};
