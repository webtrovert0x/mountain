import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase project owned by user account.
const firebaseConfig = {
  apiKey: "AIzaSyCZyRvdw0xPxdb8sUPFUjchWeudNwlX8nU",
  authDomain: "mountain-web-59904.firebaseapp.com",
  projectId: "mountain-web-59904",
  storageBucket: "mountain-web-59904.firebasestorage.app",
  messagingSenderId: "1084317764233",
  appId: "1:1084317764233:web:2263398caf8c8fc8dfd458",
  measurementId: "G-MBYEL4WLS3",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
