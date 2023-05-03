import { GeoPoint } from './geoPoint.types';

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
    lastUpdatedAt?: number;
  };
  participating?: { submittedUsers: string[]; awaitingUsers: string[] };
  favoriteUsers?: string[];
  title?: string;
  description?: string;
  difficulty?: Difficulty | string;
  distance?: string;
  type?: string;
  location: {
    geoPoint?: GeoPoint | { lat: null; lon: null };
    hash?: string;
  };
  route?: GeoPoint[] | null;
}

export enum Participating {
  none,
  awaiting,
  participated,
}

export type Difficulty = 'Easy' | 'Medium' | 'Hard' | 'Expert';
