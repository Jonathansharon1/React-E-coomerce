import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBkkM4wHCrG3jMGXy82RHqsVLy2J6Rhlq4",
    authDomain: "reactfinal-5898d.firebaseapp.com",
    projectId: "reactfinal-5898d",
    storageBucket: "reactfinal-5898d.appspot.com",
    messagingSenderId: "946597568232",
    appId: "1:946597568232:web:300c48db6314abdfb1735d"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
