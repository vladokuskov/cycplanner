import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
`;

const StyledMainSkeletonWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 2rem;
  div {
    border: none;
    border-radius: 10px;
    position: relative;
    overflow: hidden;
    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 200%;
      height: 100%;
      opacity: 0.4;
      background: linear-gradient(
        to right,
        transparent 0%,
        #f8f8f8 50%,
        transparent 100%
      );
      animation: ${shimmer} 1.5s infinite;
    }
  }
`;

const StyledEventSkeleton = styled.div`
  width: 100%;
  max-width: 43rem;
  height: calc(16.5rem + 15rem);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  background-color: none;
  gap: 1rem;
  background-color: #d6d6d6ab;
  @media (min-width: 680px) {
    height: 16.5rem;
  }
`;

const StyledEventSkeletonMap = styled.div`
  width: 100%;
  height: 100%;
  background-color: #d6d6d6ab;
`;

export {
  StyledEventSkeleton,
  StyledEventSkeletonMap,
  StyledMainSkeletonWrapper,
};
