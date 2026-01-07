import {
    collection,
    query,
    where,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    orderBy,
    limit,
    Timestamp
} from 'firebase/firestore';
import { db } from './firebase';

// Projects
export async function getClientProjects(clientId: string) {
    const q = query(
        collection(db, 'projects'),
        where('clientId', '==', clientId),
        orderBy('createdAt', 'desc')
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getAllProjects() {
    const q = query(
        collection(db, 'projects'),
        orderBy('createdAt', 'desc')
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function createProject(projectData: any) {
    return await addDoc(collection(db, 'projects'), {
        ...projectData,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
    });
}

export async function updateProject(projectId: string, data: any) {
    const projectRef = doc(db, 'projects', projectId);
    return await updateDoc(projectRef, {
        ...data,
        updatedAt: Timestamp.now(),
    });
}

// Quotes
export async function getClientQuotes(clientId: string) {
    const q = query(
        collection(db, 'quotes'),
        where('clientId', '==', clientId),
        orderBy('createdAt', 'desc')
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getAllQuotes() {
    const q = query(
        collection(db, 'quotes'),
        orderBy('createdAt', 'desc')
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getPendingQuotes() {
    const q = query(
        collection(db, 'quotes'),
        where('status', '==', 'pending'),
        orderBy('createdAt', 'desc')
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function createQuote(quoteData: any) {
    return await addDoc(collection(db, 'quotes'), {
        ...quoteData,
        status: 'pending',
        createdAt: Timestamp.now(),
    });
}

export async function updateQuoteStatus(quoteId: string, status: 'accepted' | 'rejected') {
    const quoteRef = doc(db, 'quotes', quoteId);
    return await updateDoc(quoteRef, { status });
}

// Quote Requests (from contact form)
export async function getQuoteRequests() {
    const q = query(
        collection(db, 'quoteRequests'),
        orderBy('createdAt', 'desc'),
        limit(50)
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getPendingQuoteRequests() {
    const q = query(
        collection(db, 'quoteRequests'),
        where('status', '==', 'new'),
        orderBy('createdAt', 'desc')
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function updateQuoteRequestStatus(requestId: string, status: string) {
    const requestRef = doc(db, 'quoteRequests', requestId);
    return await updateDoc(requestRef, { status });
}

// Clients
export async function getAllClients() {
    const q = query(
        collection(db, 'users'),
        where('role', '==', 'client'),
        orderBy('createdAt', 'desc')
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getClientCount() {
    const clients = await getAllClients();
    return clients.length;
}

// Analytics
export async function getMonthlyRevenue() {
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const q = query(
        collection(db, 'projects'),
        where('createdAt', '>=', Timestamp.fromDate(firstDayOfMonth))
    );

    const snapshot = await getDocs(q);
    const projects = snapshot.docs.map(doc => doc.data());

    return projects.reduce((total, project) => total + (project.paidAmount || 0), 0);
}

export async function getActiveProjectsCount() {
    const q = query(
        collection(db, 'projects'),
        where('status', '==', 'active')
    );

    const snapshot = await getDocs(q);
    return snapshot.size;
}

export async function getPendingQuotesCount() {
    const q = query(
        collection(db, 'quotes'),
        where('status', '==', 'pending')
    );

    const snapshot = await getDocs(q);
    return snapshot.size;
}
