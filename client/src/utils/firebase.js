// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "homeinfo-5b1d9.firebaseapp.com",
  projectId: "homeinfo-5b1d9",
  storageBucket: "homeinfo-5b1d9.appspot.com",
  messagingSenderId: "121255972864",
  appId: "1:121255972864:web:abb503f9c9a71f1c24c8e5",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
