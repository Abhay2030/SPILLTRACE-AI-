'use client';

import { useEffect, useState, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useAppStore } from '@/lib/state/useAppStore';

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
import { CHAPTER_CAMERAS } from '@/lib/three/camera-positions';

// Map the 11 Workstation Workflow Steps to their visual equivalent Chapters
const WORKFLOW_TO_CHAPTER_MAP: Record<number, number> = {
  1: 3,  // Observe (Satellite overhead)
  2: 4,  // Detect (SAR Scanning)
  3: 5,  // Validate (Classification)
  4: 6,  // Characterize (Geometry)
  5: 8,  // Trace (Origin probability)
  6: 11, // Correlate (AIS filtering)
  7: 12, // Attribute (Candidates)
  8: 15, // Verify (Evidence)
  9: 10, // Assess (Threat)
  10: 16, // Respond (Assets)
  11: 18, // Monitor (Post-response)
};

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
    earthRotation: chapter <= 2 || chapter >= 18 ? 0.0006 : 0.0,
  };
}

export default function SceneController() {
  const { camera } = useThree();
  const presentationMode = useAppStore(state => state.presentationMode);
  const workflowStep = useAppStore(state => state.workflowStep);
  const timelineHour = useAppStore(state => state.timelineHour);

  const [scrollChapter, setScrollChapter] = useState(1);
  const [scrollProgress, setScrollProgress] = useState(0);

  const currentTarget = useRef(new THREE.Vector3(0, 0, 0));
  const currentFov = useRef(45);

  useEffect(() => {
    const handleScroll = () => {
      // Only track scroll if in presentation mode
      if (!presentationMode) return;
      
      const scrollY = window.scrollY;
      const vh = window.innerHeight || 1;
      const rawChapter = scrollY / vh + 1;
      const currentChapter = Math.max(1, Math.min(20, Math.floor(rawChapter)));
      const currentProgress = Math.max(0, Math.min(1, rawChapter - currentChapter));

      setScrollChapter(currentChapter);
      setScrollProgress(currentProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [presentationMode]);

  // Determine actual chapter and progress based on mode
  const activeChapter = presentationMode ? scrollChapter : WORKFLOW_TO_CHAPTER_MAP[workflowStep] || 1;
  
  // In Workstation mode, we can use the timelineHour to drive sub-progress for rewinds
  let activeProgress = presentationMode ? scrollProgress : 1.0;
  
  if (!presentationMode && workflowStep === 5) {
     // Trace Step: timelineHour [-24 to 0] drives rewind progress
     activeProgress = Math.abs(timelineHour) / 24; 
  }

  const state = getSceneState(activeChapter, activeProgress);
  const targetCam = getInterpolatedCamera(activeChapter, activeProgress);

  useFrame((_state, delta) => {
    camera.position.lerp(targetCam.position, 2.2 * delta);
    currentTarget.current.lerp(targetCam.target, 2.6 * delta);
    camera.lookAt(currentTarget.current);

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
      <ambientLight intensity={0.14} color="#0c1e36" />
      <directionalLight intensity={1.4} position={[5.0, 3.0, 4.0]} color="#fffaf0" />
      <pointLight intensity={0.25} position={[-5.0, -2.0, -4.0]} color="#0369a1" />

      {state.showStars && <Stars />}

      <group rotation-y={0}>
        {state.showEarth && <Earth rotationSpeed={state.earthRotation} />}
        {state.showAtmosphere && <Atmosphere />}
        {state.showOcean && <Ocean opacity={activeChapter === 2 ? activeProgress : 1} />}
        {state.showEarth && <Clouds />}
        {state.showSpill && (
          <SpillShape
            visible={state.showSpill}
            progress={state.spillProgress}
            rewindProgress={activeChapter === 7 || (!presentationMode && workflowStep === 5) ? activeProgress : 0}
          />
        )}
        {state.showProbabilityField && <ProbabilityField visible={state.showProbabilityField} intensity={0.8} />}

        {state.showShips && (
          <ShipFleet
            visibleCount={state.shipCount}
            highlightedIndices={state.highlightedShips}
          />
        )}
      </group>

      {state.showSatellite && <Satellite visible={state.showSatellite} orbitProgress={activeProgress} />}
      {state.showScanBeam && (
        <ScanBeam
          visible={state.showScanBeam}
          scanProgress={activeProgress}
          state={activeChapter === 3 ? 'PENDING' : activeChapter === 4 ? 'SCANNING' : 'COMPLETE'}
        />
      )}

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
