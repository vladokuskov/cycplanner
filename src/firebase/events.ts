import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  endAt,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  startAt,
  updateDoc,
  where,
} from 'firebase/firestore';

import {
  IEditingForm,
} from '@/components/EventDetail/DetailMain/EventEditingForm/EditingEventForm';
import { IEvent } from '@/components/types/shared/event.types';
import { GeoPoint } from '@/components/types/shared/geoPoint.types';

import { auth } from './auth';
import { db } from './firebase';

const geofire = require('geofire-common');

export const updateEvent = async (
  eventId: string,
  eventData: IEditingForm
): Promise<void> => {
  try {
    const eventsRef = collection(db, 'events');
    const q = query(eventsRef, where('event.id', '==', eventId));
    const snapshot = await getDocs(q);

    const updatePromises: Promise<void>[] = [];

    snapshot.forEach(async (event) => {
      const eventId = event.data().docID;
      const data = event.data().event;

      const updatePromise = updateDoc(doc(db, 'events', eventId), {
        event: {
          ...data,
          title: eventData.title,
          description: eventData.description,
          type: eventData.type,
          distance: eventData.distance,
        },
      });

      updatePromises.push(updatePromise);
    });

    await Promise.all(updatePromises);
  } catch (err) {
    throw err;
  }
};
export const approveUserParticipating = async (
  eventId: string,
  participantId: string
) => {
  try {
    const eventsRef = collection(db, 'events');
    const q = query(eventsRef, where('event.id', '==', eventId));
    const snapshot = await getDocs(q);

    snapshot.forEach(async (event) => {
      const eventId = event.data().docID;
      const data = event.data().event;

      await updateDoc(doc(db, 'events', eventId), {
        event: {
          ...data,
          participating: {
            ...data.participating,
            submittedUsers: [
              ...data.participating.submittedUsers,
              participantId,
            ],
            awaitingUsers: data.participating.awaitingUsers.filter(
              (id: string) => id !== participantId
            ),
          },
        },
      });
    });
  } catch (err) {
    throw err;
  }
};

export const removeUserFromParticipating = async (
  eventId: string,
  participantId: string
) => {
  try {
    const eventsRef = collection(db, 'events');
    const q = query(eventsRef, where('event.id', '==', eventId));
    const snapshot = await getDocs(q);

    snapshot.forEach(async (event) => {
      const eventId = event.data().docID;
      const data = event.data().event;

      await updateDoc(doc(db, 'events', eventId), {
        event: {
          ...data,
          participating: {
            ...data.participating,
            submittedUsers: data.participating.submittedUsers.filter(
              (id: string) => id !== participantId
            ),

            awaitingUsers: data.participating.awaitingUsers.filter(
              (id: string) => id !== participantId
            ),
          },
        },
      });
    });
  } catch (err) {
    throw err;
  }
};

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
      const isParticipated = data.participating.submittedUsers.includes(userId);
      const isAwaiting = data.participating.awaitingUsers.includes(userId);

      updateDoc(doc(db, 'events', eventId), {
        event: {
          ...data,
          participating: {
            ...data.participating,
            submittedUsers: data.participating.submittedUsers.filter(
              (id: string) => id !== userId
            ),
            awaitingUsers:
              isAwaiting || isParticipated
                ? data.participating.awaitingUsers.filter(
                    (id: string) => id !== userId
                  )
                : [...data.participating.awaitingUsers, userId],
          },
        },
      });
    });
  } catch (err) {
    throw err;
  }
};

export const updateFavoriteEvents = async (userId: string, eventId: string) => {
  try {
    const eventsRef = collection(db, 'events');
    const q = query(eventsRef, where('event.id', '==', eventId));
    const snapshot = await getDocs(q);

    snapshot.forEach((event) => {
      const eventId = event.data().docID;
      const data = event.data().event;
      const isFavorite = data.favoriteUsers.includes(userId);

      updateDoc(doc(db, 'events', eventId), {
        event: {
          ...data,
          favoriteUsers: isFavorite
            ? data.favoriteUsers.filter((id: string) => id !== userId)
            : [...data.favoriteUsers, userId],
        },
      });
    });
  } catch (err) {
    throw err;
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

export const getUsers = async (
  submittedUsers: string[],
  awaitingUsers: string[]
) => {
  let submitted: DocumentData[] = [];
  let awaiting: DocumentData[] = [];
  let q = collection(db, 'users');

  await Promise.all(
    submittedUsers.map(async (userId) => {
      const user = query(q, where('uid', '==', userId));
      const querySnapShot = await getDocs(user);
      const data = querySnapShot.docs.map((doc) => doc.data());

      submitted.push(...data);
    })
  );

  await Promise.all(
    awaitingUsers.map(async (userId) => {
      const user = query(q, where('uid', '==', userId));
      const querySnapShot = await getDocs(user);
      const data = querySnapShot.docs.map((doc) => doc.data());
      awaiting.push(...data);
    })
  );

  return { submitted, awaiting };
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

export const deleteEvent = async (eventID: string) => {
  const q = collection(db, 'events');

  const events = query(q, where('event.id', '==', eventID));

  const querySnapshot = await getDocs(events);

  const updatePromises: void[] = [];

  querySnapshot.forEach(async (doc) => {
    const updatePromise = await deleteDoc(doc.ref);

    updatePromises.push(updatePromise);
  });

  await Promise.all(updatePromises);
};

export const getLastEvents = async (
  geoPoint: GeoPoint,
  selectedRange: number
) => {
  const q = collection(db, 'events');

  const center = [+geoPoint.lat, +geoPoint.lon];
  const radiusInM = selectedRange * 1000;

  const bounds = geofire.geohashQueryBounds(center, radiusInM);

  const promises = [];

  for (const b of bounds) {
    const geoEvents = query(
      q,
      orderBy('event.location.hash'),
      startAt(b[0]),
      endAt(b[1]),
      limit(3)
    );
    const querySnapShot = await getDocs(geoEvents);
    promises.push(querySnapShot);
  }

  const querySnapshots = await Promise.all(promises);

  const events = [] as IEvent[];

  querySnapshots.forEach((snapshot) => {
    snapshot.docs.forEach((doc) => {
      events.push(doc.data().event);
    });
  });

  return events;
};

export const getAllEvents = async (
  geoPoint: GeoPoint,
  selectedRange: number,
  pageNumber = 1,
  itemsPerPage = 10
) => {
  const q = collection(db, 'events');

  const center = [+geoPoint.lat, +geoPoint.lon];
  const radiusInM = selectedRange * 1000;

  const bounds = geofire.geohashQueryBounds(center, radiusInM);

  let events = [] as IEvent[];

  for (const b of bounds) {
    let geoEventsQuery = query(
      q,
      orderBy('event.location.hash'),
      startAt(b[0]),
      endAt(b[1]),
      limit(itemsPerPage)
    );

    if (pageNumber > 1) {
      const lastDoc = events[events.length - 1]?.metadata?.createdAt;

      geoEventsQuery = query(
        q,
        orderBy('event.location.hash'),
        startAt(b[0]),
        endAt(b[1]),
        startAfter(lastDoc),
        limit(itemsPerPage)
      );
    }

    const geoEventsSnapshot = await getDocs(geoEventsQuery);

    const geoEvents = geoEventsSnapshot.docs.map((doc) => doc.data().event);
    events = events.concat(geoEvents);
  }

  const totalEventsQuery = query(q);
  const totalEventsSnapshot = await getDocs(totalEventsQuery);
  const totalEvents = totalEventsSnapshot.size;

  return { events, totalEvents };
};

export const getMyEvents = async (pageNumber = 1, itemsPerPage = 10) => {
  const user = auth.currentUser;
  const q = collection(db, 'events');

  let eventsQuery = query(
    q,
    where(`event.metadata.author.uid`, `==`, user && user.uid),
    limit(itemsPerPage)
  );

  if (pageNumber > 1) {
    const lastEvent = await getDocs(
      query(q, limit((pageNumber - 1) * itemsPerPage + 1))
    )
      .then((snap) => snap.docs[snap.docs.length - 1])
      .then((doc) => doc?.data().event?.metadata?.createdAt);

    if (lastEvent) {
      eventsQuery = query(q, startAfter(lastEvent), limit(itemsPerPage));
    }
  }

  const totalEventsQuery = query(q);
  const totalEventsSnapshot = await getDocs(totalEventsQuery);
  const totalEvents = totalEventsSnapshot.size;

  const eventsSnapShot = await getDocs(eventsQuery);
  let events = eventsSnapShot.docs.map((doc) => doc.data().event);

  return { events, totalEvents };
};

export const getParticipatedEvents = async (
  pageNumber = 1,
  itemsPerPage = 10
) => {
  const user = auth.currentUser;
  const q = collection(db, 'events');

  let eventsQuery = query(
    q,
    where(
      `event.participating.submittedUsers`,
      'array-contains',
      user && user.uid
    ),
    limit(itemsPerPage)
  );

  if (pageNumber > 1) {
    const lastEvent = await getDocs(
      query(q, limit((pageNumber - 1) * itemsPerPage + 1))
    )
      .then((snap) => snap.docs[snap.docs.length - 1])
      .then((doc) => doc?.data().event?.metadata?.createdAt);

    if (lastEvent) {
      eventsQuery = query(q, startAfter(lastEvent), limit(itemsPerPage));
    }
  }

  const totalEventsQuery = query(q);
  const totalEventsSnapshot = await getDocs(totalEventsQuery);
  const totalEvents = totalEventsSnapshot.size;

  const eventsSnapShot = await getDocs(eventsQuery);
  let events = eventsSnapShot.docs.map((doc) => doc.data().event);

  return { events, totalEvents };
};

export const getFavoriteEvents = async (pageNumber = 1, itemsPerPage = 10) => {
  const user = auth.currentUser;
  const q = collection(db, 'events');

  let eventsQuery = query(
    q,
    where(`event.favoriteUsers`, 'array-contains', user && user.uid),
    limit(itemsPerPage)
  );

  if (pageNumber > 1) {
    const lastEvent = await getDocs(
      query(q, limit((pageNumber - 1) * itemsPerPage + 1))
    )
      .then((snap) => snap.docs[snap.docs.length - 1])
      .then((doc) => doc?.data().event?.metadata?.createdAt);

    if (lastEvent) {
      eventsQuery = query(q, startAfter(lastEvent), limit(itemsPerPage));
    }
  }

  const totalEventsQuery = query(q);
  const totalEventsSnapshot = await getDocs(totalEventsQuery);
  const totalEvents = totalEventsSnapshot.size;

  const eventsSnapShot = await getDocs(eventsQuery);
  let events = eventsSnapShot.docs.map((doc) => doc.data().event);

  return { events, totalEvents };
};
