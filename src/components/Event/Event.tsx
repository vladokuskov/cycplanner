import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { useClickOutside } from 'hooks/useClickOutside';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { useAuth } from '@/context/AuthContext';
import {
  deleteEvent,
  updateEventParticipating,
  updateFavoriteEvents,
} from '@/firebase/events';
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
} from './Event.styles.ts';

const Event = ({
  event,
  handleForceFetch,
}: {
  event: IEvent;
  handleForceFetch: () => void;
}) => {
  const router = useRouter();
  const { user } = useAuth();
  const eventContentRef = useRef<HTMLDivElement>(null);
  const eventHeaderRef = useRef<HTMLDivElement>(null);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [participatingStatus, setParticipatingStatus] = useState<Participating>(
    Participating.none
  );
  const [isEventMenuOpen, setIsEventMenuOpen] = useClickOutside(
    eventHeaderRef,
    false
  );
  const [isMapMaximized, setIsMapMaximized] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState(false);

  const Map = useMemo(
    () =>
      dynamic(() => import('../EventMap/Map'), {
        loading: () => <SkeletonLoader variant="event-map" />,
        ssr: false,
      }),
    []
  );

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
  }, [user]);

  const handleMapMaximizing = () => {
    setIsMapMaximized((prev) => !prev);
  };

  const copyEventDetailURL = async () => {
    const baseURL = window.location.href;
    if (baseURL) {
      await navigator.clipboard.writeText(`${baseURL}event/${event.id}`);
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  };

  const handleRedirectToDetail = () => {
    router.push(`event/${event.id}`);
  };

  const handleFavorite = async () => {
    if (user && event.id) {
      await updateFavoriteEvents(user?.uid, event.id);
      setIsFavorite((prev) => !prev);
    } else if (!user) {
      router.push('/login');
    }
  };

  const handleParticipating = async () => {
    if (user && event.id) {
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
              onClick={copyEventDetailURL}
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
            <StyledEventDescription>{event.description}</StyledEventDescription>
            <StyledEventDetailWrapper>
              <StyledDetailTitle>Type:</StyledDetailTitle>
              <StyledDetailDescription>{event.type}</StyledDetailDescription>
            </StyledEventDetailWrapper>
            <StyledEventDetailWrapper>
              <StyledDetailTitle>Distance:</StyledDetailTitle>
              <StyledDetailDescription>
                {event.distance} km
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
