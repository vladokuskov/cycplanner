import { GeoPoint } from '../types/shared/geoPoint.types';

export type EventMap = {
  route: GeoPoint[] | null | undefined;
  isMapMaximized: boolean;
  handleMapMaximizing: () => void;
};
