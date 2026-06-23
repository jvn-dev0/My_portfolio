import React, { useEffect, useState, useRef } from 'react';
import { useTheme } from '../ThemeContext';
import { useInView } from 'framer-motion';
import { StatsGrid } from './StatsGrid';

const p1 = "I am a highly motivated Full Stack Developer Intern with a deep passion for crafting modern, user-centric web applications. I have built a solid foundation in core web technologies including HTML, CSS, and JavaScript, while also gaining hands-on experience with object-oriented programming in Java and Python through academic and personal projects like ChronoBid.";

const p2 = "Currently, I am rapidly expanding my technical horizon. While I am actively exploring and learning advanced ecosystems like React.js, Next.js, and Node.js, I am simultaneously deepening my expertise in Core Java and Java Full Stack Development. My current focus is on mastering data structures, robust backend architectures, and scalable application design.";

const p3 = "I thrive on solving complex problems and continuously pushing the boundaries of my knowledge. My ultimate goal is to contribute to innovative, high-impact projects, gain invaluable real-world experience, and evolve into a truly versatile and exceptional software engineer.";

const About: React.FC = () => {
  const { theme } = useTheme();
  
  const [c1, setC1] = useState(0);
  const [c2, setC2] = useState(0);
  const [c3, setC3] = useState(0);

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    const speed = 15; // fast typing speed
    
    if (c1 < p1.length) {
      const t = setTimeout(() => setC1(c => c + 1), speed);
      return () => clearTimeout(t);
    } else if (c2 < p2.length) {
      const t = setTimeout(() => setC2(c => c + 1), speed);
      return () => clearTimeout(t);
    } else if (c3 < p3.length) {
      const t = setTimeout(() => setC3(c => c + 1), speed);
      return () => clearTimeout(t);
    }
  }, [c1, c2, c3, isInView]);

  return (
    <section id="about" className="py-24 relative z-10 transition-colors duration-500" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Title Section */}
        <div className="reveal text-center mb-16">
          <h2 className={`text-4xl md:text-6xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            A glimpse of who I am
          </h2>
          <div className="w-32 h-1.5 mx-auto bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"></div>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Profile Picture */}
          <div className="w-64 h-64 md:w-80 md:h-80 shrink-0 relative group perspective-1000">
            {/* Glow background */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-purple-600 rounded-3xl blur-2xl opacity-40 group-hover:opacity-70 transition-opacity duration-500"></div>
            
            {/* Image Container */}
            <div className="w-full h-full relative z-10 rounded-3xl overflow-hidden border-4 border-white/10 glass-panel shadow-2xl transition-transform duration-500 group-hover:scale-105 group-hover:rotate-1">
              <img 
                src="/assets/profile.jpg" 
                alt="Profile" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          </div>

          {/* Typewriter Text Content */}
          <div className={`flex-1 space-y-6 text-lg md:text-xl font-mono leading-relaxed ${theme === 'dark' ? 'text-cyan-100' : 'text-gray-800'}`}>
            
            <p className="min-h-[4rem]">
              {p1.substring(0, c1)}
              {c1 > 0 && c1 < p1.length && <span className="animate-pulse bg-cyan-400 w-2 h-5 inline-block ml-1 align-middle"></span>}
            </p>

            <p className="min-h-[4rem]">
              {p2.substring(0, c2)}
              {c1 === p1.length && c2 < p2.length && <span className="animate-pulse bg-cyan-400 w-2 h-5 inline-block ml-1 align-middle"></span>}
            </p>

            <p className="min-h-[4rem]">
              {p3.substring(0, c3)}
              {c2 === p2.length && c3 < p3.length && <span className="animate-pulse bg-cyan-400 w-2 h-5 inline-block ml-1 align-middle"></span>}
              {c3 === p3.length && <span className="animate-pulse bg-cyan-400 w-2 h-5 inline-block ml-1 align-middle"></span>}
            </p>

          </div>
        </div>

        <StatsGrid />

      </div>
    </section>
  );
};

export default About;
