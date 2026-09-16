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
    // Eastward planetary cloud circulation + gentle tropical vortex swirl
    vec2 uvFlow = vUv * 7.5 + vec2(uTime * 0.003, sin(vUv.x * 3.14) * 0.02);
    float cloudDensity = fbm(uvFlow);

    // Natural cirrus and stratocumulus coverage (delicate wisps, not opaque blanket)
    float rawAlpha = smoothstep(0.50, 0.74, cloudDensity);

    // Solar illumination and terminator tinting
    vec3 lightDir = normalize(uSunDirection);
    float NdotL = dot(vNormal, lightDir);
    float dayFactor = smoothstep(-0.1, 0.25, NdotL);
    float sunset = exp(-pow((NdotL - 0.03) / 0.12, 2.0));

    // Crisp white sunlit clouds with warm golden-amber rims at the terminator
    vec3 dayCloud = vec3(0.96, 0.98, 1.0);
    vec3 sunsetCloud = vec3(1.0, 0.58, 0.32);
    vec3 cloudColor = mix(dayCloud, sunsetCloud, sunset * 0.7);

    // Night side attenuation: allows city lights to remain visible from orbit
    float finalAlpha = rawAlpha * mix(0.12, 0.35, dayFactor);

    gl_FragColor = vec4(cloudColor, finalAlpha);
  }
`;

export default function Clouds({ radius = 2.018 }: { radius?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSunDirection: { value: new THREE.Vector3(5.0, 3.0, 4.0).normalize() },
    }),
    []
  );

  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Authentic planetary zonal rotation
      meshRef.current.rotation.y += 0.00018;
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
