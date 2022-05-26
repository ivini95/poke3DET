import { initializeApp } from "firebase/app";
import { getFirestore}  from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCWLQVcl0nofSqMBK1mOl6QdjgA5sCStws",
  authDomain: "pokerpg-9e052.firebaseapp.com",
  projectId: "pokerpg-9e052",
  storageBucket: "pokerpg-9e052.appspot.com",
  messagingSenderId: "180525603638",
  appId: "1:180525603638:web:4a94068b6d3ca5b63c7197",
  measurementId: "G-7VEMK3H02K"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app);