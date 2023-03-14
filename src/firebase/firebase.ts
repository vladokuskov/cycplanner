import { initializeApp } from 'firebase/app';
import {
  query,
  getDocs,
  collection,
  where,
  addDoc,
  getFirestore,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from 'firebase/auth';

export const firebaseConfig = {
  apiKey: 'AIzaSyCRTbkLz9NI9sFvzdZCvRN3uv4W9TkcvNc',

  authDomain: 'cycplanner.firebaseapp.com',

  projectId: 'cycplanner',

  storageBucket: 'cycplanner.appspot.com',

  messagingSenderId: '358644212861',

  appId: '1:358644212861:web:25accfe46f0a4d46db7d14',

  measurementId: 'G-5WQQYC21KL',
};

const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const db = getFirestore(firebaseApp);

export const auth = getAuth(firebaseApp);

export const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, provider);
    const user = res.user;
    const q = query(collection(db, 'users'), where('uid', '==', user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        name: user.displayName,
        authProvider: 'google',
        email: user.email,
      });
    }
    sessionStorage.setItem('Auth Token', await res.user.getIdToken());
  } catch (err) {
    console.log(err);
  }
};

export const logInWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    sessionStorage.setItem('Auth Token', await res.user.getIdToken());
  } catch (err) {
    console.error(err);
  }
};

export const registerWithEmailAndPassword = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      name,
      authProvider: 'local',
      email,
    });
    sessionStorage.setItem('Auth Token', await res.user.getIdToken());
  } catch (err) {
    console.error(err);
  }
};

export const sendPasswordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert('Password reset link sent!');
  } catch (err) {
    console.error(err);
  }
};

export const logout = () => {
  signOut(auth);
};

export default firebaseApp;
