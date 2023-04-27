import { EventsFilter } from '@/components/types/shared/eventsFilter.types';
import { GeoPoint } from '@/components/types/shared/geoPoint.types';
import { IEvent } from '@/components/types/shared/event.types';
import {
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
import { auth } from './auth';

import { db } from './firebase';

export const updateEventParticipating = async (
  userId: string,
  eventId: string
) => {
  try {
    const eventsRef = collection(db, 'events');
    const q = query(eventsRef, where('event.id', '==', eventId));
    const snapshot = await getDocs(q);

    snapshot.forEach((event) => {
      const eventId = event.data().docID;
      const data = event.data().event;
      const isParticipated = data.participating.awaitingUsers.includes(userId);

      updateDoc(doc(db, 'events', eventId), {
        event: {
          ...data,
          participating: {
            ...data.participating,
            awaitingUsers: isParticipated
              ? data.participating.awaitingUsers.filter(
                  (id: string) => id !== userId
                )
              : [...data.participating.awaitingUsers, userId],
          },
        },
      });
    });
  } catch (err) {
    console.error(err);
  }
};

export const updateEventBookmarks = async (userId: string, eventId: string) => {
  try {
    const eventsRef = collection(db, 'events');
    const q = query(eventsRef, where('event.id', '==', eventId));
    const snapshot = await getDocs(q);

    snapshot.forEach((event) => {
      const eventId = event.data().docID;
      const data = event.data().event;
      const isBookmarked = data.bookmarkedUsers.includes(userId);

      updateDoc(doc(db, 'events', eventId), {
        event: {
          ...data,
          bookmarkedUsers: isBookmarked
            ? data.bookmarkedUsers.filter((id: string) => id !== userId)
            : [...data.bookmarkedUsers, userId],
        },
      });
    });
  } catch (err) {
    console.error(err);
  }
};

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

export const getEventsID = async () => {
  let q = collection(db, 'events');

  const events = query(q);

  const querySnapShot = await getDocs(events);
  const eventsID = querySnapShot.docs.map((doc) => doc.data().event.id);
  return eventsID;
};

export const getDetailEvent = async (eventID: string | string[]) => {
  let q = collection(db, 'events');

  const events = query(q, where('event.id', '==', eventID));

  const querySnapShot = await getDocs(events);
  const event = querySnapShot.docs.map((doc) => doc.data().event);
  return event[0];
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

  let eventsQuery = query(
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
      eventsQuery = query(
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

  const eventsSnapShot = await getDocs(eventsQuery);
  let events = eventsSnapShot.docs.map((doc) => doc.data().event);

  // Sort the events based on the selected sorting
  if (selectedSorting === 'newest') {
    events.sort((a, b) => {
      return (
        new Date(b.metadata.createdAt).getTime() -
        new Date(a.metadata.createdAt).getTime()
      );
    });
  } else {
    events.sort((a, b) => {
      return (
        new Date(a.metadata.createdAt).getTime() -
        new Date(b.metadata.createdAt).getTime()
      );
    });
  }

  return { events, totalEvents };
};

export const getMyEvents = async (
  selectedSorting?: 'oldest' | 'newest',
  pageNumber = 1,
  itemsPerPage = 10
) => {
  const user = auth.currentUser;
  const q = collection(db, 'events');
  const sortingOrder = selectedSorting === 'newest' ? 'desc' : 'asc';

  let eventsQuery = query(
    q,
    where(`event.metadata.author.uid`, `==`, user && user.uid),
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
      eventsQuery = query(
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

  const eventsSnapShot = await getDocs(eventsQuery);
  let events = eventsSnapShot.docs.map((doc) => doc.data().event);

  // Sort the events based on the selected sorting
  if (selectedSorting === 'newest') {
    events.sort((a, b) => {
      return (
        new Date(b.metadata.createdAt).getTime() -
        new Date(a.metadata.createdAt).getTime()
      );
    });
  } else {
    events.sort((a, b) => {
      return (
        new Date(a.metadata.createdAt).getTime() -
        new Date(b.metadata.createdAt).getTime()
      );
    });
  }

  return { events, totalEvents };
};

export const getParticipatedEvents = async (
  selectedSorting?: 'oldest' | 'newest',
  pageNumber = 1,
  itemsPerPage = 10
) => {
  const user = auth.currentUser;
  const q = collection(db, 'events');
  const sortingOrder = selectedSorting === 'newest' ? 'desc' : 'asc';

  let eventsQuery = query(
    q,
    where(
      `event.participating.submitedUsers`,
      'array-contains',
      user && user.uid
    ),
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
      eventsQuery = query(
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

  const eventsSnapShot = await getDocs(eventsQuery);
  let events = eventsSnapShot.docs.map((doc) => doc.data().event);

  // Sort the events based on the selected sorting
  if (selectedSorting === 'newest') {
    events.sort((a, b) => {
      return (
        new Date(b.metadata.createdAt).getTime() -
        new Date(a.metadata.createdAt).getTime()
      );
    });
  } else {
    events.sort((a, b) => {
      return (
        new Date(a.metadata.createdAt).getTime() -
        new Date(b.metadata.createdAt).getTime()
      );
    });
  }

  return { events, totalEvents };
};

export const getFavouriteEvents = async (
  selectedSorting?: 'oldest' | 'newest',
  pageNumber = 1,
  itemsPerPage = 10
) => {
  const user = auth.currentUser;
  const q = collection(db, 'events');
  const sortingOrder = selectedSorting === 'newest' ? 'desc' : 'asc';

  let eventsQuery = query(
    q,
    where(`event.bookmarkedUsers`, 'array-contains', user && user.uid),
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
      eventsQuery = query(
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

  const eventsSnapShot = await getDocs(eventsQuery);
  let events = eventsSnapShot.docs.map((doc) => doc.data().event);

  // Sort the events based on the selected sorting
  if (selectedSorting === 'newest') {
    events.sort((a, b) => {
      return (
        new Date(b.metadata.createdAt).getTime() -
        new Date(a.metadata.createdAt).getTime()
      );
    });
  } else {
    events.sort((a, b) => {
      return (
        new Date(a.metadata.createdAt).getTime() -
        new Date(b.metadata.createdAt).getTime()
      );
    });
  }

  return { events, totalEvents };
};
