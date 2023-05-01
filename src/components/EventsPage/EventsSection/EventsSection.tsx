import { useEffect, useState } from 'react';

import { IEvent } from '@/components/types/shared/event.types';
import { Loading } from '@/components/types/shared/loadingState.types';
import {
  getAllEvents,
  getFavoriteEvents,
  getMyEvents,
  getParticipatedEvents,
} from '@/firebase/events';
import { useAppSelector } from '@/store/redux-hooks';
import { sortEvents } from '@/utils/sortEvents';

import { ErrorMessage } from '../../ErrorMessage/ErrorMessage';
import Event from '../../Event/Event';
import { EventFilter } from '../../EventFilter/EventFilter/EventFilter';
import { SkeletonLoader } from '../../skeleton/Skeleton';
import { Pagination } from '../Pagination/Pagination';
import {
  EventSectionWrapper,
  EventsWrapper,
  PageTitle,
} from './EventsSection.styles';

const EventsSection = () => {
  const [allEvents, setAllEvents] = useState<IEvent[] | null>(null);
  const [myEvents, setMyEvents] = useState<IEvent[] | null>(null);
  const [participatedEvents, setParticipatedEvents] = useState<IEvent[] | null>(
    null
  );
  const [favoriteEvents, setFavoriteEvents] = useState<IEvent[] | null>(null);
  const [forceFetch, setForceFetch] = useState(false);

  const [loadingState, setLoadingState] = useState<Loading>(Loading.loading);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalEvents, setTotalEvents] = useState<number>(0);
  let itemsPerPage = 10;
  const geoPoint = useAppSelector((state) => state.filterReducer.geoPoint);

  const selectedSorting = useAppSelector(
    (state) => state.filterReducer.sorting
  );
  const selectedRange = useAppSelector((state) => state.filterReducer.range);
  const selectedFilter = useAppSelector(
    (state) => state.filterReducer.eventsFilter
  );

  useEffect(() => {
    const getEvents = async () => {
      setLoadingState(Loading.loading);
      try {
        if (selectedFilter === 'all') {
          const { events, totalEvents } = await getAllEvents(
            geoPoint,
            selectedRange,
            currentPage,
            itemsPerPage
          );
          setAllEvents(events);
          setTotalEvents(totalEvents);
        } else if (selectedFilter === 'my-events') {
          const { events, totalEvents } = await getMyEvents(currentPage, 10);
          setMyEvents(events);
          setTotalEvents(totalEvents);
        } else if (selectedFilter === 'participated') {
          const { events, totalEvents } = await getParticipatedEvents(
            currentPage,
            itemsPerPage
          );
          setParticipatedEvents(events);
          setTotalEvents(totalEvents);
        } else if (selectedFilter === 'favorite') {
          const { events, totalEvents } = await getFavoriteEvents(
            currentPage,
            itemsPerPage
          );
          setFavoriteEvents(events);
          setTotalEvents(totalEvents);
        }
        setLoadingState(Loading.success);
      } catch (err) {
        setLoadingState(Loading.error);
      }
    };

    getEvents();
  }, [
    geoPoint,
    selectedRange,
    currentPage,
    selectedFilter,
    itemsPerPage,
    forceFetch,
  ]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleForceFetch = () => {
    setForceFetch((prev) => !prev);
  };

  return (
    <EventSectionWrapper>
      <PageTitle>Events</PageTitle>
      <EventFilter />
      <EventsWrapper>
        {(allEvents || myEvents || participatedEvents || favoriteEvents) && (
          <Pagination
            itemsPerPage={10}
            totalItems={totalEvents}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
        {loadingState === Loading.loading ? (
          <SkeletonLoader variant="event-events" />
        ) : loadingState === Loading.success ? (
          <>
            {((!allEvents && selectedFilter === 'all') ||
              (!myEvents && selectedFilter === 'my-events') ||
              (!participatedEvents && selectedFilter === 'participated') ||
              (!favoriteEvents && selectedFilter === 'favorite')) && (
              <ErrorMessage variant="no-events" />
            )}
            {((allEvents?.length === 0 && selectedFilter === 'all') ||
              (myEvents?.length === 0 && selectedFilter === 'my-events') ||
              (participatedEvents?.length === 0 &&
                selectedFilter === 'participated') ||
              (favoriteEvents?.length === 0 &&
                selectedFilter === 'favorite')) && (
              <ErrorMessage variant="no-events" />
            )}
            {allEvents &&
              selectedFilter === 'all' &&
              sortEvents(allEvents, selectedSorting).map((data) => (
                <Event
                  key={data.id}
                  event={data}
                  handleForceFetch={handleForceFetch}
                />
              ))}
            {myEvents &&
              selectedFilter === 'my-events' &&
              sortEvents(myEvents, selectedSorting).map((data) => (
                <Event
                  key={data.id}
                  event={data}
                  handleForceFetch={handleForceFetch}
                />
              ))}
            {participatedEvents &&
              selectedFilter === 'participated' &&
              sortEvents(participatedEvents, selectedSorting).map((data) => (
                <Event
                  key={data.id}
                  event={data}
                  handleForceFetch={handleForceFetch}
                />
              ))}
            {favoriteEvents &&
              selectedFilter === 'favorite' &&
              sortEvents(favoriteEvents, selectedSorting).map((data) => (
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
      </EventsWrapper>
    </EventSectionWrapper>
  );
};

export { EventsSection };
