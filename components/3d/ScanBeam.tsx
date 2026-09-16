'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ScanBeam({
  visible = false,
  scanProgress = 0.5,
  state = 'SCANNING',
}: {
  visible?: boolean;
  scanProgress?: number;
  state?: 'PENDING' | 'SCANNING' | 'COMPLETE';
}) {
  const footprintRef = useRef<THREE.Mesh>(null);
  const sweepLineRef = useRef<THREE.Mesh>(null);
  const wedgeRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!visible) return;
    const t = clock.getElapsedTime();

    // 1. Subtle synthetic aperture radar pulse across swath
    if (footprintRef.current && footprintRef.current.material) {
      const mat = footprintRef.current.material as THREE.MeshBasicMaterial;
      const baseAlpha = state === 'COMPLETE' ? 0.28 : state === 'PENDING' ? 0.12 : 0.22;
      mat.opacity = baseAlpha + Math.sin(t * 2.5) * 0.04;
    }

    // 2. Traveling radar pulse line across the ground swath (C-SAR azimuth sweep)
    if (sweepLineRef.current) {
      const sweepPos = ((t * 0.4) % 1.0) - 0.5;
      sweepLineRef.current.position.x = sweepPos * 0.6;
    }
  });

  if (!visible) return null;

  return (
    <group>
      {/* 1. Ground Track Swath Footprint: 250 km C-SAR strip projected on sea surface */}
      <group position={[1.36, 0.35, 1.44]} rotation={[-0.24, 0.78, -0.32]}>
        <mesh ref={footprintRef}>
          <planeGeometry args={[0.65, 0.24, 16, 8]} />
          <meshBasicMaterial
            color={state === 'COMPLETE' ? '#0ea5e9' : '#38bdf8'}
            transparent={true}
            opacity={0.24}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Traveling SAR Azimuth Acquisition Line */}
        {state === 'SCANNING' && (
          <mesh ref={sweepLineRef} position={[0, 0, 0.002]}>
            <planeGeometry args={[0.015, 0.23]} />
            <meshBasicMaterial
              color="#e0f2fe"
              transparent={true}
              opacity={0.75}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        )}

        {/* Swath Boundary Frame (Precise Radar Aperture Bounding Box) */}
        <lineSegments>
          <edgesGeometry args={[new THREE.PlaneGeometry(0.65, 0.24)]} />
          <lineBasicMaterial
            color={state === 'COMPLETE' ? '#38bdf8' : '#7dd3fc'}
            transparent
            opacity={state === 'COMPLETE' ? 0.8 : 0.5}
            linewidth={1}
          />
        </lineSegments>
      </group>

      {/* 2. Extremely subtle atmospheric sensor sightline wedge (Alpha < 0.04) */}
      <mesh
        ref={wedgeRef}
        position={[1.45, 0.52, 1.52]}
        rotation={[-0.32, 0.75, -0.28]}
      >
        <cylinderGeometry args={[0.06, 0.32, 0.52, 4, 1, true]} />
        <meshBasicMaterial
          color="#0284c7"
          transparent={true}
          opacity={state === 'SCANNING' ? 0.032 : 0.015}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
