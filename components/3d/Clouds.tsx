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
  uniform sampler2D uCloudMap;
  uniform float uTime;
  uniform vec3 uSunDirection;
  varying vec3 vNormal;
  varying vec2 vUv;
  varying vec3 vPosition;

  // Multi-octave procedural cloud noise for evolving weather systems
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
    // 1. Authentic Satellite Cloud Texture Lookup
    vec2 uvOffset = vec2(vUv.x + uTime * 0.0008, vUv.y);
    float satClouds = texture2D(uCloudMap, uvOffset).r;

    // 2. Micro-evolution turbulence flow
    vec2 flowUv = vUv * 8.0 + vec2(uTime * 0.002, sin(vUv.x * 3.14) * 0.015);
    float turbulence = fbm(flowUv) * 0.22;

    // Composite authentic satellite weather pattern with fluid evolution
    float cloudDensity = clamp(satClouds * 0.85 + turbulence, 0.0, 1.0);
    float rawAlpha = smoothstep(0.18, 0.65, cloudDensity);

    // 3. Solar illumination and terminator tinting
    vec3 lightDir = normalize(uSunDirection);
    float NdotL = dot(vNormal, lightDir);
    float dayFactor = smoothstep(-0.08, 0.22, NdotL);
    float sunset = exp(-pow((NdotL - 0.03) / 0.11, 2.0));

    // Crisp white sunlit clouds with warm golden-amber rims at the terminator
    vec3 dayCloud = vec3(0.96, 0.98, 1.0);
    vec3 sunsetCloud = vec3(1.0, 0.58, 0.30);
    vec3 cloudColor = mix(dayCloud, sunsetCloud, sunset * 0.65);

    // 4. Night side attenuation: allows city lights to remain visible from orbit
    float finalAlpha = rawAlpha * mix(0.08, 0.40, dayFactor);

    gl_FragColor = vec4(cloudColor, finalAlpha);
  }
`;

export default function Clouds({ radius = 2.016 }: { radius?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const cloudTexture = useMemo(() => {
    if (typeof window === 'undefined') return null;
    const loader = new THREE.TextureLoader();
    const tex = loader.load('/textures/earth-clouds.png');
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    return tex;
  }, []);

  const uniforms = useMemo(
    () => ({
      uCloudMap: { value: cloudTexture },
      uTime: { value: 0 },
      uSunDirection: { value: new THREE.Vector3(5.0, 3.0, 4.0).normalize() },
    }),
    [cloudTexture]
  );

  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Authentic planetary zonal circulation (distinct from surface rotation)
      meshRef.current.rotation.y += 0.00014;
    }
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
      if (materialRef.current.uniforms.uCloudMap.value !== cloudTexture) {
        materialRef.current.uniforms.uCloudMap.value = cloudTexture;
      }
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
