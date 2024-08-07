// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyCYiEAQjAKdHEqBQDFTwEuuWNXxVOxGnOc",
  authDomain: "portfoliowebsite-d52f4.firebaseapp.com",
  projectId: "portfoliowebsite-d52f4",
  storageBucket: "portfoliowebsite-d52f4.appspot.com",
  messagingSenderId: "878018155675",
  appId: "1:878018155675:web:c48258034a6c145075e23e",
  measurementId: "G-6YCE9CE7CT"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {auth,provider};