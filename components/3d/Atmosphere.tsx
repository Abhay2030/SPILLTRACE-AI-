'use client';

import * as THREE from 'three';
import { ATMOSPHERE_RADIUS } from '@/lib/three/scene-config';

const vertexShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;

  void main() {
    // Physical Rayleigh scattering rim calculation
    float viewAngle = max(dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0);
    float rim = pow(1.0 - viewAngle, 3.5);

    // Deep cyan to marine blue atmospheric spectrum
    vec3 atmosphereColor = mix(vec3(0.08, 0.45, 0.85), vec3(0.35, 0.78, 0.98), rim);

    gl_FragColor = vec4(atmosphereColor, rim * 0.55);
  }
`;

export default function Atmosphere() {
  const radius = typeof ATMOSPHERE_RADIUS !== 'undefined' ? ATMOSPHERE_RADIUS : 2.12;

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
