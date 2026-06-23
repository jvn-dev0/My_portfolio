import React, { useMemo } from 'react';
import * as THREE from 'three';

// Using exact composite shapes for pure, classic chess designs
export type PieceType = 'King' | 'Queen' | 'Knight' | 'Bishop' | 'Rook' | 'Pawn';

export const ChessGeometry = ({ type, color, emissive }: { type: PieceType, color?: string, emissive?: string }) => {
  
  // Create a shared Three.js material instance. This is highly performant and completely avoids 
  // R3F JSX-attachment bugs when sharing materials or updating colors on re-renders.
  const sharedMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: color || '#ffffff',
      emissive: emissive || '#000000',
      roughness: 0.1,
      metalness: 0.8
    });
  }, [color, emissive]);

  switch (type) {
    case 'Pawn':
      return (
        <group>
          <mesh position={[0, -0.8, 0]} castShadow receiveShadow material={sharedMaterial}><cylinderGeometry args={[0.5, 0.6, 0.4, 32]} /></mesh>
          <mesh position={[0, -0.6, 0]} castShadow receiveShadow material={sharedMaterial}><torusGeometry args={[0.45, 0.1, 16, 32]} /></mesh>
          <mesh position={[0, 0, 0]} castShadow receiveShadow material={sharedMaterial}><cylinderGeometry args={[0.2, 0.4, 1.2, 32]} /></mesh>
          <mesh position={[0, 0.6, 0]} castShadow receiveShadow material={sharedMaterial}><torusGeometry args={[0.25, 0.08, 16, 32]} /></mesh>
          <mesh position={[0, 1.0, 0]} castShadow receiveShadow material={sharedMaterial}><sphereGeometry args={[0.35, 32, 32]} /></mesh>
        </group>
      );
    case 'Rook':
      return (
        <group>
          <mesh position={[0, -0.8, 0]} castShadow receiveShadow material={sharedMaterial}><cylinderGeometry args={[0.6, 0.7, 0.4, 32]} /></mesh>
          <mesh position={[0, -0.6, 0]} castShadow receiveShadow material={sharedMaterial}><torusGeometry args={[0.55, 0.1, 16, 32]} /></mesh>
          <mesh position={[0, 0.2, 0]} castShadow receiveShadow material={sharedMaterial}><cylinderGeometry args={[0.4, 0.5, 1.6, 32]} /></mesh>
          <mesh position={[0, 1.0, 0]} castShadow receiveShadow material={sharedMaterial}><torusGeometry args={[0.45, 0.1, 16, 32]} /></mesh>
          <mesh position={[0, 1.3, 0]} castShadow receiveShadow material={sharedMaterial}><cylinderGeometry args={[0.5, 0.45, 0.6, 32]} /></mesh>
        </group>
      );
    case 'Knight':
      return (
        <group>
          <mesh position={[0, -0.8, 0]} castShadow receiveShadow material={sharedMaterial}><cylinderGeometry args={[0.6, 0.7, 0.4, 32]} /></mesh>
          <mesh position={[0, 0, 0]} castShadow receiveShadow material={sharedMaterial}><cylinderGeometry args={[0.4, 0.5, 1.2, 32]} /></mesh>
          <mesh position={[0.2, 0.8, 0]} rotation={[0, 0, -0.5]} castShadow receiveShadow material={sharedMaterial}><boxGeometry args={[0.8, 0.6, 0.4]} /></mesh>
          <mesh position={[0.5, 0.5, 0]} rotation={[0, 0, -0.5]} castShadow receiveShadow material={sharedMaterial}><boxGeometry args={[0.4, 0.8, 0.4]} /></mesh>
        </group>
      );
    case 'Bishop':
      return (
        <group>
          <mesh position={[0, -0.8, 0]} castShadow receiveShadow material={sharedMaterial}><cylinderGeometry args={[0.5, 0.6, 0.4, 32]} /></mesh>
          <mesh position={[0, 0, 0]} castShadow receiveShadow material={sharedMaterial}><cylinderGeometry args={[0.2, 0.45, 1.6, 32]} /></mesh>
          <mesh position={[0, 0.8, 0]} castShadow receiveShadow material={sharedMaterial}><torusGeometry args={[0.25, 0.08, 16, 32]} /></mesh>
          <mesh position={[0, 1.3, 0]} castShadow receiveShadow material={sharedMaterial}><sphereGeometry args={[0.3, 32, 32]} /></mesh>
          <mesh position={[0, 1.7, 0]} castShadow receiveShadow material={sharedMaterial}><sphereGeometry args={[0.1, 16, 16]} /></mesh>
        </group>
      );
    case 'Queen':
      return (
        <group>
          <mesh position={[0, -0.8, 0]} castShadow receiveShadow material={sharedMaterial}><cylinderGeometry args={[0.65, 0.75, 0.4, 32]} /></mesh>
          <mesh position={[0, 0.2, 0]} castShadow receiveShadow material={sharedMaterial}><cylinderGeometry args={[0.25, 0.5, 2.0, 32]} /></mesh>
          <mesh position={[0, 1.2, 0]} castShadow receiveShadow material={sharedMaterial}><torusGeometry args={[0.35, 0.08, 16, 32]} /></mesh>
          <mesh position={[0, 1.6, 0]} castShadow receiveShadow material={sharedMaterial}><cylinderGeometry args={[0.4, 0.25, 0.8, 32]} /></mesh>
          <mesh position={[0, 2.0, 0]} castShadow receiveShadow material={sharedMaterial}><sphereGeometry args={[0.15, 16, 16]} /></mesh>
        </group>
      );
    case 'King':
      return (
        <group>
          <mesh position={[0, -0.8, 0]} castShadow receiveShadow material={sharedMaterial}><cylinderGeometry args={[0.7, 0.8, 0.4, 32]} /></mesh>
          <mesh position={[0, 0.3, 0]} castShadow receiveShadow material={sharedMaterial}><cylinderGeometry args={[0.3, 0.55, 2.2, 32]} /></mesh>
          <mesh position={[0, 1.4, 0]} castShadow receiveShadow material={sharedMaterial}><torusGeometry args={[0.4, 0.08, 16, 32]} /></mesh>
          <mesh position={[0, 1.8, 0]} castShadow receiveShadow material={sharedMaterial}><cylinderGeometry args={[0.3, 0.4, 0.8, 32]} /></mesh>
          <mesh position={[0, 2.4, 0]} castShadow receiveShadow material={sharedMaterial}><boxGeometry args={[0.15, 0.6, 0.15]} /></mesh>
          <mesh position={[0, 2.4, 0]} castShadow receiveShadow material={sharedMaterial}><boxGeometry args={[0.4, 0.15, 0.15]} /></mesh>
        </group>
      );
    default:
      return null;
  }
};
