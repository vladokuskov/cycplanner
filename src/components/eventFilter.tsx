import LocIcon from '@/assets/filter/loc-icon.svg';

import { useState } from 'react';

const EventFilter = () => {
  const [geocoderValue, setGeocoderValue] = useState<string>('');
  const [isGeocoderLoading, setIsGeocoderLoading] = useState<boolean>(false);

  const handleClear = () => {
    setGeocoderValue('');
  };

  const handleChangeGeocoder = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setGeocoderValue(e.target.value);
  };

  return (
    <div className="filter-wrapper">
      <div className="filter-location-wrapper">
        <div className="location-geocoder-wrapper">
          <input
            value={geocoderValue}
            className="geocoder-input"
            autoComplete="false"
            placeholder="Search location"
            title="Search location"
            aria-label="Search location"
            onChange={handleChangeGeocoder}
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
        </div>
        <button
          className="location-find-button"
          title="Find location"
          aria-label="Find location"
          tabIndex={0}
        >
          <LocIcon />
        </button>
      </div>
    </div>
  );
};

export default EventFilter;
