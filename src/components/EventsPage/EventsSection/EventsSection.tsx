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
import {
  getAllEvents,
  getMyEvents,
  getParticipatedEvents,
  getFavouriteEvents,
} from '@/firebase/events';
import { Pagination } from '../Pagination/Pagination';
import { SkeletonLoader } from '../../skeleton/Skeleton';
import { Loading } from '@/components/types/shared/loadingState.types';
import { ErrorMessage } from '../../ErrorMessage/ErrorMessage';

const EventsSection = () => {
  const [allEvents, setAllEvents] = useState<IEvent[] | null>(null);
  const [myEvents, setMyEvents] = useState<IEvent[] | null>(null);
  const [participatedEvents, setParticipatedEvents] = useState<IEvent[] | null>(
    null
  );
  const [favouriteEvents, setFavouriteEvents] = useState<IEvent[] | null>(null);

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
        if (selectedFilter === 'all') {
          const { events, totalEvents } = await getAllEvents(
            selectedSorting,
            currentPage,
            10
          );
          setAllEvents(events);
          setTotalEvents(totalEvents);
        } else if (selectedFilter === 'my-events') {
          const { events, totalEvents } = await getMyEvents(
            selectedSorting,
            currentPage,
            10
          );
          setMyEvents(events);
          setTotalEvents(totalEvents);
        } else if (selectedFilter === 'participated') {
          const { events, totalEvents } = await getParticipatedEvents(
            selectedSorting,
            currentPage,
            10
          );
          console.log(events);
          setParticipatedEvents(events);
          setTotalEvents(totalEvents);
        } else if (selectedFilter === 'favourite') {
          const { events, totalEvents } = await getFavouriteEvents(
            selectedSorting,
            currentPage,
            10
          );
          setFavouriteEvents(events);
          setTotalEvents(totalEvents);
        }
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
        {(allEvents || myEvents || participatedEvents || favouriteEvents) && (
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
            {(!allEvents && selectedFilter === 'all') ||
              (!myEvents && selectedFilter === 'my-events') ||
              (!participatedEvents && selectedFilter === 'participated') ||
              (!favouriteEvents && selectedFilter === 'favourite' && (
                <ErrorMessage variant="no-events" />
              ))}
            {(allEvents?.length === 0 && selectedFilter === 'all') ||
              (myEvents?.length === 0 && selectedFilter === 'my-events') ||
              (participatedEvents?.length === 0 &&
                selectedFilter === 'participated') ||
              (favouriteEvents?.length === 0 &&
                selectedFilter === 'favourite' && (
                  <ErrorMessage variant="no-events" />
                ))}
            {allEvents &&
              selectedFilter === 'all' &&
              allEvents.map((data) => <Event key={data.id} {...data} />)}
            {myEvents &&
              selectedFilter === 'my-events' &&
              myEvents.map((data) => <Event key={data.id} {...data} />)}
            {participatedEvents &&
              selectedFilter === 'participated' &&
              participatedEvents.map((data) => (
                <Event key={data.id} {...data} />
              ))}
            {favouriteEvents &&
              selectedFilter === 'favourite' &&
              favouriteEvents.map((data) => <Event key={data.id} {...data} />)}
          </>
        ) : (
          <ErrorMessage variant="loading" />
        )}
      </EventsWrapper>
    </EventSectionWrapper>
  );
};

export { EventsSection };
