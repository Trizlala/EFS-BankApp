import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwEi1U710Xz0iJALpC31cCoMSZIN-jbpo",
  authDomain: "efs-online.firebaseapp.com",
  projectId: "efs-online",
  storageBucket: "efs-online.appspot.com",
  messagingSenderId: "1057886553888",
  appId: "1:1057886553888:web:5bd8e0271e89eaaf3f3945"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);


export default db

