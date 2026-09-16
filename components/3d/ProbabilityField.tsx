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
    // Concentric probability gradient rings
    float ring1 = smoothstep(0.48, 0.44, dist) - smoothstep(0.44, 0.38, dist);
    float ring2 = smoothstep(0.36, 0.32, dist) - smoothstep(0.32, 0.24, dist);
    float core = smoothstep(0.24, 0.0, dist);

    float alpha = (ring1 * 0.4 + ring2 * 0.7 + core * 0.9) * uIntensity;
    vec3 color = mix(vec3(0.02, 0.41, 0.63), vec3(0.02, 0.71, 0.83), core);

    gl_FragColor = vec4(color, alpha * 0.85);
  }
`;

export default function ProbabilityField({
  visible = false,
  intensity = 0.8,
}: {
  visible?: boolean;
  intensity?: number;
}) {
  if (!visible) return null;

  return (
    <mesh position={[1.34, 0.33, 1.46]} rotation={[0.2, 0.75, -0.1]} scale={0.45}>
      <circleGeometry args={[1, 48]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{ uIntensity: { value: intensity } }}
        transparent={true}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
