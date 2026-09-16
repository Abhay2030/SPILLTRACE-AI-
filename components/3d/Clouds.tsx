'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const cloudVertexShader = `
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

const cloudFragmentShader = `
  uniform float uTime;
  uniform vec3 uSunDirection;
  varying vec3 vNormal;
  varying vec2 vUv;
  varying vec3 vPosition;

  // Multi-octave procedural cloud noise
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

  float fbm(vec2 p) {
    float v = 0.0;
    v += 0.5000 * noise(p); p *= 2.02;
    v += 0.2500 * noise(p); p *= 2.03;
    v += 0.1250 * noise(p); p *= 2.01;
    v += 0.0625 * noise(p);
    return v;
  }

  void main() {
    vec2 uvFlow = vUv * 8.0 + vec2(uTime * 0.005, 0.0);
    float cloudDensity = fbm(uvFlow);

    // Soft cloud coverage mask (sparse wisps, not overcast)
    float cloudAlpha = smoothstep(0.48, 0.72, cloudDensity) * 0.38;

    // Atmospheric lighting: Sun illumination
    float sunIntensity = max(dot(vNormal, normalize(uSunDirection)), 0.0);
    vec3 cloudColor = mix(vec3(0.75, 0.82, 0.92), vec3(1.0, 1.0, 1.0), sunIntensity);

    gl_FragColor = vec4(cloudColor, cloudAlpha);
  }
`;

export default function Clouds({ radius = 2.025 }: { radius?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSunDirection: { value: new THREE.Vector3(5, 3, 4).normalize() },
    }),
    []
  );

  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Gentle planetary cloud drift
      meshRef.current.rotation.y += 0.00035;
    }
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[radius, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={cloudVertexShader}
        fragmentShader={cloudFragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
      />
    </mesh>
  );
}
