import React, { useRef, useState, useEffect } from 'react';
import { useTheme } from '../ThemeContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MagneticCard = ({ children, theme, color }: { children: React.ReactNode, theme: string, color: string }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePos({ x, y });
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div 
      className="perspective-1000 relative"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        ref={cardRef}
        className={`relative glass-panel rounded-2xl p-8 md:p-10 ml-8 md:ml-0 transition-transform duration-100 ease-out border border-white/10 ${theme === 'dark' ? 'bg-[#0a0a0f]/80' : 'bg-white/80'}`}
        style={{
          transform: isHovered ? `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1.02, 1.02, 1.02)` : 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        }}
      >
        {/* Dynamic Spotlight Effect */}
        <div 
          className="absolute inset-0 pointer-events-none rounded-2xl opacity-0 transition-opacity duration-300 mix-blend-overlay"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, ${color}22, transparent 40%)`
          }}
        />
        
        {/* Border Glow on Hover */}
        <div 
          className="absolute -inset-[1px] pointer-events-none rounded-[1.1rem] opacity-0 transition-opacity duration-300 -z-10"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${color}66, transparent 40%)`
          }}
        />

        <div className="relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
};

const Education: React.FC = () => {
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const laserRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);

  const educationData = [
    {
      degree: 'Master of Computer Applications (MCA)',
      institute: 'Acharya Institute of Graduate Studies',
      location: 'Soladevanahalli, Bangalore, Karnataka',
      status: '2025 – 2027 (Expected)',
      description: 'Pursuing a Master of Computer Applications (MCA) with a focus on software development, programming, and modern web technologies. Building expertise in Core Java, Full Stack Development, data structures, and problem-solving to create scalable software solutions.',
      color: '#3b82f6' // Blue
    },
    {
      degree: 'Bachelor of Computer Applications (BCA)',
      institute: 'Presidency University',
      location: 'Itgalpur Rajanakunte, Yelahanka, Bengaluru, Karnataka',
      status: '2022 – 2025',
      description: 'Completed a Bachelor of Computer Applications (BCA) with a focus on programming, software development, databases, and web technologies.',
      color: '#a855f7' // Purple
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the main laser line growing downwards
      gsap.fromTo(laserRef.current, 
        { height: "0%" }, 
        {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center",
            end: "bottom center",
            scrub: true
          }
        }
      );

      // Animate each dot popping in when the laser hits it
      dotsRef.current.forEach((dot, i) => {
        if (!dot) return;
        gsap.fromTo(dot,
          { scale: 0, boxShadow: "0 0 0px transparent" },
          {
            scale: 1,
            boxShadow: `0 0 20px ${educationData[i].color}, 0 0 40px ${educationData[i].color}`,
            scrollTrigger: {
              trigger: dot,
              start: "top center+=100", // triggers just as laser passes
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="education" ref={sectionRef} className="py-24 relative z-10 bg-[var(--color-dark-bg)] transition-colors duration-500">
      <div className="max-w-4xl mx-auto px-6">
        
        <div className="text-center mb-20">
          <h2 className={`text-5xl md:text-6xl font-black mb-6 tracking-tight ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Academic Journey
          </h2>
          <div className="w-24 h-1.5 mx-auto bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
        </div>

        <div className="relative pl-8 md:pl-16 py-8">
          
          {/* Timeline Background Track */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-800/30 rounded-full overflow-hidden">
            {/* Active Neon Laser */}
            <div 
              ref={laserRef} 
              className="w-full bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-600 rounded-full shadow-[0_0_15px_rgba(59,130,246,1)]"
            ></div>
          </div>

          <div className="space-y-20">
            {educationData.map((edu, index) => (
              <div key={index} className="relative group">
                
                {/* Glowing Laser Dot */}
                <div 
                  ref={el => { dotsRef.current[index] = el; }}
                  className="absolute -left-[2.3rem] md:-left-[4.3rem] top-8 w-6 h-6 rounded-full border-4 z-20"
                  style={{
                    backgroundColor: theme === 'dark' ? '#030305' : '#ffffff',
                    borderColor: edu.color
                  }}
                >
                  <div 
                    className="absolute inset-0 rounded-full m-1"
                    style={{ backgroundColor: edu.color }}
                  ></div>
                </div>
                
                <MagneticCard theme={theme} color={edu.color}>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
                    <div>
                      <h3 className={`text-2xl md:text-3xl font-black mb-2 transition-colors duration-300`} style={{ color: edu.color }}>
                        {edu.degree}
                      </h3>
                      <h4 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        {edu.institute}
                      </h4>
                      <p className="text-sm font-medium tracking-wide text-gray-500 uppercase mb-4">
                        {edu.location}
                      </p>
                    </div>
                    <span className="inline-block px-5 py-2 rounded-full font-bold tracking-wider text-sm whitespace-nowrap mt-4 md:mt-0"
                      style={{ 
                        backgroundColor: `${edu.color}15`, 
                        color: edu.color,
                        border: `1px solid ${edu.color}30` 
                      }}>
                      {edu.status}
                    </span>
                  </div>
                  
                  <p className={`leading-relaxed text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {edu.description}
                  </p>
                </MagneticCard>

              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
