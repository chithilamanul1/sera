'use client';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Login() {
  const { user, googleLogin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) router.push('/profile');
  }, [user, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="bg-surface p-10 rounded-2xl border border-gray-800 text-center max-w-md w-full">
        <h1 className="text-3xl font-display font-bold text-white mb-6">Join Seranex</h1>
        <p className="text-muted mb-8">Sign in to comment, review, and track your projects.</p>
        
        <button 
          onClick={googleLogin}
          className="w-full bg-white text-black font-bold py-3 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-200 transition-all"
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-6 h-6" />
          Continue with Google
        </button>
      </div>
    </div>
  );
}