import { useState } from 'react';

import Geocoder from './geocoder';
import DatePicker from './datePicker';
import RangePicker from './rangePicker';

export interface GeoPoint {
  latitude: number;
  longitude: number;
}

const EventFilter = () => {
  const [geoPoint, setGeoPoint] = useState<GeoPoint>({
    latitude: 51.509865,
    longitude: -0.118092,
  });

  const [initialDate, setInitialDate] = useState(new Date());

  const updateDate = (date: Date) => {
    setInitialDate(date);
  };

  const updateGeoPoint = (point: GeoPoint) => {
    setGeoPoint(point);
  };

  return (
    <div className="filter-wrapper">
      <div className="filter-location-wrapper">
        <label htmlFor="geocoder" className="filter-label">
          Location
        </label>
        <Geocoder updateGeoPoint={updateGeoPoint} geoPoint={geoPoint} />
      </div>
      <div className="filter-selectors-wrapper">
        <DatePicker updateDate={updateDate} initialDate={initialDate} />
        <RangePicker />
      </div>
    </div>
  );
};

export default EventFilter;
