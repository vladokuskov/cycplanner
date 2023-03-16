import Head from 'next/head';

import {
  IconShare,
  IconHeart,
  IconMessages,
  IconUsers,
} from '@tabler/icons-react';

import Button from '@/components/button';
import EventAuthor from './eventAuthor';

const Event = () => {
  return (
    <>
      <Head>
        <meta name="description" content={'*'} />
      </Head>
      <div className="event-wrapper">
        <div className="event-header-wrapper">
          <EventAuthor authorImage={null} authorName={'Vlad Okuskov'} />
          <Button type="icon" icon={<IconShare />} label="Share event" />
        </div>
        <div className="event-main-wrapper">
          <div className="event-details-wrapper">
            <div className="details-info-wrapper">
              <h2 className="event-title">Ride without dirt</h2>
              <p className="event-detail-wrapper">
                <span className="event-detail-title">Description: </span>
                <span className="event-detail-content">
                  we will drive through overgrown forest and fields
                </span>
              </p>
              <p className="event-detail-wrapper">
                <span className="event-detail-title">Distance: </span>
                <span className="event-detail-content">45 km</span>
              </p>
              <p className="event-detail-wrapper">
                <span className="event-detail-title">Type: </span>
                <span className="event-detail-content">gravel ride</span>
              </p>
              <p className="event-detail-wrapper">
                <span className="event-detail-title">Start location: </span>
                <span className="event-detail-content location-detail">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=40.7128,-74.0060
                    "
                    className="location-detail-link"
                    target="_blank"
                    title="See location on map"
                    aria-label="See location on map"
                  >
                    Ukraine, Novovolynsk, Doroshenka St.
                  </a>
                </span>
              </p>
              <div className="event-date-wrapper">
                <p className="event-detail-wrapper">
                  <span className="event-detail-title">Start: </span>
                  <span className="event-detail-content">Mar, 18, 15:30</span>
                </p>
                <div className="date-separator" />
                <p className="event-detail-wrapper">
                  <span className="event-subtitle">End: </span>
                  <span className="event-detail-content">Mar, 18, 20:30</span>
                </p>
              </div>
            </div>
            <div className="details-buttons-wrapper">
              <Button type="icon" icon={<IconHeart />} label="Like event" />
              <Button type="icon" icon={<IconMessages />} label="Comments" />
              <Button type="icon" icon={<IconUsers />} label="Participants" />
              <Button type="filled" label="Participate" size="md" />
            </div>
          </div>
          <div className="event-main-separator" />
          <div className="event-map-wrapper">
            <div className="map"></div>
          </div>
        </div>
        <div className="event-footer-wrapper"></div>
      </div>
    </>
  );
};

export default Event;
