import type { ReactElement } from 'react';
import type { NextPageWithLayout } from './_app';

import Head from 'next/head';
import Layout from '@/modules/layout';
import Event from '@/components/event/event';

import Banner from '@/assets/home/home-banner.svg';

import EventFilter from '@/components/event-filter/eventFilter';
import EventsInfo from '@/components/home/eventsInfo';
import Link from 'next/link';
import Button from '@/components/button';

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>cycplanner - Home</title>
      </Head>
      <main className="home-wrapper">
        <div className="home-start-wrapper">
          <div className="home-start-content-wrapper">
            <h1 className="start-content-title">
              <span>WELCOME to</span>
              <br />
              cycplanner
            </h1>
            <p className="start-content-description">
              the ultimate platform for cycling enthusiasts and event
              organizers.
            </p>
            <Link href="/events">
              <Button type="filled" label="Get Started" size="xxl" />
            </Link>
          </div>
          <div className="home-start-banner-wrapper">
            <Banner className="start-banner" />
          </div>
        </div>
        <div className="page-separator" />
        <div className="home-events-wrapper">
          <div className="home-events-header">
            <div className="home-events-title-wrapper">
              <h2 className="home-events-title section-title">EVENTS</h2>
              <EventsInfo />
            </div>
            <EventFilter />
          </div>
          <div className="home-events-body">
            <div className="body-events-wrapper">
              <Event />
            </div>
            <div className="body-events-footer">
              <Link href="/events" className="events-footer-extend">
                See more...
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
