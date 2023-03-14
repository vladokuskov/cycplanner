import { useState, useEffect } from 'react';
import { useAppSelector } from '@/store/redux-hooks';

const EventsInfo = () => {
  const [isInfoOpen, setIsInfoOpen] = useState<boolean>(false);

  const selectedRange = useAppSelector((state) => state.filterReducer.range);

  const handleHover = () => {
    setIsInfoOpen(true);
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isInfoOpen) {
      timeoutId = setTimeout(() => {
        setIsInfoOpen(false);
      }, 1500);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [isInfoOpen]);

  return (
    <div className="home-events-info-wrapper">
      <button
        className="events-info-button"
        title="How it works?"
        aria-label="How it works?"
        onMouseEnter={handleHover}
        onTouchStart={handleHover}
        tabIndex={0}
      >
        ?
      </button>
      {isInfoOpen && (
        <p className="events-info-title">
          The nearest events are within a radius of
          <span> {selectedRange} km</span>
        </p>
      )}
    </div>
  );
};

export default EventsInfo;
