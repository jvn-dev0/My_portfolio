import { Canvas } from '@react-three/fiber';
import { Physics, usePlane, useSphere, useBox } from '@react-three/cannon';
import { Environment, ContactShadows } from '@react-three/drei';
import { useState, useEffect } from 'react';
import { ChessGeometry } from './ChessPieces';
import type { PieceType } from './ChessPieces';
import { FallingSentence } from './FallingText';
import { TechSymbols } from './TechSymbols';
import { HeroIntro } from './HeroIntro';
import { useTheme } from '../ThemeContext';

function Chessboard() {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], position: [0, -2, 0] }));
  
  const squares = [];
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const isBlack = (i + j) % 2 === 0;
      squares.push(
        <mesh key={`${i}-${j}`} position={[(i - 3.5) * 3, -1.99, (j - 3.5) * 3]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[3, 3]} />
          <meshStandardMaterial color={isBlack ? '#0a0a0a' : '#e5e5e5'} roughness={0.1} metalness={0.2} />
        </mesh>
      );
    }
  }

  return (
    <group>
      <mesh ref={ref} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <shadowMaterial transparent opacity={0.4} />
      </mesh>
      {squares}
    </group>
  );
}

function MouseRepeller() {
  const [ref, api] = useSphere(() => ({ type: 'Kinematic', args: [3] }));
  useFrame(({ mouse, viewport }) => {
    const x = (mouse.x * viewport.width) / 2;
    const y = (mouse.y * viewport.height) / 2;
    api.position.set(x, y, 0);
  });
  return <mesh ref={ref as any} visible={false} />;
}

const pieceTypes: PieceType[] = ['King', 'Queen', 'Knight', 'Bishop', 'Rook', 'Pawn'];

function InteractiveChessPiece({ type, position, theme }: { type: PieceType, position: [number, number, number], theme: string }) {
  const [ref, api] = useBox(() => ({ 
    mass: 2, 
    position, 
    args: [1, 2.5, 1], // Box collision is much more stable in Cannon.js
    material: { friction: 0.1, restitution: 0.4 } 
  }));

  const [hovered, setHovered] = useState(false);

  return (
    <group 
      ref={ref as any} 
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => {
        // Explode upwards!
        api.applyImpulse([(Math.random() - 0.5) * 20, 30, (Math.random() - 0.5) * 20], [0, 0, 0]);
        api.applyTorque([Math.random() * 50, Math.random() * 50, Math.random() * 50]);
      }}
    >
      <ChessGeometry 
        type={type} 
        color={theme === 'dark' ? '#ffffff' : '#111111'} 
        emissive={hovered ? (theme === 'dark' ? '#3b82f6' : '#2563eb') : '#000000'}
      />
    </group>
  );
}

const Hero3D = () => {
  const [pieces, setPieces] = useState<{type: PieceType, pos: [number, number, number]}[]>([]);
  const { theme } = useTheme();

  useEffect(() => {
    const newPieces = Array.from({ length: 45 }).map(() => ({
      type: pieceTypes[Math.floor(Math.random() * pieceTypes.length)],
      pos: [
        (Math.random() - 0.5) * 15,
        15 + Math.random() * 20, 
        (Math.random() - 0.5) * 10
      ] as [number, number, number]
    }));
    setPieces(newPieces);
  }, []); // Run only once on mount

  return (
    <div className={`w-full flex flex-col transition-colors duration-500 ${theme === 'dark' ? 'bg-[#030305]' : 'bg-[#f8fafc]'}`}>
      
      <HeroIntro />

      {/* Chessboard Section */}
      <div className="w-full h-[60vh] md:h-[70vh] relative z-0">
        <Canvas shadows camera={{ position: [0, 5, 20], fov: 45 }}>
          <ambientLight intensity={theme === 'dark' ? 0.3 : 0.8} />
          <directionalLight 
            position={[10, 20, 10]} 
            intensity={theme === 'dark' ? 1.5 : 2} 
            castShadow 
            shadow-mapSize={[2048, 2048]} 
          />
          <pointLight position={[-10, -10, -5]} intensity={0.5} color={theme === 'dark' ? "#2563eb" : "#94a3b8"} />
          
            <Physics gravity={[0, -9.81, 0]} defaultContactMaterial={{ restitution: 0.6 }}>
              <Chessboard />
              <MouseRepeller />
              {pieces.map((p, i) => (
                <InteractiveChessPiece key={`piece-${i}`} type={p.type} position={p.pos} theme={theme} />
              ))}
              <TechSymbols theme={theme} />
              <FallingSentence theme={theme} />
            </Physics>

          <Environment preset={theme === 'dark' ? 'city' : 'studio'} />
          <ContactShadows position={[0, -1.9, 0]} opacity={0.5} scale={50} blur={2} far={10} />
        </Canvas>
      </div>

    </div>
  );
};

export default Hero3D;
