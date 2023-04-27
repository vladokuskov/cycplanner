import {
  DetailLocation,
  DetailDescription,
  DetailTitle,
  EventDetailWrapper,
  EventDescription,
  EventTitle,
  ContentButtonsWrapper,
  ContentInfoWrapper,
  EventMapWrapper,
  MapPlaceholder,
  EventContentWrapper,
  EventMainWrapper,
  EventHeaderWrapper,
  EventWrapper,
  ButtonWrapper,
} from './Event.styles.ts';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { IEvent, Participating } from '../types/shared/event.types';

import { ProfilePreview } from '../ProfilePreview/ProfilePreview';
import { Button } from '../Button/Button';
import {
  faShareNodes,
  faHeart as filledHeart,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import {
  faHeart as emptyHeart,
  faComment,
  faUserCircle,
  faClockFour,
} from '@fortawesome/free-regular-svg-icons';

import { SkeletonLoader } from '../skeleton/Skeleton';
import { useAuth } from '@/context/AuthContext';
import {
  updateEventBookmarks,
  updateEventParticipating,
} from '@/firebase/events';

const Event = (event: IEvent) => {
  const router = useRouter();
  const { user } = useAuth();
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [participatingStatus, setParticipatingStatus] = useState<Participating>(
    Participating.none
  );
  const [isMapMaximized, setIsMapMaximized] = useState<boolean>(false);

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
    const checkIsBookmarked = async () => {
      if (user && user.uid && event.bookmarkedUsers) {
        const isBookmarked = event.bookmarkedUsers.includes(user.uid as never);
        setIsBookmarked(isBookmarked);
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

    checkIsBookmarked();

    checkIsParticipated();
  }, [user]);

  const handleMapMaximizing = () => {
    setIsMapMaximized((prev) => !prev);
  };

  const copyEventDetailURL = async () => {
    const baseURL = window.location.href;
    if (baseURL) {
      await navigator.clipboard.writeText(`${baseURL}event/${event.id}`);
    }
  };

  const handleRedirectToDetail = () => {
    router.push(`event/${event.id}`);
  };

  const handleBookmaring = async () => {
    if (user && event.id) {
      await updateEventBookmarks(user?.uid, event.id);
      setIsBookmarked((prev) => !prev);
    } else if (!user) {
      router.push('/login');
    }
  };

  const handleParticipating = async () => {
    if (user && event.id) {
      await updateEventParticipating(user?.uid, event.id);
      if (participatingStatus === Participating.none) {
        setParticipatingStatus(Participating.awaiting);
      } else if (
        participatingStatus === Participating.awaiting ||
        participatingStatus === Participating.participated
      ) {
        setParticipatingStatus(Participating.none);
      }
    } else if (!user) {
      router.push('/login');
    }
  };

  return (
    <EventWrapper>
      <EventHeaderWrapper>
        <ProfilePreview
          name={event.metadata.author.username}
          description={humanDate ? humanDate : ''}
          photoURL={event.metadata.author.photoUrl}
          variant="no-link"
        />
        <Button
          variant="icon"
          icon={faShareNodes}
          size="md3"
          onClick={copyEventDetailURL}
        />
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
            isBookmarked={isBookmarked}
            participated={participatingStatus}
          >
            <Button
              className="bookmarkBtn"
              variant="icon"
              icon={isBookmarked ? filledHeart : emptyHeart}
              size="xl2"
              onClick={handleBookmaring}
            />
            <Button
              variant="icon"
              icon={faComment}
              size="xl2"
              onClick={handleRedirectToDetail}
            />
            <ButtonWrapper>
              <p> {event.participating?.submitedUsers.length}</p>
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
