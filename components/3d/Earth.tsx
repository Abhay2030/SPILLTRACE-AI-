'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { EARTH_RADIUS } from '@/lib/three/scene-config';

const vertexShader = `
  varying vec3 vNormal;
  varying vec2 vUv;
  varying vec3 vPosition;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform vec3 oceanColor;
  uniform vec3 deepOceanColor;
  uniform vec3 landColor;
  uniform vec3 coastalColor;
  varying vec3 vNormal;
  varying vec2 vUv;
  varying vec3 vPosition;

  // Simple procedural noise for continental landforms
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), f.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
      f.y
    );
  }

  void main() {
    // Continental distribution with multi-octave noise
    float n = noise(vUv * 6.0) * 0.6 + noise(vUv * 14.0) * 0.3 + noise(vUv * 28.0) * 0.1;
    float landMask = smoothstep(0.52, 0.56, n);
    float coastalZone = smoothstep(0.48, 0.53, n) - landMask;

    // Ocean depth gradient based on latitude and depth
    float latGradient = abs(vNormal.y);
    vec3 waterColor = mix(deepOceanColor, oceanColor, 0.4 + 0.6 * (1.0 - latGradient));
    waterColor = mix(waterColor, coastalColor, coastalZone * 0.6);

    vec3 baseColor = mix(waterColor, landColor, landMask * 0.75);

    // Subtle nautical grid lines (latitude and longitude parallels)
    float latLines = step(0.97, fract(vUv.y * 18.0));
    float lonLines = step(0.97, fract(vUv.x * 36.0));
    float grid = max(latLines, lonLines) * 0.12;
    baseColor = mix(baseColor, vec3(0.56, 0.76, 0.94), grid);

    // Atmospheric Fresnel rim glow
    float fresnel = pow(1.0 - max(dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0), 2.2);
    vec3 finalColor = mix(baseColor, vec3(0.22, 0.74, 0.96), fresnel * 0.4);

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export default function Earth({ rotationSpeed = 0.0008 }: { rotationSpeed?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed;
    }
  });

  const radius = typeof EARTH_RADIUS !== 'undefined' ? EARTH_RADIUS : 2;

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[radius, 64, 64]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          oceanColor: { value: new THREE.Color('#0369A1') },
          deepOceanColor: { value: new THREE.Color('#075985') },
          coastalColor: { value: new THREE.Color('#0284c7') },
          landColor: { value: new THREE.Color('#94a3b8') },
        }}
      />
    </mesh>
  );
}
