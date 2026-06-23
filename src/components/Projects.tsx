import React, { useEffect, useRef, useState } from 'react';
import { FaExternalLinkAlt, FaGithub, FaRocket } from 'react-icons/fa';
import { useTheme } from '../ThemeContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useInView } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const TypewriterText = ({ text, delay = 0, startTyping }: { text: string, delay?: number, startTyping: boolean }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (!startTyping) return;
    
    let i = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayedText(text.substring(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(interval);
      }, 30);
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [text, delay, startTyping]);

  return <span>{displayedText}</span>;
};

const Projects: React.FC = () => {
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      title: 'BlinkTalker',
      status: 'Completed',
      category: 'Computer Vision Application',
      description: 'Blink Talker is a computer vision-based application that uses facial and eye-blink detection with MediaPipe and OpenCV to enable hands-free communication and interaction. A massive breakthrough for accessibility tech.',
      techStack: ['Python', 'OpenCV', 'MediaPipe', 'NumPy'],
      liveDemo: null,
      github: 'https://github.com/jvn-dev0/BlinkTalker.git',
      gradient: 'from-blue-500 to-cyan-400'
    },
    {
      title: 'Flux-financial-system',
      status: 'Completed',
      category: 'FinTech',
      description: 'Flux Financial System is a full-stack financial management web application that automates financial data processing, reporting, and spreadsheet integration using Flask and Python.',
      techStack: ['Python', 'Flask', 'HTML', 'CSS', 'JavaScript', 'Pandas', 'OpenPyXL', 'Google Sheets API', 'Gunicorn'],
      liveDemo: 'https://flux-financial-system.onrender.com/',
      github: 'https://github.com/jvn-dev0/flux-financial-system.git',
      gradient: 'from-emerald-400 to-teal-500'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray('.project-panel');
      
      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          // end calculation based on the total width to scroll
          end: () => "+=" + (containerRef.current?.offsetWidth || window.innerWidth * 3),
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // For the Glimpse card typing effect
  const glimpseRef = useRef<HTMLDivElement>(null);
  const isGlimpseInView = useInView(glimpseRef, { amount: 0.5 });

  return (
    <section 
      id="projects" 
      ref={sectionRef} 
      className="relative z-10 bg-[var(--color-dark-bg)] transition-colors duration-500 h-screen"
    >
      {/* Fixed Header that stays on screen while pinning */}
      <div className="absolute top-16 left-0 w-full text-center z-50 pointer-events-none">
        <h2 className={`text-5xl md:text-6xl font-black mb-4 tracking-tight ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Selected Projects
        </h2>
        <div className="w-24 h-1.5 mx-auto bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
      </div>

      {/* Horizontal Scroll Container Wrapper */}
      <div className="w-full h-full overflow-hidden flex flex-col justify-center">
        <div 
          ref={containerRef} 
          className="flex w-[300vw] h-full items-center"
        >
        
        {/* Project Panels */}
        {projects.map((project, index) => (
          <div key={index} className="project-panel w-screen h-full flex items-center justify-center px-6 md:px-24">
            <div className={`w-full max-w-6xl relative group`}>
              
              {/* Parallax Background Glow */}
              <div className={`absolute -inset-1 bg-gradient-to-r ${project.gradient} rounded-[2.5rem] blur-xl opacity-20 group-hover:opacity-50 transition duration-1000 group-hover:duration-200`}></div>
              
              <div className={`relative w-full h-[60vh] glass-panel rounded-[2rem] p-10 md:p-16 flex flex-col justify-between overflow-hidden border border-white/10 ${theme === 'dark' ? 'bg-[#0f0f13]/80' : 'bg-white/80'}`}>
                
                {/* Decorative Parallax Circles */}
                <div className={`absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-b ${project.gradient} rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob`}></div>
                
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <h3 className={`text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r ${project.gradient} drop-shadow-sm`}>
                      {project.title}
                    </h3>
                    <span className={`text-sm font-bold uppercase tracking-widest px-4 py-2 rounded-full ${theme === 'dark' ? 'bg-green-500/20 text-green-400 border-green-500/20' : 'bg-green-100 text-green-700 border-green-200'} border`}>
                      {project.status}
                    </span>
                  </div>
                  
                  <p className={`text-lg font-medium mb-8 tracking-wide uppercase ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{project.category}</p>
                  <p className={`text-xl leading-relaxed max-w-3xl mb-12 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-3 mb-8">
                    {project.techStack.map(tech => (
                      <span key={tech} className={`text-sm font-bold px-4 py-2 rounded-lg ${theme === 'dark' ? 'bg-white/10 text-white' : 'bg-black/5 text-black'}`}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-6 mt-auto pt-8 border-t border-white/10">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-3 text-lg font-bold hover:text-blue-400 transition-colors group/link ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                      <FaGithub size={24} className="group-hover/link:scale-110 transition-transform" />
                      Code Repository
                    </a>
                  )}
                  {project.liveDemo && (
                    <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-3 text-lg font-bold hover:text-blue-400 transition-colors group/link ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      <FaExternalLinkAlt size={22} className="group-hover/link:scale-110 transition-transform" />
                      Live Experience
                    </a>
                  )}
                </div>

              </div>
            </div>
          </div>
        ))}

        {/* The Glimpse Panel */}
        <div ref={glimpseRef} className="project-panel w-screen h-full flex items-center justify-center px-6 md:px-24">
          <div className="w-full max-w-5xl relative group">
            
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-500 rounded-[2.5rem] blur-xl opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
            
            <div className={`relative w-full h-[60vh] glass-panel rounded-[2rem] p-10 md:p-16 flex flex-col justify-center border border-purple-500/30 ${theme === 'dark' ? 'bg-[#0f0f13]/90' : 'bg-white/90'}`}>
              
              <div className="flex items-center gap-4 mb-8">
                <FaRocket className="text-purple-400 text-4xl animate-bounce" />
                <h3 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                  A Glimpse into the Future
                </h3>
              </div>

              <div className={`font-mono text-xl md:text-2xl leading-relaxed h-48 ${theme === 'dark' ? 'text-green-400' : 'text-purple-700'}`}>
                <p className="mb-4">
                  <TypewriterText 
                    startTyping={isGlimpseInView} 
                    text="> INITIALIZING NEURAL UPLINK..." 
                    delay={0} 
                  />
                </p>
                <p className="mb-4">
                  <TypewriterText 
                    startTyping={isGlimpseInView} 
                    text="> ACCESSING FUTURE_PROJECTS.MD" 
                    delay={1500} 
                  />
                </p>
                <p>
                  <TypewriterText 
                    startTyping={isGlimpseInView} 
                    text="> Next up: I'm currently designing an AI-driven platform that will revolutionize how developers interact with their codebases using advanced RAG and LLM agents. Stay tuned." 
                    delay={3000} 
                  />
                  {isGlimpseInView && <span className="animate-pulse ml-1 inline-block w-3 h-6 bg-current translate-y-1"></span>}
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
};

export default Projects;
