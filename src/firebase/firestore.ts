import { IEvent } from '@/components/types/styledComponents/event.types';
import {
  getFirestore,
  getDocs,
  query,
  collection,
  addDoc,
  updateDoc,
} from 'firebase/firestore';

import { app } from './firebase';

const db = getFirestore(app);

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

export const getEvents = async () => {
  const q = query(collection(db, 'events'));
  const querySnapShot = await getDocs(q);

  const events = querySnapShot.docs.map((doc) => ({
    id: doc.id,
    test: doc.data().test,
  }));

  return events;
};
