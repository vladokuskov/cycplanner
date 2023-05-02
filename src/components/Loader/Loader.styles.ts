import styled, { keyframes } from 'styled-components';

const StyledLoadingWrapper = styled.div`
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  position: absolute;
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

export const progress = keyframes`
  0% {
    transform: scale(0.91);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.91);
  }
`;

const StyledLogoImage = styled.img`
  width: 100%;
  height: 100%;
  max-width: 13rem;
  max-height: 13rem;
  animation: ${progress} 1.3s infinite;
`;

export { StyledLoadingWrapper, StyledLogoImage };
