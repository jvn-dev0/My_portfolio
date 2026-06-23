import { useState } from 'react';
import { useBox } from '@react-three/cannon';
import { Text } from '@react-three/drei';

const techWords = ['JS', 'TS', 'PY', 'JAVA', 'C++', 'HTML', 'CSS', 'REACT', 'NODE', '</>'];

const TechCube = ({ word, position, theme }: { word: string, position: [number, number, number], theme: string }) => {
  const [hovered, setHovered] = useState(false);
  const [ref, api] = useBox(() => ({
    mass: 3,
    position,
    args: [1.3, 1.3, 1.3], // slightly larger
    material: { restitution: 0.8, friction: 0.3 }
  }));

  return (
    <mesh 
      ref={ref as any} 
      castShadow 
      receiveShadow
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => {
        api.applyImpulse([(Math.random() - 0.5) * 20, 30, (Math.random() - 0.5) * 20], [0, 0, 0]);
        api.applyTorque([Math.random() * 30, Math.random() * 30, Math.random() * 30]);
      }}
    >
      <boxGeometry args={[1.3, 1.3, 1.3]} />
      <meshStandardMaterial 
        color={theme === 'dark' ? '#0f172a' : '#f8fafc'} 
        roughness={0.1} 
        metalness={0.5}
        emissive={hovered ? (theme === 'dark' ? '#06b6d4' : '#3b82f6') : '#000000'}
      />
      {/* Front Face */}
      <Text position={[0, 0, 0.66]} fontSize={0.5} color={theme === 'dark' ? '#00f0ff' : '#000000'} font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff">
        {word}
      </Text>
      {/* Back Face */}
      <Text position={[0, 0, -0.66]} rotation={[0, Math.PI, 0]} fontSize={0.5} color={theme === 'dark' ? '#00f0ff' : '#000000'} font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff">
        {word}
      </Text>
    </mesh>
  );
};

export const TechSymbols = ({ theme }: { theme: string }) => {
  // Generate a random set of 15 tech cubes
  const [cubes] = useState(() => 
    Array.from({ length: 15 }).map(() => ({
      word: techWords[Math.floor(Math.random() * techWords.length)],
      pos: [
        (Math.random() - 0.5) * 20,
        15 + Math.random() * 30, 
        (Math.random() - 0.5) * 15
      ] as [number, number, number]
    }))
  );

  return (
    <>
      {cubes.map((cube, i) => (
        <TechCube key={i} word={cube.word} position={cube.pos} theme={theme} />
      ))}
    </>
  );
};
