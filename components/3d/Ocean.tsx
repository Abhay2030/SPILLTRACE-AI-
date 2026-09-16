'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { EARTH_RADIUS } from '@/lib/three/scene-config';

const oceanSurfaceVertexShader = `
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vWorldNormal;
  varying vec2 vUv;
  varying vec3 vPosition;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
    vUv = uv;
    
    // Directional monsoon swells along Arabian Sea current vector (~140° heading)
    float wave1 = sin((position.x * 24.0 + position.z * 18.0) - uTime * 1.2) * 0.0009;
    float wave2 = cos((position.x * 40.0 - position.y * 22.0) + uTime * 1.8) * 0.0006;
    float wave = wave1 + wave2;

    vec3 newPosition = position + normal * wave;
    vPosition = (modelMatrix * vec4(newPosition, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

const oceanSurfaceFragmentShader = `
  uniform float uTime;
  uniform float uOpacity;
  uniform vec3 uSunDirection;
  varying vec3 vNormal;
  varying vec3 vWorldNormal;
  varying vec2 vUv;
  varying vec3 vPosition;

  void main() {
    // Ocean specular sheen illuminated by directional sunlight
    vec3 lightDir = normalize(uSunDirection);
    float NdotL = max(dot(vWorldNormal, lightDir), 0.0);

    vec3 viewDir = normalize(cameraPosition - vPosition);
    float fresnel = pow(1.0 - max(dot(vNormal, viewDir), 0.0), 3.5);
    
    // Micro-facet caustic highlights
    vec3 waveGlitter = vec3(0.12, 0.52, 0.85) * (fresnel * 0.45) * (NdotL * 0.8 + 0.2);

    gl_FragColor = vec4(waveGlitter, uOpacity * 0.35 * (NdotL * 0.8 + 0.2));
  }
`;

export default function Ocean({ opacity = 1 }: { opacity?: number }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uOpacity: { value: opacity },
      uSunDirection: { value: new THREE.Vector3(5.0, 3.0, 4.0).normalize() },
    }),
    []
  );

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
      materialRef.current.uniforms.uOpacity.value = opacity;
    }
  });

  const radius = (typeof EARTH_RADIUS !== 'undefined' ? EARTH_RADIUS : 2) + 0.003;

  return (
    <mesh>
      <sphereGeometry args={[radius, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={oceanSurfaceVertexShader}
        fragmentShader={oceanSurfaceFragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}
