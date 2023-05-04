import { useMemo, useState } from 'react';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { StyledCopiedMessage } from '@/components/Event/Event.styles.ts';
import { Loading } from '@/components/types/shared/loadingState.types';
import { useAuth } from '@/context/AuthContext';
import { deleteEvent } from '@/firebase/events';
import { useCopyEventURL } from '@/hooks/useCopyEventURL';
import { useEventStatus } from '@/hooks/useEventStatus';
import { getHumanDate } from '@/utils/getHumanDate';
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
  Difficulty,
  Duration,
  IEvent,
  Participating,
} from '../../types/shared/event.types';
import {
  StyledControlsWrapper,
  StyledDescription,
  StyledDetailDescription,
  StyledDetailLocation,
  StyledDetailMainSectionWrapper,
  StyledDetailTitle,
  StyledInfoDetail,
  StyledInfoDetailsWrapper,
  StyledInfoWrapper,
  StyledMapWrapper,
  StyledTitle,
} from './DetailMainSection.styles';
import { EditingEventForm } from './EventEditingForm/EditingEventForm';

const DetailMainSection = ({
  event,
  handleLoadingChange,
}: {
  event: IEvent;
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

  const {
    participatingStatus,
    isFavorite,
    updateParticipatingStatus,
    updateFavoriteStatus,
  } = useEventStatus(user ? user : null, event);
  const { copyToClipboard, isCopied } = useCopyEventURL(
    event && event.id ? event.id : null
  );

  const eventDifficulty =
    event.difficulty === Difficulty.easy
      ? 'Easy'
      : event.difficulty === Difficulty.medium
      ? 'Medium'
      : event.difficulty === Difficulty.hard
      ? 'Hard'
      : event.difficulty === Difficulty.expert
      ? 'Expert'
      : '';

  const eventDuration =
    event.duration === Duration.short
      ? '<1 hour'
      : event.duration === Duration.medium
      ? '1-2 hours'
      : event.duration === Duration.long
      ? '2-4 hours'
      : event.duration === Duration.endurance
      ? '>4 hours'
      : '';

  const handleFavorite = async () => {
    await updateFavoriteStatus();
  };

  const handleParticipating = async () => {
    await updateParticipatingStatus();
  };

  const handleEventEditing = () => {
    setIsEditing((prev) => !prev);
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

  return (
    <StyledDetailMainSectionWrapper>
      <StyledMapWrapper isMapMaximized={isMapMaximized}>
        <Map
          route={event?.route}
          isMapMaximized={isMapMaximized}
          handleMapMaximizing={handleMapMaximizing}
        />
      </StyledMapWrapper>
      <StyledControlsWrapper
        isFavorite={isFavorite}
        participated={participatingStatus}
      >
        {!isCopied ? (
          <Button
            variant="icon"
            icon={faShareNodes}
            size="md3"
            onClick={copyToClipboard}
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
      </StyledControlsWrapper>
      <StyledInfoWrapper>
        <ProfilePreview
          name={event?.metadata.author.username}
          description={getHumanDate(event.metadata.createdAt)}
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
        <StyledTitle>{event?.title}</StyledTitle>
        <StyledDescription>{event?.description}</StyledDescription>
        <StyledInfoDetailsWrapper>
          <StyledInfoDetail>
            <StyledDetailTitle>Type:</StyledDetailTitle>
            <StyledDetailDescription>{event?.type}</StyledDetailDescription>
          </StyledInfoDetail>
          <StyledInfoDetail>
            <StyledDetailTitle>Duration:</StyledDetailTitle>
            <StyledDetailDescription>{eventDuration}</StyledDetailDescription>
          </StyledInfoDetail>
          <StyledInfoDetail>
            <StyledDetailTitle>Distance:</StyledDetailTitle>
            <StyledDetailDescription>
              {event?.distance} km
            </StyledDetailDescription>
          </StyledInfoDetail>
          <StyledInfoDetail>
            <StyledDetailTitle>Difficulty:</StyledDetailTitle>
            <StyledDetailDescription>{eventDifficulty}</StyledDetailDescription>
          </StyledInfoDetail>
          <StyledInfoDetail>
            <StyledDetailTitle>Start location:</StyledDetailTitle>
            <StyledDetailLocation
              title="View on Google Maps"
              target="_blank"
              href={`https://www.google.com/maps/search/?api=1&query=${event?.location.geoPoint?.lat},${event?.location.geoPoint?.lon}`}
            >
              <StyledDetailDescription>{`${event?.location.geoPoint?.lat
                ?.toString()
                .substring(0, 6)}, ${event?.location.geoPoint?.lon
                ?.toString()
                .substring(0, 6)}`}</StyledDetailDescription>
            </StyledDetailLocation>
          </StyledInfoDetail>
        </StyledInfoDetailsWrapper>
      </StyledInfoWrapper>
    </StyledDetailMainSectionWrapper>
  );
};

export { DetailMainSection };
