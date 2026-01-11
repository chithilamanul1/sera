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
import { db, isFirebaseConfigValid } from './firebase';

// Projects
export async function getClientProjects(clientId: string) {
    if (!db || !isFirebaseConfigValid) return [];
    const firestoreDb = db;
    const q = query(
        collection(firestoreDb, 'projects'),
        where('clientId', '==', clientId),
        orderBy('createdAt', 'desc')
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getAllProjects() {
    if (!db || !isFirebaseConfigValid) return [];
    const firestoreDb = db;
    const q = query(
        collection(firestoreDb, 'projects'),
        orderBy('createdAt', 'desc')
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function createProject(projectData: any) {
    if (!db || !isFirebaseConfigValid) throw new Error('Firebase not configured');
    const firestoreDb = db;
    return await addDoc(collection(firestoreDb, 'projects'), {
        ...projectData,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
    });
}

export async function updateProject(projectId: string, data: any) {
    if (!db || !isFirebaseConfigValid) throw new Error('Firebase not configured');
    const firestoreDb = db;
    const projectRef = doc(firestoreDb, 'projects', projectId);
    return await updateDoc(projectRef, {
        ...data,
        updatedAt: Timestamp.now(),
    });
}

// Quotes
export async function getClientQuotes(clientId: string) {
    if (!db || !isFirebaseConfigValid) return [];
    const firestoreDb = db;
    const q = query(
        collection(firestoreDb, 'quotes'),
        where('clientId', '==', clientId),
        orderBy('createdAt', 'desc')
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getAllQuotes() {
    if (!db || !isFirebaseConfigValid) return [];
    const firestoreDb = db;
    const q = query(
        collection(firestoreDb, 'quotes'),
        orderBy('createdAt', 'desc')
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getPendingQuotes() {
    if (!db || !isFirebaseConfigValid) return [];
    const firestoreDb = db;
    const q = query(
        collection(firestoreDb, 'quotes'),
        where('status', '==', 'pending'),
        orderBy('createdAt', 'desc')
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function createQuote(quoteData: any) {
    if (!db || !isFirebaseConfigValid) throw new Error('Firebase not configured');
    const firestoreDb = db;
    return await addDoc(collection(firestoreDb, 'quotes'), {
        ...quoteData,
        status: 'pending',
        createdAt: Timestamp.now(),
    });
}

export async function updateQuoteStatus(quoteId: string, status: 'accepted' | 'rejected') {
    if (!db || !isFirebaseConfigValid) throw new Error('Firebase not configured');
    const firestoreDb = db;
    const quoteRef = doc(firestoreDb, 'quotes', quoteId);
    return await updateDoc(quoteRef, { status });
}

// Quote Requests (from contact form)
export async function getQuoteRequests() {
    if (!db || !isFirebaseConfigValid) return [];
    const firestoreDb = db;
    const q = query(
        collection(firestoreDb, 'quoteRequests'),
        orderBy('createdAt', 'desc'),
        limit(50)
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getPendingQuoteRequests() {
    if (!db || !isFirebaseConfigValid) return [];
    const firestoreDb = db;
    const q = query(
        collection(firestoreDb, 'quoteRequests'),
        where('status', '==', 'new'),
        orderBy('createdAt', 'desc')
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function updateQuoteRequestStatus(requestId: string, status: string) {
    if (!db || !isFirebaseConfigValid) throw new Error('Firebase not configured');
    const firestoreDb = db;
    const requestRef = doc(firestoreDb, 'quoteRequests', requestId);
    return await updateDoc(requestRef, { status });
}

// Clients
export async function getAllClients() {
    if (!db || !isFirebaseConfigValid) return [];
    const firestoreDb = db;
    const q = query(
        collection(firestoreDb, 'users'),
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
    if (!db || !isFirebaseConfigValid) return 0;
    const firestoreDb = db;
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const q = query(
        collection(firestoreDb, 'projects'),
        where('createdAt', '>=', Timestamp.fromDate(firstDayOfMonth))
    );

    const snapshot = await getDocs(q);
    const projects = snapshot.docs.map(doc => doc.data());

    return projects.reduce((total, project) => total + (project.paidAmount || 0), 0);
}

export async function getActiveProjectsCount() {
    if (!db || !isFirebaseConfigValid) return 0;
    const firestoreDb = db;
    const q = query(
        collection(firestoreDb, 'projects'),
        where('status', '==', 'active')
    );

    const snapshot = await getDocs(q);
    return snapshot.size;
}

export async function getPendingQuotesCount() {
    if (!db || !isFirebaseConfigValid) return 0;
    const firestoreDb = db;
    const q = query(
        collection(firestoreDb, 'quotes'),
        where('status', '==', 'pending')
    );

    const snapshot = await getDocs(q);
    return snapshot.size;
}
