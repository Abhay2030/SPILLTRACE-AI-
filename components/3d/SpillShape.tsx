'use client';

import { useMemo } from 'react';
import * as THREE from 'three';

export default function SpillShape({
  visible = false,
  progress = 0,
}: {
  visible?: boolean;
  progress?: number;
}) {
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 0);
    s.splineThru([
      new THREE.Vector2(0.18, 0.08),
      new THREE.Vector2(0.32, 0.28),
      new THREE.Vector2(0.24, 0.42),
      new THREE.Vector2(0.08, 0.38),
      new THREE.Vector2(-0.12, 0.22),
      new THREE.Vector2(-0.16, 0.08),
      new THREE.Vector2(-0.06, 0.02),
    ]);
    return s;
  }, []);

  if (!visible) return null;

  // Surface tangent orientation on Arabian Sea sphere sector
  return (
    <group position={[1.35, 0.32, 1.45]} rotation={[0.2, 0.75, -0.1]}>
      <mesh scale={Math.max(0.001, progress * 0.5)}>
        <shapeGeometry args={[shape]} />
        <meshBasicMaterial
          color="#090d16"
          transparent
          opacity={0.88}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Subtle iridescent hydrocarbon border sheen */}
      <mesh scale={Math.max(0.001, progress * 0.52)}>
        <shapeGeometry args={[shape]} />
        <meshBasicMaterial
          color="#06b6d4"
          wireframe
          transparent
          opacity={0.35}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
