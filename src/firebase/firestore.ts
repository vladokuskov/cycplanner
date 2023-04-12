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
