import {
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    updateDoc,
    deleteDoc,
    query,
    orderBy,
    where,
    Timestamp,
    addDoc
} from 'firebase/firestore';
import { db, isFirebaseConfigValid } from './firebase';

// Blog Posts
export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    author: string;
    authorId: string;
    category: string;
    tags: string[];
    featuredImage?: string;
    published: boolean;
    views: number;
    createdAt: any;
    updatedAt: any;
}

export async function getAllBlogPosts(publishedOnly = false) {
    if (!db || !isFirebaseConfigValid) {
        console.warn('Firebase not configured');
        return [];
    }
    const firestoreDb = db;
    const q = publishedOnly
        ? query(collection(firestoreDb, 'blogs'), where('published', '==', true), orderBy('createdAt', 'desc'))
        : query(collection(firestoreDb, 'blogs'), orderBy('createdAt', 'desc'));

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as BlogPost[];
}

export async function getBlogPost(slug: string) {
    if (!db) return null;
    const firestoreDb = db;
    const q = query(collection(firestoreDb, 'blogs'), where('slug', '==', slug));
    const snapshot = await getDocs(q);

    if (snapshot.empty) return null;

    const post = { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as BlogPost;

    // Increment view count
    await updateDoc(doc(firestoreDb, 'blogs', post.id), {
        views: (post.views || 0) + 1
    });

    return post;
}

export async function createBlogPost(post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt' | 'views'>) {
    if (!db) throw new Error('Firebase not configured');
    const firestoreDb = db;
    return await addDoc(collection(firestoreDb, 'blogs'), {
        ...post,
        views: 0,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
    });
}

export async function updateBlogPost(id: string, data: Partial<BlogPost>) {
    if (!db) throw new Error('Firebase not configured');
    const firestoreDb = db;
    return await updateDoc(doc(firestoreDb, 'blogs', id), {
        ...data,
        updatedAt: Timestamp.now(),
    });
}

export async function deleteBlogPost(id: string) {
    if (!db) throw new Error('Firebase not configured');
    const firestoreDb = db;
    return await deleteDoc(doc(firestoreDb, 'blogs', id));
}

// Blog Comments
export interface BlogComment {
    id: string;
    postId: string;
    author: string;
    email: string;
    content: string;
    approved: boolean;
    createdAt: any;
}

export async function getPostComments(postId: string) {
    if (!db) return [];
    const firestoreDb = db;
    const q = query(
        collection(firestoreDb, 'comments'),
        where('postId', '==', postId),
        where('approved', '==', true),
        orderBy('createdAt', 'desc')
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as BlogComment[];
}

export async function addComment(comment: Omit<BlogComment, 'id' | 'createdAt' | 'approved'>) {
    if (!db) throw new Error('Firebase not configured');
    const firestoreDb = db;
    return await addDoc(collection(firestoreDb, 'comments'), {
        ...comment,
        approved: false, // Requires admin approval
        createdAt: Timestamp.now(),
    });
}

export async function approveComment(id: string) {
    if (!db) throw new Error('Firebase not configured');
    const firestoreDb = db;
    return await updateDoc(doc(firestoreDb, 'comments', id), {
        approved: true,
    });
}

export async function deleteComment(id: string) {
    if (!db) throw new Error('Firebase not configured');
    const firestoreDb = db;
    return await deleteDoc(doc(firestoreDb, 'comments', id));
}

// Blog Categories
export async function getBlogCategories() {
    const posts = await getAllBlogPosts(true);
    const categories = new Set(posts.map(p => p.category));
    return Array.from(categories);
}
