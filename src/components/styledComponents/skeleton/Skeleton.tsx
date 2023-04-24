import styled, { keyframes } from 'styled-components';
import { Skeleton } from '@/components/types/styledComponents/skeleton.types';
import { EventSkeleton, EventSkeletonMap } from './EventSkeleton';

const shimmer = keyframes`
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
`;

const MainSkeletonWrapper = styled.div`
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

const SkeletonLoader = ({ variant }: Skeleton) => {
  const homeSkeletons = Array.from({ length: 3 });
  const eventsSkeletons = Array.from({ length: 10 });
  return (
    <MainSkeletonWrapper>
      {variant === 'event-home' ? (
        <>
          {homeSkeletons.map((_, count) => (
            <EventSkeleton key={count} />
          ))}
        </>
      ) : variant === 'event-events' ? (
        <>
          {eventsSkeletons.map((_, count) => (
            <EventSkeleton key={count} />
          ))}
        </>
      ) : (
        variant === 'event-map' && <EventSkeletonMap />
      )}
    </MainSkeletonWrapper>
  );
};

export { SkeletonLoader };
