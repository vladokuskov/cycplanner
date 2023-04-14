import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

export const firebaseConfig = {
  apiKey: 'AIzaSyCRTbkLz9NI9sFvzdZCvRN3uv4W9TkcvNc',

  authDomain: 'cycplanner.firebaseapp.com',

  projectId: 'cycplanner',

  storageBucket: 'cycplanner.appspot.com',

  messagingSenderId: '358644212861',

  appId: '1:358644212861:web:25accfe46f0a4d46db7d14',

  measurementId: 'G-5WQQYC21KL',
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
