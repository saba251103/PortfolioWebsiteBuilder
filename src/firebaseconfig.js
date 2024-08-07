import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; 
import 'firebase/compat/database'; 
import 'firebase/compat/storage'; // Use compat storage

const firebaseConfig = {
  apiKey: "AIzaSyCYiEAQjAKdHEqBQDFTwEuuWNXxVOxGnOc",
  authDomain: "portfoliowebsite-d52f4.firebaseapp.com",
  projectId: "portfoliowebsite-d52f4",
  storageBucket: "portfoliowebsite-d52f4.appspot.com",
  messagingSenderId: "878018155675",
  appId: "1:878018155675:web:c48258034a6c145075e23e",
  measurementId: "G-6YCE9CE7CT"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const storage = firebase.storage();

export { db, storage };
