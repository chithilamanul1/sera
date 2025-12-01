'use client';
import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext';

export default function Testimonials() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    // Real-time listener
    const q = query(collection(db, "testimonials"), orderBy("date", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setComments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const postComment = async () => {
    if (!newComment.trim()) return;
    await addDoc(collection(db, "testimonials"), {
      text: newComment,
      user: user.displayName,
      avatar: user.photoURL,
      date: new Date().toISOString(),
      adminReply: null // Admin can reply later
    });
    setNewComment("");
  };

  return (
    <div className="py-20 max-w-4xl mx-auto px-6">
      <h2 className="text-3xl font-display font-bold text-white mb-10 text-center">Community & Clients</h2>
      
      {/* List */}
      <div className="space-y-6 mb-12">
        {comments.map((c) => (
          <div key={c.id} className="bg-surface p-6 rounded-xl border border-gray-800">
            <div className="flex gap-4 mb-3">
               <img src={c.avatar || "https://ui-avatars.com/api/?name="+c.user} className="w-10 h-10 rounded-full" />
               <div>
                 <h4 className="font-bold text-white">{c.user}</h4>
                 <p className="text-xs text-gray-500">{new Date(c.date).toLocaleDateString()}</p>
               </div>
            </div>
            <p className="text-gray-300">{c.text}</p>
            
            {/* ADMIN REPLY */}
            {c.adminReply && (
              <div className="mt-4 ml-6 pl-4 border-l-2 border-primary bg-primary/5 p-3 rounded">
                <span className="text-xs font-bold text-primary uppercase">Seranex Response:</span>
                <p className="text-sm text-gray-400 mt-1">{c.adminReply}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input */}
      {user ? (
        <div className="flex gap-4">
          <input 
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your experience..."
            className="flex-1 bg-black border border-gray-700 rounded-lg p-3 text-white"
          />
          <button onClick={postComment} className="bg-primary text-white px-6 rounded-lg font-bold">Post</button>
        </div>
      ) : (
        <div className="text-center p-6 bg-gray-900 rounded-xl">
           <a href="/login" className="text-primary font-bold hover:underline">Sign in with Google</a> to leave a comment.
        </div>
      )}
    </div>
  );
}