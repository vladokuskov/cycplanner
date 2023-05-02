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
  StyledBodyEventsWrapper,
  StyledEventsSectionWrapper,
  StyledHeaderTitleWrapper,
  StyledHomeEventsBodyWrapper,
  StyledHomeEventsHeaderWrapper,
} from './EventsSection.styles';

const EventsSection = () => {
  const [events, setEvents] = useState<IEvent[] | null>(null);
  const [loadingState, setLoadingState] = useState<Loading>(Loading.loading);
  const [forceFetch, setForceFetch] = useState(false);

  const geoPoint = useAppSelector((state) => state.filterReducer.geoPoint);
  const selectedSorting = useAppSelector(
    (state) => state.filterReducer.sorting
  );
  const selectedRange = useAppSelector((state) => state.filterReducer.range);

  useEffect(() => {
    const getEvents = async () => {
      setLoadingState(Loading.loading);
      try {
        const response = await getLastEvents(geoPoint, selectedRange);
        setEvents(response);
        setLoadingState(Loading.success);
      } catch (err) {
        setLoadingState(Loading.error);
      }
    };

    getEvents();
  }, [geoPoint, selectedRange, forceFetch]);

  const handleForceFetch = () => {
    setForceFetch((prev) => !prev);
  };

  return (
    <StyledEventsSectionWrapper>
      <StyledHomeEventsHeaderWrapper>
        <StyledHeaderTitleWrapper>
          <PageTitle title="EVENTS" />
          <HomeInfo />
        </StyledHeaderTitleWrapper>
        <EventFilter />
      </StyledHomeEventsHeaderWrapper>
      <StyledHomeEventsBodyWrapper>
        <StyledBodyEventsWrapper>
          {loadingState === Loading.loading ? (
            <SkeletonLoader variant="event-home" />
          ) : loadingState === Loading.success ? (
            <>
              {(events?.length === 0 || !events) && (
                <ErrorMessage variant="no-events" />
              )}
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
        </StyledBodyEventsWrapper>
        {events && events.length > 0 && (
          <Link href="/events" title="See more events" className="more-link">
            See more ..
          </Link>
        )}
      </StyledHomeEventsBodyWrapper>
    </StyledEventsSectionWrapper>
  );
};

export { EventsSection };
