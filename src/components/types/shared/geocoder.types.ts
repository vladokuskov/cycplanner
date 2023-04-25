import { GeoPoint } from './geoPoint.types';

export type Geocoder = {
  changeGeoPoint: (point: GeoPoint) => void;
  geoPoint: GeoPoint;
};

export enum LocationStatus {
  idle,
  fetching,
  success,
  error,
}
