import { EventsFilter } from '@/components/types/shared/eventsFilter.types';
import { useAppDispatch, useAppSelector } from '@/store/redux-hooks';
import {
  faCalendar,
  faHeart,
  faUser,
} from '@fortawesome/free-regular-svg-icons';
import { faBarsStaggered } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import { EventsSidebarWrapper } from './EventsSidebar.styles';
import { Button } from '../../Button/Button';
import { updateEventsFilter } from '@/store/filterReducer';

const EventsSidebar = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const selectedFilter = useAppSelector(
    (state) => state.filterReducer.eventsFilter
  );

  const changeFilter = (e: EventsFilter) => {
    dispatch(updateEventsFilter(e));
  };

  return (
    <EventsSidebarWrapper>
      <Button
        variant="filled"
        text="Create event"
        full
        onClick={() => router.push('/create')}
      />
      <Button
        variant="default"
        icon={faBarsStaggered}
        text="All events"
        full
        disabled={selectedFilter === 'all'}
        onClick={() => changeFilter('all')}
      />
      <Button
        variant="default"
        icon={faUser}
        text="My Events"
        full
        disabled={selectedFilter === 'my-events'}
        onClick={() => changeFilter('my-events')}
      />
      <Button
        variant="default"
        icon={faCalendar}
        text="Participated"
        full
        disabled={selectedFilter === 'participated'}
        onClick={() => changeFilter('participated')}
      />
      <Button
        variant="default"
        icon={faHeart}
        text="Favourite"
        full
        disabled={selectedFilter === 'favourite'}
        onClick={() => changeFilter('favourite')}
      />
    </EventsSidebarWrapper>
  );
};

export { EventsSidebar };
