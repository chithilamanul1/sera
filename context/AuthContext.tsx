'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

interface AuthContextType {
    user: (User & { role?: string }) | null;
    session: Session | null;
    loading: boolean;
    signInWithGoogle: () => Promise<void>;
    signInWithEmail: (email: string, password: string) => Promise<any>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    session: null,
    loading: true,
    signInWithGoogle: async () => { },
    signInWithEmail: async () => { },
    signOut: async () => { },
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
            setSession(session);

            if (session?.user) {
                // Fetch user role from profiles table
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('role')
                    .eq('id', session.user.id)
                    .single();

                // Enhance user object with role
                const userWithRole = {
                    ...session.user,
                    role: profile?.role || 'client'
                };
                setUser(userWithRole as any); // Cast to any to avoid strict type issues for now
            } else {
                setUser(null);
            }

            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const signInWithGoogle = async () => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                },
            });
            if (error) throw error;
        } catch (error) {
            console.error('Error signing in with Google:', error);
            throw error;
        }
    };

    const signInWithEmail = async (email: string, password: string) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error) throw error;

            if (data.user) {
                // Fetch role immediately to return it
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('role')
                    .eq('id', data.user.id)
                    .single();

                return {
                    ...data.user,
                    role: profile?.role || 'client'
                };
            }
        } catch (error) {
            console.error('Error signing in with email:', error);
            throw error;
        }
    };

    const signOut = async () => {
        try {
            await supabase.auth.signOut();
            router.refresh();
        } catch (error) {
            console.error('Error signing out:', error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                session,
                loading,
                signInWithGoogle,
                signInWithEmail,
                signOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
