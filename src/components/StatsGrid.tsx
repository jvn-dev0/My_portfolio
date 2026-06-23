import React, { useRef, useState, ReactNode } from 'react';
import { useTheme } from '../ThemeContext';
import { Code2, Briefcase, MapPin, Rocket, Sparkles } from 'lucide-react';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
}

const TiltCard: React.FC<TiltCardProps> = ({ children, className = '' }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const { theme } = useTheme();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element.
    const y = e.clientY - rect.top;  // y position within the element.
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateXValue = ((y - centerY) / centerY) * -10; // Max rotation 10deg
    const rotateYValue = ((x - centerX) / centerX) * 10;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div 
      className={`relative group perspective-1000 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        ref={cardRef}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: 'transform 0.1s ease-out'
        }}
        className={`w-full h-full p-6 rounded-2xl glass-panel border border-white/5 shadow-xl flex flex-col justify-center relative overflow-hidden ${theme === 'dark' ? 'bg-[#0a0a0f]/80' : 'bg-white/80'}`}
      >
        {/* Hover Glow Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 pointer-events-none"></div>
        {children}
      </div>
    </div>
  );
};

export const StatsGrid: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <div className="max-w-6xl mx-auto px-6 mt-16 pb-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Domain */}
        <TiltCard>
          <div className="flex items-center gap-3 mb-2 opacity-70">
            <Code2 size={16} className="text-cyan-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Domain</span>
          </div>
          <h3 className={`text-3xl md:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500`}>
            Full Stack
          </h3>
        </TiltCard>

        {/* Experience */}
        <TiltCard>
          <div className="flex items-center gap-3 mb-2 opacity-70">
            <Briefcase size={16} className="text-purple-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Experience</span>
          </div>
          <h3 className={`text-3xl md:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500`}>
            Fresher
          </h3>
        </TiltCard>

        {/* Projects */}
        <TiltCard>
          <div className="flex items-center gap-3 mb-2 opacity-70">
            <Rocket size={16} className="text-green-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Projects</span>
          </div>
          <h3 className={`text-3xl md:text-4xl font-black ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            2<span className="text-cyan-400">+</span>
          </h3>
        </TiltCard>

        {/* Location */}
        <TiltCard>
          <div className="flex items-center gap-3 mb-2 opacity-70">
            <MapPin size={16} className="text-red-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Location</span>
          </div>
          <h3 className={`text-3xl md:text-4xl font-black ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            India
          </h3>
        </TiltCard>

        {/* Currently Learning (Spans 2 columns) */}
        <TiltCard className="md:col-span-2">
          <div className="flex items-center gap-3 mb-3 opacity-70">
            <Sparkles size={16} className="text-yellow-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Currently Learning</span>
          </div>
          <h3 className={`text-2xl md:text-3xl font-bold flex flex-wrap gap-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
            <span>Core Java</span>
            <span className="text-cyan-500 font-black">·</span>
            <span>Java Full Stack</span>
            <span className="text-purple-500 font-black">·</span>
            <span>DSA</span>
          </h3>
        </TiltCard>

      </div>
    </div>
  );
};
