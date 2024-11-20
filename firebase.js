// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAza-6LRZblZ80QSN4vfVjlf_DynShVy3I",
  authDomain: "sit313-8-1d.firebaseapp.com",
  projectId: "sit313-8-1d",
  storageBucket: "sit313-8-1d.appspot.com",
  messagingSenderId: "711050200118",
  appId: "1:711050200118:web:e8200b2ed60ef6a2720497"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
 