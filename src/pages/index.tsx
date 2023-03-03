import Head from 'next/head';

import Banner from '@/assets/home/home-banner.svg';

export default function Home() {
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
            <button
              className="start-content-button get-started"
              title="Get started"
              aria-label="Get started"
              tabIndex={0}
            >
              GET STARTED
            </button>
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
              <div className="home-events-info-wrapper">
                <button
                  className="events-info-button"
                  title="How it works?"
                  aria-label="How it works?"
                  tabIndex={0}
                >
                  ?
                </button>
                <p className="events-info-title">
                  The nearest events are within a radius of 40 km
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
