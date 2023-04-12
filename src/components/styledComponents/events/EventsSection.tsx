import { EventFilter } from '../event-filter/EventFilter';
import styled from 'styled-components';
import Event from '../event/Event';
import { useEffect, useState } from 'react';
import { IEvent } from '@/components/types/styledComponents/event.types';
import { useAppSelector } from '@/store/redux-hooks';
import { getAllEvents } from '@/firebase/firestore';
import geohash from 'ngeohash';

export const PageTitle = styled.h2`
  color: rgba(32, 32, 32, 0.77);
  font-style: normal;
  font-weight: 600;
  font-size: 2rem;
  line-height: 3rem;
`;

const EventSectionWrapper = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2rem;
  margin-top: 2rem;
  @media (min-width: 680px) {
    padding-left: 1rem;
    margin-top: 0;
  }
`;

const EventsWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  gap: 1rem;
`;

const EventsSection = () => {
  const [events, setEvents] = useState<IEvent[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const geoPoint = useAppSelector((state) => state.filterReducer.geoPoint);
  const selectedSorting = useAppSelector(
    (state) => state.filterReducer.sorting
  );
  const selectedRange = useAppSelector((state) => state.filterReducer.range);

  useEffect(() => {
    const getEvents = async () => {
      setIsLoading(true);

      try {
        const response = await getAllEvents(
          geoPoint,
          geohash.encode(geoPoint.lat, geoPoint.lon),
          selectedSorting,
          selectedRange
        );
        setEvents(response);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };

    getEvents();
  }, [geoPoint, selectedSorting, selectedRange]);

  return (
    <EventSectionWrapper>
      <PageTitle>Events</PageTitle>
      <EventFilter />
      <EventsWrapper>
        {!isLoading ? (
          <>
            {events && events.map((data) => <Event key={data.id} {...data} />)}
          </>
        ) : (
          <p>Loading</p>
        )}
      </EventsWrapper>
    </EventSectionWrapper>
  );
};

export { EventsSection };
