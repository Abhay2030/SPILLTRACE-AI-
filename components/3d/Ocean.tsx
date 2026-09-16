'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  uniform float uTime;
  varying vec2 vUv;
  varying float vElevation;

  void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    float elevation = sin(modelPosition.x * 3.0 + uTime * 0.5) * 0.05
                    + sin(modelPosition.z * 2.0 + uTime * 0.3) * 0.08
                    + sin(modelPosition.x * 5.0 + modelPosition.z * 4.0 + uTime * 0.7) * 0.02;
    modelPosition.y += elevation;
    vElevation = elevation;
    vUv = uv;
    gl_Position = projectionMatrix * viewMatrix * modelPosition;
  }
`;

const fragmentShader = `
  uniform vec3 uOceanColor;
  uniform vec3 uDeepColor;
  uniform float uOpacity;
  varying float vElevation;
  varying vec2 vUv;

  void main() {
    float mixFactor = (vElevation + 0.1) * 5.0;
    vec3 color = mix(uDeepColor, uOceanColor, clamp(mixFactor, 0.0, 1.0));
    float foam = smoothstep(0.06, 0.09, vElevation);
    color = mix(color, vec3(0.9, 0.95, 1.0), foam * 0.3);
    gl_FragColor = vec4(color, uOpacity);
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

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
      <planeGeometry args={[20, 20, 128, 128]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uOceanColor: { value: new THREE.Color('#0369A1') },
          uDeepColor: { value: new THREE.Color('#075985') },
          uOpacity: { value: opacity }
        }}
        transparent={true}
      />
    </mesh>
  );
}
