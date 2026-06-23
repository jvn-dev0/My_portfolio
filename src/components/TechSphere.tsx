import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../ThemeContext';
import { FaReact, FaJava, FaGithub, FaCss3Alt, FaPython, FaHtml5, FaNodeJs } from 'react-icons/fa';
import { SiTailwindcss, SiMysql, SiJavascript, SiNextdotjs } from 'react-icons/si';

// Remove 'ME' from the stack because it will be the center.
const techStack = [
  { id: 'react', name: 'React', color: '#61DAFB', icon: FaReact, orbit: 1 },
  { id: 'java', name: 'Java', color: '#f89820', icon: FaJava, orbit: 1 },
  { id: 'css', name: 'CSS', color: '#264de4', icon: FaCss3Alt, orbit: 1 },
  { id: 'python', name: 'Python', color: '#3776AB', icon: FaPython, orbit: 1 },
  { id: 'mysql', name: 'MySQL', color: '#4479A1', icon: SiMysql, orbit: 2 },
  { id: 'github', name: 'GitHub', color: '#ffffff', icon: FaGithub, darkColor: '#111', orbit: 2 },
  { id: 'html', name: 'HTML', color: '#E34F26', icon: FaHtml5, orbit: 2 },
  { id: 'js', name: 'JavaScript', color: '#F7DF1E', icon: SiJavascript, orbit: 2 },
  { id: 'tailwind', name: 'Tailwind', color: '#38B2AC', icon: SiTailwindcss, orbit: 3 },
  { id: 'next', name: 'Next.js', color: '#ffffff', icon: SiNextdotjs, darkColor: '#000', orbit: 3 },
  { id: 'node', name: 'Node.js', color: '#339933', icon: FaNodeJs, orbit: 3 }
];

export const TechSphere = () => {
  const { theme } = useTheme();
  
  // Orbit configurations
  const orbits = [
    { radius: 140, speed: 0.003, items: techStack.filter(t => t.orbit === 1) },
    { radius: 240, speed: -0.002, items: techStack.filter(t => t.orbit === 2) },
    { radius: 340, speed: 0.0015, items: techStack.filter(t => t.orbit === 3) }
  ];

  const requestRef = useRef<number>(0);
  const [angles, setAngles] = useState([0, 0, 0]); // one angle per orbit
  const isHoveredRef = useRef(false);

  useEffect(() => {
    let lastTime = performance.now();
    
    const animate = (time: number) => {
      const deltaTime = time - lastTime;
      lastTime = time;

      if (!isHoveredRef.current) {
        setAngles(prev => [
          prev[0] + orbits[0].speed * deltaTime,
          prev[1] + orbits[1].speed * deltaTime,
          prev[2] + orbits[2].speed * deltaTime,
        ]);
      }
      
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current!);
  }, []);

  return (
    <div 
      className="w-full h-[800px] flex items-center justify-center relative overflow-hidden"
      onMouseEnter={() => (isHoveredRef.current = true)}
      onMouseLeave={() => (isHoveredRef.current = false)}
    >
      
      {/* Central "ME" Sphere */}
      <div className="absolute z-50 flex items-center justify-center w-32 h-32 rounded-full glass-panel border border-white/20 shadow-[0_0_50px_rgba(168,85,247,0.5)]">
        <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-cyan-400 to-purple-500 p-1 flex items-center justify-center">
          <div className={`w-full h-full rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
             <span className={`text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500`}>
               ME
             </span>
          </div>
        </div>
      </div>

      {/* Orbits */}
      {orbits.map((orbit, orbitIndex) => {
        const currentAngle = angles[orbitIndex];
        const itemCount = orbit.items.length;
        const angleStep = (Math.PI * 2) / itemCount;

        return (
          <div key={`orbit-${orbitIndex}`} className="absolute top-1/2 left-1/2 w-0 h-0">
            {/* Draw the ring itself */}
            <div 
              className="absolute border border-gray-500/20 rounded-full"
              style={{
                width: orbit.radius * 2,
                height: orbit.radius * 2,
                top: -orbit.radius,
                left: -orbit.radius,
              }}
            />

            {/* Orbit Items */}
            {orbit.items.map((tech, i) => {
              const itemAngle = currentAngle + (i * angleStep);
              const x = Math.cos(itemAngle) * orbit.radius;
              const y = Math.sin(itemAngle) * orbit.radius;

              const Icon = tech.icon;
              const displayColor = theme === 'dark' ? tech.color : (tech.darkColor || tech.color);

              return (
                <div
                  key={tech.id}
                  className="absolute"
                  style={{
                    transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                    // We don't rotate the item itself, so it stays perfectly upright!
                  }}
                >
                  <div 
                    className="flex items-center gap-2 px-5 py-3 rounded-xl glass-panel shadow-lg border border-white/10 cursor-pointer group transition-all duration-300 hover:scale-125"
                    style={{ '--hover-glow': displayColor } as React.CSSProperties}
                  >
                    <style>{`
                      .group:hover {
                        box-shadow: 0 0 20px var(--hover-glow), inset 0 0 5px var(--hover-glow) !important;
                        z-index: 100 !important;
                      }
                      .group:hover svg {
                        transform: rotate(15deg) scale(1.2);
                        filter: drop-shadow(0 0 5px var(--hover-glow));
                      }
                    `}</style>
                    
                    <Icon 
                      size={20} 
                      style={{ color: displayColor }} 
                      className="transition-transform duration-300 shrink-0"
                    />
                    <span 
                      className={`font-bold text-sm tracking-wide whitespace-nowrap ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
                    >
                      {tech.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}

    </div>
  );
};
