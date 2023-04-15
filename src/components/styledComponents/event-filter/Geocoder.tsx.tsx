import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import { GeoPoint } from '@/components/types/props/geoPoint.types';
import { Geocoder } from '@/components/types/props/geocoder.types';
import { LocationStatus } from '@/components/types/props/geocoder.types';

import { Button } from '../Button';
import { Input } from '../Input';
import { SelectorLabel } from './RangePicker';
import { faCircleNotch, faLocation } from '@fortawesome/free-solid-svg-icons';

const GeocoderMainWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 0.3rem;
`;
const GeocoderWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;
const GeocoderInputWrapper = styled.div`
  width: 100%;
  position: relative;
`;
const GeocoderResultsWrapper = styled.ul`
  position: absolute;
  top: 2.2rem;
  width: 100%;
  border-radius: 8px;
  box-shadow: 0px 5px 15px -1px rgba(0, 0, 0, 0.09);
  background-color: #e5e5e5;
  z-index: 1;
`;

const ResultWrapper = styled.li`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid rgb(138, 138, 138);
  &:last-child {
    border-bottom: none;
  }
`;

const Geocoder = ({ changeGeoPoint, geoPoint }: Geocoder) => {
  const [reversedLocation, setReversedLocation] = useState<string>('London');
  const [geocoderValue, setGeocoderValue] = useState<string>(reversedLocation);
  const [isGeocoderLoading, setIsGeocoderLoading] = useState<boolean>(false);
  const [geocoderResponse, setGeocoderResponse] = useState<any>(null);
  const [isResultsOpen, setIsResultsOpen] = useState<boolean>(false);
  const [hasUserTyped, setHasUserTyped] = useState(false);

  const [locationStatus, setLocationStatus] = useState<LocationStatus>(
    LocationStatus.idle
  );

  const fetchGeoData = async () => {
    try {
      let key = process.env.NEXT_PUBLIC_GEOCODER_API;
      let url = `https://api.geoapify.com/v1/geocode/search?text=${geocoderValue}&apiKey=${key}`;
      setIsGeocoderLoading(true);
      const response = await fetch(url);
      if (!response.ok) {
        console.error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setGeocoderResponse(data.features);
      setIsGeocoderLoading(false);
      setIsResultsOpen(true);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleClear = () => {
    // Clear/reset input
    setGeocoderValue('');
    setGeocoderResponse([]);
  };

  const handleChangeGeocoder = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setGeocoderValue(e.target.value);
    setHasUserTyped(true);
  };

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    // Fetch geocoder after 400ms when user stop typing
    if (hasUserTyped) {
      if (geocoderValue.length >= 3) {
        timer = setTimeout(() => {
          fetchGeoData();
        }, 400);
      } else if (geocoderValue.length < 3) {
        setGeocoderResponse([]);
      }
    }

    return () => clearTimeout(timer);
  }, [geocoderValue, hasUserTyped]);

  useEffect(() => {
    if (reversedLocation) {
      setGeocoderResponse([]);
      setHasUserTyped(false);
      setGeocoderValue(reversedLocation);
    }
  }, [reversedLocation]);

  let geoResult;

  const handleResult = (point: {
    lat: number;
    lon: number;
    address: string;
  }) => {
    changeGeoPoint({ lat: `${point.lat}`, lon: `${point.lon}` });
    setLocationStatus(LocationStatus.idle);
    setGeocoderValue(point.address);
    setHasUserTyped(false);
    setIsResultsOpen(false);
  };

  if (geocoderResponse) {
    geoResult = geocoderResponse
      .slice(0, 3)
      .map(
        (item: {
          properties: { lat: number; lon: number; formatted: string };
        }) => {
          return (
            <ResultWrapper key={item.properties.lon}>
              <Button
                variant="default"
                full
                onClick={() =>
                  handleResult({
                    lat: item.properties.lat,
                    lon: item.properties.lon,
                    address: item.properties.formatted,
                  })
                }
                text={item.properties.formatted}
              />
            </ResultWrapper>
          );
        }
      );
  }

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    //Close results windows if user click outside
    const checkIfClickedOutside = (e: MouseEvent): void => {
      if (
        isResultsOpen &&
        ref.current &&
        !ref.current.contains(e.target as Node)
      ) {
        setIsResultsOpen(false);
      }
    };
    document.addEventListener('mousedown', checkIfClickedOutside);
    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [isResultsOpen, ref]);

  const getLocation = async () => {
    try {
      if (navigator.geolocation) {
        setLocationStatus(LocationStatus.fetching);
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const geoPoint = {
              lat: `${position.coords.latitude}`,
              lon: `${position.coords.longitude}`,
            };
            setLocationStatus(LocationStatus.success);
            changeGeoPoint(geoPoint);
          },
          (error) => {
            setLocationStatus(LocationStatus.error);
          }
        );
      }
    } catch (error) {
      setLocationStatus(LocationStatus.error);
      return null;
    }
  };

  const getReverseGeocode = async (
    geoPoint: GeoPoint
  ): Promise<string | null> => {
    try {
      setReversedLocation('');
      const apiKey = process.env.NEXT_PUBLIC_GEOCODER_API;
      const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${geoPoint.lat}&lon=${geoPoint.lon}&apiKey=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();
      const city = data.features[0].properties.city;
      const district = data.features[0].properties.district;
      const address = `${district}, ${city}`;
      setReversedLocation(address);
      return null;
    } catch (error) {
      console.error('An error occurred:', error);
      return null;
    }
  };

  useEffect(() => {
    if (locationStatus === LocationStatus.success) {
      getReverseGeocode(geoPoint);
    }
  }, [locationStatus]);

  return (
    <GeocoderMainWrapper>
      <SelectorLabel>Location</SelectorLabel>
      <GeocoderWrapper>
        <GeocoderInputWrapper ref={ref}>
          <Input
            variant="search"
            value={geocoderValue}
            onChange={handleChangeGeocoder}
            onClick={handleClear}
            placeholder="Enter location"
          />
          {isResultsOpen && (
            <GeocoderResultsWrapper>{geoResult}</GeocoderResultsWrapper>
          )}
        </GeocoderInputWrapper>
        <Button
          variant="icon-bg"
          icon={
            locationStatus === LocationStatus.fetching
              ? faCircleNotch
              : faLocation
          }
          rotate={locationStatus === LocationStatus.fetching}
          status={
            locationStatus === LocationStatus.error
              ? 'error'
              : locationStatus === LocationStatus.success
              ? 'success'
              : 'default'
          }
          disabled={locationStatus === LocationStatus.fetching}
          onClick={getLocation}
        />
      </GeocoderWrapper>
    </GeocoderMainWrapper>
  );
};

export default Geocoder;
