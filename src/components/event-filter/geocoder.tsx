import { useState, useEffect, useRef } from 'react';
import { GeoPoint } from './eventFilter';

interface Props {
  updateGeoPoint: (point: GeoPoint) => void;
  geoPoint: GeoPoint;
}

enum LocationStatus {
  idle,
  fetching,
  success,
  error,
}

const Geocoder = ({ updateGeoPoint, geoPoint }: Props) => {
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
    e: React.ChangeEvent<HTMLInputElement>
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

  const handleResult = (point: GeoPoint) => {
    updateGeoPoint(point);
    setLocationStatus(LocationStatus.idle);
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
            <li className="geocoder-result-wrapper" key={item.properties.lon}>
              <button
                className="geocoder-result-button"
                onClick={() =>
                  handleResult({
                    latitude: item.properties.lat,
                    longitude: item.properties.lon,
                  })
                }
              >
                {item.properties.formatted}
              </button>
            </li>
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
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
            setLocationStatus(LocationStatus.success);
            updateGeoPoint(geoPoint);
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
      const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${geoPoint.latitude}&lon=${geoPoint.longitude}&apiKey=${apiKey}`;
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
    <div className="filter-location-content">
      <div className="location-geocoder-wrapper" ref={ref}>
        <input
          name="geocoder"
          value={geocoderValue}
          className="geocoder-input"
          autoComplete="false"
          placeholder="Search location"
          title="Search location"
          aria-label="Search location"
          onChange={handleChangeGeocoder}
          onClick={() => setIsResultsOpen(true)}
          tabIndex={0}
        />
        <div className="geocoder-status-wrapper">
          {isGeocoderLoading ? (
            <div className="geocoder-loading-icon" />
          ) : geocoderValue.length > 0 ? (
            <button
              className="geocoder-clear-button"
              onClick={handleClear}
              title="Clear text"
              tabIndex={0}
            >
              <i className="close-icon" />
            </button>
          ) : (
            <i className="search-icon" />
          )}
        </div>
        {isResultsOpen && (
          <ul className="geocoder-results-wrapper">{geoResult}</ul>
        )}
      </div>
      <button
        className={
          locationStatus === LocationStatus.idle ||
          locationStatus === LocationStatus.fetching
            ? `location-find-button`
            : locationStatus === LocationStatus.success
            ? 'location-find-button founded'
            : locationStatus === LocationStatus.error
            ? 'location-find-button error'
            : 'location-find-button'
        }
        title="Find location"
        aria-label="Find location"
        disabled={locationStatus === LocationStatus.fetching}
        tabIndex={locationStatus === LocationStatus.fetching ? -1 : 0}
        onClick={getLocation}
      >
        {locationStatus === LocationStatus.idle ? (
          <i className="location-icon" />
        ) : locationStatus === LocationStatus.fetching ? (
          <i className="location-fetching-icon" />
        ) : (
          <i className="location-icon" />
        )}
      </button>
    </div>
  );
};

export default Geocoder;
