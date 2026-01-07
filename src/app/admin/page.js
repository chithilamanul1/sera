'use client';
import { useState, useEffect } from 'react';
import { getSiteData, updateSiteData, uploadImage } from '@/lib/db';

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState(""); // Feedback message
  
  // DATA STATE
  const [data, setData] = useState({
    hero: { title: "", subtitle: "" },
    portfolio: [],
    blogs: []
  });

  const [activeTab, setActiveTab] = useState('hero');

  const handleLogin = (e) => {
    e.preventDefault();
    if (pass === '1234') { 
      setIsAuthenticated(true);
      fetchData();
    } else {
      alert("Wrong Password");
    }
  };

  async function fetchData() {
    setLoading(true);
    setStatusMsg("Loading data from JSONBin...");
    try {
      const dbData = await getSiteData();
      console.log("Fetched Data:", dbData); // DEBUG LOG
      if (dbData) {
        setData(dbData);
        setStatusMsg("Data Loaded Successfully.");
      } else {
         setStatusMsg("Warning: Received empty data.");
      }
    } catch (e) {
      console.error(e);
      setStatusMsg("Error loading data. Check console.");
    }
    setLoading(false);
  }

  async function handleSave() {
    setLoading(true);
    setStatusMsg("Saving to Database...");
    try {
      const res = await updateSiteData(data);
      console.log("Save Response:", res); // DEBUG LOG
      setStatusMsg("✅ Saved Successfully!");
      setTimeout(() => setStatusMsg(""), 3000);
    } catch (e) {
      console.error(e);
      setStatusMsg("❌ Save Failed. Check API Keys.");
    }
    setLoading(false);
  }

  // --- RENDER LOGIN ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
        <form onSubmit={handleLogin} className="bg-gray-900 p-8 rounded-xl border border-gray-800 text-center w-full max-w-sm">
          <h1 className="text-2xl font-bold font-display mb-4">COMMAND CENTER</h1>
          <input 
            type="password" 
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="Enter PIN"
            className="bg-black border border-gray-700 p-3 rounded text-white text-center mb-4 w-full focus:border-primary outline-none"
          />
          <button type="submit" className="bg-primary w-full py-3 rounded font-bold hover:bg-blue-600 transition-colors">UNLOCK</button>
        </form>
      </div>
    );
  }

  // --- RENDER DASHBOARD ---
  return (
    <div className="min-h-screen bg-black text-white p-6 pb-40 pt-24">
      {/* HEADER */}
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center mb-8 border-b border-gray-800 pb-4 gap-4">
        <div>
           <h1 className="text-3xl font-bold font-display text-primary">ADMIN DASHBOARD</h1>
           <p className="text-gray-500 text-sm mt-1">{statusMsg}</p>
        </div>
        <button onClick={handleSave} disabled={loading} className="bg-green-600 hover:bg-green-500 px-8 py-3 rounded font-bold transition-all shadow-lg shadow-green-900/20 disabled:opacity-50">
          {loading ? "PROCESSING..." : "SAVE CHANGES"}
        </button>
      </div>

      {/* TABS */}
      <div className="max-w-5xl mx-auto mb-8 flex gap-2 overflow-x-auto pb-2">
        {['hero', 'portfolio', 'blogs'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded uppercase font-bold text-sm tracking-widest transition-all ${activeTab === tab ? 'bg-white text-black' : 'bg-gray-900 text-gray-500 hover:text-white'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="max-w-5xl mx-auto bg-gray-900/50 p-8 rounded-2xl border border-gray-800 backdrop-blur-sm">
        
        {/* HERO EDIT */}
        {activeTab === 'hero' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white border-b border-gray-800 pb-2">Homepage Text</h2>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Main Headline</label>
              <input 
                value={data.hero?.title || ""} 
                onChange={(e) => setData({...data, hero: { ...data.hero, title: e.target.value }})}
                className="w-full bg-black border border-gray-700 p-4 rounded-lg text-white focus:border-primary outline-none font-display text-lg" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Subtitle</label>
              <input 
                value={data.hero?.subtitle || ""} 
                onChange={(e) => setData({...data, hero: { ...data.hero, subtitle: e.target.value }})}
                className="w-full bg-black border border-gray-700 p-4 rounded-lg text-white focus:border-primary outline-none" 
              />
            </div>
          </div>
        )}

        {/* PORTFOLIO EDIT */}
        {activeTab === 'portfolio' && (
          <div>
             <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Projects ({data.portfolio?.length || 0})</h2>
                <button 
                  onClick={() => setData({...data, portfolio: [...(data.portfolio || []), { id: Date.now().toString(), title: "New Project", category: "Web", image: "", desc: "Description..." }]})}
                  className="bg-primary/20 text-primary border border-primary/50 px-4 py-2 rounded text-sm font-bold hover:bg-primary hover:text-white transition-all"
                >
                  + ADD PROJECT
                </button>
             </div>
             
             <div className="space-y-4">
               {data.portfolio?.map((item, index) => (
                 <div key={index} className="bg-black p-6 rounded-xl border border-gray-800 flex flex-col md:flex-row gap-6 hover:border-gray-600 transition-colors">
                   {/* Inputs */}
                   <div className="flex-grow space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                          <input 
                            value={item.title} 
                            onChange={(e) => { const list = [...data.portfolio]; list[index].title = e.target.value; setData({...data, portfolio: list}); }}
                            className="bg-gray-900 border border-gray-700 p-3 rounded text-white font-bold focus:border-primary outline-none"
                            placeholder="Title"
                          />
                          <input 
                            value={item.category} 
                            onChange={(e) => { const list = [...data.portfolio]; list[index].category = e.target.value; setData({...data, portfolio: list}); }}
                            className="bg-gray-900 border border-gray-700 p-3 rounded text-white text-sm focus:border-primary outline-none"
                            placeholder="Category"
                          />
                      </div>
                      <input 
                        value={item.image} 
                        onChange={(e) => { const list = [...data.portfolio]; list[index].image = e.target.value; setData({...data, portfolio: list}); }}
                        className="w-full bg-gray-900 border border-gray-700 p-3 rounded text-gray-400 text-xs font-mono focus:border-primary outline-none"
                        placeholder="Image URL (https://...)"
                      />
                      <textarea 
                        value={item.desc} 
                        onChange={(e) => { const list = [...data.portfolio]; list[index].desc = e.target.value; setData({...data, portfolio: list}); }}
                        className="w-full bg-gray-900 border border-gray-700 p-3 rounded text-white text-sm focus:border-primary outline-none"
                        placeholder="Short Description"
                        rows="2"
                      />
                   </div>

                   {/* Delete */}
                   <button 
                      onClick={() => { const list = data.portfolio.filter((_, i) => i !== index); setData({...data, portfolio: list}); }}
                      className="text-red-500 hover:text-red-400 font-bold text-xs self-start md:self-center bg-red-500/10 px-3 py-2 rounded"
                   >
                     REMOVE
                   </button>
                 </div>
               ))}
             </div>
          </div>
        )}

      </div>
    </div>
  );
}