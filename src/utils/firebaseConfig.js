import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Check if Firebase config is available
const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
const authDomain = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN;
const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;

let app = null;
let auth = null;
let googleProvider = null;

if (apiKey && authDomain && projectId) {
  const firebaseConfig = {
    apiKey,
    authDomain,
    projectId,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
  };

  try {
    // Initialize Firebase
    app = initializeApp(firebaseConfig);

    // Initialize Firebase Authentication and get a reference to the service
    auth = getAuth(app);

    // Initialize Google Auth Provider
    googleProvider = new GoogleAuthProvider();
    googleProvider.setCustomParameters({
      prompt: 'select_account'
    });
  } catch (error) {
    console.warn('Firebase initialization failed:', error.message);
    console.warn('Google authentication will not be available. Please configure Firebase environment variables.');
  }
} else {
  // Silent fallback - Firebase will be initialized when variables are provided
  console.log('Firebase: Configuration pending - authentication features disabled');
}

export { auth, googleProvider };
export default app;
