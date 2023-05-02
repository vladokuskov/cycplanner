import {
  useEffect,
  useMemo,
  useState,
} from 'react';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { StyledCopiedMessage } from '@/components/Event/Event.styles.ts';
import { Loading } from '@/components/types/shared/loadingState.types';
import { useAuth } from '@/context/AuthContext';
import {
  deleteEvent,
  updateEventParticipating,
  updateFavoriteEvents,
} from '@/firebase/events';
import {
  faClockFour,
  faHeart as emptyHeart,
  faPenToSquare,
  faTrashAlt,
} from '@fortawesome/free-regular-svg-icons';
import {
  faCheck,
  faClose,
  faHeart as filledHeart,
  faShareNodes,
} from '@fortawesome/free-solid-svg-icons';

import { Button } from '../../Button/Button';
import { ProfilePreview } from '../../ProfilePreview/ProfilePreview';
import { SkeletonLoader } from '../../skeleton/Skeleton';
import {
  IEvent,
  Participating,
} from '../../types/shared/event.types';
import {
  ControlsWrapper,
  Description,
  DetailDescription,
  DetailLocation,
  DetailMainSectionWrapper,
  DetailTitle,
  InfoDetail,
  InfoDetailsWrapper,
  InfoWrapper,
  MapWrapper,
  Title,
} from './DetailMainSection.styles';
import { EditingEventForm } from './EditingForm/EditingEventForm';

const DetailMainSection = ({
  event,
  handleLoadingChange,
}: {
  event: IEvent | null;
  handleLoadingChange: (e: Loading) => void;
}) => {
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
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [participatingStatus, setParticipatingStatus] = useState<Participating>(
    Participating.none
  );
  const [isCopied, setIsCopied] = useState(false);

  const humanDate =
    event?.metadata.createdAt &&
    new Date(event.metadata.createdAt).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

  useEffect(() => {
    const checkIsFavorite = async () => {
      if (user && user.uid && event?.favoriteUsers) {
        const isFavorite = event.favoriteUsers.includes(user.uid as never);
        setIsFavorite(isFavorite);
      }
    };

    const checkIsParticipated = async () => {
      if (user && user.uid && event?.participating?.submittedUsers) {
        const isParticipated = event.participating?.submittedUsers.includes(
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

    checkIsFavorite();

    checkIsParticipated();
  }, [user]);

  const handleFavorite = async () => {
    if (user && event?.id) {
      await updateFavoriteEvents(user?.uid, event.id);
      setIsFavorite((prev) => !prev);
    } else if (!user) {
      router.push('/login');
    }
  };

  const handleEventEditing = () => {
    setIsEditing((prev) => !prev);
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
        isFavorite={isFavorite}
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
          <StyledCopiedMessage>Copied</StyledCopiedMessage>
        )}
        <Button
          className="favoriteBtn"
          variant="icon"
          icon={isFavorite ? filledHeart : emptyHeart}
          size="xl2"
          onClick={handleFavorite}
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
          <>
            <Button
              variant="icon"
              text="Edit event"
              icon={isEditing ? faClose : faPenToSquare}
              size="md3"
              bold
              onClick={handleEventEditing}
            />
            <Button
              className="deleteEventBtn"
              variant="icon"
              status="error"
              text="Delete event"
              icon={faTrashAlt}
              size="md3"
              bold
              onClick={handleEventDelete}
            />
          </>
        )}
      </ControlsWrapper>
      <InfoWrapper>
        <ProfilePreview
          name={event?.metadata.author.username}
          description={humanDate ? humanDate : ''}
          photoURL={event?.metadata.author.photoUrl}
          variant="no-link"
        />
        {isEditing && (
          <EditingEventForm
            event={event}
            handleEventEditing={handleEventEditing}
            handleLoadingChange={handleLoadingChange}
          />
        )}
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
