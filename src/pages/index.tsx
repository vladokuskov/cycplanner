import dynamic from 'next/dynamic';
import Head from 'next/head';
import styled from 'styled-components';

import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';

import Banner from '../assets/home-banner.svg';
import Link from 'next/link';
import StyledContainer from '@/components/styledComponents/StyledContainer';
import { Button } from '@/components/styledComponents/Button';
import PageTitle from '@/components/styledComponents/PageTitle';
import { PageSeparator } from '@/components/styledComponents/PageSeparator';
import HomeInfo from '@/components/styledComponents/HomeInfo';
import { EventFilter } from '@/components/styledComponents/event-filter/EventFilter';

const HomeMainWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const StartSectionWrapper = styled.section`
  width: 100%;
  padding: 1rem;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  @media (min-width: 680px) {
    padding: 1rem 3rem;
  }
`;

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

const StartContentWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  gap: 1.5rem;
`;

const StartBannerWrapper = styled.div`
  display: none;
  max-width: 35rem;
  min-width: 26rem;
  width: 100%;
  @media (min-width: 680px) {
    display: block;
    padding: 1rem 3rem;
  }
`;

const StartTitle = styled.h1`
  color: rgba(32, 32, 32, 0.77);
  font-weight: 500;
  font-size: 3.5rem;
  line-height: 93%;
  @media (min-width: 1200px) {
    font-size: 5rem;
  }
`;

const StartTitleBolder = styled.span`
  color: #2c2c2c;
  font-weight: 800;
`;

const StartDescription = styled.p`
  margin-top: 0.5rem;
  color: #2c2c2c;
  font-weight: 600;
  font-size: 1rem;
  line-height: 19px;
  margin-top: 0.5rem;
  @media (min-width: 680px) {
    max-width: 90%;
    font-size: 1.1rem;
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

export default function Web() {
  const DynamicLayout = dynamic(() => import('@/modules/layout'), {
    ssr: false,
  });

  const { user } = useAuth();

  const router = useRouter();

  return (
    <DynamicLayout>
      <Head>
        <title>cycplanner - Home</title>
      </Head>
      <StyledContainer variant="page">
        <HomeMainWrapper>
          <StartSectionWrapper>
            <StartContentWrapper>
              <>
                <StartTitle>
                  <StartTitleBolder>WELCOME to</StartTitleBolder>
                  <br />
                  cycplanner
                </StartTitle>
                <StartDescription>
                  the ultimate platform for cycling enthusiasts and event
                  organizers.
                </StartDescription>
              </>
              <Button
                disabled={user !== null}
                variant="filled"
                text="Get Started"
                bold
                size="md1"
                onClick={() => router.replace('/login')}
              />
            </StartContentWrapper>
            <StartBannerWrapper>
              <Banner />
            </StartBannerWrapper>
          </StartSectionWrapper>
          <PageSeparator />
          <EventsSectionWrapper>
            <HomeEventsHeaderWrapper>
              <HeaderTitleWrapper>
                <PageTitle title="EVENTS" />
                <HomeInfo />
              </HeaderTitleWrapper>
              <EventFilter />
            </HomeEventsHeaderWrapper>
            <HomeEventsBodyWrapper>
              <BodyEventsWrapper></BodyEventsWrapper>
              <Link
                href="/events"
                title="See more events"
                className="more-link"
              >
                See more ..
              </Link>
            </HomeEventsBodyWrapper>
          </EventsSectionWrapper>
        </HomeMainWrapper>
      </StyledContainer>
    </DynamicLayout>
  );
}
