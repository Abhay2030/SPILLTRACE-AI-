'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ScanBeam({ visible = false }: { visible?: boolean }) {
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.opacity = 0.1 + Math.sin(clock.getElapsedTime() * 5) * 0.05;
    }
  });

  if (!visible) return null;

  return (
    <mesh position={[0, -1.75, 0]}>
      <coneGeometry args={[0.5, 3.5, 16, 1, true]} />
      <meshBasicMaterial
        ref={materialRef}
        color="#38bdf8"
        transparent={true}
        opacity={0.1}
        wireframe={true}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
