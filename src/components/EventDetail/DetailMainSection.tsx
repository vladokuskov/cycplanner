import { useState } from 'react';
import styled from 'styled-components';
import Map from '../EventMap/Map';
import { IEvent } from '../types/shared/event.types';

const DetailMainSectionWrapper = styled.section`
  width: 100%;
  height: 100%;
  padding: 1rem;
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

const MapWrapper = styled.div`
  width: 100%;
  max-height: 15rem;
  height: 100%;
`;

const DetailMainSection = ({ event }: { event: IEvent | null }) => {
  const [isMapMaximized, setIsMapMaximized] = useState(false);
  const handleMapMaximizing = () => {
    setIsMapMaximized((prev) => !prev);
  };

  return (
    <DetailMainSectionWrapper>
      <MapWrapper>
        <Map
          route={event?.route}
          isMapMaximized={isMapMaximized}
          handleMapMaximizing={handleMapMaximizing}
        />
      </MapWrapper>
    </DetailMainSectionWrapper>
  );
};

export { DetailMainSection };
