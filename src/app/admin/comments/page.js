'use client';
import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';

export default function AdminComments() {
  const [comments, setComments] = useState([]);
  const [replyText, setReplyText] = useState({});

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "testimonials"), (snapshot) => {
      setComments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const handleReply = async (id) => {
    const reply = replyText[id];
    if (!reply) return;
    const ref = doc(db, "testimonials", id);
    await updateDoc(ref, { adminReply: reply });
    alert("Replied!");
  };

  const handleDelete = async (id) => {
    if (confirm("Delete this comment?")) {
      await deleteDoc(doc(db, "testimonials", id));
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-10 pt-32">
      <h1 className="text-3xl font-bold mb-8 text-primary">Comment Moderation</h1>
      
      <div className="grid gap-6">
        {comments.map((c) => (
          <div key={c.id} className="bg-gray-900 p-6 rounded-xl border border-gray-800">
             <div className="flex justify-between mb-2">
               <h3 className="font-bold">{c.user}</h3>
               <button onClick={() => handleDelete(c.id)} className="text-red-500 text-sm">DELETE</button>
             </div>
             <p className="mb-4 text-gray-300">"{c.text}"</p>
             
             <div className="flex gap-2">
               <input 
                 placeholder={c.adminReply || "Write a reply..."} 
                 onChange={(e) => setReplyText({...replyText, [c.id]: e.target.value})}
                 className="flex-1 bg-black border border-gray-700 p-2 rounded text-white"
               />
               <button onClick={() => handleReply(c.id)} className="bg-blue-600 px-4 rounded">Reply</button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}