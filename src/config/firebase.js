// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB8fqyWv4sbTR8fI_JKT-rjoq1UAxpdlLc",
  authDomain: "fir-course-b91b0.firebaseapp.com",
  projectId: "fir-course-b91b0",
  storageBucket: "fir-course-b91b0.appspot.com",
  messagingSenderId: "70374014561",
  appId: "1:70374014561:web:0a2452af8cecb20b613420",
  measurementId: "G-8GWJCSN8D8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const googleProvider=new GoogleAuthProvider();
export const auth = getAuth(app);
export const db =getFirestore(app);
export const storage=getStorage(app);
