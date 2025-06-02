import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from "firebase/app";
//@ts-ignore
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
;

const firebaseConfig = {
  apiKey: "YOUR_STUFF_HERE",
  authDomain: "YOUR_STUFF_HERE.firebaseapp.com",
  projectId: "YOUR_STUFF_HERE",
  storageBucket: "YOUR_STUFF_HERE.appspot.com",
  messagingSenderId: "YOUR_STUFF_HERE",
  appId: "YOUR_STUFF_HERE"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});


