import {
  getDocs,
  query,
  collection,
  updateDoc,
  where,
  doc,
} from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';

import { auth } from './auth';
import { db, storage } from './firebase';

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

export const uploadImage = async (image: File) => {
  const user = auth.currentUser;
  try {
    if (user && user.photoURL) {
      const photoRef = ref(storage, user.photoURL);
      await deleteObject(photoRef);
    }

    // upload new image
    const fileRef = ref(storage, `images/${user?.uid}/${image.name}`);
    await uploadBytes(fileRef, image);

    const downloadURL = await getDownloadURL(fileRef);

    user && (await updateEventPhotoUrls(user.uid, downloadURL)); // update with the new downloadURL value
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
