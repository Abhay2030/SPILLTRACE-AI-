'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { EARTH_RADIUS } from '@/lib/three/scene-config';

const oceanSurfaceVertexShader = `
  uniform float uTime;
  uniform float uCameraDistance;
  varying vec3 vNormal;
  varying vec3 vWorldNormal;
  varying vec2 vUv;
  varying vec3 vPosition;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
    vUv = uv;
    
    // Proximity factor: [1 = close to sea surface, 0 = distant orbit]
    float proximity = clamp(1.0 - (uCameraDistance - 2.2) / 4.0, 0.0, 1.0);

    // Scale 1: Planetary baseline swell
    float waveLarge = sin((position.x * 14.0 + position.z * 10.0) - uTime * 0.8) * 0.0006;
    
    // Scale 2: Regional monsoon swell (~140° current vector)
    float waveRegional = cos((position.x * 32.0 - position.y * 18.0) + uTime * 1.4) * 0.0007;

    // Scale 3: Incident micro-facets (intensifies as camera approaches ocean)
    float waveMicro = sin((position.z * 68.0 + position.y * 45.0) - uTime * 2.2) * (0.0006 * proximity);

    float totalWave = waveLarge + waveRegional + waveMicro;
    vec3 newPosition = position + normal * totalWave;
    vPosition = (modelMatrix * vec4(newPosition, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

const oceanSurfaceFragmentShader = `
  uniform float uTime;
  uniform float uOpacity;
  uniform float uCameraDistance;
  uniform vec3 uSunDirection;
  varying vec3 vNormal;
  varying vec3 vWorldNormal;
  varying vec2 vUv;
  varying vec3 vPosition;

  float specGlintMask(float f, float p) {
    return (0.4 + 0.6 * p) * f;
  }

  void main() {
    vec3 lightDir = normalize(uSunDirection);
    float NdotL = max(dot(vWorldNormal, lightDir), 0.0);

    vec3 viewDir = normalize(cameraPosition - vPosition);
    float fresnel = pow(1.0 - max(dot(vNormal, viewDir), 0.0), 3.5);
    
    float proximity = clamp(1.0 - (uCameraDistance - 2.2) / 4.0, 0.0, 1.0);

    // Micro-facet caustic glitter on sunlit wave faces
    vec3 halfVec = normalize(lightDir + viewDir);
    float glitter = pow(max(dot(vWorldNormal, halfVec), 0.0), 48.0) * specGlintMask(fresnel, proximity);

    vec3 waveGlitter = vec3(0.08, 0.48, 0.82) * (fresnel * 0.42) + vec3(1.0, 0.96, 0.88) * (glitter * 0.35);

    gl_FragColor = vec4(waveGlitter, uOpacity * (0.30 + 0.20 * proximity) * (NdotL * 0.85 + 0.15));
  }
`;

export default function Ocean({ opacity = 1 }: { opacity?: number }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uOpacity: { value: opacity },
      uCameraDistance: { value: 8.0 },
      uSunDirection: { value: new THREE.Vector3(5.0, 3.0, 4.0).normalize() },
    }),
    []
  );

  useFrame(({ clock, camera }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
      materialRef.current.uniforms.uOpacity.value = opacity;
      materialRef.current.uniforms.uCameraDistance.value = camera.position.length();
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
