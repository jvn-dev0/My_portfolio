import React, { useState } from 'react';
import { useTheme } from '../ThemeContext';
import { db, storage } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Note: We use ImgBB for free image hosting instead of Firebase Storage
const IMGBB_API_KEY = "532275cc103b7b9a424b03f219e1c64a";

const Admin = () => {
  const { theme } = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Post State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>("");

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    // Hardcoded simple authentication
    if (username === "admin" && password === "jvndeveloper") {
      setIsLoggedIn(true);
    } else {
      setError("Invalid username or password.");
    }
    setLoading(false);
  };

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !imageFile) {
      setError("Please fill out all fields and attach an image.");
      return;
    }

    setUploadStatus("Uploading Image to ImgBB...");
    setError("");

    try {
      // 1. Upload Image to ImgBB
      const formData = new FormData();
      formData.append("image", imageFile);
      
      const imgbbRes = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: "POST",
        body: formData
      });
      
      const imgbbData = await imgbbRes.json();
      if (!imgbbData.success) {
        throw new Error(imgbbData.error.message || "Failed to upload image to ImgBB");
      }
      
      const downloadURL = imgbbData.data.url;

      // 2. Save Data to Firestore
      setUploadStatus("Saving to Firestore Database...");
      await addDoc(collection(db, "dailyLogs"), {
        title,
        description,
        image: downloadURL,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        timestamp: serverTimestamp()
      });

      // Reset form
      setTitle("");
      setDescription("");
      setImageFile(null);
      setUploadStatus("");
      alert("Successfully published to your portfolio!");
    } catch (err: any) {
      console.error("Upload Error: ", err);
      setError("Failed to publish: " + err.message);
      setUploadStatus("");
    }
  };

  // If not logged in, show Auth Screen
  if (!isLoggedIn) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-[#030305]' : 'bg-[#f8fafc]'}`}>
        <div className={`w-full max-w-md p-8 rounded-2xl glass-panel border ${theme === 'dark' ? 'border-white/10 bg-[#0a0a0f]' : 'border-black/10 bg-white'}`}>
          <h2 className="text-3xl font-black text-center mb-8">Admin Access</h2>
          
          {error && <div className="bg-red-500/20 text-red-500 p-3 rounded-lg mb-6 text-sm">{error}</div>}

          <form onSubmit={handleAuth} className="space-y-6">
            <div>
              <label className="block text-sm font-bold mb-2">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 rounded-lg bg-black/20 border border-white/10 text-white focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-lg bg-black/20 border border-white/10 text-white focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-500 font-bold transition-all disabled:opacity-50"
            >
              {loading ? "Authenticating..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Logged in Dashboard
  return (
    <div className={`min-h-screen p-8 md:p-16 ${theme === 'dark' ? 'bg-[#030305]' : 'bg-[#f8fafc]'}`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-black">Dashboard</h1>
          <button 
            onClick={() => setIsLoggedIn(false)}
            className="px-6 py-2 rounded-full bg-red-500/20 text-red-500 font-bold hover:bg-red-500/30 transition-all"
          >
            Sign Out
          </button>
        </div>

        <div className={`p-8 rounded-2xl glass-panel border ${theme === 'dark' ? 'border-white/10 bg-[#0a0a0f]' : 'border-black/10 bg-white'}`}>
          <h2 className="text-2xl font-bold mb-8">Post a Daily Log</h2>
          
          {error && <div className="bg-red-500/20 text-red-500 p-3 rounded-lg mb-6 text-sm">{error}</div>}

          <form onSubmit={handlePostSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold mb-2">Project / Task Title</label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Built an AI chatbot"
                className="w-full p-3 rounded-lg bg-black/20 border border-white/10 text-white focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold mb-2">Description</label>
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What did you work on today?"
                rows={4}
                className="w-full p-3 rounded-lg bg-black/20 border border-white/10 text-white focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Proof of Work (Image)</label>
              <input 
                type="file" 
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setImageFile(e.target.files[0]);
                  }
                }}
                className="w-full p-3 rounded-lg bg-black/20 border border-white/10 text-gray-400 focus:outline-none"
                required
              />
            </div>
            
            <button 
              type="submit" 
              disabled={!!uploadStatus}
              className="w-full py-4 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 font-bold transition-all text-xl disabled:opacity-50"
            >
              {uploadStatus ? uploadStatus : "Publish Post"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Admin;
