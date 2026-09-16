'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
// @ts-ignore
import { EARTH_RADIUS } from '@/lib/three/scene-config';

const vertexShader = `
  varying vec3 vNormal;
  varying vec2 vUv;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform vec3 oceanColor;
  uniform vec3 deepOceanColor;
  uniform vec3 landColor;
  varying vec3 vNormal;
  varying vec2 vUv;

  void main() {
    float landMask = step(0.6, sin(vUv.x * 12.0) * cos(vUv.y * 8.0) * sin(vUv.x * 5.0 + vUv.y * 3.0));
    vec3 color = mix(mix(deepOceanColor, oceanColor, vNormal.y * 0.5 + 0.5), landColor, landMask * 0.3);
    float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
    color = mix(color, vec3(0.22, 0.74, 0.96), fresnel * 0.3);
    gl_FragColor = vec4(color, 1.0);
  }
`;

export default function Earth({ rotationSpeed = 0.001 }: { rotationSpeed?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed;
    }
  });

  // fallback to 2 if EARTH_RADIUS is undefined
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
          landColor: { value: new THREE.Color('#94A3B8') }
        }}
      />
    </mesh>
  );
}
