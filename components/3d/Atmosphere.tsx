'use client';
import * as THREE from 'three';
// @ts-ignore
import { ATMOSPHERE_RADIUS } from '@/lib/three/scene-config';

const vertexShader = `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  varying vec3 vNormal;
  void main() {
    float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
    vec3 atmosphereColor = vec3(0.22, 0.74, 0.96);
    gl_FragColor = vec4(atmosphereColor, intensity * 0.6);
  }
`;

export default function Atmosphere() {
  const radius = typeof ATMOSPHERE_RADIUS !== 'undefined' ? ATMOSPHERE_RADIUS : 2.15;

  return (
    <mesh>
      <sphereGeometry args={[radius, 64, 64]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        blending={THREE.AdditiveBlending}
        side={THREE.BackSide}
        transparent={true}
        depthWrite={false}
      />
    </mesh>
  );
}
