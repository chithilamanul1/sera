import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ⚠️ IF YOU HAVEN'T PASTED KEYS YET, THIS PREVENTS CRASHES
const firebaseConfig = {
  apiKey: "AIzaSyCztt0nG20kYK7oaGIvTgXX1feSV2m65TQ",
  authDomain: "seranex-b9169.firebaseapp.com",
  projectId: "seranex-b9169",
  storageBucket: "seranex-b9169.firebasestorage.app",
  messagingSenderId: "757461926421",
  appId: "1:757461926421:web:01e3d49e6eb060bb84841c",
  measurementId: "G-55Y4WL87LF"
};


// Initialize only if keys are present to avoid white screen
let app;
let auth;
let db;
let googleProvider;

try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    auth = getAuth(app);
    db = getFirestore(app);
    googleProvider = new GoogleAuthProvider();
} catch (e) {
    console.warn("Firebase not initialized. Check API Keys.");
}

export { auth, db, googleProvider };
