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
