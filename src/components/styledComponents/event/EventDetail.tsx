import styled from 'styled-components';
import { EventDetail } from '@/components/types/styledComponents/eventDetail.types';

const EventDetailWrapper = styled.div``;

const EventDetail = ({
  type,
  title,
  description,
  date,
  locationName,
  locationGeoPoint,
}: EventDetail) => {
  return (
    <EventDetailWrapper>
      {type === 'default' && (
        <>
          <span className="event-detail-title">{title}</span>
          <span>{description}</span>
        </>
      )}
      {type === 'location' && (
        <>
          <span className="event-detail-title">{title}</span>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${locationGeoPoint?.lat},${locationGeoPoint?.lng}`}
            className="location-detail-link"
            target="_blank"
            title="See location on map"
            aria-label="See location on map"
          >
            {locationName}
          </a>
        </>
      )}
      {type === 'date' && (
        <div className="event-date-wrapper">
          <p className="event-detail-wrapper">
            <span className="event-detail-title">Start: </span>
            <span className="event-detail-content">{date?.start}</span>
          </p>
          <div className="date-separator" />
          <p className="event-detail-wrapper">
            <span className="event-detail-title">End: </span>
            <span className="event-detail-content">{date?.end}</span>
          </p>
        </div>
      )}
    </EventDetailWrapper>
  );
};

export { EventDetail };
