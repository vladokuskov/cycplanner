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
import styled, { css } from 'styled-components';
import { Button } from '../Button/Button';
import { ProfilePreview } from '../ProfilePreview/ProfilePreview';
import { SkeletonLoader } from '../skeleton/Skeleton';
import { IEvent, Participating } from '../types/shared/event.types';

const DetailMainSectionWrapper = styled.section`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  h3,
  h4,
  p,
  a {
    font-family: 'Roboto';
    font-style: normal;
  }
`;

const MapWrapper = styled.div<{ isMapMaximized: boolean }>`
  width: 100%;
  max-height: ${({ isMapMaximized }) => (isMapMaximized ? '20rem' : '15rem')};
  height: 100%;
  min-height: 15rem;
  @media (min-width: 680px) {
    max-height: ${({ isMapMaximized }) => (isMapMaximized ? '25rem' : '15rem')};
  }
`;

const InfoWrapper = styled.div`
  width: 100%;
  padding: 1rem 0;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
`;

const Title = styled.h2`
  letter-spacing: 0.01em;
  font-weight: 600;
  color: #2c2c2c;
  margin-top: 0.5rem;
`;

const Description = styled.p`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.2rem;
  color: #656565;
  margin-top: 1rem;
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

const InfoDetailsWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  gap: 0.3rem;
  margin-top: 0.7rem;
`;

const InfoDetail = styled.div`
  width: 100%;
  gap: 0.3rem;
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
`;

const ControlsWrapper = styled.div<{
  isBookmarked: boolean;
  participated: Participating;
}>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0.4rem 0;
  gap: 1rem;
  .participateBtn {
    ${({ participated }) =>
      participated === Participating.participated
        ? css`
            background-color: #4e8bea;
            &:hover,
            &:focus {
              background-color: #6a9be9;
            }
            &:active {
              background-color: #4e8bea;
            }
          `
        : participated === Participating.awaiting &&
          css`
            background-color: #e4e153;
            &:hover,
            &:focus {
              background-color: #f0ee6c;
            }
            &:active {
              background-color: #e4e153;
            }
          `}
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

const EditingSection = styled.div`
  width: 100%;
  padding: 0.3rem 1rem;
  background-color: #e7e7e7;
  border-radius: 15px;
  transition: 0.2s;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
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

const DetailMainSection = ({ event }: { event: IEvent | null }) => {
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
  const [isMapMaximized, setIsMapMaximized] = useState(false);
  const handleMapMaximizing = () => {
    setIsMapMaximized((prev) => !prev);
  };

  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [participatingStatus, setParticipatingStatus] = useState<Participating>(
    Participating.none
  );

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
      await navigator.clipboard.writeText(
        `${baseURL}event/${event && event.id}`
      );
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
        <Button
          variant="icon"
          icon={faShareNodes}
          size="md3"
          onClick={copyEventDetailURL}
        />
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
