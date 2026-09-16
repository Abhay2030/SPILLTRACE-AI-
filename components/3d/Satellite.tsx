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
    const t = clock.getElapsedTime() * 0.18;
    const orbitRadius = 3.4;
    const inclination = 0.95; // ~54 degrees orbital inclination

    // Realistic elliptical polar orbit coordinate
    const x = Math.cos(t) * orbitRadius;
    const y = Math.sin(t) * orbitRadius * Math.sin(inclination);
    const z = Math.sin(t) * orbitRadius * Math.cos(inclination);

    groupRef.current.position.set(x, y, z);
    // Point synthetic aperture radar antenna towards earth center
    groupRef.current.lookAt(0, 0, 0);
  });

  if (!visible) return null;

  return (
    <group ref={groupRef}>
      {/* Satellite Bus Chassis */}
      <mesh>
        <boxGeometry args={[0.2, 0.12, 0.12]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Gold Foil Thermal Insulation Blanket */}
      <mesh position={[0, 0.065, 0]}>
        <boxGeometry args={[0.18, 0.01, 0.1]} />
        <meshStandardMaterial color="#d97706" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Starboard Solar Array */}
      <mesh position={[0.28, 0, 0]}>
        <boxGeometry args={[0.32, 0.1, 0.01]} />
        <meshStandardMaterial color="#0f172a" roughness={0.1} />
      </mesh>

      {/* Port Solar Array */}
      <mesh position={[-0.28, 0, 0]}>
        <boxGeometry args={[0.32, 0.1, 0.01]} />
        <meshStandardMaterial color="#0f172a" roughness={0.1} />
      </mesh>

      {/* C-band SAR Radar Antenna Panel (pointing Nadir) */}
      <mesh position={[0, -0.07, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.22, 0.08]} />
        <meshStandardMaterial color="#38bdf8" emissive="#0369a1" emissiveIntensity={0.3} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}
