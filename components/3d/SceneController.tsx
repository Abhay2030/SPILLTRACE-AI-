'use client';

import { useEffect, useState, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import Earth from './Earth';
import Ocean from './Ocean';
import Clouds from './Clouds';
import Atmosphere from './Atmosphere';
import Stars from './Stars';
import Satellite from './Satellite';
import ShipFleet from './ShipFleet';
import SpillShape from './SpillShape';
import ProbabilityField from './ProbabilityField';
import ScanBeam from './ScanBeam';
import RouteTrail from './RouteTrail';
import { CHAPTER_CAMERAS, CameraKeyframe } from '@/lib/three/camera-positions';

function getInterpolatedCamera(chapter: number, progress: number): { position: THREE.Vector3; target: THREE.Vector3; fov: number } {
  const currentKey = Math.min(Math.max(chapter, 1), 20);
  const nextKey = Math.min(currentKey + 1, 20);

  const cur = CHAPTER_CAMERAS[currentKey] || { position: [0, 0, 8], target: [0, 0, 0], fov: 45 };
  const next = CHAPTER_CAMERAS[nextKey] || cur;

  const curPos = new THREE.Vector3(...cur.position);
  const nextPos = new THREE.Vector3(...next.position);
  const position = new THREE.Vector3().lerpVectors(curPos, nextPos, progress);

  const curTarget = new THREE.Vector3(...cur.target);
  const nextTarget = new THREE.Vector3(...next.target);
  const target = new THREE.Vector3().lerpVectors(curTarget, nextTarget, progress);

  const fov = THREE.MathUtils.lerp(cur.fov, next.fov, progress);

  return { position, target, fov };
}

function getSceneState(chapter: number, progress: number) {
  let shipCount = 247;
  if (chapter === 11) {
    if (progress < 0.2) shipCount = 247;
    else if (progress < 0.4) shipCount = 84;
    else if (progress < 0.6) shipCount = 18;
    else if (progress < 0.8) shipCount = 5;
    else shipCount = 3;
  } else if (chapter > 11 && chapter < 16) {
    shipCount = 3;
  } else if (chapter >= 16) {
    shipCount = 8;
  }

  return {
    showEarth: true,
    showOcean: chapter >= 2,
    showStars: true,
    showAtmosphere: true,
    showShips: chapter >= 2,
    shipCount,
    highlightedShips: chapter >= 12 ? [0] : [],
    showSatellite: chapter >= 3 && chapter <= 7,
    showScanBeam: chapter >= 3 && chapter <= 5,
    showSpill: chapter >= 4,
    spillProgress: chapter === 7 ? 1 - progress : chapter >= 4 ? Math.min(1, Math.max(0.1, (chapter - 4) * 0.3 + progress * 0.2)) : 0,
    showProbabilityField: chapter >= 8 && chapter <= 15,
    showDriftPath: chapter >= 9 && chapter <= 14,
    // Smooth planetary rotation during global overview chapters; stabilize on Arabian Sea coordinate frame during investigation
    earthRotation: chapter <= 2 || chapter >= 18 ? 0.0006 : 0.0,
  };
}

export default function SceneController() {
  const { camera } = useThree();
  const [chapter, setChapter] = useState(1);
  const [progress, setProgress] = useState(0);

  const currentTarget = useRef(new THREE.Vector3(0, 0, 0));
  const currentFov = useRef(45);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight || 1;
      const rawChapter = scrollY / vh + 1;
      const currentChapter = Math.max(1, Math.min(20, Math.floor(rawChapter)));
      const currentProgress = Math.max(0, Math.min(1, rawChapter - currentChapter));

      setChapter(currentChapter);
      setProgress(currentProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const state = getSceneState(chapter, progress);
  const targetCam = getInterpolatedCamera(chapter, progress);

  useFrame((_state, delta) => {
    // Smooth camera position interpolation with physical inertia
    camera.position.lerp(targetCam.position, 2.2 * delta);

    // Smooth camera target interpolation
    currentTarget.current.lerp(targetCam.target, 2.6 * delta);
    camera.lookAt(currentTarget.current);

    // Smooth FOV interpolation if perspective camera
    if ('fov' in camera) {
      const persCamera = camera as THREE.PerspectiveCamera;
      currentFov.current = THREE.MathUtils.lerp(currentFov.current, targetCam.fov, 2.2 * delta);
      if (Math.abs(persCamera.fov - currentFov.current) > 0.05) {
        persCamera.fov = currentFov.current;
        persCamera.updateProjectionMatrix();
      }
    }
  });

  return (
    <>
      {/* 1. Unified Solar Illumination Engine (Single coherent directional sun) */}
      <ambientLight intensity={0.14} color="#0c1e36" />
      <directionalLight
        intensity={1.4}
        position={[5.0, 3.0, 4.0]}
        color="#fffaf0"
      />
      {/* Soft atmospheric earthshine bounce on dark side */}
      <pointLight intensity={0.25} position={[-5.0, -2.0, -4.0]} color="#0369a1" />

      {state.showStars && <Stars />}

      {/* Planetary Group: Synchronized coordinate frame for Earth, Ocean, Clouds, Spill & Fleet */}
      <group rotation-y={0}>
        {state.showEarth && <Earth rotationSpeed={state.earthRotation} />}
        {state.showAtmosphere && <Atmosphere />}
        {state.showOcean && <Ocean opacity={chapter === 2 ? progress : 1} />}
        {state.showEarth && <Clouds />}
        {state.showSpill && (
          <SpillShape
            visible={state.showSpill}
            progress={state.spillProgress}
            rewindProgress={chapter === 7 ? progress : 0}
          />
        )}
        {state.showProbabilityField && <ProbabilityField visible={state.showProbabilityField} intensity={0.8} />}

        {/* 247 Maritime Fleet: Locked to geographic oceanic coordinates */}
        {state.showShips && (
          <ShipFleet
            visibleCount={state.shipCount}
            highlightedIndices={state.highlightedShips}
          />
        )}
      </group>

      {/* LEO Spacecraft & Synthetic Aperture Radar Footprint */}
      {state.showSatellite && <Satellite visible={state.showSatellite} orbitProgress={progress} />}
      {state.showScanBeam && (
        <ScanBeam
          visible={state.showScanBeam}
          scanProgress={progress}
          state={chapter === 3 ? 'PENDING' : chapter === 4 ? 'SCANNING' : 'COMPLETE'}
        />
      )}

      {/* Hydrodynamic Drift & Current Streamlines */}
      {state.showDriftPath && (
        <RouteTrail
          visible={state.showDriftPath}
          points={[
            new THREE.Vector3(1.78, 0.42, 1.15),
            new THREE.Vector3(1.65, 0.35, 1.30),
            new THREE.Vector3(1.50, 0.28, 1.45),
            new THREE.Vector3(1.35, 0.20, 1.58),
          ]}
        />
      )}
    </>
  );
}
