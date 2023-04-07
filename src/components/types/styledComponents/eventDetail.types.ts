export type EventDetail = {
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
};
