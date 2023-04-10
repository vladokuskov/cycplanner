import styled from 'styled-components';
import Link from 'next/link';
import PageTitle from '@/components/styledComponents/PageTitle';
import HomeInfo from '@/components/styledComponents/home/HomeInfo';
import { EventFilter } from '@/components/styledComponents/event-filter/EventFilter';
import { useEffect, useState } from 'react';
import { IEvent } from '@/components/types/styledComponents/event.types';
import { getLastEvenets } from '@/firebase/firestore';
import Event from '../event/Event';

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getEvents = async () => {
      setIsLoading(true);
      try {
        const response = await getLastEvenets();
        setEvents(response);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };

    getEvents();
  }, []);

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
          {!isLoading ? (
            <>
              {' '}
              {events &&
                events.map((data) => <Event key={data.id} {...data} />)}
            </>
          ) : (
            <p>Loading</p>
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
