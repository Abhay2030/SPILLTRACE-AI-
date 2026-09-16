'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const spillVertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vWorldPos;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const spillFragmentShader = `
  uniform float uProgress;
  uniform float uTime;
  uniform float uRewind;
  uniform vec3 uSunDirection;

  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vWorldPos;

  // Multi-frequency procedural noise
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    v += 0.500 * noise(p); p *= 2.02;
    v += 0.250 * noise(p); p *= 2.03;
    v += 0.125 * noise(p); p *= 2.01;
    v += 0.0625 * noise(p);
    return v;
  }

  void main() {
    if (uProgress <= 0.01) {
      discard;
    }

    // Centered coordinates on the spherical patch [-1, 1]
    vec2 centered = (vUv - 0.5) * 2.0;

    // Arabian Sea monsoon drift shear: Elongate NW to SE
    float angle = 0.55; // ~31 degrees tilt
    mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
    vec2 sheared = rot * centered;
    sheared.x *= 1.45; // Elongated tail along drift axis

    // Fluid turbulence and dendritic filament breakup
    vec2 flowUv = sheared * 3.5 + vec2(uTime * 0.05, -uTime * 0.03);
    float turb = fbm(flowUv) * 0.35 + fbm(sheared * 8.0) * 0.15;
    
    // Distance from core with turbulence deformation
    float dist = length(sheared) + turb;

    // Effective maximum spread radius based on chapter progress
    float maxRadius = clamp(uProgress * 0.88, 0.08, 0.88);

    // Outside the slick boundary -> discard
    if (dist > maxRadius) {
      discard;
    }

    // Normalize distance across the spill thickness profile [0 = core, 1 = boundary]
    float normDist = dist / maxRadius;

    // =========================================================================
    // BONN AGREEMENT OIL APPEARANCE CODE (BAOAC) GRADING:
    // Code 5: Continuous True Oil / Asphalt Emulsion (>200 μm) [0.00 - 0.30]
    // Code 4: Discontinuous True Oil / Heavy Sheen (50 - 200 μm) [0.30 - 0.50]
    // Code 3: Metallic Sheen (5 - 50 μm) [0.50 - 0.70]
    // Code 2: Rainbow Interference Fringe (0.3 - 5.0 μm) [0.70 - 0.88]
    // Code 1: Silvery-Grey Sheen (0.04 - 0.30 μm) [0.88 - 1.00]
    // =========================================================================

    vec3 color;
    float alpha;

    if (normDist < 0.30) {
      // Code 5: Dark asphaltic black/chocolate emulsion core
      vec3 coreBlack = vec3(0.03, 0.04, 0.06);
      vec3 coreBrown = vec3(0.11, 0.07, 0.04);
      color = mix(coreBlack, coreBrown, normDist / 0.30);
      alpha = 0.95;
    } else if (normDist < 0.50) {
      // Code 4: Viscous dark crude with slate undertones
      float t = (normDist - 0.30) / 0.20;
      vec3 darkCrude = vec3(0.11, 0.07, 0.04);
      vec3 slateOil = vec3(0.12, 0.16, 0.22);
      color = mix(darkCrude, slateOil, t);
      alpha = mix(0.95, 0.82, t);
    } else if (normDist < 0.70) {
      // Code 3: Metallic sheen with subtle petroleum gloss
      float t = (normDist - 0.50) / 0.20;
      vec3 slateOil = vec3(0.12, 0.16, 0.22);
      vec3 metallic = vec3(0.25, 0.32, 0.38);
      color = mix(slateOil, metallic, t);
      alpha = mix(0.82, 0.68, t);
    } else if (normDist < 0.88) {
      // Code 2: Thin-film optical interference rainbow fringe
      float t = (normDist - 0.70) / 0.18;
      
      // Thin-film iridescent cosine spectral dispersion
      float phase = t * 3.14159 * 2.0 - uTime * 0.2;
      vec3 rainbow = 0.5 + 0.5 * cos(phase + vec3(0.0, 2.094, 4.188));
      
      // Tint toward marine cyan & iridescent violet
      vec3 iridCyan = vec3(0.02, 0.71, 0.83);
      vec3 iridViolet = vec3(0.75, 0.35, 0.95);
      vec3 iridBase = mix(iridCyan, iridViolet, sin(t * 3.14159));
      
      color = mix(iridBase, rainbow, 0.45);
      alpha = mix(0.68, 0.45, t);
    } else {
      // Code 1: Silvery-grey sheen feathering into the ocean surface
      float t = (normDist - 0.88) / 0.12;
      vec3 silverSheen = vec3(0.72, 0.78, 0.85);
      color = silverSheen;
      alpha = mix(0.45, 0.0, smoothstep(0.0, 1.0, t));
    }

    // Solar specular glint on hydrocarbon surface
    vec3 lightDir = normalize(uSunDirection);
    vec3 viewDir = normalize(cameraPosition - vWorldPos);
    vec3 halfVec = normalize(lightDir + viewDir);
    float spec = pow(max(dot(vNormal, halfVec), 0.0), 32.0);
    color += vec3(0.4, 0.5, 0.6) * spec * (1.0 - normDist * 0.5);

    // Reverse Lagrangian drift streamline visualization for Chapter 07 ("REWIND")
    if (uRewind > 0.01) {
      float driftLines = sin((sheared.x * 24.0 - sheared.y * 12.0) - uTime * 6.0 * uRewind);
      float pulse = smoothstep(0.75, 1.0, driftLines) * uRewind;
      color = mix(color, vec3(0.06, 0.85, 0.95), pulse * 0.75);
      alpha = max(alpha, pulse * 0.85);
    }

    gl_FragColor = vec4(color, alpha);
  }
`;

/**
 * Generates a spherical surface patch conforming precisely to sphere radius R
 */
function createSphericalPatchGeometry(radius: number, segments: number, extent: number): THREE.BufferGeometry {
  const geom = new THREE.BufferGeometry();
  const positions: number[] = [];
  const normals: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  // Incident location center on the sphere (Arabian Sea: ~15.28°N, 72.05°E with earth orientation)
  const centerVec = new THREE.Vector3(1.35, 0.32, 1.45).normalize().multiplyScalar(radius);
  const norm = centerVec.clone().normalize();

  // Construct orthonormal tangent frame
  const tempUp = Math.abs(norm.y) > 0.9 ? new THREE.Vector3(1, 0, 0) : new THREE.Vector3(0, 1, 0);
  const tangentU = new THREE.Vector3().crossVectors(norm, tempUp).normalize();
  const tangentV = new THREE.Vector3().crossVectors(norm, tangentU).normalize();

  for (let j = 0; j <= segments; j++) {
    const vCoord = j / segments; // 0 to 1
    const vOffset = (vCoord - 0.5) * 2.0 * extent;

    for (let i = 0; i <= segments; i++) {
      const uCoord = i / segments; // 0 to 1
      const uOffset = (uCoord - 0.5) * 2.0 * extent;

      // Planar offset
      const pt = centerVec.clone()
        .addScaledVector(tangentU, uOffset)
        .addScaledVector(tangentV, vOffset);

      // Project onto sphere surface: guarantees EVERY vertex lies at exact radius
      pt.normalize().multiplyScalar(radius);

      const n = pt.clone().normalize();

      positions.push(pt.x, pt.y, pt.z);
      normals.push(n.x, n.y, n.z);
      uvs.push(uCoord, vCoord);
    }
  }

  for (let j = 0; j < segments; j++) {
    for (let i = 0; i < segments; i++) {
      const a = j * (segments + 1) + i;
      const b = j * (segments + 1) + (i + 1);
      const c = (j + 1) * (segments + 1) + i;
      const d = (j + 1) * (segments + 1) + (i + 1);

      indices.push(a, b, c);
      indices.push(b, d, c);
    }
  }

  geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geom.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  geom.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geom.setIndex(indices);

  return geom;
}

export default function SpillShape({
  visible = false,
  progress = 0,
  rewindProgress = 0,
}: {
  visible?: boolean;
  progress?: number;
  rewindProgress?: number;
}) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Surface elevation: 2.008 (Earth = 2.000, Ocean = 2.004, Clouds = 2.025)
  const patchGeometry = useMemo(() => {
    return createSphericalPatchGeometry(2.008, 48, 0.38);
  }, []);

  const uniforms = useMemo(
    () => ({
      uProgress: { value: progress },
      uTime: { value: 0 },
      uRewind: { value: rewindProgress },
      uSunDirection: { value: new THREE.Vector3(5.0, 3.0, 4.0).normalize() },
    }),
    []
  );

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
      materialRef.current.uniforms.uProgress.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uProgress.value,
        progress,
        0.1
      );
      materialRef.current.uniforms.uRewind.value = rewindProgress;
    }
  });

  if (!visible) return null;

  return (
    <mesh geometry={patchGeometry}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={spillVertexShader}
        fragmentShader={spillFragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
