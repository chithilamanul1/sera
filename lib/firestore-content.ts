import {
    collection,
    doc,
    getDoc,
    setDoc,
    updateDoc,
    deleteDoc,
    Timestamp
} from 'firebase/firestore';
import { db } from './firebase';

// Settings
export async function getSettings() {
    const settingsDoc = await getDoc(doc(db, 'settings', 'company'));
    return settingsDoc.exists() ? settingsDoc.data() : null;
}

export async function updateSettings(data: any) {
    return await setDoc(doc(db, 'settings', 'company'), {
        ...data,
        updatedAt: Timestamp.now(),
    }, { merge: true });
}

// Testimonials
export async function getAllTestimonials() {
    const testimonialsDoc = await getDoc(doc(db, 'content', 'testimonials'));
    return testimonialsDoc.exists() ? testimonialsDoc.data().items || [] : [];
}

export async function saveTestimonials(testimonials: any[]) {
    return await setDoc(doc(db, 'content', 'testimonials'), {
        items: testimonials,
        updatedAt: Timestamp.now(),
    });
}

// Portfolio
export async function getAllPortfolioItems() {
    const portfolioDoc = await getDoc(doc(db, 'content', 'portfolio'));
    return portfolioDoc.exists() ? portfolioDoc.data().items || [] : [];
}

export async function savePortfolioItems(items: any[]) {
    return await setDoc(doc(db, 'content', 'portfolio'), {
        items: items,
        updatedAt: Timestamp.now(),
    });
}

// Services
export async function getAllServices() {
    const servicesDoc = await getDoc(doc(db, 'content', 'services'));
    return servicesDoc.exists() ? servicesDoc.data().items || [] : [];
}

export async function saveServices(services: any[]) {
    return await setDoc(doc(db, 'content', 'services'), {
        items: services,
        updatedAt: Timestamp.now(),
    });
}

// Team Members
export async function getAllTeamMembers() {
    const teamDoc = await getDoc(doc(db, 'content', 'team'));
    return teamDoc.exists() ? teamDoc.data().members || [] : [];
}

export async function saveTeamMembers(members: any[]) {
    return await setDoc(doc(db, 'content', 'team'), {
        members: members,
        updatedAt: Timestamp.now(),
    });
}
