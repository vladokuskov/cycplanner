import { GeoPoint } from '../props/geoPoint.types';

export interface IEvent {
  id: string;
  metadata: {
    author: {
      username: string | null | undefined;
      photoUrl: string | null | undefined;
      uid: string | null | undefined;
    };
    likes: number;
    createdAt: number;
  };
  title: string;
  description: string;
  distance: string;
  type: string;
  location: {
    geoPoint: GeoPoint | { lat: null; lon: null };
  };
  route: GeoPoint[] | null;
}
