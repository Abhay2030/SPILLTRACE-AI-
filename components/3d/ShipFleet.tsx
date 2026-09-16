'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { EARTH_RADIUS } from '@/lib/three/scene-config';

interface ShipInstance {
  baseLat: number;
  baseLon: number;
  vesselClass: 'tanker' | 'container' | 'cargo' | 'cutter' | 'trawler';
  speedKts: number;
  headingRad: number;
  lengthScale: number;
  widthScale: number;
  color: string;
  wakeLength: number;
  isSuspect: boolean;
}

export default function ShipFleet({
  visibleCount = 247,
  highlightedIndices = [],
}: {
  visibleCount?: number;
  highlightedIndices?: number[];
}) {
  const hullMeshRef = useRef<THREE.InstancedMesh>(null);
  const bridgeMeshRef = useRef<THREE.InstancedMesh>(null);
  const wakeMeshRef = useRef<THREE.InstancedMesh>(null);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const radius = (typeof EARTH_RADIUS !== 'undefined' ? EARTH_RADIUS : 2) + 0.006;

  // Generate 247 realistic vessels categorized into 5 classes
  const vessels: ShipInstance[] = useMemo(() => {
    const list: ShipInstance[] = [];

    // Arabian Sea Incident Sector Coordinates: ~14.0°N to 20.0°N, 68.0°E to 74.0°E
    for (let i = 0; i < 247; i++) {
      let lat: number;
      let lon: number;
      let vesselClass: ShipInstance['vesselClass'];
      let speedKts: number;
      let headingRad: number;
      let lengthScale: number;
      let widthScale: number;
      let color: string;
      let isSuspect = i === 0; // Index 0 is MV Horizon Trader

      if (i === 0) {
        // MV Horizon Trader (Candidate A - Crude Oil Tanker)
        lat = 15.28;
        lon = 72.05;
        vesselClass = 'tanker';
        speedKts = 11.2;
        headingRad = THREE.MathUtils.degToRad(145);
        lengthScale = 1.35;
        widthScale = 1.2;
        color = '#0F172A'; // Deep charcoal hull
      } else if (i === 1) {
        // MV Pacific Voyager (Candidate B - Container)
        lat = 15.35;
        lon = 72.18;
        vesselClass = 'container';
        speedKts = 15.2;
        headingRad = THREE.MathUtils.degToRad(220);
        lengthScale = 1.2;
        widthScale = 1.1;
        color = '#0369A1'; // Navy container hull
      } else if (i === 2) {
        // FV Sea Fortune (Candidate C - Trawler)
        lat = 15.08;
        lon = 72.45;
        vesselClass = 'trawler';
        speedKts = 4.0;
        headingRad = THREE.MathUtils.degToRad(85);
        lengthScale = 0.55;
        widthScale = 0.6;
        color = '#B45309'; // Rust / orange deck
      } else if (i < 84) {
        // High-density Arabian Sea Tanker / Commercial Transit Corridor
        // Routes passing between Fujairah / Gulf and Malacca
        const progress = (i - 3) / 81;
        lat = 13.5 + progress * 7.0 + (Math.random() - 0.5) * 1.5;
        lon = 68.5 + progress * 5.5 + (Math.random() - 0.5) * 1.2;

        const classRoll = Math.random();
        if (classRoll < 0.45) {
          vesselClass = 'tanker';
          speedKts = 12.0 + (Math.random() - 0.5) * 3.0;
          headingRad = THREE.MathUtils.degToRad(140 + (Math.random() - 0.5) * 15);
          lengthScale = 1.1 + Math.random() * 0.3;
          widthScale = 1.0 + Math.random() * 0.2;
          color = '#1E293B';
        } else if (classRoll < 0.75) {
          vesselClass = 'container';
          speedKts = 16.0 + (Math.random() - 0.5) * 4.0;
          headingRad = THREE.MathUtils.degToRad(142 + (Math.random() - 0.5) * 12);
          lengthScale = 1.0 + Math.random() * 0.25;
          widthScale = 0.95;
          color = '#0284C7';
        } else {
          vesselClass = 'cargo';
          speedKts = 11.5 + (Math.random() - 0.5) * 2.5;
          headingRad = THREE.MathUtils.degToRad(322 + (Math.random() - 0.5) * 15); // Return leg
          lengthScale = 0.9 + Math.random() * 0.2;
          widthScale = 0.85;
          color = '#475569';
        }
      } else if (i < 130) {
        // Indian Coastal Shipping (Mumbai to Goa, Mangalore, Cochin)
        lat = 10.0 + Math.random() * 9.0;
        lon = 72.8 + Math.random() * 2.2;
        const isCutter = i % 8 === 0;
        vesselClass = isCutter ? 'cutter' : 'cargo';
        speedKts = isCutter ? 24.0 : 10.5;
        headingRad = THREE.MathUtils.degToRad(Math.random() > 0.5 ? 165 : 345);
        lengthScale = isCutter ? 0.75 : 0.85;
        widthScale = isCutter ? 0.7 : 0.8;
        color = isCutter ? '#F8FAFC' : '#334155';
      } else {
        // Regional Inshore Artisanal Trawlers & Fishing craft
        lat = 14.0 + Math.random() * 2.5;
        lon = 73.5 + Math.random() * 1.5;
        vesselClass = 'trawler';
        speedKts = 3.5 + Math.random() * 3.0;
        headingRad = THREE.MathUtils.degToRad(Math.random() * 360);
        lengthScale = 0.45 + Math.random() * 0.2;
        widthScale = 0.5;
        color = '#94A3B8';
      }

      list.push({
        baseLat: lat,
        baseLon: lon,
        vesselClass,
        speedKts,
        headingRad,
        lengthScale,
        widthScale,
        color,
        wakeLength: Math.max(0.008, (speedKts / 20.0) * 0.035 * lengthScale),
        isSuspect,
      });
    }

    return list;
  }, []);

  useFrame(({ clock }) => {
    if (!hullMeshRef.current || !bridgeMeshRef.current || !wakeMeshRef.current) return;
    const time = clock.getElapsedTime();

    vessels.forEach((vessel, i) => {
      if (i >= visibleCount) {
        dummy.scale.set(0, 0, 0);
        dummy.updateMatrix();
        hullMeshRef.current!.setMatrixAt(i, dummy.matrix);
        bridgeMeshRef.current!.setMatrixAt(i, dummy.matrix);
        wakeMeshRef.current!.setMatrixAt(i, dummy.matrix);
        return;
      }

      // Convert Lat / Lon to 3D Cartesian Coordinate on Earth Sphere
      // Dynamic micro displacement along ship heading
      const distanceDrift = (time * (vessel.speedKts * 0.00008)) % 0.08;
      const effectiveLat = THREE.MathUtils.degToRad(vessel.baseLat + Math.cos(vessel.headingRad) * distanceDrift * 8.0);
      const effectiveLon = THREE.MathUtils.degToRad(vessel.baseLon + Math.sin(vessel.headingRad) * distanceDrift * 8.0);

      const x = radius * Math.cos(effectiveLat) * Math.sin(effectiveLon);
      const y = radius * Math.sin(effectiveLat);
      const z = radius * Math.cos(effectiveLat) * Math.cos(effectiveLon);

      const isHighlighted = highlightedIndices.includes(i) || vessel.isSuspect && highlightedIndices.length > 0;
      const baseScale = isHighlighted ? 2.2 : 1.0;

      // 1. POSITION HULL
      dummy.position.set(x, y, z);
      dummy.scale.set(
        0.012 * vessel.widthScale * baseScale,
        0.003 * baseScale,
        0.028 * vessel.lengthScale * baseScale
      );

      // Tangential surface orientation
      dummy.lookAt(0, 0, 0);
      dummy.rotateX(Math.PI / 2);
      dummy.rotateZ(vessel.headingRad);
      dummy.updateMatrix();
      hullMeshRef.current!.setMatrixAt(i, dummy.matrix);

      // 2. POSITION BRIDGE / DECK SUPERSTRUCTURE
      dummy.scale.set(
        0.009 * vessel.widthScale * baseScale,
        0.005 * baseScale,
        0.008 * baseScale
      );
      dummy.translateZ(-0.006 * vessel.lengthScale); // Aft bridge
      dummy.updateMatrix();
      bridgeMeshRef.current!.setMatrixAt(i, dummy.matrix);

      // 3. POSITION HYDRODYNAMIC TRAILING WAKE
      dummy.scale.set(
        0.014 * vessel.widthScale * baseScale,
        0.0005,
        vessel.wakeLength * baseScale
      );
      dummy.position.set(x, y, z);
      dummy.lookAt(0, 0, 0);
      dummy.rotateX(Math.PI / 2);
      dummy.rotateZ(vessel.headingRad);
      dummy.translateZ(vessel.wakeLength * 0.5 + 0.01); // Trailing behind vessel
      dummy.updateMatrix();
      wakeMeshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    hullMeshRef.current.instanceMatrix.needsUpdate = true;
    bridgeMeshRef.current.instanceMatrix.needsUpdate = true;
    wakeMeshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      {/* Primary Vessel Hulls (Instanced) */}
      <instancedMesh ref={hullMeshRef} args={[undefined, undefined, 247]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#0F172A" roughness={0.4} metalness={0.6} />
      </instancedMesh>

      {/* Vessel Bridge Structures (Instanced) */}
      <instancedMesh ref={bridgeMeshRef} args={[undefined, undefined, 247]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#38BDF8" roughness={0.2} metalness={0.8} />
      </instancedMesh>

      {/* Trailing Ocean Wakes with Natural Attenuation (Instanced) */}
      <instancedMesh ref={wakeMeshRef} args={[undefined, undefined, 247]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          color="#BAE6FD"
          transparent
          opacity={0.32}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </instancedMesh>
    </group>
  );
}
