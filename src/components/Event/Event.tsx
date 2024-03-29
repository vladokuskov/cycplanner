import { useEffect, useMemo, useRef, useState } from 'react';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { useAuth } from '@/context/AuthContext';
import { deleteEvent } from '@/firebase/events';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useCopyEventURL } from '@/hooks/useCopyEventURL';
import { useEventStatus } from '@/hooks/useEventStatus';
import { getHumanDate } from '@/utils/getHumanDate';
import {
  faClockFour,
  faComment,
  faHeart as emptyHeart,
  faUserCircle,
} from '@fortawesome/free-regular-svg-icons';
import {
  faCheck,
  faEllipsisVertical,
  faHeart as filledHeart,
  faShareNodes,
} from '@fortawesome/free-solid-svg-icons';

import { Button } from '../Button/Button';
import { ProfilePreview } from '../ProfilePreview/ProfilePreview';
import { SkeletonLoader } from '../skeleton/Skeleton';
import {
  Difficulty,
  Duration,
  IEvent,
  Participating,
} from '../types/shared/event.types';
import {
  StyledButtonWrapper,
  StyledContentButtonsWrapper,
  StyledContentInfoWrapper,
  StyledCopiedMessage,
  StyledDetailDescription,
  StyledDetailLocation,
  StyledDetailTitle,
  StyledEventContentWrapper,
  StyledEventDescription,
  StyledEventDetailWrapper,
  StyledEventHeaderWrapper,
  StyledEventMainWrapper,
  StyledEventMapWrapper,
  StyledEventMenu,
  StyledEventMenuButton,
  StyledEventTitle,
  StyledEventWrapper,
  StyledHeaderButtonsWrapper,
  StyledMapPlaceholder,
} from './Event.styles';

const Event = ({
  event,
  handleForceFetch,
}: {
  event: IEvent;
  handleForceFetch: () => void;
}) => {
  const Map = useMemo(
    () =>
      dynamic(() => import('../EventMap/Map'), {
        loading: () => <SkeletonLoader variant="event-map" />,
        ssr: false,
      }),
    []
  );
  const { user } = useAuth();
  const router = useRouter();

  const eventContentRef = useRef<HTMLDivElement>(null);
  const eventHeaderRef = useRef<HTMLDivElement>(null);
  const {
    participatingStatus,
    isFavorite,
    updateParticipatingStatus,
    updateFavoriteStatus,
  } = useEventStatus(user ? user : null, event);

  const [isEventMenuOpen, setIsEventMenuOpen] = useClickOutside(
    eventHeaderRef,
    false
  );
  const [isMapMaximized, setIsMapMaximized] = useState<boolean>(false);
  const { copyToClipboard, isCopied } = useCopyEventURL(
    event && event.id ? event.id : null,
    'event'
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

  const handleMapMaximizing = () => {
    setIsMapMaximized((prev) => !prev);
  };

  const handleRedirectToDetail = () => {
    router.push(`event/${event.id}`);
  };

  const handleFavorite = async () => {
    await updateFavoriteStatus();
  };

  const handleParticipating = async () => {
    await updateParticipatingStatus();
  };

  useEffect(() => {
    if (isMapMaximized && eventContentRef.current) {
      eventContentRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }
  }, [isMapMaximized]);

  const handleEventMenuOpen = () => {
    setIsEventMenuOpen((prev) => !prev);
  };

  const handleEventDelete = async () => {
    try {
      const result = window.confirm(
        'Are you sure you want to delete your event?'
      );
      if (result && event && event.id) {
        await deleteEvent(event.id);
        setIsEventMenuOpen(false);
        handleForceFetch();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <StyledEventWrapper ref={eventContentRef}>
      <StyledEventHeaderWrapper>
        <ProfilePreview
          name={event.metadata.author.username}
          description={getHumanDate(event.metadata.createdAt)}
          photoURL={event.metadata.author.photoUrl}
          variant="no-link"
        />
        <StyledHeaderButtonsWrapper ref={eventHeaderRef}>
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
          {user?.uid === event?.metadata.author.uid && (
            <Button
              variant="icon"
              icon={faEllipsisVertical}
              size="md3"
              onClick={handleEventMenuOpen}
              wider
            />
          )}
          {isEventMenuOpen && user?.uid === event?.metadata.author.uid && (
            <StyledEventMenu>
              <StyledEventMenuButton danger onClick={handleEventDelete}>
                Delete event
              </StyledEventMenuButton>
            </StyledEventMenu>
          )}
        </StyledHeaderButtonsWrapper>
      </StyledEventHeaderWrapper>
      <StyledEventMainWrapper>
        <StyledEventContentWrapper>
          <StyledContentInfoWrapper>
            <StyledEventTitle>{event.title}</StyledEventTitle>
            <StyledEventDetailWrapper>
              <StyledDetailTitle>Duration:</StyledDetailTitle>
              <StyledDetailDescription>{eventDuration}</StyledDetailDescription>
            </StyledEventDetailWrapper>
            <StyledEventDetailWrapper>
              <StyledDetailTitle>Distance:</StyledDetailTitle>
              <StyledDetailDescription>
                {event.distance} km
              </StyledDetailDescription>
            </StyledEventDetailWrapper>
            <StyledEventDetailWrapper>
              <StyledDetailTitle>Difficulty:</StyledDetailTitle>
              <StyledDetailDescription>
                {eventDifficulty}
              </StyledDetailDescription>
            </StyledEventDetailWrapper>

            <StyledEventDetailWrapper>
              <StyledDetailTitle>Start location:</StyledDetailTitle>
              <StyledDetailLocation
                title="View on Google Maps"
                target="_blank"
                href={`https://www.google.com/maps/search/?api=1&query=${event.location.geoPoint?.lat},${event.location.geoPoint?.lon}`}
              >
                <StyledDetailDescription>{`${event.location.geoPoint?.lat
                  ?.toString()
                  .substring(0, 6)}, ${event.location.geoPoint?.lon
                  ?.toString()
                  .substring(0, 6)}`}</StyledDetailDescription>
              </StyledDetailLocation>
            </StyledEventDetailWrapper>
          </StyledContentInfoWrapper>
          <StyledContentButtonsWrapper
            isFavorite={isFavorite}
            participated={participatingStatus}
          >
            <Button
              className="favoriteBtn"
              variant="icon"
              icon={isFavorite ? filledHeart : emptyHeart}
              size="xl2"
              onClick={handleFavorite}
            />
            <Button
              variant="icon"
              icon={faComment}
              size="xl2"
              onClick={handleRedirectToDetail}
            />
            <StyledButtonWrapper>
              <p>{event.participating?.submittedUsers.length}</p>
              <Button
                variant="icon"
                icon={faUserCircle}
                size="xl2"
                onClick={handleRedirectToDetail}
              />
            </StyledButtonWrapper>

            {user?.uid !== event.metadata.author.uid && (
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
          </StyledContentButtonsWrapper>
        </StyledEventContentWrapper>
        <StyledEventMapWrapper isMapMaximized={isMapMaximized}>
          <Map
            route={event.route}
            isMapMaximized={isMapMaximized}
            handleMapMaximizing={handleMapMaximizing}
          />
        </StyledEventMapWrapper>
        {isMapMaximized && <StyledMapPlaceholder />}
      </StyledEventMainWrapper>
    </StyledEventWrapper>
  );
};

export default Event;
