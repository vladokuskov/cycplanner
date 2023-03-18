interface EventDetail {
  type: 'default' | 'location' | 'date';
  title?: string;
  description?: string;
  date?: {
    start: string;
    end: string;
  };
  locationName?: string;
  locationGeoPoint?: {
    lat: number;
    lng: number;
  };
}

const EventDetail = ({
  type,
  title,
  description,
  date,
  locationName,
  locationGeoPoint,
}: EventDetail) => {
  const eventDetailClassName = `event-detail-content ${
    type === 'location' && 'location-detail'
  }`;
  return (
    <div className="event-detail-wrapper">
      {type === 'default' && (
        <>
          <span className="event-detail-title">{title}</span>
          <span className={eventDetailClassName}>{description}</span>
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
    </div>
  );
};

export default EventDetail;
