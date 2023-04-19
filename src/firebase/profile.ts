import {
  getDocs,
  query,
  collection,
  updateDoc,
  where,
  doc,
} from 'firebase/firestore';
import {
  updateProfile,
  updatePassword,
  GoogleAuthProvider,
  signInWithPopup,
  ProviderId,
  reauthenticateWithPopup,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from 'firebase/auth';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';

import { auth } from './auth';
import { db, storage } from './firebase';

export const updateUserPassword = async (
  oldPassword: string,
  password: string
) => {
  const user = auth.currentUser;
  const providerType = auth.currentUser?.providerId;

  try {
    if (user) {
      if (providerType === ProviderId.GOOGLE) {
        const googleProvider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, googleProvider);
        await reauthenticateWithPopup(result.user, googleProvider);
      } else {
        if (user.email) {
          const credential = EmailAuthProvider.credential(
            user.email,
            oldPassword
          );
          await reauthenticateWithCredential(user, credential);
        }
      }

      if (password.length !== 0) {
        await updatePassword(user, password);
      }
    }
  } catch (err) {
    throw err;
  }
};
export const updateProfileName = async (name: string) => {
  const user = auth.currentUser;

  try {
    if (user) {
      if (user?.displayName !== name && name.length !== 0) {
        await updateProfile(user, { displayName: name });
        await updateEventNames(user?.uid, name);
      }
    }
  } catch (err) {
    throw err;
  }
};

const updateEventNames = async (uid: string, username: string | null) => {
  const eventsRef = collection(db, 'events');
  const q = query(eventsRef, where('event.metadata.author.uid', '==', uid));

  const snapshot = await getDocs(q);

  snapshot.forEach((event) => {
    const eventId = event.id;
    const data = event.data().event;
    const author = data.metadata.author;

    updateDoc(doc(db, 'events', eventId), {
      event: {
        ...data,
        metadata: {
          ...data.metadata,
          author: {
            ...author,
            username: username,
          },
        },
      },
    });
  });
};

const updateEventPhotoUrls = async (uid: string, photoUrl: string | null) => {
  const eventsRef = collection(db, 'events');
  const q = query(eventsRef, where('event.metadata.author.uid', '==', uid));

  const snapshot = await getDocs(q);

  snapshot.forEach((event) => {
    const eventId = event.id;
    const data = event.data().event;
    const author = data.metadata.author;

    updateDoc(doc(db, 'events', eventId), {
      event: {
        ...data,
        metadata: {
          ...data.metadata,
          author: {
            ...author,
            photoUrl,
          },
        },
      },
    });
  });
};

export const uploadAvatar = async (image: File) => {
  const user = auth.currentUser;
  try {
    if (user && user.photoURL) {
      const photoRef = ref(storage, user.photoURL);
      await deleteObject(photoRef);
    }

    const fileRef = ref(storage, `images/${user?.uid}/${image.name}`);
    await uploadBytes(fileRef, image);

    const downloadURL = await getDownloadURL(fileRef);

    user && (await updateEventPhotoUrls(user.uid, downloadURL));
    user && (await updateProfile(user, { photoURL: downloadURL }));
  } catch (err) {
    throw err;
  }
};

export const removeProfilePicture = async () => {
  try {
    const user = auth.currentUser;

    if (user && user.photoURL) {
      const photoRef = ref(storage, user.photoURL);
      await deleteObject(photoRef);
    }

    if (user) {
      await updateEventPhotoUrls(user.uid, '');

      await updateProfile(user, { photoURL: '' });
      const photoRef = ref(storage, user.photoURL || '');
      if (photoRef.parent) {
        deleteObject(photoRef.parent);
      }
    }
  } catch (err) {
    console.error(err);
  }
};
