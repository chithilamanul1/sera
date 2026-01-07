import {
    signInWithPopup,
    signInWithEmailAndPassword,
    signOut as firebaseSignOut,
    GoogleAuthProvider
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

const googleProvider = new GoogleAuthProvider();

export interface User {
    uid: string;
    email: string;
    name: string;
    role: 'client' | 'admin' | 'owner';
    company?: string;
    phone?: string;
}

export async function signInWithGoogle(): Promise<User> {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;

        // Check if user exists in Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid));

        if (!userDoc.exists()) {
            // Create new user with default role
            const newUser: User = {
                uid: user.uid,
                email: user.email!,
                name: user.displayName || user.email!.split('@')[0],
                role: 'client', // Default role
            };

            await setDoc(doc(db, 'users', user.uid), {
                ...newUser,
                createdAt: new Date(),
            });

            return newUser;
        }

        return userDoc.data() as User;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function signInWithEmail(email: string, password: string): Promise<User> {
    try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        const user = result.user;

        const userDoc = await getDoc(doc(db, 'users', user.uid));

        if (!userDoc.exists()) {
            throw new Error('User not found');
        }

        return userDoc.data() as User;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function signOut() {
    try {
        await firebaseSignOut(auth);
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function getUserRole(uid: string): Promise<string> {
    try {
        const userDoc = await getDoc(doc(db, 'users', uid));

        if (!userDoc.exists()) {
            return 'client';
        }

        return userDoc.data().role;
    } catch (error) {
        return 'client';
    }
}
