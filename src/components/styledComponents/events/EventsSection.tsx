import { EventFilter } from '../../EventFilter/EventFilter/EventFilter';
import styled from 'styled-components';
import Event from '../../Event/Event';
import { useEffect, useState } from 'react';
import { IEvent } from '@/components/types/shared/event.types';
import { useAppSelector } from '@/store/redux-hooks';
import { getAllEvents } from '@/firebase/events';
import { Pagination } from './Pagination';
import { SkeletonLoader } from '../../skeleton/Skeleton';
import { Loading } from '@/components/types/shared/loadingState.types';
import { ErrorMessage } from '../../ErrorMessage/ErrorMessage';

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
