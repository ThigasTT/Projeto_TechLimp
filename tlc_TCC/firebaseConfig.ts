import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from "firebase/app";
//@ts-ignore
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
;

const firebaseConfig = {
  apiKey: "AIzaSyBroxfZenEK8yS82OwtzoByg3-ptNUgNTI",
  authDomain: "techlimp.firebaseapp.com",
  projectId: "techlimp",
  storageBucket: "techlimp.firebasestorage.app",
  messagingSenderId: "1017515796520",
  appId: "1:1017515796520:web:cbff73d7f993b8fdfbed1d"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});


