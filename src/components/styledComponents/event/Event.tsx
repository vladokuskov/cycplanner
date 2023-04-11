import styled from 'styled-components';
import { IEvent } from '../../types/styledComponents/event.types';
import { ProfilePreview } from '../ProfilePreview';
import { Button } from '../Button';
import { faShareNodes } from '@fortawesome/free-solid-svg-icons';
import {
  faHeart,
  faComment,
  faUserCircle,
} from '@fortawesome/free-regular-svg-icons';
import { useRouter } from 'next/router';

const EventWrapper = styled.div`
  max-width: 700px;
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

const EventSeparator = styled.div`
  opacity: 0.3;
  width: 80%;
  height: 0.1rem;
  padding: 0 1rem;
  border-radius: 10px;
  background-color: #9b9b9b;
  @media (min-width: 680px) {
    height: 13rem;
    padding: 0;
    width: 0.15rem;
  }
`;

const EventMapWrapper = styled.div``;

const ContentInfoWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  gap: 0.4rem;
`;

const ContentButtonsWrapper = styled.div`
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

  const shareEvent = () => {
    const baseURL = location.href;

    navigator.clipboard.writeText(`${baseURL}event/${event.id}`);
  };

  const handleRedirect = () => {
    router.push(`event/${event.id}`);
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
          onClick={shareEvent}
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
              <DetailDescription>{event.distance}</DetailDescription>
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
          <ContentButtonsWrapper>
            <Button variant="icon" icon={faHeart} size="xl2" />
            <Button
              variant="icon"
              icon={faComment}
              size="xl2"
              onClick={handleRedirect}
            />
            <Button
              variant="icon"
              icon={faUserCircle}
              size="xl2"
              onClick={handleRedirect}
            />
            <Button variant="filled" text="Participate" size="sm2" />
          </ContentButtonsWrapper>
        </EventContentWrapper>
        <EventMapWrapper></EventMapWrapper>
      </EventMainWrapper>
    </EventWrapper>
  );
};

export default Event;
