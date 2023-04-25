import { EventFilter } from '../../EventFilter/EventFilter/EventFilter';
import {
  PageTitle,
  EventSectionWrapper,
  EventsWrapper,
} from './EventsSection.styles';
import Event from '../../Event/Event';
import { useEffect, useState } from 'react';
import { IEvent } from '@/components/types/shared/event.types';
import { useAppSelector } from '@/store/redux-hooks';
import { getAllEvents } from '@/firebase/events';
import { Pagination } from '../Pagination/Pagination';
import { SkeletonLoader } from '../../skeleton/Skeleton';
import { Loading } from '@/components/types/shared/loadingState.types';
import { ErrorMessage } from '../../ErrorMessage/ErrorMessage';

const EventsSection = () => {
  const [events, setEvents] = useState<IEvent[] | null>(null);
  const [loadingState, setLoadingState] = useState<Loading>(Loading.loading);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalEvents, setTotalEvents] = useState<number>(0);
  const geoPoint = useAppSelector((state) => state.filterReducer.geoPoint);

  const selectedSorting = useAppSelector(
    (state) => state.filterReducer.sorting
  );
  const selectedRange = useAppSelector((state) => state.filterReducer.range);
  const selectedFilter = useAppSelector(
    (state) => state.filterReducer.eventsFilter
  );

  useEffect(() => {
    setLoadingState(Loading.loading);
    const getEvents = async () => {
      try {
        const { events, totalEvents } = await getAllEvents(
          selectedSorting,
          selectedFilter,
          currentPage,
          10
        );
        setEvents(events);
        setTotalEvents(totalEvents);
        setLoadingState(Loading.success);
      } catch (err) {
        console.log(err);
        setLoadingState(Loading.error);
      }
    };

    getEvents();
  }, [geoPoint, selectedSorting, selectedRange, currentPage, selectedFilter]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <EventSectionWrapper>
      <PageTitle>Events</PageTitle>
      <EventFilter />
      <EventsWrapper>
        {events && events.length !== 0 && (
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
            {!events && <ErrorMessage variant="no-events" />}
            {events?.length === 0 && <ErrorMessage variant="no-events" />}
            {events && events.map((data) => <Event key={data.id} {...data} />)}
          </>
        ) : (
          <ErrorMessage variant="loading" />
        )}
        {events && events.length !== 0 && events.length > 2 && (
          <Pagination
            itemsPerPage={10}
            totalItems={totalEvents}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </EventsWrapper>
    </EventSectionWrapper>
  );
};

export { EventsSection };
