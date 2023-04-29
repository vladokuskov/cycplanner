import { Skeleton } from './Skeleton.types';
import {
  MainSkeletonWrapper,
  EventSkeleton,
  EventSkeletonMap,
} from './Skeleton.styles';
import { DetailSkeleton } from './DetailSkeleton/DetailSkeleton';
import {
  AuthorTitle,
  AuthorImagePlaceholder,
  AuthorWrapper,
} from './DetailSkeleton/DetailSkeleton.styles';

const SkeletonLoader = ({ variant }: Skeleton) => {
  const homeSkeletons = Array.from({ length: 3 });
  const eventsSkeletons = Array.from({ length: 10 });
  const users = Array.from({ length: 15 });
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
      ) : variant === 'event-map' ? (
        <EventSkeletonMap />
      ) : variant === 'detail-page' ? (
        <DetailSkeleton />
      ) : (
        variant === 'users' && (
          <>
            {users.map((_, count) => (
              <AuthorWrapper key={count}>
                <AuthorImagePlaceholder />
                <AuthorTitle />
              </AuthorWrapper>
            ))}
          </>
        )
      )}
    </MainSkeletonWrapper>
  );
};

export { SkeletonLoader };
