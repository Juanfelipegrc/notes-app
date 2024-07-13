// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDX25F8ia_0oVQP-5oS1wo7cceoNIu8eRs",
  authDomain: "notes-app-d92f3.firebaseapp.com",
  projectId: "notes-app-d92f3",
  storageBucket: "notes-app-d92f3.appspot.com",
  messagingSenderId: "671946060074",
  appId: "1:671946060074:web:4a991fd4af3dda96abee53",
  measurementId: "G-7MSX15WW1T"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp)
export const FirebaseDB = getFirestore(FirebaseApp)
// const analytics = getAnalytics(app);