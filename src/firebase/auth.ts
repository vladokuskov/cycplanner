import { app, storage } from './firebase';

import {
  query,
  getDocs,
  collection,
  where,
  addDoc,
  getFirestore,
  updateDoc,
} from 'firebase/firestore';

import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
  getAuth,
} from 'firebase/auth';

export const db = getFirestore(app);
const providerGoogle = new GoogleAuthProvider();
export const auth = getAuth(app);

export const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, providerGoogle);
    const user = res.user;
    const q = query(collection(db, 'users'), where('uid', '==', user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      const docRef = await addDoc(collection(db, 'users'), {
        uid: user.uid,
        name: user.displayName,
        authProvider: 'google',
        email: user.email,
      });

      await updateDoc(docRef, {
        docID: docRef.id,
      });

      user && (await updateProfile(user, { photoURL: '' }));
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
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    throw err;
  }
};

export const registerWithEmailAndPassword = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);

    const user = res.user;
    await updateProfile(user, {
      displayName: username,
    });
    const docRef = await addDoc(collection(db, 'users'), {
      uid: user.uid,
      name: username,
      photoUrl: null,
      authProvider: 'local',
      email,
    });

    await updateDoc(docRef, {
      docID: docRef.id,
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

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    throw err;
  }
};
