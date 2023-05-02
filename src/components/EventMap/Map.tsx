import 'leaflet/dist/leaflet.css';

import { useEffect, useState } from 'react';

import * as L from 'leaflet';
import { MapContainer, Marker, Polyline, TileLayer } from 'react-leaflet';

import { EventMap } from '@/components/EventMap/Map.types';
import { downloadGPXFile } from '@/utils/downloadRoute';
import {
  faCloudDownloadAlt,
  faCompress,
  faExpand,
} from '@fortawesome/free-solid-svg-icons';

import { Button } from '../Button/Button';
import { SkeletonLoader } from '../skeleton/Skeleton';
import { StyledMapOverlayWrapper, StyledMapWrapper } from './Map.styles';

const startMarker = new L.Icon({
  alt: '',
  iconUrl: '/map/start-marker.svg',
  iconSize: [33, 33],
  iconAnchor: [9, 25],
});

const finishMarker = new L.Icon({
  alt: '',
  iconUrl: '/map/finish-marker.svg',
  iconSize: [25, 41],
  iconAnchor: [9, 31],
});

const Map = ({ route, isMapMaximized, handleMapMaximizing }: EventMap) => {
  const [isMounted, setIsMounted] = useState(false);
  const [map, setMap] = useState<L.Map | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const startPoint = route?.[0];
  const finishPoint = route?.[route.length - 1];

  useEffect(() => {
    if (isMounted && map && route) {
      const bounds = L.latLngBounds(
        route.map((geoPoint) => [+geoPoint.lat, +geoPoint.lon])
      );
      map.fitBounds(bounds);

      map.invalidateSize();
    }
  }, [isMounted, route, map, isMapMaximized]);

  return isMounted ? (
    <StyledMapWrapper>
      <StyledMapOverlayWrapper isMapMaximized={isMapMaximized}>
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
          icon={!isMapMaximized ? faExpand : faCompress}
          size="md3"
          text={!isMapMaximized ? 'Maximize map' : 'Minimize map'}
          disabled={!route}
          onClick={() => handleMapMaximizing()}
        />
      </StyledMapOverlayWrapper>
      <MapContainer
        attributionControl={isMapMaximized}
        zoomControl={false}
        scrollWheelZoom={true}
        center={[50, 30]}
        zoom={13}
        style={{
          height: '100%',
          width: '100%',
          zIndex: '1',
          borderRadius: '8px',
        }}
        ref={setMap}
        dragging={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {startPoint && (
          <Marker
            position={[+startPoint.lat, +startPoint.lon]}
            icon={startMarker}
          />
        )}
        {finishPoint && (
          <Marker
            position={[+finishPoint.lat, +finishPoint.lon]}
            icon={finishMarker}
          />
        )}
        {route && (
          <Polyline
            positions={route.map((geoPoint) => [+geoPoint.lat, +geoPoint.lon])}
          />
        )}
      </MapContainer>
    </StyledMapWrapper>
  ) : (
    <>
      <SkeletonLoader variant="event-map" />
    </>
  );
};

export default Map;
