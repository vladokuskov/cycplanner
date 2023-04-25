import { Skeleton } from './Skeleton.types';
import {
  MainSkeletonWrapper,
  EventSkeleton,
  EventSkeletonMap,
} from './Skeleton.styles';

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
