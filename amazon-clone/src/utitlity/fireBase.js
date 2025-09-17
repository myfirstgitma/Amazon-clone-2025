import { initializeApp } from "firebase/app";
// Import needed services for authentication and firestore
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Changed this line

// Remove these compat imports - you're mixing v9 and compat syntax
// import "firebase/compat/firestore"
// import "firebase/compat/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAWnmhxrlJZ4hbrdn_f1VkNYQ7gyH-33-M",
  authDomain: "project-5da10.firebaseapp.com",
  projectId: "project-5da10",
  storageBucket: "project-5da10.firebasestorage.app",
  messagingSenderId: "875139768850",
  appId: "1:875139768850:web:8acd64fb60cd584dffaecb",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); // Changed this line