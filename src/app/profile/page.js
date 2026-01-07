'use client';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Profile() {
  const { user, logout } = useAuth();
  const router = useRouter();

  if (!user) return <div className="text-white text-center pt-32">Loading Profile...</div>;

  return (
    <div className="min-h-screen pt-32 px-6">
      <div className="max-w-2xl mx-auto bg-surface p-8 rounded-2xl border border-gray-800">
        <div className="flex items-center gap-6 mb-8">
           <img src={user.photoURL} className="w-20 h-20 rounded-full border-2 border-primary" />
           <div>
             <h1 className="text-2xl font-bold text-white">{user.displayName}</h1>
             <p className="text-muted">{user.email}</p>
           </div>
        </div>

        <h2 className="text-xl font-bold text-white mb-4">Your Activity</h2>
        <div className="bg-background p-4 rounded-lg mb-8 text-gray-500 text-sm">
           No comments or questions yet.
        </div>

        <button onClick={() => { logout(); router.push('/'); }} className="text-red-500 font-bold hover:underline">
          Sign Out
        </button>
      </div>
    </div>
  );
}