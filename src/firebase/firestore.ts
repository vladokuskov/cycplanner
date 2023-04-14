import { GeoPoint } from '@/components/types/props/geoPoint.types';
import { IEvent } from '@/components/types/styledComponents/event.types';
import {
  getFirestore,
  getDocs,
  query,
  collection,
  addDoc,
  updateDoc,
  orderBy,
  limit,
  startAfter,
  where,
  doc,
} from 'firebase/firestore';
import { updateProfile, User } from 'firebase/auth';
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from 'firebase/storage';

import { app } from './firebase';
import { auth } from './auth';

const db = getFirestore(app);
export const storage = getStorage(app);

export const createEvent = async (event: IEvent) => {
  try {
    const docRef = await addDoc(collection(db, 'events'), {
      event,
    });
    await updateDoc(docRef, { docID: docRef.id, event });
  } catch (err) {
    throw 'Oops, it looks like something went wrong while creating your event.';
  }
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

export const getLastEvenets = async (
  geoPoint: GeoPoint,
  hash: string,
  selectedSorting: 'oldest' | 'newest',
  selectedRange: number
) => {
  let q = collection(db, 'events');

  const sortedEvents = query(
    q,
    orderBy(
      'event.metadata.createdAt',
      selectedSorting === 'newest' ? 'desc' : 'asc'
    ),
    limit(3)
  );

  const querySnapShot = await getDocs(sortedEvents);
  const events = querySnapShot.docs.map((doc) => doc.data().event);
  return events;
};

export const getAllEvents = async (
  selectedSorting?: 'oldest' | 'newest',
  pageNumber = 1,
  itemsPerPage = 10
) => {
  const q = collection(db, 'events');
  const sortingOrder = selectedSorting === 'newest' ? 'desc' : 'asc';

  let sortedEvents = query(
    q,
    orderBy('event.metadata.createdAt', sortingOrder),
    limit(itemsPerPage)
  );

  if (pageNumber > 1) {
    const lastEvent = await getDocs(
      query(
        q,
        orderBy('event.metadata.createdAt', sortingOrder),
        limit((pageNumber - 1) * itemsPerPage + 1)
      )
    )
      .then((snap) => snap.docs[snap.docs.length - 1])
      .then((doc) => doc?.data().event?.metadata?.createdAt);

    if (lastEvent) {
      sortedEvents = query(
        q,
        orderBy('event.metadata.createdAt', sortingOrder),
        startAfter(lastEvent),
        limit(itemsPerPage)
      );
    }
  }

  const totalEventsQuery = query(q);
  const totalEventsSnapshot = await getDocs(totalEventsQuery);
  const totalEvents = totalEventsSnapshot.size;

  const querySnapShot = await getDocs(sortedEvents);
  const events = querySnapShot.docs.map((doc) => doc.data().event);

  return { events, totalEvents };
};
