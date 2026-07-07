import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBTKSmNxDpqqhiOCMEkNjAn5FehDcWV_zw",
  authDomain: "wings-5f0e4.firebaseapp.com",
  projectId: "wings-5f0e4",
  storageBucket: "wings-5f0e4.firebasestorage.app",
  messagingSenderId: "3668967368",
  appId: "1:3668967368:web:206d36b46389f7d46ecafd"
};

// Initialize Firebase only once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
