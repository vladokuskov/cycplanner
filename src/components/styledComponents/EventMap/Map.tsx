import { GeoPoint } from '@/components/types/props/geoPoint.types';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, Polyline, TileLayer } from 'react-leaflet';
import styled from 'styled-components';
import { SkeletonLoader } from '../skeleton/Skeleton';

import * as L from 'leaflet';
import { Button } from '../Button';
import {
  faCloudDownloadAlt,
  faExpand,
} from '@fortawesome/free-solid-svg-icons';
import { downloadGPXFile } from '@/utils/downloadRoute';

const MapWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;
const MapOverlayWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0.5rem 1rem;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  border-radius: 8px;
  background: linear-gradient(
    180deg,
    #dcdcdcca 0%,
    rgba(217, 217, 217, 0) 100%
  );
`;

const Map = ({ route }: { route: GeoPoint[] | null | undefined }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [map, setMap] = useState<L.Map | null>(null);
  const [isMaximized, setIsMaximized] = useState<boolean>(false);

  const startPoint = route?.[0];
  const finishPoint = route?.[route.length - 1];

  const greenIcon = new L.Icon({
    iconUrl:
      'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
    shadowUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  const redIcon = new L.Icon({
    iconUrl:
      'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    shadowUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && map && route) {
      const bounds = L.latLngBounds(
        route.map((geoPoint) => [+geoPoint.lat, +geoPoint.lon])
      );
      map.fitBounds(bounds);
    }
  }, [isMounted, route, map]);

  return isMounted ? (
    <MapWrapper>
      <MapOverlayWrapper>
        <Button
          variant="icon"
          icon={faCloudDownloadAlt}
          size="md3"
          text="Download GPX route"
          disabled={!route}
          onClick={() => route && downloadGPXFile(route)}
        />
        <Button
          variant="icon"
          icon={faExpand}
          size="md3"
          text="Maximize map"
          disabled={!route}
        />
      </MapOverlayWrapper>
      <MapContainer
        attributionControl={false}
        zoomControl={false}
        scrollWheelZoom={false}
        center={[50, 30]}
        zoom={13}
        style={{
          height: '100%',
          width: '100%',
          zIndex: '1',
          borderRadius: '8px',
        }}
        ref={setMap}
        dragging={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {startPoint && (
          <Marker
            position={[+startPoint.lat, +startPoint.lon]}
            icon={greenIcon}
          />
        )}
        {finishPoint && (
          <Marker
            position={[+finishPoint.lat, +finishPoint.lon]}
            icon={redIcon}
          />
        )}
        {route && (
          <Polyline
            positions={route.map((geoPoint) => [+geoPoint.lat, +geoPoint.lon])}
          />
        )}
      </MapContainer>
    </MapWrapper>
  ) : (
    <>
      <SkeletonLoader variant="event-map" />
    </>
  );
};

export default Map;
