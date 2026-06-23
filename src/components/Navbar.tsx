import React from 'react';
import { useTheme } from '../ThemeContext';
import { Moon, Sun } from 'lucide-react';

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass-panel border-b border-[var(--color-glass-border)] transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="text-3xl md:text-4xl font-extrabold tracking-tighter text-[var(--text-primary)] hover:text-blue-400 transition-colors">
          JVN <span className="text-blue-500">dev</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#about" className="text-lg font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">About</a>
          <a href="#skills" className="text-lg font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">Skills</a>
          <a href="#projects" className="text-lg font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">Projects</a>
          <a href="#education" className="text-lg font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">Academic Journey</a>
          <a href="#blog" className="text-lg font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">Blog</a>
          
          <button 
            onClick={toggleTheme} 
            className="p-3 rounded-full glass-panel hover:bg-white/10 transition-colors"
            title="Toggle Light/Dark Mode"
          >
            {theme === 'dark' ? <Sun size={24} className="text-yellow-400" /> : <Moon size={24} className="text-blue-600" />}
          </button>

          <a 
            href="https://drive.google.com/file/d/1o17huCFQ7lFB0nQYIp-bKnka68QwlwJ3/view?usp=sharing" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-lg font-bold transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)]"
          >
            Download Resume
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
