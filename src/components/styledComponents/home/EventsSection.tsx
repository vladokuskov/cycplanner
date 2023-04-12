import styled from 'styled-components';
import Link from 'next/link';
import PageTitle from '@/components/styledComponents/PageTitle';
import HomeInfo from '@/components/styledComponents/home/HomeInfo';
import { EventFilter } from '@/components/styledComponents/event-filter/EventFilter';
import { useEffect, useState } from 'react';
import { IEvent } from '@/components/types/styledComponents/event.types';
import { getLastEvenets } from '@/firebase/firestore';
import Event from '../event/Event';
import { useAppSelector } from '@/store/redux-hooks';
import geohash from 'ngeohash';
import { SkeletonLoader } from '../skeleton/Skeleton';
import { Loading } from '@/components/types/props/loadingState.types';
import { ErrorMessage } from '../ErrorMessage';

const EventsSectionWrapper = styled.section`
  width: 100%;
  padding: 1rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  @media (min-width: 680px) {
    padding: 1rem 3rem;
  }
`;

const HomeEventsHeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  @media (min-width: 680px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;
const HeaderTitleWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  @media (min-width: 680px) {
    width: 100%;
    flex-direction: row;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

const HomeEventsBodyWrapper = styled.div`
  padding: 1.5rem 0;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
  .more-link {
    align-self: center;
    color: #2c2c2c;
    font-weight: 600;
    font-size: 1rem;
    line-height: 12px;
    margin-left: 0.5rem;
    margin-top: 2rem;
    @media (min-width: 680px) {
      font-size: 1.2rem;
    }
    &:hover,
    &:focus {
      color: #5a5a5a;
    }
    &:active {
      color: #303030;
    }
  }
`;

const BodyEventsWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  gap: 1rem;
`;

const EventsSection = () => {
  const [events, setEvents] = useState<IEvent[] | null>(null);
  const [loadingState, setLoadingState] = useState<Loading>(Loading.loading);

  const geoPoint = useAppSelector((state) => state.filterReducer.geoPoint);
  const selectedSorting = useAppSelector(
    (state) => state.filterReducer.sorting
  );
  const selectedRange = useAppSelector((state) => state.filterReducer.range);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const response = await getLastEvenets(
          geoPoint,
          geohash.encode(geoPoint.lat, geoPoint.lon),
          selectedSorting,
          selectedRange
        );
        setEvents(response);
        setLoadingState(Loading.success);
      } catch (err) {
        console.log(err);
        setLoadingState(Loading.error);
      }
    };

    getEvents();
  }, [geoPoint, selectedSorting, selectedRange]);

  return (
    <EventsSectionWrapper>
      <HomeEventsHeaderWrapper>
        <HeaderTitleWrapper>
          <PageTitle title="EVENTS" />
          <HomeInfo />
        </HeaderTitleWrapper>
        <EventFilter />
      </HomeEventsHeaderWrapper>
      <HomeEventsBodyWrapper>
        <BodyEventsWrapper>
          {loadingState === Loading.loading ? (
            <SkeletonLoader variant="event-home" />
          ) : loadingState === Loading.success ? (
            <>
              {!events && <ErrorMessage variant="no-events" />}
              {events &&
                events.map((data) => <Event key={data.id} {...data} />)}
            </>
          ) : (
            <ErrorMessage variant="loading" />
          )}
        </BodyEventsWrapper>
        <Link href="/events" title="See more events" className="more-link">
          See more ..
        </Link>
      </HomeEventsBodyWrapper>
    </EventsSectionWrapper>
  );
};

export { EventsSection };
