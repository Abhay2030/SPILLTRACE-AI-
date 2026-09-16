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
    // Brighten the day texture slightly for that vibrant ocean look
    dayColor.rgb = pow(dayColor.rgb, vec3(0.85)) * 1.1;

    vec4 nightColor = texture2D(nightTexture, vUv);
    float specMask = texture2D(specularTexture, vUv).r;
    float bump = texture2D(bumpTexture, vUv).r;

    // 2. Solar lighting calculation (Day/Night Terminator)
    vec3 lightDir = normalize(sunDirection);
    float NdotL = dot(vWorldNormal, lightDir);
    
    // Smooth and wide terminator transition
    float dayFactor = smoothstep(-0.15, 0.25, NdotL);
    float twilight = exp(-pow((NdotL - 0.0) / 0.15, 2.0));

    // 3. Specular Ocean Sun Glint
    vec3 viewDir = normalize(cameraPosition - vPosition);
    vec3 halfVector = normalize(lightDir + viewDir);
    float NdotH = max(dot(vWorldNormal, halfVector), 0.0);
    // Soften the glint slightly
    vec3 sunGlint = vec3(1.0, 0.95, 0.9) * pow(NdotH, 48.0) * specMask * max(0.0, NdotL) * 0.8;

    // 4. Compose Day and Night
    // Flatter diffuse for a more photographic exposure
    float diffuse = clamp(NdotL, 0.0, 1.0) * 0.65 + 0.35;
    vec3 surfaceDay = (dayColor.rgb * diffuse) + sunGlint;

    // Subtle atmospheric twilight reddening along terminator line
    vec3 twilightColor = vec3(0.85, 0.45, 0.25) * twilight * 0.25;

    // Night side terrestrial city lights
    vec3 surfaceNight = nightColor.rgb * 1.5;

    vec3 finalColor = mix(surfaceNight, surfaceDay, dayFactor) + twilightColor;

    // 5. Authentic Rayleigh Atmospheric Limb
    float viewAngle = max(dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0);
    float limbFresnel = pow(1.0 - viewAngle, 2.8);
    float sunLitLimb = clamp(NdotL + 0.2, 0.0, 1.0);
    // Brighter, more cyan/blue limb to match the image
    vec3 atmosphereLimb = vec3(0.25, 0.65, 1.0) * limbFresnel * sunLitLimb * 0.5;

    gl_FragColor = vec4(finalColor + atmosphereLimb, 1.0);
  }
`;

export default function Earth({ rotationSpeed = 0.00008 }: { rotationSpeed?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Load authentic NASA Blue Marble textures with procedural fallback
  const textures = useMemo(() => {
    if (typeof window === 'undefined') return null;

    const procedural = generateEarthTextures();
    const loader = new THREE.TextureLoader();

    // Load NASA Blue Marble photo textures
    const dayMap = loader.load('/textures/earth-blue-marble.jpg', undefined, undefined, () => {
      // Keep procedural fallback if load fails
    });
    dayMap.colorSpace = THREE.SRGBColorSpace;

    const nightMap = loader.load('/textures/earth-night.jpg');
    nightMap.colorSpace = THREE.SRGBColorSpace;

    const specularMap = loader.load('/textures/earth-water.png');
    const bumpMap = loader.load('/textures/earth-topology.png');

    return {
      dayMap: dayMap || procedural.dayMap,
      nightMap: nightMap || procedural.nightMap,
      specularMap: specularMap || procedural.specularMap,
      bumpMap: bumpMap || procedural.bumpMap,
    };
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
    <mesh ref={meshRef}>
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
