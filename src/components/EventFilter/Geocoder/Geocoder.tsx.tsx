import { useState, useEffect, useRef } from 'react';
import {
  GeocoderMainWrapper,
  GeocoderWrapper,
  GeocoderInputWrapper,
  GeocoderResultsWrapper,
  ResultWrapper,
} from './Geocoder.styles';

import { GeoPoint } from '../../types/shared/geoPoint.types';
import { Geocoder, LocationStatus } from '../../types/shared/geocoder.types';

import { Button } from '../../Button/Button';
import { Input } from '../../Input/Input';
import { SelectorLabel } from '../RangePicker/RangePicker.styles';
import { faCircleNotch, faLocation } from '@fortawesome/free-solid-svg-icons';

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
            isloading={isGeocoderLoading}
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