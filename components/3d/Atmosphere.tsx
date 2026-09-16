'use client';

import { useMemo } from 'react';
import * as THREE from 'three';
import { ATMOSPHERE_RADIUS } from '@/lib/three/scene-config';

const vertexShader = `
  varying vec3 vNormal;
  varying vec3 vWorldNormal;
  varying vec3 vPosition;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
    vPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform vec3 uSunDirection;
  varying vec3 vNormal;
  varying vec3 vWorldNormal;
  varying vec3 vPosition;

  void main() {
    // Physical Rayleigh scattering rim calculation
    vec3 viewDir = normalize(cameraPosition - vPosition);
    float rim = pow(1.0 - max(dot(vNormal, viewDir), 0.0), 3.8);

    // Sunlit side modulation: atmosphere is illuminated by the sun
    vec3 lightDir = normalize(uSunDirection);
    float NdotL = dot(vWorldNormal, lightDir);
    float sunLit = smoothstep(-0.2, 0.35, NdotL);

    // Deep marine blue to soft azure atmospheric spectrum
    vec3 atmosphereColor = mix(vec3(0.04, 0.38, 0.82), vec3(0.32, 0.72, 0.98), rim);

    gl_FragColor = vec4(atmosphereColor, rim * sunLit * 0.42);
  }
`;

export default function Atmosphere() {
  const radius = typeof ATMOSPHERE_RADIUS !== 'undefined' ? ATMOSPHERE_RADIUS : 2.036;

  const uniforms = useMemo(
    () => ({
      uSunDirection: { value: new THREE.Vector3(5.0, 3.0, 4.0).normalize() },
    }),
    []
  );

  return (
    <mesh>
      <sphereGeometry args={[radius, 64, 64]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        blending={THREE.AdditiveBlending}
        side={THREE.BackSide}
        transparent={true}
        depthWrite={false}
      />
    </mesh>
  );
}
