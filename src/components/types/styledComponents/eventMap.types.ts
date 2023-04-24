import { GeoPoint } from '../props/geoPoint.types';

export type EventMap = {
  route: GeoPoint[] | null | undefined;
  isMapMaximized: boolean;
  handleMapMaximizing: () => void;
};
