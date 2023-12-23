import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

// Below data should come from .evn file 
const firebaseConfig = {
  apiKey: "AIzaSyC6g82u-yLOXnnw14xf9rn27EPVs1X1HvQ",
  authDomain: "books-storage-ce9c7.firebaseapp.com",
  projectId: "books-storage-ce9c7",
  storageBucket: "books-storage-ce9c7.appspot.com",
  messagingSenderId: "786319112436",
  appId: "1:786319112436:web:cc5e9948d3ed3ba88e46a1",
  measurementId: "G-QY17HY29HR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;