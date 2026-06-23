import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[var(--color-dark-bg)] border-t border-[var(--color-glass-border)] py-12 relative z-10 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="text-center md:text-left">
          <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Jeevan Babu K B</h3>
          <p className="text-[var(--text-secondary)] text-sm">Designing Tomorrow Through Code.</p>
        </div>

        <div className="flex gap-4">
          <a href="https://github.com/jvn-dev0" target="_blank" rel="noopener noreferrer" className="p-3 glass-panel rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-blue-400 transition-all group">
            <FaGithub size={20} className="group-hover:scale-110 transition-transform" />
          </a>
          <a href="https://www.linkedin.com/in/jeevan-babu-b66584315" target="_blank" rel="noopener noreferrer" className="p-3 glass-panel rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-blue-400 transition-all group">
            <FaLinkedin size={20} className="group-hover:scale-110 transition-transform" />
          </a>
        </div>

        <div className="text-[var(--text-secondary)] text-sm text-center md:text-right">
          <p>&copy; {new Date().getFullYear()} JVN dev. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
