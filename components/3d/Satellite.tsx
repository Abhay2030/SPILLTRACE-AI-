'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Satellite({
  visible = false,
  orbitProgress = 0,
}: {
  visible?: boolean;
  orbitProgress?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!visible || !groupRef.current) return;
    const t = clock.getElapsedTime() * 0.12;
    // LEO Sun-Synchronous Orbit (~693 km altitude above R=2.0 Earth sphere)
    const orbitRadius = 2.32;
    const inclination = 1.71; // 98.18° sun-synchronous polar orbit inclination

    // Orbital Cartesian coordinates
    const x = Math.cos(t) * orbitRadius;
    const y = Math.sin(t) * orbitRadius * Math.sin(inclination);
    const z = Math.sin(t) * orbitRadius * Math.cos(inclination);

    groupRef.current.position.set(x, y, z);
    // Orient spacecraft Nadir towards planetary center
    groupRef.current.lookAt(0, 0, 0);
  });

  if (!visible) return null;

  return (
    <group ref={groupRef}>
      {/* 1. Sentinel-1 Main Equipment Bus (Primary Service Module) */}
      <mesh>
        <boxGeometry args={[0.14, 0.08, 0.08]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.65} roughness={0.35} />
      </mesh>

      {/* 2. Gold Kapton / Multi-Layer Insulation (MLI) Payload Blanket */}
      <mesh position={[0, 0.042, 0]}>
        <boxGeometry args={[0.13, 0.008, 0.075]} />
        <meshStandardMaterial color="#d97706" metalness={0.88} roughness={0.15} />
      </mesh>

      {/* 3. Starboard Photovoltaic Solar Array Wing (Deployable Panels) */}
      <group position={[0.22, 0, 0]}>
        <mesh>
          <boxGeometry args={[0.26, 0.07, 0.006]} />
          <meshStandardMaterial color="#091428" roughness={0.12} metalness={0.85} />
        </mesh>
        {/* Photovoltaic Grid Dividers */}
        <mesh position={[0, 0, 0.004]}>
          <planeGeometry args={[0.25, 0.065]} />
          <meshBasicMaterial color="#1e3a8a" wireframe={true} />
        </mesh>
      </group>

      {/* 4. Port Photovoltaic Solar Array Wing */}
      <group position={[-0.22, 0, 0]}>
        <mesh>
          <boxGeometry args={[0.26, 0.07, 0.006]} />
          <meshStandardMaterial color="#091428" roughness={0.12} metalness={0.85} />
        </mesh>
        {/* Photovoltaic Grid Dividers */}
        <mesh position={[0, 0, 0.004]}>
          <planeGeometry args={[0.25, 0.065]} />
          <meshBasicMaterial color="#1e3a8a" wireframe={true} />
        </mesh>
      </group>

      {/* 5. Planar C-band SAR Radar Antenna (12.3m Aperture facing off-nadir) */}
      <group position={[0, -0.045, 0.015]} rotation={[0.48, 0, 0]}>
        <mesh>
          <boxGeometry args={[0.28, 0.035, 0.008]} />
          <meshStandardMaterial color="#0284c7" emissive="#0369a1" emissiveIntensity={0.25} metalness={0.7} />
        </mesh>
      </group>
    </group>
  );
}
