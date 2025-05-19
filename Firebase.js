// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDrYYZJ0B0R27CqyxD1iJJ9kpmP64ejLns",
  authDomain: "teeth-clinc.firebaseapp.com",
  projectId: "teeth-clinc",
  storageBucket: "teeth-clinc.firebasestorage.app",
  messagingSenderId: "24264051567",
  appId: "1:24264051567:web:f01b196aa5549affbdf69a",
  measurementId: "G-85F8VMZ9SW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)