// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries



const firebaseConfig = {
  apiKey: "AIzaSyDwTMj3lxsSFWX4UDxP_si5GppllWkGHYA",
  authDomain: "classbdd.firebaseapp.com",
  projectId: "classbdd",
  storageBucket: "classbdd.firebasestorage.app",
  messagingSenderId: "717794050840",
  appId: "1:717794050840:web:6292fc64cfcf5f02fc546d",
  measurementId: "G-4QFXNF6WZ8"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

export { db };