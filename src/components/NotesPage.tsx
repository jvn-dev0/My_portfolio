import React, { useEffect } from 'react';
import { useTheme } from '../ThemeContext';
import { ArrowLeft, ZoomIn } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotesPage: React.FC = () => {
  const { theme } = useTheme();

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const notes = [
    {
      id: 1,
      title: "Types of Inheritance in Java",
      category: "Java Programming",
      date: "July 2026",
      // Since we don't have the image file hosted yet, we use a placeholder 
      // or direct the user to upload it to their public folder.
      imageUrl: "/java-inheritance.png", 
      description: "A detailed visual guide on single, multilevel, hierarchical, multiple (via interfaces), and hybrid inheritance in Java."
    }
  ];

  return (
    <div className={`min-h-screen pt-24 pb-20 ${theme === 'dark' ? 'bg-[#0a0a0c] text-white' : 'bg-gray-50 text-gray-900'} transition-colors duration-500`}>
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex items-center gap-4 mb-12">
          <Link to="/" className={`p-3 rounded-full flex items-center justify-center transition-all ${theme === 'dark' ? 'bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-600 hover:text-gray-900'}`}>
            <ArrowLeft size={24} />
          </Link>
          <div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              My Technical Notes
            </h1>
            <p className={`mt-2 text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Visual summaries, mind maps, and quick references.
            </p>
          </div>
        </div>

        {/* Masonry/Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {notes.map((note) => (
            <div key={note.id} className={`group relative rounded-[2rem] overflow-hidden border transition-all duration-500 hover:-translate-y-2 ${theme === 'dark' ? 'bg-[#121217] border-white/10 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]' : 'bg-white border-gray-200 hover:border-blue-500/30 hover:shadow-xl'}`}>
              
              {/* Image Container */}
              <div className="relative w-full aspect-[4/5] bg-gray-900 overflow-hidden cursor-pointer">
                {/* Fallback styling in case image is missing */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-500 flex-col text-center p-6">
                  <span className="text-4xl mb-4">🖼️</span>
                </div>
                
                <img 
                  src={note.imageUrl} 
                  alt={note.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 z-10"
                  onError={(e) => {
                    // Hide image if it fails to load so the fallback text shows
                    (e.target as HTMLImageElement).style.opacity = '0';
                  }}
                  onLoad={(e) => {
                    (e.target as HTMLImageElement).style.opacity = '1';
                  }}
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex flex-col justify-end p-8">
                  <div className="w-12 h-12 bg-blue-500/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white mx-auto mb-auto mt-4 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 opacity-0 group-hover:opacity-100">
                    <ZoomIn size={24} />
                  </div>
                </div>
              </div>

              {/* Note Details */}
              <div className="p-8">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${theme === 'dark' ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                    {note.category}
                  </span>
                  <span className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                    {note.date}
                  </span>
                </div>
                <h3 className={`text-2xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {note.title}
                </h3>
                <p className={`leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {note.description}
                </p>
              </div>
              
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default NotesPage;
