import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDCz7quDF7I3ae9fyhOTPZBTODB5hc6PAI",
  authDomain: "myblog-eb61d.firebaseapp.com",
  projectId: "myblog-eb61d",
  storageBucket: "myblog-eb61d.firebasestorage.app",
  messagingSenderId: "14154018504",
  appId: "1:14154018504:web:93b00bcbf7942653f3bffd",
  measurementId: "G-S1PCV7X1FV"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
