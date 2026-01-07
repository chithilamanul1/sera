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
import { db } from './firebase';

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
    const q = publishedOnly
        ? query(collection(db, 'blogs'), where('published', '==', true), orderBy('createdAt', 'desc'))
        : query(collection(db, 'blogs'), orderBy('createdAt', 'desc'));

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as BlogPost[];
}

export async function getBlogPost(slug: string) {
    const q = query(collection(db, 'blogs'), where('slug', '==', slug));
    const snapshot = await getDocs(q);

    if (snapshot.empty) return null;

    const post = { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as BlogPost;

    // Increment view count
    await updateDoc(doc(db, 'blogs', post.id), {
        views: (post.views || 0) + 1
    });

    return post;
}

export async function createBlogPost(post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt' | 'views'>) {
    return await addDoc(collection(db, 'blogs'), {
        ...post,
        views: 0,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
    });
}

export async function updateBlogPost(id: string, data: Partial<BlogPost>) {
    return await updateDoc(doc(db, 'blogs', id), {
        ...data,
        updatedAt: Timestamp.now(),
    });
}

export async function deleteBlogPost(id: string) {
    return await deleteDoc(doc(db, 'blogs', id));
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
    const q = query(
        collection(db, 'comments'),
        where('postId', '==', postId),
        where('approved', '==', true),
        orderBy('createdAt', 'desc')
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as BlogComment[];
}

export async function addComment(comment: Omit<BlogComment, 'id' | 'createdAt' | 'approved'>) {
    return await addDoc(collection(db, 'comments'), {
        ...comment,
        approved: false, // Requires admin approval
        createdAt: Timestamp.now(),
    });
}

export async function approveComment(id: string) {
    return await updateDoc(doc(db, 'comments', id), {
        approved: true,
    });
}

export async function deleteComment(id: string) {
    return await deleteDoc(doc(db, 'comments', id));
}

// Blog Categories
export async function getBlogCategories() {
    const posts = await getAllBlogPosts(true);
    const categories = new Set(posts.map(p => p.category));
    return Array.from(categories);
}
