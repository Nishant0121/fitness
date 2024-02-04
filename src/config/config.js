// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBiGLk5uurqFucOWZkw2wtmkUFzLkD_aNo",
  authDomain: "fitness-app-91739.firebaseapp.com",
  projectId: "fitness-app-91739",
  storageBucket: "fitness-app-91739.appspot.com",
  messagingSenderId: "104599927774",
  appId: "1:104599927774:web:4c6ef82507b68cc64b7b4f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
