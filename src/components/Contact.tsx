import React, { useState } from 'react';
import { Handshake, Sparkles, MessageCircle, FileText, Mail, MapPin, Send } from 'lucide-react';
import { useTheme } from '../ThemeContext';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const Contact: React.FC = () => {
  const { theme } = useTheme();
  
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'messages'), {
        ...formData,
        timestamp: serverTimestamp()
      });
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error("Error sending message:", error);
      setSubmitStatus('error');
    }
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-24 relative z-10 transition-colors duration-500">
      <div className="max-w-6xl mx-auto px-6">
        <div className={`glass-panel rounded-3xl p-8 md:p-16 relative overflow-hidden ${theme === 'dark' ? 'border-white/10 bg-[#0a0a0f]' : 'border-black/10 bg-white/50'}`}>
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/20 blur-[120px] pointer-events-none"></div>
          <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/20 blur-[120px] pointer-events-none"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side: Animation */}
            <div className="relative flex justify-center items-center h-80 lg:h-full order-2 lg:order-1">
              {/* Pulsing rings */}
              <div className="absolute w-48 h-48 bg-gradient-to-tr from-cyan-500/30 to-purple-500/30 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
              <div className="absolute w-64 h-64 border border-cyan-500/20 rounded-full animate-pulse"></div>
              <div className="absolute w-80 h-80 border border-purple-500/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              
              {/* Handshake Container */}
              <div className="relative z-10 bg-gradient-to-br from-cyan-500 to-purple-600 p-8 rounded-3xl shadow-2xl animate-float">
                <Handshake size={90} color="white" strokeWidth={1.5} className="animate-shake" />
              </div>

              {/* Floating Sparkles */}
              <Sparkles className="absolute top-1/4 left-1/4 text-yellow-400 animate-bounce" size={28} />
              <Sparkles className="absolute bottom-1/4 right-1/4 text-cyan-400 animate-pulse" size={36} />
              <Sparkles className="absolute top-1/2 right-1/4 text-purple-400 animate-bounce" style={{ animationDelay: '0.5s' }} size={20} />
            </div>

            {/* Right Side: Content */}
            <div className="text-center lg:text-left relative z-10 order-1 lg:order-2">
              <h2 className={`text-5xl md:text-6xl font-black mb-6 tracking-tight ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Let's work <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">together</span>
              </h2>
              <p className={`text-xl mb-10 max-w-lg mx-auto lg:mx-0 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                I'm open for internships, collaborations, and freelance opportunities. Let's build something impactful.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a href="#get-in-touch" className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] hover:-translate-y-1">
                  <MessageCircle size={20} />
                  <span>Start a conversation</span>
                </a>
                <a href="https://drive.google.com/file/d/1o17huCFQ7lFB0nQYIp-bKnka68QwlwJ3/view?usp=sharing" target="_blank" rel="noopener noreferrer" className={`flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold transition-all border hover:-translate-y-1 ${theme === 'dark' ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-black/5 border-black/10 text-gray-900 hover:bg-black/10'}`}>
                  <FileText size={20} />
                  <span>Download Resume</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Get in Touch Section */}
      <div id="get-in-touch" className="max-w-6xl mx-auto px-6 mt-32">
        <div className="text-center mb-16">
          <p className="text-cyan-400 font-bold tracking-widest uppercase mb-4 text-sm">06 - Contact</p>
          <h2 className={`text-4xl md:text-5xl font-black ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Get in touch
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: 3D Image */}
          <div className="relative flex justify-center items-center">
            <div className="absolute w-[120%] h-[120%] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none"></div>
            <img 
              src="/contact_3d_phone.png" 
              alt="Contact 3D Illustration" 
              className="w-full max-w-md relative z-10 drop-shadow-2xl animate-float rounded-2xl"
            />
          </div>

          {/* Right: Contact Details */}
          <div className="space-y-4">
            
            <a href="mailto:kbjeevanbabu803@gmail.com" className={`flex items-center gap-6 p-6 rounded-2xl transition-all border hover:-translate-y-1 ${theme === 'dark' ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-black/5 border-black/10 hover:bg-black/10'}`}>
              <div className="w-14 h-14 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                <Mail size={24} />
              </div>
              <div>
                <p className={`text-xs font-bold tracking-wider uppercase mb-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>Email</p>
                <p className={`text-lg font-bold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>kbjeevanbabu803@gmail.com</p>
              </div>
            </a>

            <div className={`flex items-center gap-6 p-6 rounded-2xl transition-all border ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}>
              <div className="w-14 h-14 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <p className={`text-xs font-bold tracking-wider uppercase mb-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>Location</p>
                <p className={`text-lg font-bold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>Nelamangala, Karnataka, India</p>
              </div>
            </div>

            <a href="https://github.com/jvn-dev0" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-6 p-6 rounded-2xl transition-all border hover:-translate-y-1 ${theme === 'dark' ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-black/5 border-black/10 hover:bg-black/10'}`}>
              <div className="w-14 h-14 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              </div>
              <div>
                <p className={`text-xs font-bold tracking-wider uppercase mb-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>Github</p>
                <p className={`text-lg font-bold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>@jvn-dev0</p>
              </div>
            </a>

            <a href="https://www.linkedin.com/in/jeevan-babu-b66584315/" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-6 p-6 rounded-2xl transition-all border hover:-translate-y-1 ${theme === 'dark' ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-black/5 border-black/10 hover:bg-black/10'}`}>
              <div className="w-14 h-14 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </div>
              <div>
                <p className={`text-xs font-bold tracking-wider uppercase mb-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>Linkedin</p>
                <p className={`text-lg font-bold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>Jeevan Babu</p>
              </div>
            </a>

          </div>
        </div>

        {/* Unique Contact Form */}
        <div className="mt-24 max-w-5xl mx-auto">
          <div className={`glass-panel rounded-3xl p-8 md:p-16 relative overflow-hidden ${theme === 'dark' ? 'border-white/10 bg-[#0a0a0f]' : 'border-black/10 bg-white/50'}`}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[80px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 blur-[80px] pointer-events-none"></div>
            
            <form onSubmit={handleSubmit} className="relative z-10">
              <h3 className={`text-2xl md:text-4xl font-bold mb-12 leading-[2.5] tracking-wide text-left md:text-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Hello Jeevan! 👋 My name is <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  placeholder="Your Name"
                  className={`inline-block bg-transparent border-b-4 border-dashed border-cyan-500/50 focus:border-cyan-400 focus:border-solid outline-none text-center min-w-[200px] md:min-w-[250px] w-auto px-2 py-1 mx-2 transition-all placeholder:text-gray-500 ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-600'}`}
                /> 
                and I'd like to talk to you about <input 
                  type="text" 
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  required
                  placeholder="a project or idea"
                  className={`inline-block bg-transparent border-b-4 border-dashed border-purple-500/50 focus:border-purple-400 focus:border-solid outline-none text-center min-w-[250px] md:min-w-[320px] w-auto px-2 py-1 mx-2 transition-all placeholder:text-gray-500 mt-4 md:mt-0 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}
                />.
                You can reach me back at <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  placeholder="your@email.com"
                  className={`inline-block bg-transparent border-b-4 border-dashed border-blue-500/50 focus:border-blue-400 focus:border-solid outline-none text-center min-w-[250px] md:min-w-[320px] w-auto px-2 py-1 mx-2 transition-all placeholder:text-gray-500 mt-4 md:mt-0 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}
                />.
              </h3>

              <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/10">
                <div className="text-center sm:text-left">
                  {submitStatus === 'success' && <p className="text-green-400 font-bold text-xl">Message sent successfully! 🚀</p>}
                  {submitStatus === 'error' && <p className="text-red-400 font-bold text-xl">Failed to send. Try again later.</p>}
                  {submitStatus === 'idle' && <p className={`font-medium ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>I typically reply within 24 hours.</p>}
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="flex items-center gap-3 px-10 py-5 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white text-xl font-bold transition-all shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed group w-full sm:w-auto justify-center"
                >
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                  <Send size={24} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Contact;
