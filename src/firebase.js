import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCamJhxHxlZ0fSix3r83Cah0jUa6lL19aA",
  authDomain: "firestore-auth-2643a.firebaseapp.com",
  projectId: "firestore-auth-2643a",
  storageBucket: "firestore-auth-2643a.appspot.com",
  messagingSenderId: "402978738012",
  appId: "1:402978738012:web:c00e56e0ce49a3c2247b99",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export default app;
