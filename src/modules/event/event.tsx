import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';

import ParticipantsIcon from '@/assets/event/participants-icon.svg';
import CommentsIcon from '@/assets/event/comment-icon.svg';
import LikeIcon from '@/assets/event/like-icon.svg';
import ShareIcon from '@/assets/event/share-icon.svg';

const Event = () => {
  return (
    <>
      <Head>
        <meta name="description" content={'*'} />
      </Head>
      <div className="event-wrapper">
        <div className="event-header-wrapper">
          <Link
            className="event-author-wrapper"
            href="/account/example"
            tabIndex={0}
          >
            <div className="author-avatar-wrapper" role="button">
              <Image
                src="/assets/event-avatar.jpg"
                className="author-avatar-image"
                width={30}
                height={30}
                alt=""
              />
            </div>
            <p className="author-name-title">Vlad Okuskov</p>
          </Link>
          <button
            className="share-event-button"
            title="Share event"
            aria-label="Share event"
            tabIndex={0}
          >
            <ShareIcon className="event-button-icon" />
          </button>
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
              <button
                className="event-button"
                title="Like event"
                aria-label="like-event"
              >
                <LikeIcon className="event-button-icon" />
              </button>
              <button
                className="event-button"
                title="See comments"
                aria-label="Comments"
              >
                <CommentsIcon className="event-button-icon" />
              </button>
              <button
                className="event-button"
                title="Participants"
                aria-label="Participants"
              >
                <ParticipantsIcon className="event-button-icon" />
              </button>
              <button
                className="event-button--participate"
                title="Participate"
                aria-label="Participate"
              >
                Participate
              </button>
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
