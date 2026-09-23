// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBaxw5yP-JZAV7IFtlWtjXSlIo85v4w8js",
  authDomain: "automotores-el-poly.firebaseapp.com",
  projectId: "automotores-el-poly",
  storageBucket: "automotores-el-poly.firebasestorage.app",
  messagingSenderId: "974864685672",
  appId: "1:974864685672:web:263801ea20629ead3f79dd",
  measurementId: "G-VJBVL67YWK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
