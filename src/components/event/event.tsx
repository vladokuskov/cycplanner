import Head from 'next/head';

import {
  IconShare,
  IconHeart,
  IconMessages,
  IconUsers,
  IconHeartFilled,
} from '@tabler/icons-react';

import Button from '@/components/button';
import EventAuthor from './eventAuthor';
import EventDetail from './eventDetail';
import { copyEventLink } from '@/utils/copyEventLink';

interface EventProps {
  isLiked: boolean;
}

const Event = ({ isLiked }: EventProps) => {
  return (
    <>
      <Head>
        <meta name="description" content={'*'} />
      </Head>
      <div className="event-wrapper">
        <div className="event-header-wrapper">
          <EventAuthor authorImage={null} authorName={'Vlad Okuskov'} />
          <Button
            type="icon"
            icon={<IconShare />}
            label="Share event"
            onClick={() => copyEventLink('!Change later!')}
          />
        </div>
        <div className="event-main-wrapper">
          <div className="event-details-wrapper">
            <div className="details-info-wrapper">
              <h2 className="event-title">Ride without dirt</h2>
              <EventDetail
                type="default"
                title="Description: "
                description="  we will drive through overgrown forest and fields"
              />
              <EventDetail
                type="default"
                title="Distance: "
                description="45 km"
              />
              <EventDetail
                type="default"
                title="Type: "
                description="gravel ride"
              />
              <EventDetail
                type="location"
                title="Start location: "
                locationName="Ukraine, Novovolynsk, Doroshenka St."
                locationGeoPoint={{ lat: 40.7128, lng: -74.006 }}
              />
              <EventDetail
                type="date"
                date={{ start: 'Mar, 18, 15:30', end: 'Mar, 18, 20:30' }}
              />
            </div>
            <div className="details-buttons-wrapper">
              <Button
                type="icon"
                icon={!isLiked ? <IconHeart /> : <IconHeartFilled />}
                label="Like event"
              />
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

Event.defaultProps = {
  isLiked: false,
};
