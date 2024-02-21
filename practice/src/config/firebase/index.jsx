// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2mMc_MdXYBosowk2haUhdhvzHMWRR1SQ",
  authDomain: "message-app-14.firebaseapp.com",
  projectId: "message-app-14",
  storageBucket: "message-app-14.appspot.com",
  messagingSenderId: "823567329340",
  appId: "1:823567329340:web:1dd01c3d5940408446bb39"
};

// Initialize Firebase
const firebase_app = initializeApp(firebaseConfig);
const database = getDatabase(firebase_app);

export {firebase_app,database}