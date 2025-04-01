// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBgoWaCd6APngiq3Jv-d4abmByqZyFxJ8",
  authDomain: "db-multimedia.firebaseapp.com",
  projectId: "db-multimedia",
  storageBucket: "db-multimedia.firebasestorage.app",
  messagingSenderId: "703694156223",
  appId: "1:703694156223:web:ecba5df473d07cf21db10a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

export { db };