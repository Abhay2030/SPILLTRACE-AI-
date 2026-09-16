'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { EARTH_RADIUS } from '@/lib/three/scene-config';
import { generateEarthTextures } from '@/lib/three/earth-texture';

const earthVertexShader = `
  varying vec3 vNormal;
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vWorldNormal;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
    vUv = uv;
    vPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const earthFragmentShader = `
  uniform sampler2D dayTexture;
  uniform sampler2D nightTexture;
  uniform sampler2D specularTexture;
  uniform sampler2D bumpTexture;
  uniform vec3 sunDirection;
  uniform float uTime;

  varying vec3 vNormal;
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vWorldNormal;

  void main() {
    // 1. Texture lookups
    vec4 dayColor = texture2D(dayTexture, vUv);
    vec4 nightColor = texture2D(nightTexture, vUv);
    float specMask = texture2D(specularTexture, vUv).r;
    float bump = texture2D(bumpTexture, vUv).r;

    // 2. Solar lighting calculation (Day/Night Terminator)
    vec3 lightDir = normalize(sunDirection);
    float NdotL = dot(vWorldNormal, lightDir);
    
    // Soft twilight transition threshold between day and night
    float dayFactor = smoothstep(-0.15, 0.25, NdotL);
    float twilight = smoothstep(-0.2, 0.0, NdotL) * (1.0 - smoothstep(0.0, 0.25, NdotL));

    // 3. Specular Ocean Glint (Sun reflection on water)
    vec3 viewDir = normalize(cameraPosition - vPosition);
    vec3 halfVector = normalize(lightDir + viewDir);
    float NdotH = max(dot(vWorldNormal, halfVector), 0.0);
    float specular = pow(NdotH, 48.0) * specMask * dayFactor * 0.85;

    // 4. Subtle Nautical Coordinate Graticule Lines (10-deg intervals)
    float latGrid = step(0.965, fract(vUv.y * 18.0));
    float lonGrid = step(0.965, fract(vUv.x * 36.0));
    float graticule = max(latGrid, lonGrid) * 0.08;
    vec3 graticuleColor = vec3(0.38, 0.74, 0.96);

    // 5. Compose Day, Night, Specular, and Twilight
    vec3 surfaceDay = dayColor.rgb + vec3(specular) + (graticuleColor * graticule);
    
    // Twilight warm atmospheric rim
    vec3 twilightColor = vec3(0.85, 0.45, 0.2) * twilight * 0.35;

    // Night side city lights
    vec3 surfaceNight = nightColor.rgb * 1.8;

    vec3 finalColor = mix(surfaceNight, surfaceDay, dayFactor) + twilightColor;

    // 6. Subtle Rayleigh Atmospheric Fresnel Rim Glow
    float fresnel = pow(1.0 - max(dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0), 3.0);
    vec3 atmosphereGlow = vec3(0.18, 0.65, 0.95) * fresnel * 0.45;

    gl_FragColor = vec4(finalColor + atmosphereGlow, 1.0);
  }
`;

export default function Earth({ rotationSpeed = 0.0004 }: { rotationSpeed?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Generate and cache procedural high-fidelity textures
  const textures = useMemo(() => {
    if (typeof window === 'undefined') return null;
    return generateEarthTextures();
  }, []);

  const uniforms = useMemo(() => {
    if (!textures) return null;
    return {
      dayTexture: { value: textures.dayMap },
      nightTexture: { value: textures.nightMap },
      specularTexture: { value: textures.specularMap },
      bumpTexture: { value: textures.bumpMap },
      sunDirection: { value: new THREE.Vector3(5.0, 3.0, 4.0).normalize() },
      uTime: { value: 0 },
    };
  }, [textures]);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed;
    }
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  const radius = typeof EARTH_RADIUS !== 'undefined' ? EARTH_RADIUS : 2;

  if (!uniforms) return null;

  return (
    <mesh ref={meshRef} rotation={[0, 0.4, 0]}>
      <sphereGeometry args={[radius, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={earthVertexShader}
        fragmentShader={earthFragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}
