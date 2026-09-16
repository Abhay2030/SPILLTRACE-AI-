'use client';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ShipFleet({ visibleCount = 247, highlightedIndices = [] }: { visibleCount?: number; highlightedIndices?: number[] }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const shipData = useMemo(() => {
    const data = [];
    for (let i = 0; i < 247; i++) {
      const phi = Math.acos(-1 + (2 * i) / 247);
      const theta = Math.sqrt(247 * Math.PI) * phi;
      const radius = 2.01;
      
      const position = new THREE.Vector3(
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(phi)
      );
      
      data.push({ position, rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as const });
    }
    return data;
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const time = clock.getElapsedTime();
    
    shipData.forEach((ship, i) => {
      if (i >= visibleCount) {
        dummy.scale.set(0, 0, 0);
      } else {
        dummy.scale.set(1, 1, 1);
        dummy.position.copy(ship.position);
        
        dummy.position.x += Math.sin(time * 0.5 + i) * 0.005;
        dummy.position.y += Math.cos(time * 0.3 + i) * 0.005;
        
        dummy.lookAt(0, 0, 0);
        dummy.rotateX(Math.PI / 2);
      }
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
      
      const color = highlightedIndices.includes(i) ? new THREE.Color('#0369A1') : new THREE.Color('#94A3B8');
      meshRef.current!.setColorAt(i, color);
    });
    
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, 247]}>
      <boxGeometry args={[0.06, 0.02, 0.015]} />
      <meshStandardMaterial />
    </instancedMesh>
  );
}
