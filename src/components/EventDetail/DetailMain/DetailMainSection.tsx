import { useAuth } from '@/context/AuthContext';
import {
  deleteEvent,
  updateEventBookmarks,
  updateEventParticipating,
} from '@/firebase/events';
import {
  faClockFour,
  faHeart as emptyHeart,
  faTrashAlt,
} from '@fortawesome/free-regular-svg-icons';
import {
  faCheck,
  faHeart as filledHeart,
  faShareNodes,
} from '@fortawesome/free-solid-svg-icons';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import {
  DetailLocation,
  ControlsWrapper,
  DetailMainSectionWrapper,
  InfoDetail,
  InfoDetailsWrapper,
  DetailDescription,
  DetailTitle,
  Description,
  Title,
  InfoWrapper,
  MapWrapper,
} from './DetailMainSection.styles';
import { Button } from '../../Button/Button';
import { ProfilePreview } from '../../ProfilePreview/ProfilePreview';
import { SkeletonLoader } from '../../skeleton/Skeleton';
import { IEvent, Participating } from '../../types/shared/event.types';
import { CopiedMessage } from '@/components/Event/Event.styles.ts';

const DetailMainSection = ({ event }: { event: IEvent | null }) => {
  const Map = useMemo(
    () =>
      dynamic(() => import('../../EventMap/Map'), {
        loading: () => <SkeletonLoader variant="event-map" />,
        ssr: false,
      }),
    []
  );

  const { user } = useAuth();
  const router = useRouter();
  const [isMapMaximized, setIsMapMaximized] = useState(false);
  const handleMapMaximizing = () => {
    setIsMapMaximized((prev) => !prev);
  };

  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [participatingStatus, setParticipatingStatus] = useState<Participating>(
    Participating.none
  );
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const checkIsBookmarked = async () => {
      if (user && user.uid && event?.bookmarkedUsers) {
        const isBookmarked = event.bookmarkedUsers.includes(user.uid as never);
        setIsBookmarked(isBookmarked);
      }
    };

    const checkIsParticipated = async () => {
      if (user && user.uid && event?.participating?.submitedUsers) {
        const isParticipated = event.participating?.submitedUsers.includes(
          user.uid as never
        );
        const isAwaiting = event.participating?.awaitingUsers.includes(
          user.uid as never
        );
        if (isParticipated) {
          setParticipatingStatus(Participating.participated);
        } else if (isAwaiting) {
          setParticipatingStatus(Participating.awaiting);
        }
      } else if (!user) {
        setParticipatingStatus(Participating.none);
      }
    };

    checkIsBookmarked();

    checkIsParticipated();
  }, [user]);

  const handleBookmaring = async () => {
    if (user && event?.id) {
      await updateEventBookmarks(user?.uid, event.id);
      setIsBookmarked((prev) => !prev);
    } else if (!user) {
      router.push('/login');
    }
  };

  const handleParticipating = async () => {
    if (user && event?.id) {
      if (participatingStatus === Participating.none) {
        await updateEventParticipating(user?.uid, event.id);
        setParticipatingStatus(Participating.awaiting);
      } else if (participatingStatus === Participating.awaiting) {
        await updateEventParticipating(user?.uid, event.id);
        setParticipatingStatus(Participating.none);
      } else if (participatingStatus === Participating.participated) {
        try {
          const result = window.confirm(
            'Are you sure you want to cancel participating?'
          );
          if (result && event && event.id) {
            await updateEventParticipating(user?.uid, event.id);
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

  const handleEventDelete = async () => {
    try {
      const result = window.confirm(
        'Are you sure you want to delete your event?'
      );
      if (result && event && event.id) {
        await deleteEvent(event?.id);
        router.push('/');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const copyEventDetailURL = async () => {
    const baseURL = window.location.href;
    if (baseURL) {
      await navigator.clipboard.writeText(`${baseURL}${event && event.id}`);
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  };

  const humanDate =
    event?.metadata.createdAt &&
    new Date(event.metadata.createdAt).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

  return (
    <DetailMainSectionWrapper>
      <MapWrapper isMapMaximized={isMapMaximized}>
        <Map
          route={event?.route}
          isMapMaximized={isMapMaximized}
          handleMapMaximizing={handleMapMaximizing}
        />
      </MapWrapper>
      <ControlsWrapper
        isBookmarked={isBookmarked}
        participated={participatingStatus}
      >
        {!isCopied ? (
          <Button
            variant="icon"
            icon={faShareNodes}
            size="md3"
            onClick={copyEventDetailURL}
          />
        ) : (
          <CopiedMessage>Copied</CopiedMessage>
        )}
        <Button
          className="bookmarkBtn"
          variant="icon"
          icon={isBookmarked ? filledHeart : emptyHeart}
          size="xl2"
          onClick={handleBookmaring}
        />
        {user?.uid !== event?.metadata.author.uid && (
          <Button
            className="participateBtn"
            variant="filled"
            text={
              participatingStatus === Participating.participated
                ? 'Participated'
                : participatingStatus === Participating.awaiting
                ? 'Pending'
                : 'Participate'
            }
            icon={
              participatingStatus === Participating.participated
                ? faCheck
                : participatingStatus === Participating.awaiting
                ? faClockFour
                : null
            }
            size="sm2"
            onClick={handleParticipating}
          />
        )}
        {user?.uid === event?.metadata.author.uid && (
          <Button
            variant="icon"
            status="error"
            text="Delete event"
            icon={faTrashAlt}
            size="md3"
            bold
            onClick={handleEventDelete}
          />
        )}
      </ControlsWrapper>
      <InfoWrapper>
        <ProfilePreview
          name={event?.metadata.author.username}
          description={humanDate ? humanDate : ''}
          photoURL={event?.metadata.author.photoUrl}
          variant="no-link"
        />
        <Title>{event?.title}</Title>
        <Description>{event?.description}</Description>
        <InfoDetailsWrapper>
          <InfoDetail>
            <DetailTitle>Type:</DetailTitle>
            <DetailDescription>{event?.type}</DetailDescription>
          </InfoDetail>
          <InfoDetail>
            <DetailTitle>Distance:</DetailTitle>
            <DetailDescription>{event?.distance} km</DetailDescription>
          </InfoDetail>
          <InfoDetail>
            <DetailTitle>Start location:</DetailTitle>
            <DetailLocation
              title="View on Google Maps"
              target="_blank"
              href={`https://www.google.com/maps/search/?api=1&query=${event?.location.geoPoint?.lat},${event?.location.geoPoint?.lon}`}
            >
              <DetailDescription>{`${event?.location.geoPoint?.lat
                ?.toString()
                .substring(0, 6)}, ${event?.location.geoPoint?.lon
                ?.toString()
                .substring(0, 6)}`}</DetailDescription>
            </DetailLocation>
          </InfoDetail>
        </InfoDetailsWrapper>
      </InfoWrapper>
    </DetailMainSectionWrapper>
  );
};

export { DetailMainSection };
