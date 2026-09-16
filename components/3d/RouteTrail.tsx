'use client';
import { Line } from '@react-three/drei';
import * as THREE from 'three';

export default function RouteTrail({ visible = false, points = [] }: { visible?: boolean; points?: THREE.Vector3[] }) {
  if (!visible || points.length < 2) return null;

  return (
    <Line
      points={points}
      color="#06B6D4"
      lineWidth={2}
      dashed={true}
      dashScale={20}
      dashSize={1}
      dashOffset={0}
      transparent
      opacity={0.8}
    />
  );
}
