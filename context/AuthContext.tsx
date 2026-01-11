'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    onAuthStateChanged,
    signInWithPopup,
    signOut as firebaseSignOut
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { auth, googleProvider, db, isFirebaseConfigValid } from '@/lib/firebase';

interface User {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
    role: 'owner' | 'admin' | 'user';
    banned: boolean;
    lastLogin?: Date;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signInWithGoogle: () => Promise<void>;
    signOut: () => Promise<void>;
    isOwner: boolean;
    isAdmin: boolean;
    isUser: boolean;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    signInWithGoogle: async () => { },
    signOut: async () => { },
    isOwner: false,
    isAdmin: false,
    isUser: false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const OWNER_EMAIL = process.env.NEXT_PUBLIC_OWNER_EMAIL || 'owner@seranex.org';
    const ADMIN_EMAILS = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || '').split(',').map(e => e.trim());

    const determineRole = (email: string | null): 'owner' | 'admin' | 'user' => {
        if (!email) return 'user';
        if (email === OWNER_EMAIL) return 'owner';
        if (ADMIN_EMAILS.includes(email)) return 'admin';
        return 'user';
    };

    useEffect(() => {
        // Skip auth setup if Firebase is not configured
        if (!isFirebaseConfigValid || !auth) {
            console.warn('Firebase not configured. Auth features disabled.');
            setLoading(false);
            return;
        }

        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                try {
                    // Get user data from Firestore
                    if (!db) {
                        throw new Error('Firestore not initialized');
                    }
                    const userRef = doc(db, 'users', firebaseUser.uid);
                    const userDoc = await getDoc(userRef);

                    if (!userDoc.exists()) {
                        // Create new user in Firestore
                        const role = determineRole(firebaseUser.email);
                        const newUser = {
                            uid: firebaseUser.uid,
                            email: firebaseUser.email,
                            displayName: firebaseUser.displayName,
                            photoURL: firebaseUser.photoURL,
                            role,
                            banned: false,
                            createdAt: Timestamp.now(),
                            lastLogin: Timestamp.now(),
                        };

                        await setDoc(userRef, newUser);

                        setUser({
                            uid: firebaseUser.uid,
                            email: firebaseUser.email,
                            displayName: firebaseUser.displayName,
                            photoURL: firebaseUser.photoURL,
                            role,
                            banned: false,
                        });
                    } else {
                        // Update last login
                        await updateDoc(userRef, {
                            lastLogin: Timestamp.now(),
                        });

                        const userData = userDoc.data();
                        setUser({
                            uid: userData.uid,
                            email: userData.email,
                            displayName: userData.displayName,
                            photoURL: userData.photoURL,
                            role: userData.role || 'user',
                            banned: userData.banned || false,
                        });
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    setUser(null);
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const signInWithGoogle = async () => {
        if (!auth || !googleProvider) {
            console.error('Firebase not configured');
            throw new Error('Firebase not configured');
        }
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error('Error signing in with Google:', error);
            throw error;
        }
    };

    const signOut = async () => {
        if (!auth) {
            console.error('Firebase not configured');
            return;
        }
        try {
            await firebaseSignOut(auth);
        } catch (error) {
            console.error('Error signing out:', error);
            throw error;
        }
    };

    const isOwner = user?.role === 'owner';
    const isAdmin = user?.role === 'admin' || user?.role === 'owner';
    const isUser = !!user;

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                signInWithGoogle,
                signOut,
                isOwner,
                isAdmin,
                isUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
