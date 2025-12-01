'use client';
import { useState, useEffect } from 'react';
import { getSiteData, updateSiteData, uploadImage } from '@/lib/db';
import Image from 'next/image';

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  
  // DATA STATE
  const [data, setData] = useState({
    hero: { title: "", subtitle: "" },
    portfolio: [],
    blogs: []
  });

  const [activeTab, setActiveTab] = useState('hero'); // hero | portfolio | blogs

  // --- AUTH CHECK ---
  const handleLogin = (e) => {
    e.preventDefault();
    if (pass === '1234') { // <--- CHANGE THIS PIN LATER
      setIsAuthenticated(true);
      fetchData();
    } else {
      alert("Access Denied: Incorrect Protocol");
    }
  };

  // --- LOAD DATA ---
  async function fetchData() {
    setLoading(true);
    const dbData = await getSiteData();
    setData(dbData);
    setLoading(false);
  }

  // --- SAVE DATA ---
  async function handleSave() {
    setLoading(true);
    await updateSiteData(data);
    alert("✅ SYSTEM UPDATED SUCCESSFULLY");
    setLoading(false);
  }

  // --- IMAGE UPLOADER HANDLER ---
  const handleImageUpload = async (e, section, index = null) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadImage(file);
      
      if (section === 'portfolio') {
        const newPortfolio = [...data.portfolio];
        newPortfolio[index].image = url;
        setData({ ...data, portfolio: newPortfolio });
      } else if (section === 'blogs') {
        const newBlogs = [...data.blogs];
        newBlogs[index].image = url;
        setData({ ...data, blogs: newBlogs });
      }
    } catch (err) {
      alert("Upload Failed");
    }
    setUploading(false);
  };

  // --- UI RENDERERS ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <form onSubmit={handleLogin} className="bg-gray-900 p-8 rounded-xl border border-gray-800 text-center">
          <h1 className="text-2xl font-bold font-display mb-4">COMMAND CENTER</h1>
          <input 
            type="password" 
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="Enter Access Code"
            className="bg-black border border-gray-700 p-2 rounded text-white text-center mb-4 w-full"
          />
          <button type="submit" className="bg-blue-600 w-full py-2 rounded font-bold hover:bg-blue-500">UNLOCK</button>
        </form>
      </div>
    );
  }

  if (loading && !data.hero.title) return <div className="text-white text-center mt-20">ESTABLISHING CONNECTION...</div>;

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-20">
      {/* HEADER */}
      <div className="max-w-5xl mx-auto flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
        <h1 className="text-3xl font-bold font-display text-blue-500">ADMIN DASHBOARD</h1>
        <button onClick={handleSave} className="bg-green-600 hover:bg-green-500 px-6 py-2 rounded font-bold">
          {loading ? "SAVING..." : "SAVE CHANGES"}
        </button>
      </div>

      {/* TABS */}
      <div className="max-w-5xl mx-auto mb-8 flex gap-4">
        {['hero', 'portfolio', 'blogs'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded uppercase font-bold ${activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="max-w-5xl mx-auto bg-gray-900 p-8 rounded-xl border border-gray-800">
        
        {/* --- HERO EDIT --- */}
        {activeTab === 'hero' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4 text-gray-400">Homepage Details</h2>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Main Title</label>
              <input 
                value={data.hero?.title || ""} 
                onChange={(e) => setData({...data, hero: { ...data.hero, title: e.target.value }})}
                className="w-full bg-black border border-gray-700 p-3 rounded text-white" 
              />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Subtitle</label>
              <input 
                value={data.hero?.subtitle || ""} 
                onChange={(e) => setData({...data, hero: { ...data.hero, subtitle: e.target.value }})}
                className="w-full bg-black border border-gray-700 p-3 rounded text-white" 
              />
            </div>
          </div>
        )}

        {/* --- PORTFOLIO EDIT --- */}
        {activeTab === 'portfolio' && (
          <div>
             <div className="flex justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-400">Projects ({data.portfolio?.length || 0})</h2>
                <button 
                  onClick={() => setData({...data, portfolio: [...(data.portfolio || []), { title: "New Project", category: "Web", image: "", desc: "Description..." }]})}
                  className="bg-blue-600 px-3 py-1 rounded text-sm font-bold"
                >
                  + Add Project
                </button>
             </div>
             
             <div className="space-y-6">
               {data.portfolio?.map((item, index) => (
                 <div key={index} className="bg-black p-4 rounded border border-gray-800 flex flex-col md:flex-row gap-4">
                   {/* Image Upload */}
                   <div className="w-32 h-32 bg-gray-900 flex-shrink-0 relative border border-gray-700 flex items-center justify-center overflow-hidden">
                      {item.image ? (
                        <img src={item.image} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-xs text-gray-500 text-center p-2">No Image</span>
                      )}
                      <input 
                        type="file" 
                        onChange={(e) => handleImageUpload(e, 'portfolio', index)}
                        className="absolute inset-0 opacity-0 cursor-pointer" 
                      />
                      {uploading && <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-xs">...</div>}
                   </div>

                   {/* Fields */}
                   <div className="flex-grow space-y-2">
                      <input 
                        value={item.title} 
                        onChange={(e) => {
                          const list = [...data.portfolio]; list[index].title = e.target.value; setData({...data, portfolio: list});
                        }}
                        className="w-full bg-gray-900 border border-gray-700 p-2 rounded text-white font-bold"
                        placeholder="Project Title"
                      />
                       <input 
                        value={item.category} 
                        onChange={(e) => {
                          const list = [...data.portfolio]; list[index].category = e.target.value; setData({...data, portfolio: list});
                        }}
                        className="w-full bg-gray-900 border border-gray-700 p-2 rounded text-white text-sm"
                        placeholder="Category (e.g., Web App)"
                      />
                      <textarea 
                        value={item.desc} 
                        onChange={(e) => {
                          const list = [...data.portfolio]; list[index].desc = e.target.value; setData({...data, portfolio: list});
                        }}
                        className="w-full bg-gray-900 border border-gray-700 p-2 rounded text-white text-sm"
                        placeholder="Short Description"
                        rows="2"
                      />
                   </div>

                   {/* Delete */}
                   <button 
                      onClick={() => {
                         const list = data.portfolio.filter((_, i) => i !== index);
                         setData({...data, portfolio: list});
                      }}
                      className="text-red-500 hover:text-red-400 font-bold text-xs self-start"
                   >
                     DELETE
                   </button>
                 </div>
               ))}
             </div>
          </div>
        )}

        {/* --- BLOGS EDIT --- */}
        {activeTab === 'blogs' && (
          <div>
             <div className="flex justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-400">Articles ({data.blogs?.length || 0})</h2>
                <button 
                  onClick={() => setData({...data, blogs: [...(data.blogs || []), { title: "New Article", date: "Oct 2025", image: "", content: "Write here..." }]})}
                  className="bg-blue-600 px-3 py-1 rounded text-sm font-bold"
                >
                  + Add Article
                </button>
             </div>

             <div className="space-y-6">
               {data.blogs?.map((item, index) => (
                 <div key={index} className="bg-black p-4 rounded border border-gray-800 flex flex-col gap-4">
                   <div className="flex gap-4">
                       <div className="w-24 h-24 bg-gray-900 flex-shrink-0 relative border border-gray-700 flex items-center justify-center overflow-hidden">
                          {item.image ? <img src={item.image} alt="Preview" className="w-full h-full object-cover" /> : <span className="text-xs">Upload</span>}
                          <input type="file" onChange={(e) => handleImageUpload(e, 'blogs', index)} className="absolute inset-0 opacity-0 cursor-pointer" />
                       </div>
                       <div className="flex-grow space-y-2">
                          <input 
                            value={item.title} 
                            onChange={(e) => { const list = [...data.blogs]; list[index].title = e.target.value; setData({...data, blogs: list}); }}
                            className="w-full bg-gray-900 border border-gray-700 p-2 rounded text-white font-bold"
                            placeholder="Blog Title"
                          />
                          <input 
                            value={item.date} 
                            onChange={(e) => { const list = [...data.blogs]; list[index].date = e.target.value; setData({...data, blogs: list}); }}
                            className="w-full bg-gray-900 border border-gray-700 p-2 rounded text-white text-sm"
                            placeholder="Date"
                          />
                       </div>
                        <button 
                          onClick={() => { const list = data.blogs.filter((_, i) => i !== index); setData({...data, blogs: list}); }}
                          className="text-red-500 font-bold text-xs"
                        >
                          DELETE
                        </button>
                   </div>
                   <textarea 
                      value={item.content} 
                      onChange={(e) => { const list = [...data.blogs]; list[index].content = e.target.value; setData({...data, blogs: list}); }}
                      className="w-full bg-gray-900 border border-gray-700 p-2 rounded text-white text-sm font-mono"
                      placeholder="Article content..."
                      rows="4"
                    />
                 </div>
               ))}
             </div>
          </div>
        )}

      </div>
    </div>
  );
}