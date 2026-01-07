'use client';
import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, query, where, onSnapshot, doc, updateDoc, increment, getDocs, setDoc, deleteDoc } from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext';
import { Heart, MessageSquare, Share2, Send } from 'lucide-react';

export default function BlogInteractions({ postId }) {
  const { user, googleLogin } = useAuth();
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);

  // Load Real-time Data
  useEffect(() => {
    if (!postId) return;

    // 1. Listen for Likes/Comments Count
    // (In a real app, you'd store this in a 'stats' doc, but for now we query)
    
    // Listen for Comments
    const qComments = query(collection(db, "blog_comments"), where("postId", "==", postId));
    const unsubComments = onSnapshot(qComments, (snap) => {
      setComments(snap.docs.map(d => ({ id: d.id, ...d.data() })).sort((a,b) => b.date - a.date));
    });

    // Listen for Likes (Total count)
    // Simplified: We assume a 'blog_stats' collection handles counts
    const statsRef = doc(db, "blog_stats", postId);
    const unsubStats = onSnapshot(statsRef, (doc) => {
        if (doc.exists()) {
            setLikes(doc.data().likes || 0);
        }
    });

    // Check if current user liked
    if (user) {
        const userLikeRef = doc(db, `blog_likes/${postId}_${user.uid}`);
        getDocs(query(collection(db, "blog_likes"), where("uid", "==", user.uid), where("postId", "==", postId)))
            .then(snap => setHasLiked(!snap.empty));
    }

    return () => { unsubComments(); unsubStats(); };
  }, [postId, user]);

  const handleLike = async () => {
    if (!user) return googleLogin();
    
    const likeRef = doc(db, `blog_likes/${postId}_${user.uid}`);
    const statsRef = doc(db, "blog_stats", postId);

    if (hasLiked) {
        // Unlike
        await deleteDoc(likeRef);
        await updateDoc(statsRef, { likes: increment(-1) });
        setHasLiked(false);
    } else {
        // Like
        await setDoc(likeRef, { uid: user.uid, postId });
        // Ensure stats doc exists
        await setDoc(statsRef, { likes: increment(1) }, { merge: true });
        setHasLiked(true);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!user) return googleLogin();
    if (!newComment.trim()) return;

    await addDoc(collection(db, "blog_comments"), {
      postId,
      text: newComment,
      user: user.displayName,
      avatar: user.photoURL,
      date: Date.now()
    });
    setNewComment("");
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Seranex Blog',
          text: 'Check out this article!',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share canceled');
      }
    } else {
      alert("Link copied to clipboard!");
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="border-t border-gray-800 pt-8 mt-12">
      
      {/* ACTION BAR */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex gap-6">
            <button 
                onClick={handleLike}
                className={`flex items-center gap-2 transition-colors ${hasLiked ? 'text-red-500' : 'text-gray-400 hover:text-white'}`}
            >
                <Heart size={24} fill={hasLiked ? "currentColor" : "none"} />
                <span className="font-bold">{likes}</span>
            </button>

            <button 
                onClick={() => setShowComments(!showComments)}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
                <MessageSquare size={24} />
                <span className="font-bold">{comments.length}</span>
            </button>
        </div>

        <button onClick={handleShare} className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors">
            <Share2 size={20} />
            <span className="text-sm font-bold uppercase tracking-widest hidden sm:inline">Share</span>
        </button>
      </div>

      {/* COMMENTS SECTION */}
      {showComments && (
        <div className="bg-surface/50 rounded-2xl p-6 border border-gray-800 animate-in fade-in slide-in-from-top-4">
            <h3 className="text-white font-bold mb-6">Discussion</h3>
            
            {/* Input */}
            <form onSubmit={handleComment} className="flex gap-4 mb-8">
                {user ? (
                    <img src={user.photoURL} className="w-10 h-10 rounded-full border border-gray-700" />
                ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-800" />
                )}
                <div className="flex-grow relative">
                    <input 
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder={user ? "Add a comment..." : "Sign in to comment"}
                        className="w-full bg-black border border-gray-700 rounded-xl py-3 pl-4 pr-12 text-white focus:border-primary outline-none transition-colors"
                        disabled={!user}
                    />
                    <button type="submit" disabled={!user} className="absolute right-2 top-2 p-1.5 bg-primary text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:bg-gray-700">
                        <Send size={16} />
                    </button>
                </div>
            </form>

            {!user && (
                <button onClick={googleLogin} className="w-full py-3 mb-8 bg-white text-black font-bold rounded-xl hover:bg-gray-200">
                    Sign in with Google to Join Discussion
                </button>
            )}

            {/* List */}
            <div className="space-y-6">
                {comments.length === 0 ? (
                    <p className="text-gray-500 text-center text-sm">Be the first to comment.</p>
                ) : (
                    comments.map(c => (
                        <div key={c.id} className="flex gap-4">
                            <img src={c.avatar} className="w-8 h-8 rounded-full" />
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-white font-bold text-sm">{c.user}</span>
                                    <span className="text-gray-600 text-xs">{new Date(c.date).toLocaleDateString()}</span>
                                </div>
                                <p className="text-gray-300 text-sm leading-relaxed">{c.text}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
      )}
    </div>
  );
}