'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ScanBeam({ visible = false }: { visible?: boolean }) {
  const footprintRef = useRef<THREE.Mesh>(null);
  const wedgeRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!visible) return;
    const t = clock.getElapsedTime();
    // Subtle synthetic aperture radar pulse across swath
    if (footprintRef.current && footprintRef.current.material) {
      const mat = footprintRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.22 + Math.sin(t * 2.5) * 0.05;
    }
  });

  if (!visible) return null;

  return (
    <group>
      {/* 1. Ground Track Swath Footprint: 250 km C-SAR strip projected on sea surface */}
      <mesh
        ref={footprintRef}
        position={[1.36, 0.35, 1.44]}
        rotation={[-0.24, 0.78, -0.32]}
      >
        <planeGeometry args={[0.65, 0.24, 16, 8]} />
        <meshBasicMaterial
          color="#38bdf8"
          transparent={true}
          opacity={0.24}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 2. Swath Boundary Frame (Precise Radar Aperture Bounding Box) */}
      <lineSegments
        position={[1.36, 0.35, 1.44]}
        rotation={[-0.24, 0.78, -0.32]}
      >
        <edgesGeometry args={[new THREE.PlaneGeometry(0.65, 0.24)]} />
        <lineBasicMaterial color="#7dd3fc" transparent opacity={0.65} linewidth={1} />
      </lineSegments>

      {/* 3. Extremely subtle atmospheric sensor sight wedge (Alpha < 0.04) */}
      <mesh
        ref={wedgeRef}
        position={[1.45, 0.52, 1.52]}
        rotation={[-0.32, 0.75, -0.28]}
      >
        <cylinderGeometry args={[0.08, 0.35, 0.55, 4, 1, true]} />
        <meshBasicMaterial
          color="#0284c7"
          transparent={true}
          opacity={0.035}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
