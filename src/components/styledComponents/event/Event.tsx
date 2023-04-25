import styled, { css } from 'styled-components';
import dynamic from 'next/dynamic';
import { IEvent } from '../../types/styledComponents/event.types';
import { ProfilePreview } from '../ProfilePreview';
import { Button } from '../Button';
import {
  faShareNodes,
  faHeart as filledHeart,
} from '@fortawesome/free-solid-svg-icons';
import {
  faHeart as emptyHeart,
  faComment,
  faUserCircle,
} from '@fortawesome/free-regular-svg-icons';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { SkeletonLoader } from '../skeleton/Skeleton';
import { useAuth } from '@/context/AuthContext';
import { updateEventBookmarks } from '@/firebase/events';

const EventWrapper = styled.div`
  position: relative;
  max-width: 43rem;
  min-width: 16rem;
  width: 100%;
  background-color: #f1f1f1;
  border-radius: 10px;
  margin-bottom: 1rem;
  h3,
  h4,
  p,
  a {
    font-family: 'Roboto';
    font-style: normal;
  }
`;

const EventHeaderWrapper = styled.div`
  width: 100%;
  padding: 1rem 0.9rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const EventMainWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 0.5rem;
  @media (min-width: 680px) {
    flex-direction: row;
    padding-bottom: 0.5rem;
  }
`;

const EventContentWrapper = styled.div`
  width: 100%;
  padding: 0.1rem 0.9rem 0.1rem 0.9rem;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  gap: 0.5rem;
`;

const MapPlaceholder = styled.div`
  width: 100%;
  padding: 0 1rem 1rem 1rem;
  height: 13rem;
  border-radius: 8px;
`;

const EventMapWrapper = styled.div<{ isMapMaximized: boolean }>`
  width: 100%;
  padding: 0 1rem 1rem 1rem;
  height: 13rem;
  border-radius: 8px;
  z-index: 1;
  ${({ isMapMaximized }) =>
    isMapMaximized &&
    css`
      padding: 0.3rem;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    `}
`;

const ContentInfoWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  gap: 0.4rem;
`;

const ContentButtonsWrapper = styled.div<{ isBookmarked: boolean }>`
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  @media (min-width: 680px) {
    margin-bottom: 0;
  }
  .bookmarkBtn {
    ${({ isBookmarked }) =>
      isBookmarked &&
      css`
        color: #e25c5c;
        &:hover {
          color: #f37676;
        }
        &:active {
          color: #e25c5c;
        }
      `}
  }
`;

const EventTitle = styled.h3`
  font-weight: 500;
  font-size: 1.3rem;
  line-height: 23px;

  color: #2c2c2c;
`;

const EventDescription = styled.p`
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.2rem;
  color: #656565;
`;

const EventDetailWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.2rem;
`;

const DetailTitle = styled.h4`
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.2rem;
  color: #454545;
`;
const DetailDescription = styled.p`
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.2rem;
  color: #656565;
`;

const DetailLocation = styled.a`
  cursor: pointer;
  text-decoration: underline;
  text-decoration-color: #656565;
  text-underline-offset: 0.1rem;
  &:hover,
  &:focus {
    text-decoration-color: #979797;
    p {
      color: #979797;
    }
  }
`;

const Event = (event: IEvent) => {
  const router = useRouter();
  const { user } = useAuth();
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [isMapMaximized, setIsMapMaximized] = useState<boolean>(false);

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
    checkIsBookmarked();
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

  return (
    <EventWrapper>
      <EventHeaderWrapper>
        <ProfilePreview
          name={event.metadata.author.username}
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
              <DetailTitle>Location:</DetailTitle>
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
          <ContentButtonsWrapper isBookmarked={isBookmarked}>
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
            <Button
              variant="icon"
              icon={faUserCircle}
              size="xl2"
              onClick={handleRedirectToDetail}
            />
            <Button variant="filled" text="Participate" size="sm2" />
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
