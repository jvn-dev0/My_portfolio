import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
import Navbar from './components/Navbar';
import Hero3D from './components/Hero3D';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import DailyBlog from './components/DailyBlog';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Admin from './components/Admin';
import NotesPage from './components/NotesPage';
import { ThemeProvider } from './ThemeContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Portfolio = () => {
  const pipeRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pipeRef.current) {
      gsap.to(pipeRef.current, {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
        }
      });
    }
  }, []);

  return (
    <div className="relative w-full">
      {/* Background Neon Pipe */}
      <div className="absolute left-4 md:left-10 top-0 bottom-0 w-[2px] md:w-[3px] bg-white/5 z-0 pointer-events-none hidden sm:block">
        <div ref={pipeRef} className="w-full h-0 bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-600 shadow-[0_0_20px_rgba(6,182,212,1),0_0_40px_rgba(168,85,247,0.5)] rounded-full relative">
          {/* Glowing dot at the end of the pipe */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,1)]"></div>
        </div>
      </div>

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero3D />
          <About />
          <Skills />
          <Projects />
          <Education />
          <DailyBlog />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
};

function App() {
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach((el) => {
      gsap.fromTo(el, 
        { y: 60, opacity: 0 }, 
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen font-sans text-white transition-colors duration-500 selection:bg-blue-500/30 selection:text-blue-200">
          <Routes>
            <Route path="/" element={<Portfolio />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/notes" element={<NotesPage />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
