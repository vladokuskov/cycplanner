import { GeoPoint } from '@/components/types/props/geoPoint.types';
import { useEffect, useState } from 'react';
import { MapContainer, Polyline, TileLayer } from 'react-leaflet';
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
          text="Download route"
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
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
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
