'use client';
import { useMemo } from 'react';
import * as THREE from 'three';

export default function SpillShape({ visible = false, progress = 0 }: { visible?: boolean; progress?: number }) {
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 0);
    s.splineThru([
      new THREE.Vector2(0.5, 0.2),
      new THREE.Vector2(0.8, 0.8),
      new THREE.Vector2(0.2, 1.0),
      new THREE.Vector2(-0.4, 0.5),
      new THREE.Vector2(-0.2, 0.1)
    ]);
    return s;
  }, []);

  if (!visible) return null;

  return (
    <mesh position={[0, 0, 2.02]} scale={Math.max(0.001, progress * 0.5)}>
      <shapeGeometry args={[shape]} />
      <meshBasicMaterial color="#0f172a" transparent opacity={0.85} side={THREE.DoubleSide} />
    </mesh>
  );
}
