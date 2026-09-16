'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Satellite({ visible = false, orbitProgress = 0 }: { visible?: boolean; orbitProgress?: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!visible || !groupRef.current) return;
    const t = clock.getElapsedTime() * 0.2;
    const radius = 3.5;
    
    const yOffset = THREE.MathUtils.lerp(10, 0, Math.min(1, orbitProgress * 2));
    
    groupRef.current.position.set(
      Math.cos(t) * radius,
      Math.sin(t * 0.5) * 1 + yOffset,
      Math.sin(t) * radius
    );
    groupRef.current.lookAt(0, 0, 0);
  });

  if (!visible) return null;

  return (
    <group ref={groupRef}>
      <mesh>
        <boxGeometry args={[0.15, 0.1, 0.1]} />
        <meshStandardMaterial color="#cbd5e1" />
      </mesh>
      <mesh position={[0.2, 0, 0]}>
        <planeGeometry args={[0.3, 0.08]} />
        <meshStandardMaterial color="#1e3a8a" side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[-0.2, 0, 0]}>
        <planeGeometry args={[0.3, 0.08]} />
        <meshStandardMaterial color="#1e3a8a" side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, -0.08, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.02, 0.05, 8]} />
        <meshStandardMaterial color="#94a3b8" />
      </mesh>
    </group>
  );
}
