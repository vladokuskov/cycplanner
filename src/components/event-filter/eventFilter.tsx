import { useState, useEffect } from 'react';
import Geocoder from './geocoder';

export interface GeoPoint {
  latitude: number;
  longitude: number;
}

const EventFilter = () => {
  const [geoPoint, setGeoPoint] = useState<GeoPoint>({
    latitude: 51.509865,
    longitude: -0.118092,
  });

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
    </div>
  );
};

export default EventFilter;
