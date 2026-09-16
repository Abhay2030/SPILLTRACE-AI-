'use client';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uIntensity;
  varying vec2 vUv;
  void main() {
    float dist = distance(vUv, vec2(0.5));
    float alpha = smoothstep(0.5, 0.0, dist) * uIntensity;
    gl_FragColor = vec4(0.02, 0.41, 0.63, alpha * 0.8);
  }
`;

export default function ProbabilityField({ visible = false, intensity = 1 }: { visible?: boolean; intensity?: number }) {
  if (!visible) return null;

  return (
    <mesh position={[0, 0, 2.015]} scale={1.5}>
      <circleGeometry args={[1, 32]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{ uIntensity: { value: intensity } }}
        transparent={true}
        depthWrite={false}
      />
    </mesh>
  );
}
