import React, { useEffect, useRef, useState } from 'react';
import { useBox } from '@react-three/cannon';
import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useTheme } from '../ThemeContext';
import gsap from 'gsap';
import * as THREE from 'three';

interface LetterBlockProps {
  char: string;
  targetPos: [number, number, number];
  delay: number;
  theme: string;
}

const LetterBlock = ({ char, targetPos, delay, theme }: LetterBlockProps) => {
  const [isPhysics, setIsPhysics] = useState(false);
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);
  
  const [physicsRef, api] = useBox(() => ({
    mass: isPhysics ? 5 : 0, 
    position: targetPos,
    args: [1.3, 1.3, 1.3],
    material: { restitution: 0.2, friction: 0.8 }
  }));

  // Helper to copy physics transform back to our GSAP mesh
  const syncMeshToPhysics = () => {
    if (physicsRef.current && meshRef.current) {
      const position = new THREE.Vector3();
      const quaternion = new THREE.Quaternion();
      
      // We need to read the actual physics body position.
      // In @react-three/cannon, the ref contains the object3D being updated by cannon.
      position.copy((physicsRef.current as any).position);
      quaternion.copy((physicsRef.current as any).quaternion);
      
      meshRef.current.position.copy(position);
      meshRef.current.quaternion.copy(quaternion);
    }
  };

  const reformText = () => {
    syncMeshToPhysics();
    setIsPhysics(false);
    api.mass.set(0);
    api.velocity.set(0, 0, 0);
    api.angularVelocity.set(0, 0, 0);
    
    gsap.to(meshRef.current!.position, {
      x: targetPos[0],
      y: targetPos[1],
      z: targetPos[2],
      duration: 2,
      ease: "power3.inOut",
      onComplete: () => {
        api.position.copy(meshRef.current!.position);
        api.rotation.set(0, 0, 0);
        setIsPhysics(true);
        api.mass.set(5);
        
        setTimeout(reformText, 10000); // Reform again after 10s
      }
    });

    gsap.to(meshRef.current!.rotation, {
      x: 0,
      y: 0,
      z: 0,
      duration: 2,
      ease: "power3.inOut"
    });
  };

  useEffect(() => {
    if (!meshRef.current) return;

    const startX = targetPos[0] + (Math.random() - 0.5) * 10;
    const startY = 20 + Math.random() * 10;
    const startZ = targetPos[2] + (Math.random() - 0.5) * 10;
    
    meshRef.current.position.set(startX, startY, startZ);
    meshRef.current.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);

    gsap.to(meshRef.current.position, {
      x: targetPos[0],
      y: targetPos[1],
      z: targetPos[2],
      duration: 2,
      delay: delay,
      ease: "bounce.out",
      onComplete: () => {
        api.position.copy(meshRef.current!.position);
        api.rotation.set(0, 0, 0);
        setIsPhysics(true);
        api.mass.set(5);
        
        setTimeout(reformText, 10000); // Trigger reform after 10s
      }
    });

    gsap.to(meshRef.current.rotation, {
      x: 0,
      y: 0,
      z: 0,
      duration: 2,
      delay: delay,
      ease: "power3.out"
    });

  }, []);

  // Use the physics ref once it's landed, otherwise use the GSAP animated ref
  return (
    <mesh 
      ref={isPhysics ? (physicsRef as any) : meshRef} 
      castShadow 
      receiveShadow
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => {
        if (isPhysics) {
          api.applyImpulse([(Math.random() - 0.5) * 15, 25, (Math.random() - 0.5) * 15], [0, 0, 0]);
          api.applyTorque([Math.random() * 20, Math.random() * 20, Math.random() * 20]);
        }
      }}
    >
      <boxGeometry args={[1.3, 1.3, 1.3]} />
      <meshStandardMaterial 
        color={theme === 'dark' ? '#1e293b' : '#ffffff'} 
        roughness={0.2} 
        metalness={0.8} 
        emissive={hovered ? (theme === 'dark' ? '#06b6d4' : '#3b82f6') : '#000000'}
      />
      {/* The Letter on the front face */}
      <Text position={[0, 0, 0.66]} fontSize={0.8} color={theme === 'dark' ? '#00f0ff' : '#000000'} font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff">
        {char}
      </Text>
    </mesh>
  );
};

const sentence1 = "WELCOME TO MY WORLD.";
const sentence2 = "WHERE CODE MEETS CREATIVITY";

export const FallingSentence = ({ theme }: { theme: string }) => {
  const blocks: React.ReactNode[] = [];
  let index = 0;

  const spacing = 1.4;

  // Render Line 1
  const startX1 = -(sentence1.length * spacing) / 2;
  for (let i = 0; i < sentence1.length; i++) {
    if (sentence1[i] !== ' ') {
      blocks.push(
        <LetterBlock 
          key={`l1-${i}`} 
          char={sentence1[i]} 
          targetPos={[startX1 + i * spacing, 4.5, 0]} 
          delay={index * 0.05} 
          theme={theme}
        />
      );
      index++;
    }
  }

  // Render Line 2
  const startX2 = -(sentence2.length * spacing) / 2;
  for (let i = 0; i < sentence2.length; i++) {
    if (sentence2[i] !== ' ') {
      blocks.push(
        <LetterBlock 
          key={`l2-${i}`} 
          char={sentence2[i]} 
          targetPos={[startX2 + i * spacing, 3.0, 0]} 
          delay={index * 0.05} 
          theme={theme}
        />
      );
      index++;
    }
  }

  return <>{blocks}</>;
};
