import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ⚠️ IF YOU HAVEN'T PASTED KEYS YET, THIS PREVENTS CRASHES
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "seranex-v2.firebaseapp.com",
  projectId: "seranex-v2",
  storageBucket: "seranex-v2.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
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