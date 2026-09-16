'use client';
import { Stars as DreiStars } from '@react-three/drei';

export default function Stars() {
  return (
    <DreiStars radius={60} depth={40} count={1800} factor={2.5} saturation={0} fade speed={0.2} />
  );
}
