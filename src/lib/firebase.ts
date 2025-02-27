import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  // Firebase config buraya gelecek
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Firebase'i başlat
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Google provider ayarları
export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('profile');
googleProvider.addScope('email');

// Hata ayıklama için
if (import.meta.env.DEV) {
  console.log('Firebase Config:', {
    authDomain: firebaseConfig.authDomain,
    projectId: firebaseConfig.projectId,
    currentDomain: window.location.hostname
  });
} 