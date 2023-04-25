import { GeoPoint } from '../props/geoPoint.types';

export interface IEvent {
  id?: string;
  metadata: {
    author: {
      username?: string | null | undefined;
      photoUrl?: string | null | undefined;
      uid?: string | null | undefined;
    };
    likes?: number;
    createdAt?: number;
  };
  participating?: { submitedUsers: string[]; awaitingUsers: string[] };
  bookmarkedUsers?: [];
  title?: string;
  description?: string;
  distance?: string;
  type?: string;
  location: {
    geoPoint?: GeoPoint | { lat: null; lon: null };
    hash?: string;
  };
  route?: GeoPoint[] | null;
}
