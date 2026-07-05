import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { db } from '../firebase';

interface BlogPost {
  id: string;
  title: string;
  description: string;
  date: string;
  image: string;
}

const DailyBlog: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "dailyLogs"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const posts: BlogPost[] = [];
      querySnapshot.forEach((doc) => {
        posts.push({ id: doc.id, ...doc.data() } as BlogPost);
      });
      setBlogs(posts);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <section id="blog" className="py-24 relative z-10 bg-[var(--color-dark-bg)] transition-colors duration-500 overflow-hidden">
      <div className="reveal max-w-7xl mx-auto px-6 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Daily Log
          </h2>
          <p className="text-[var(--text-secondary)] mt-4 text-lg">What I've been building lately.</p>
        </div>
        <Link to="/notes" className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] self-start md:self-auto flex items-center gap-2">
          View Technical Notes <span>&rarr;</span>
        </Link>
      </div>

      {/* Horizontal scroll container */}
      <div className="reveal flex overflow-x-auto gap-8 px-6 pb-8 snap-x snap-mandatory scrollbar-hide max-w-7xl mx-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {loading ? (
          <div className="w-full text-center py-20 text-gray-500 font-mono animate-pulse">
            &gt; F E T C H I N G   L O G S . . .
          </div>
        ) : blogs.length === 0 ? (
          <div className="w-full text-center py-20 text-gray-500 font-mono">
            &gt; N O   L O G S   F O U N D .
          </div>
        ) : (
          blogs.map(blog => (
            <div key={blog.id} className="min-w-[300px] md:min-w-[400px] snap-center glass-panel rounded-3xl overflow-hidden group hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(37,99,235,0.2)] transition-all duration-300 flex flex-col cursor-pointer">
              <div className="h-48 overflow-hidden relative">
                <div className="absolute inset-0 bg-blue-500/20 mix-blend-overlay z-10 group-hover:bg-transparent transition-colors duration-500"></div>
                <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <span className="text-blue-400 text-xs font-mono tracking-wider">{blog.date}</span>
                <h3 className="text-xl font-bold text-[var(--text-primary)] mt-2 mb-3 group-hover:text-blue-400 transition-colors">{blog.title}</h3>
                <p className="text-[var(--text-secondary)] text-sm flex-grow">{blog.description}</p>
              </div>
            </div>
          ))
        )}
      </div>
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
      `}</style>
    </section>
  );
};

export default DailyBlog;
