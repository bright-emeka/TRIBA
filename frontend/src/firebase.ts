import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCofDuZhR0un6jzZhej3gtVWWsSxdzOj_Q",
  authDomain: "triba-s.firebaseapp.com",
  projectId: "triba-s",
  storageBucket: "triba-s.firebasestorage.app",
  messagingSenderId: "219781893926",
  appId: "1:219781893926:web:c99b449ed6663df5433be7",
  measurementId: "G-PF81THH6KX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;