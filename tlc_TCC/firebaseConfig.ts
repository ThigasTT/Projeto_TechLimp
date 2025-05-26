// firebaseConfig.ts (ou onde você decidir colocar)
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Suas configurações do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBLL9WWIWgPpNNFzvTH4Y-zrd6IaGcPElw",
  authDomain: "auth-e3708.firebaseapp.com",
  projectId: "auth-e3708",
  storageBucket: "auth-e3708.firebasestorage.app",
  messagingSenderId: "756468624869",
  appId: "1:756468624869:web:c6e35c27b19bf2860d930c",
  measurementId: "G-BHRM0MH6QF"
};

// Inicializa o Firebase app apenas uma vez
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
