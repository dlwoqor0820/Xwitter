import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBv48mmAbwMpekfXmj3f4K_Xa9fNSuObaI",
  authDomain: "xwitter-e7afa.firebaseapp.com",
  projectId: "xwitter-e7afa",
  storageBucket: "xwitter-e7afa.appspot.com",
  messagingSenderId: "131884498070",
  appId: "1:131884498070:web:bb916268a2e7fb2f2416b7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
