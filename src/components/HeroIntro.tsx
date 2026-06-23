import React, { useEffect, useState } from 'react';
import { useTheme } from '../ThemeContext';

export const HeroIntro: React.FC = () => {
  const { theme } = useTheme();
  const [text, setText] = useState('');
  const fullText = "Full Stack Developer";

  // Typing effect
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative z-10 max-w-7xl mx-auto w-full px-6 pt-40 pb-16 min-h-[60vh] flex flex-col md:flex-row items-center justify-between gap-12">
      
      {/* Left Content */}
      <div className="flex-1 flex flex-col items-start justify-center text-left">
        <h1 className={`text-5xl md:text-6xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Hi, I'm
        </h1>
        <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-1 drop-shadow-sm">
          Jeevan
        </h1>
        <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-6 drop-shadow-sm">
          Babu
        </h1>
        
        <h2 className={`text-2xl md:text-3xl font-mono mb-6 h-10 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
          {text}<span className="animate-pulse">|</span>
        </h2>
        
        <p className={`text-lg md:text-xl max-w-xl mb-10 leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          Designing Tomorrow Through Code. A Software Developer Intern focused on building scalable full-stack experiences.
        </p>
        
        <div className="flex flex-wrap gap-4">
          <a href="#projects" className="px-8 py-3 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 text-white font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_20px_rgba(168,85,247,0.4)]">
            View Projects
          </a>
          <a href="#contact" className={`px-8 py-3 rounded-full border-2 font-bold text-lg hover:scale-105 transition-transform ${theme === 'dark' ? 'border-white text-white hover:bg-white hover:text-black' : 'border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white'}`}>
            Get in Touch
          </a>
        </div>
      </div>

      {/* Right Content - Flipping Circle */}
      <div className="flex-1 flex justify-center items-center">
        <div className="group relative w-64 h-64 md:w-80 md:h-80 [perspective:1000px] cursor-pointer">
          <div className="w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] rounded-full shadow-[0_0_50px_rgba(6,182,212,0.5)]">
            
            {/* Front Face: Status */}
            <div className="absolute inset-0 [backface-visibility:hidden] flex flex-col items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 border-4 border-white/20">
              <span className="text-6xl md:text-8xl font-serif font-black text-black tracking-tighter drop-shadow-md">
                JB
              </span>
              <div className="absolute top-8 right-4 md:right-8 bg-black/40 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 shadow-lg">
                <span className="block text-xs text-gray-300 font-semibold uppercase tracking-wider">Status</span>
                <span className="block text-sm text-green-400 font-bold">Available</span>
              </div>
            </div>

            {/* Back Face: Domain */}
            <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col items-center justify-center rounded-full bg-gradient-to-bl from-purple-500 to-cyan-400 border-4 border-white/20">
              <span className="text-6xl md:text-8xl font-serif font-black text-black tracking-tighter drop-shadow-md">
                JB
              </span>
              <div className="absolute bottom-8 left-4 md:left-8 bg-black/40 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 shadow-lg text-center">
                <span className="block text-xs text-gray-300 font-semibold uppercase tracking-wider">Domain</span>
                <span className="block text-sm text-cyan-300 font-bold">Full Stack Dev</span>
              </div>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
};
