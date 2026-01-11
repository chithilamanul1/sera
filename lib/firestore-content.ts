import {
    collection,
    doc,
    getDoc,
    setDoc,
    updateDoc,
    deleteDoc,
    Timestamp
} from 'firebase/firestore';
import { db, isFirebaseConfigValid } from './firebase';

// Settings
export async function getSettings() {
    if (!db || !isFirebaseConfigValid) return null;
    const firestoreDb = db;
    const settingsDoc = await getDoc(doc(firestoreDb, 'settings', 'company'));
    return settingsDoc.exists() ? settingsDoc.data() : null;
}

export async function updateSettings(data: any) {
    if (!db || !isFirebaseConfigValid) throw new Error('Firebase not configured');
    const firestoreDb = db;
    return await setDoc(doc(firestoreDb, 'settings', 'company'), {
        ...data,
        updatedAt: Timestamp.now(),
    }, { merge: true });
}

// Testimonials
export async function getAllTestimonials() {
    if (!db || !isFirebaseConfigValid) return [];
    const firestoreDb = db;
    const testimonialsDoc = await getDoc(doc(firestoreDb, 'content', 'testimonials'));
    return testimonialsDoc.exists() ? testimonialsDoc.data().items || [] : [];
}

export async function saveTestimonials(testimonials: any[]) {
    if (!db || !isFirebaseConfigValid) throw new Error('Firebase not configured');
    const firestoreDb = db;
    return await setDoc(doc(firestoreDb, 'content', 'testimonials'), {
        items: testimonials,
        updatedAt: Timestamp.now(),
    });
}

// Portfolio
export async function getAllPortfolioItems() {
    if (!db || !isFirebaseConfigValid) return [];
    const firestoreDb = db;
    const portfolioDoc = await getDoc(doc(firestoreDb, 'content', 'portfolio'));
    return portfolioDoc.exists() ? portfolioDoc.data().items || [] : [];
}

export async function savePortfolioItems(items: any[]) {
    if (!db || !isFirebaseConfigValid) throw new Error('Firebase not configured');
    const firestoreDb = db;
    return await setDoc(doc(firestoreDb, 'content', 'portfolio'), {
        items: items,
        updatedAt: Timestamp.now(),
    });
}

// Services
export async function getAllServices() {
    if (!db || !isFirebaseConfigValid) return [];
    const firestoreDb = db;
    const servicesDoc = await getDoc(doc(firestoreDb, 'content', 'services'));
    return servicesDoc.exists() ? servicesDoc.data().items || [] : [];
}

export async function saveServices(services: any[]) {
    if (!db || !isFirebaseConfigValid) throw new Error('Firebase not configured');
    const firestoreDb = db;
    return await setDoc(doc(firestoreDb, 'content', 'services'), {
        items: services,
        updatedAt: Timestamp.now(),
    });
}

// Team Members
export async function getAllTeamMembers() {
    if (!db || !isFirebaseConfigValid) return [];
    const firestoreDb = db;
    const teamDoc = await getDoc(doc(firestoreDb, 'content', 'team'));
    return teamDoc.exists() ? teamDoc.data().members || [] : [];
}

export async function saveTeamMembers(members: any[]) {
    if (!db || !isFirebaseConfigValid) throw new Error('Firebase not configured');
    const firestoreDb = db;
    return await setDoc(doc(firestoreDb, 'content', 'team'), {
        members: members,
        updatedAt: Timestamp.now(),
    });
}
