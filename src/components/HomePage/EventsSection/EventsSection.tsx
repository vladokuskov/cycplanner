import Link from 'next/link';
import {
  BodyEventsWrapper,
  HomeEventsBodyWrapper,
  HeaderTitleWrapper,
  HomeEventsHeaderWrapper,
  EventsSectionWrapper,
} from './EventsSection.styles';
import PageTitle from '@/components/PageTitle/PageTitle';
import HomeInfo from '../HomeInfo/HomeInfo';
import { EventFilter } from '@/components/EventFilter/EventFilter/EventFilter';
import { useEffect, useState } from 'react';
import { IEvent } from '@/components/types/shared/event.types';
import { getLastEvenets } from '@/firebase/events';
import Event from '../../Event/Event';
import { useAppSelector } from '@/store/redux-hooks';
import geohash from 'ngeohash';
import { SkeletonLoader } from '../../skeleton/Skeleton';
import { Loading } from '@/components/types/shared/loadingState.types';
import { ErrorMessage } from '../../ErrorMessage/ErrorMessage';

const EventsSection = () => {
  const [events, setEvents] = useState<IEvent[] | null>(null);
  const [loadingState, setLoadingState] = useState<Loading>(Loading.loading);

  const geoPoint = useAppSelector((state) => state.filterReducer.geoPoint);
  const selectedSorting = useAppSelector(
    (state) => state.filterReducer.sorting
  );
  const selectedRange = useAppSelector((state) => state.filterReducer.range);

  useEffect(() => {
    setLoadingState(Loading.loading);
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
              {events?.length === 0 && <ErrorMessage variant="no-events" />}
              {events &&
                events.map((data) => <Event key={data.id} {...data} />)}
            </>
          ) : (
            <ErrorMessage variant="loading" />
          )}
        </BodyEventsWrapper>
        {events && events.length > 0 && (
          <Link href="/events" title="See more events" className="more-link">
            See more ..
          </Link>
        )}
      </HomeEventsBodyWrapper>
    </EventsSectionWrapper>
  );
};

export { EventsSection };
