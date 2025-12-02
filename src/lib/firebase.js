import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCztt0nG20kYK7oaGIvTgXX1feSV2m65TQ",
  authDomain: "seranex-b9169.firebaseapp.com",
  projectId: "seranex-b9169",
  storageBucket: "seranex-b9169.firebasestorage.app",
  messagingSenderId: "757461926421",
  appId: "1:757461926421:web:01e3d49e6eb060bb84841c",
  measurementId: "G-55Y4WL87LF"
};

// Initialize Firebase (Singleton Pattern)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Export Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();