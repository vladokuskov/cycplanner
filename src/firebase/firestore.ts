import { getFirestore, getDocs, query, collection } from 'firebase/firestore';

import { app } from './firebase';

const db = getFirestore(app);

export const getEvents = async () => {
  const q = query(collection(db, 'events'));
  const querySnapShot = await getDocs(q);

  const events = querySnapShot.docs.map((doc) => ({
    id: doc.id,
    test: doc.data().test,
  }));

  return events;
};
