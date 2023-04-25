import styled, { css } from 'styled-components';

const MapWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;
const MapOverlayWrapper = styled.div<{ isMapMaximized: boolean }>`
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
  ${({ isMapMaximized }) =>
    isMapMaximized &&
    css`
      background: linear-gradient(
        180deg,
        #dcdcdcca 30%,
        rgba(217, 217, 217, 0) 100%
      );
      height: 2.5rem;
    `}
`;

export { MapWrapper, MapOverlayWrapper };
