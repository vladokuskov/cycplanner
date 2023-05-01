import { useEffect, useState } from 'react';

import Link from 'next/link';

import { EventFilter } from '@/components/EventFilter/EventFilter/EventFilter';
import PageTitle from '@/components/PageTitle/PageTitle';
import { IEvent } from '@/components/types/shared/event.types';
import { Loading } from '@/components/types/shared/loadingState.types';
import { getLastEvents } from '@/firebase/events';
import { useAppSelector } from '@/store/redux-hooks';
import { sortEvents } from '@/utils/sortEvents';

import { ErrorMessage } from '../../ErrorMessage/ErrorMessage';
import Event from '../../Event/Event';
import { SkeletonLoader } from '../../skeleton/Skeleton';
import HomeInfo from '../HomeInfo/HomeInfo';
import {
  BodyEventsWrapper,
  EventsSectionWrapper,
  HeaderTitleWrapper,
  HomeEventsBodyWrapper,
  HomeEventsHeaderWrapper,
} from './EventsSection.styles';

const EventsSection = () => {
  const [events, setEvents] = useState<IEvent[] | null>(null);
  const [loadingState, setLoadingState] = useState<Loading>(Loading.loading);

  const geoPoint = useAppSelector((state) => state.filterReducer.geoPoint);
  const selectedSorting = useAppSelector(
    (state) => state.filterReducer.sorting
  );
  const selectedRange = useAppSelector((state) => state.filterReducer.range);
  const [forceFetch, setForceFetch] = useState(false);

  useEffect(() => {
    const getEvents = async () => {
      setLoadingState(Loading.loading);
      try {
        const response = await getLastEvents(geoPoint, selectedRange);
        setEvents(response);
        setLoadingState(Loading.success);
      } catch (err) {
        console.log(err);
        setLoadingState(Loading.error);
      }
    };

    getEvents();
  }, [geoPoint, selectedRange, forceFetch]);

  const handleForceFetch = () => {
    setForceFetch((prev) => !prev);
  };

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
                sortEvents(events, selectedSorting).map((data) => (
                  <Event
                    key={data.id}
                    event={data}
                    handleForceFetch={handleForceFetch}
                  />
                ))}
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
