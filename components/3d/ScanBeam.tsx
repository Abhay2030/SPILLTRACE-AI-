'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ScanBeam({ visible = false }: { visible?: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame(({ clock }) => {
    if (!visible || !meshRef.current) return;
    const t = clock.getElapsedTime();
    // Subtle pulse along the swath
    if (materialRef.current) {
      materialRef.current.opacity = 0.15 + Math.sin(t * 3) * 0.05;
    }
  });

  if (!visible) return null;

  return (
    <group position={[1.8, 0.4, 1.2]} rotation={[0.4, -0.6, 0.2]}>
      {/* Radar footprint pyramid / swath fan */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <coneGeometry args={[0.45, 1.6, 4, 1, true]} />
        <meshBasicMaterial
          ref={materialRef}
          color="#06b6d4"
          transparent={true}
          opacity={0.15}
          wireframe={true}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Surface incident footprint box */}
      <mesh position={[0, -0.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.7, 0.45]} />
        <meshBasicMaterial
          color="#38bdf8"
          transparent={true}
          opacity={0.25}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
