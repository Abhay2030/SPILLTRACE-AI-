'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { EARTH_RADIUS } from '@/lib/three/scene-config';

const oceanSurfaceVertexShader = `
  uniform float uTime;
  varying vec3 vNormal;
  varying vec2 vUv;
  varying vec3 vPosition;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vUv = uv;
    
    // Micro-wave elevation on spherical surface
    float wave = sin(position.x * 30.0 + uTime * 1.5) * 0.0012
               + cos(position.z * 25.0 + uTime * 1.2) * 0.0015
               + sin(position.y * 35.0 + uTime * 2.0) * 0.0008;

    vec3 newPosition = position + normal * wave;
    vPosition = newPosition;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

const oceanSurfaceFragmentShader = `
  uniform float uTime;
  uniform float uOpacity;
  varying vec3 vNormal;
  varying vec2 vUv;
  varying vec3 vPosition;

  void main() {
    // Specular Fresnel shimmer on micro waves
    float fresnel = pow(1.0 - max(dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0), 3.0);
    vec3 waveShimmer = vec3(0.12, 0.58, 0.88) * (fresnel * 0.6);

    gl_FragColor = vec4(waveShimmer, uOpacity * 0.45);
  }
`;

export default function Ocean({ opacity = 1 }: { opacity?: number }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
      materialRef.current.uniforms.uOpacity.value = opacity;
    }
  });

  const radius = (typeof EARTH_RADIUS !== 'undefined' ? EARTH_RADIUS : 2) + 0.004;

  return (
    <mesh>
      <sphereGeometry args={[radius, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={oceanSurfaceVertexShader}
        fragmentShader={oceanSurfaceFragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uOpacity: { value: opacity }
        }}
        transparent={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}
