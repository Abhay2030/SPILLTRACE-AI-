'use client';
import { useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import Earth from './Earth';
import Ocean from './Ocean';
import Atmosphere from './Atmosphere';
import Stars from './Stars';
import Satellite from './Satellite';
import ShipFleet from './ShipFleet';
import SpillShape from './SpillShape';
import ProbabilityField from './ProbabilityField';
import ScanBeam from './ScanBeam';
import RouteTrail from './RouteTrail';
import { CHAPTER_CAMERAS } from '@/lib/three/camera-positions';

function getSceneState(chapter: number, progress: number) {
  return {
    showEarth: true,
    showOcean: chapter >= 1,
    showStars: true,
    showAtmosphere: true,
    showShips: chapter >= 2,
    shipCount: chapter >= 11 ? Math.max(1, Math.floor(247 * (1 - progress))) : 247,
    showSatellite: chapter >= 3,
    showScanBeam: chapter >= 3 && chapter <= 6,
    showSpill: chapter >= 4,
    spillProgress: chapter === 7 ? 1 - progress : chapter >= 4 ? Math.min(1, (chapter - 4 + progress)) : 0,
    showProbabilityField: chapter >= 8,
    showDriftPath: chapter >= 9,
    earthRotation: chapter <= 2 ? 0.001 : 0.0003,
  };
}

export default function SceneController() {
  const { camera } = useThree();
  const [chapter, setChapter] = useState(1);
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const rawChapter = (scrollY / vh) + 1;
      const currentChapter = Math.max(1, Math.floor(rawChapter));
      const currentProgress = rawChapter - currentChapter;
      
      setChapter(Math.min(currentChapter, 20));
      setProgress(currentProgress);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const state = getSceneState(chapter, progress);
  
  useFrame((_state, delta) => {
    const targetCam = CHAPTER_CAMERAS?.[chapter - 1] || { position: [0, 0, 8], target: [0, 0, 0], fov: 45 };
    const targetPos = new THREE.Vector3(...(targetCam.position as [number, number, number]));
    camera.position.lerp(targetPos, 2 * delta);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight intensity={1.0} position={[5, 3, 5]} />
      
      {state.showStars && <Stars />}
      
      <group rotation-y={0}>
        {state.showEarth && <Earth rotationSpeed={state.earthRotation} />}
        {state.showAtmosphere && <Atmosphere />}
        {state.showOcean && <Ocean opacity={chapter >= 2 ? 1 : progress} />}
        {state.showSpill && <SpillShape visible={state.showSpill} progress={state.spillProgress} />}
        {state.showProbabilityField && <ProbabilityField visible={state.showProbabilityField} intensity={progress} />}
      </group>
      
      {state.showSatellite && <Satellite visible={state.showSatellite} orbitProgress={progress} />}
      {state.showScanBeam && <ScanBeam visible={state.showScanBeam} />}
      
      {state.showShips && <ShipFleet visibleCount={state.shipCount} />}
      {state.showDriftPath && <RouteTrail visible={state.showDriftPath} points={[new THREE.Vector3(-1, 1, 1), new THREE.Vector3(0, 1.2, 1), new THREE.Vector3(1, 1, 1)]} />}
    </>
  );
}
