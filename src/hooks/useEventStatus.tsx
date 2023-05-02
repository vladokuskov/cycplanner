import {
  useEffect,
  useState,
} from 'react';

import { User } from 'firebase/auth';
import { useRouter } from 'next/router';

import {
  IEvent,
  Participating,
} from '@/components/types/shared/event.types';
import {
  updateEventParticipating,
  updateFavoriteEvents,
} from '@/firebase/events';

const useEventStatus = (user: User | null, event: IEvent) => {
  const [participatingStatus, setParticipatingStatus] = useState(
    Participating.none
  );
  const [isFavorite, setIsFavorite] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      setParticipatingStatus(Participating.none);
      return;
    } else if (user && user.uid && event.favoriteUsers) {
      const isFavorite = event.favoriteUsers.includes(user.uid);
      setIsFavorite(!!isFavorite);

      const submittedUsers = event.participating?.submittedUsers;
      const awaitingUsers = event.participating?.awaitingUsers;
      if (submittedUsers?.includes(user.uid)) {
        setParticipatingStatus(Participating.participated);
      } else if (awaitingUsers?.includes(user.uid)) {
        setParticipatingStatus(Participating.awaiting);
      }
    }
  }, [user, event]);

  const updateParticipatingStatus = async () => {
    if (user && event.id) {
      if (participatingStatus === Participating.none) {
        await updateEventParticipating(user.uid, event.id);
        setParticipatingStatus(Participating.awaiting);
      } else if (participatingStatus === Participating.awaiting) {
        await updateEventParticipating(user.uid, event.id);
        setParticipatingStatus(Participating.none);
      } else if (participatingStatus === Participating.participated) {
        try {
          const result = window.confirm(
            'Are you sure you want to cancel participating?'
          );
          if (result && event && event.id) {
            await updateEventParticipating(user.uid, event.id);
            setParticipatingStatus(Participating.none);
          }
        } catch (err) {
          console.log(err);
        }
      }
    } else if (!user) {
      router.push('/login');
    }
  };

  const updateFavoriteStatus = async () => {
    if (user && event.id) {
      await updateFavoriteEvents(user.uid, event.id);
      setIsFavorite((prev) => !prev);
    } else if (!user) {
      router.push('/login');
    }
  };

  return {
    participatingStatus,
    isFavorite,
    updateParticipatingStatus,
    updateFavoriteStatus,
  };
};

export { useEventStatus };
