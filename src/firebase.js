// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCuHxNgxFtseUoTnq0sx0CZxZ-xa_hw4AM",
  authDomain: "resume-82b69.firebaseapp.com",
  projectId: "resume-82b69",
  storageBucket: "resume-82b69.appspot.com",
  messagingSenderId: "480709385047",
  appId: "1:480709385047:web:ebe6eaf48e790e1110fc12",
  measurementId: "G-4LE17G5WKH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);