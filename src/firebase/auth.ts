import { app } from './firebase';

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
  GithubAuthProvider,
} from 'firebase/auth';

import { FirebaseError } from 'firebase/app';

export const db = getFirestore(app);
const provider = new GoogleAuthProvider();
const providerGit = new GithubAuthProvider();
export const auth = getAuth(app);

export function getErrorMessage(error: FirebaseError) {
  switch (error.code) {
    case 'auth/user-not-found':
      return 'Invalid email or password';
    case 'auth/wrong-password':
      return 'Invalid email or password';
    case 'auth/too-many-requests':
      return 'Too many unsuccessful login attempts. Please try again later.';
    default:
      return 'An error occurred. Please try again.';
  }
}

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
  } catch (err) {
    throw err;
  }
};

export const logInWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    throw err;
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
  } catch (err) {
    throw err;
  }
};

export const sendPasswordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const logout = () => {
  signOut(auth);
};
