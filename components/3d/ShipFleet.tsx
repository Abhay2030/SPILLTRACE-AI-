'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ShipFleet({
  visibleCount = 247,
  highlightedIndices = [],
}: {
  visibleCount?: number;
  highlightedIndices?: number[];
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Precompute realistic shipping distribution:
  // 180 vessels along global ocean lanes + 67 concentrated in Arabian Sea corridor
  const shipData = useMemo(() => {
    const data = [];
    const radius = 2.012;

    for (let i = 0; i < 247; i++) {
      let pos: THREE.Vector3;

      if (i < 67) {
        // Arabian Sea / Indian Ocean shipping route cluster
        const lat = 0.15 + (Math.random() - 0.5) * 0.4;
        const lng = 0.95 + (Math.random() - 0.5) * 0.5;
        pos = new THREE.Vector3(
          radius * Math.cos(lat) * Math.sin(lng),
          radius * Math.sin(lat),
          radius * Math.cos(lat) * Math.cos(lng)
        );
      } else {
        // Global maritime traffic distribution
        const phi = Math.acos(-1 + (2 * (i - 67)) / 180);
        const theta = Math.sqrt(180 * Math.PI) * phi;
        pos = new THREE.Vector3(
          radius * Math.cos(theta) * Math.sin(phi),
          radius * Math.sin(theta) * Math.sin(phi),
          radius * Math.cos(phi)
        );
      }

      // Slightly varied ship hull dimensions
      const scale = 0.8 + Math.random() * 0.5;
      data.push({
        basePosition: pos,
        driftPhase: Math.random() * Math.PI * 2,
        driftSpeed: 0.002 + Math.random() * 0.003,
        scale,
      });
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
        const currentScale = highlightedIndices.includes(i) ? 1.8 : ship.scale;
        dummy.scale.set(currentScale, currentScale, currentScale);

        // Gentle organic maritime drift along trajectory
        const drift = Math.sin(time * ship.driftSpeed + ship.driftPhase) * 0.004;
        dummy.position.set(
          ship.basePosition.x + drift,
          ship.basePosition.y + drift * 0.5,
          ship.basePosition.z
        );

        // Align hull tangential to spherical surface
        dummy.lookAt(0, 0, 0);
        dummy.rotateX(Math.PI / 2);
      }

      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);

      // Color scheme: Highlighted candidates = Cyan/Ocean, standard = slate
      const color = highlightedIndices.includes(i)
        ? new THREE.Color('#06b6d4')
        : new THREE.Color('#64748b');

      meshRef.current!.setColorAt(i, color);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, 247]}>
      <boxGeometry args={[0.04, 0.015, 0.012]} />
      <meshStandardMaterial metalness={0.5} roughness={0.5} />
    </instancedMesh>
  );
}
