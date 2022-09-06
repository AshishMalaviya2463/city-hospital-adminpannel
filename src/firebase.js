// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBZugslwK7KXs1RyMrKsMZ_zX8HDieaZpM",
    authDomain: "fir-db-hospital.firebaseapp.com",
    projectId: "fir-db-hospital",
    storageBucket: "fir-db-hospital.appspot.com",
    messagingSenderId: "559885101045",
    appId: "1:559885101045:web:6931c150b55c653111e2bc",
    measurementId: "G-S0VL67CNK5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
