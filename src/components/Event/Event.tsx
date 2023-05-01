import { useEffect, useMemo, useRef, useState } from 'react';

import { useClickOutside } from 'hooks/useClickOutside';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { useAuth } from '@/context/AuthContext';
import {
  deleteEvent,
  updateEventParticipating,
  updateFavoriteEvents,
} from '@/firebase/events';
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
import { IEvent, Participating } from '../types/shared/event.types';
import {
  ButtonWrapper,
  ContentButtonsWrapper,
  ContentInfoWrapper,
  CopiedMessage,
  DetailDescription,
  DetailLocation,
  DetailTitle,
  EventContentWrapper,
  EventDescription,
  EventDetailWrapper,
  EventHeaderWrapper,
  EventMainWrapper,
  EventMapWrapper,
  EventMenu,
  EventMenuButton,
  EventTitle,
  EventWrapper,
  HeaderButtonsWrapper,
  MapPlaceholder,
} from './Event.styles.ts';

const Event = (event: IEvent) => {
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

  const humanDate =
    event.metadata.createdAt &&
    new Date(event.metadata.createdAt).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

  const Map = useMemo(
    () =>
      dynamic(() => import('../EventMap/Map'), {
        loading: () => <SkeletonLoader variant="event-map" />,
        ssr: false,
      }),
    []
  );

  useEffect(() => {
    const checkIsFavorite = async () => {
      if (user && user.uid && event.favoriteUsers) {
        const isFavorite = event.favoriteUsers.includes(user.uid as never);
        setIsFavorite(isFavorite);
      }
    };

    const checkIsParticipated = async () => {
      if (user && user.uid && event.participating?.submitedUsers) {
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

    checkIsFavorite();

    checkIsParticipated();
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
        await deleteEvent(event?.id);
        setIsEventMenuOpen(false);
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <EventWrapper ref={eventContentRef}>
      <EventHeaderWrapper>
        <ProfilePreview
          name={event.metadata.author.username}
          description={humanDate ? humanDate : ''}
          photoURL={event.metadata.author.photoUrl}
          variant="no-link"
        />
        <HeaderButtonsWrapper ref={eventHeaderRef}>
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
            <EventMenu>
              <EventMenuButton danger onClick={handleEventDelete}>
                Delete event
              </EventMenuButton>
            </EventMenu>
          )}
        </HeaderButtonsWrapper>
      </EventHeaderWrapper>
      <EventMainWrapper>
        <EventContentWrapper>
          <ContentInfoWrapper>
            <EventTitle>{event.title}</EventTitle>
            <EventDescription>{event.description}</EventDescription>
            <EventDetailWrapper>
              <DetailTitle>Type:</DetailTitle>
              <DetailDescription>{event.type}</DetailDescription>
            </EventDetailWrapper>
            <EventDetailWrapper>
              <DetailTitle>Distance:</DetailTitle>
              <DetailDescription>{event.distance} km</DetailDescription>
            </EventDetailWrapper>
            <EventDetailWrapper>
              <DetailTitle>Start location:</DetailTitle>
              <DetailLocation
                title="View on Google Maps"
                target="_blank"
                href={`https://www.google.com/maps/search/?api=1&query=${event.location.geoPoint?.lat},${event.location.geoPoint?.lon}`}
              >
                <DetailDescription>{`${event.location.geoPoint?.lat
                  ?.toString()
                  .substring(0, 6)}, ${event.location.geoPoint?.lon
                  ?.toString()
                  .substring(0, 6)}`}</DetailDescription>
              </DetailLocation>
            </EventDetailWrapper>
          </ContentInfoWrapper>
          <ContentButtonsWrapper
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
            <ButtonWrapper>
              <p>{event.participating?.submitedUsers.length}</p>
              <Button
                variant="icon"
                icon={faUserCircle}
                size="xl2"
                onClick={handleRedirectToDetail}
              />
            </ButtonWrapper>

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
          </ContentButtonsWrapper>
        </EventContentWrapper>
        <EventMapWrapper isMapMaximized={isMapMaximized}>
          <Map
            route={event.route}
            isMapMaximized={isMapMaximized}
            handleMapMaximizing={handleMapMaximizing}
          />
        </EventMapWrapper>
        {isMapMaximized && <MapPlaceholder />}
      </EventMainWrapper>
    </EventWrapper>
  );
};

export default Event;
