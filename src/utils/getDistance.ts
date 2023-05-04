import { GeoPoint } from '@/components/types/shared/geoPoint.types';

const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
};

const deg2rad = (deg: number) => {
  return deg * (Math.PI / 180);
};

export const calculateRouteDistance = (route: GeoPoint[]) => {
  let distance = 0;
  for (let i = 0; i < route.length - 1; i++) {
    const { lat: lat1, lon: lon1 } = route[i];
    const { lat: lat2, lon: lon2 } = route[i + 1];
    distance += calculateDistance(+lat1, +lon1, +lat2, +lon2);
  }
  return distance;
};
