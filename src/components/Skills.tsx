import React from 'react';
import { useTheme } from '../ThemeContext';
import { TechSphere } from './TechSphere';

const Skills: React.FC = () => {
  const { theme } = useTheme();
  
  const skillCategories = [
    {
      title: "Frontend & UI",
      skills: ["React", "HTML5/CSS3", "JavaScript", "Tailwind CSS", "Three.js", "GSAP"]
    },
    {
      title: "Backend & Systems",
      skills: ["Python", "Flask", "Gunicorn", "REST APIs", "Google Sheets API"]
    },
    {
      title: "Data & Machine Learning",
      skills: ["Pandas", "NumPy", "OpenCV", "MediaPipe", "Computer Vision"]
    },
    {
      title: "Tools & DevOps",
      skills: ["Git", "GitHub", "Render (Deployment)", "Vite"]
    }
  ];

  return (
    <section id="skills" className="py-24 relative z-10 bg-[var(--color-dark-bg)] transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6">
        <div className="reveal text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Tech I work with
          </h2>
          <div className="w-32 h-1.5 mx-auto bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"></div>
        </div>

        <div className="reveal flex justify-center items-center w-full min-h-[500px]">
          <TechSphere />
        </div>
      </div>
    </section>
  );
};

export default Skills;
