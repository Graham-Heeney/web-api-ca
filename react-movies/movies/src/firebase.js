import { initializeApp } from "firebase/app"; // Import the function to initialize Firebase app
import { getAuth } from "firebase/auth"; // Import authentication-related functions
import { getFirestore, collection, doc, setDoc, getDocs } from "firebase/firestore"; // Import Firestore functions for data management

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyAD-wlX0eppKNHuOY5M5HLUczeO4ejVuzA", // API key for the project
  authDomain: "webappasgn1-firebase.firebaseapp.com", // Authentication domain
  projectId: "webappasgn1-firebase", // Project ID
  storageBucket: "webappasgn1-firebase.firebasestorage.app", // Storage bucket for file uploads
  messagingSenderId: "692993198858", // Sender ID for Firebase Cloud Messaging
  appId: "1:692993198858:web:484321a5156ab5ff7f08f3", // Unique app ID for Firebase setup
  measurementId: "G-YXN0J1SFYL" // Measurement ID for analytics
};

// Initialize Firebase with the configuration object
const app = initializeApp(firebaseConfig);

// Get the Firebase authentication instance
const auth = getAuth(app);

// Get the Firestore database instance
const db = getFirestore(app);

// Export the Firebase auth and Firestore instances for use in other parts of the application
export { auth, db };
