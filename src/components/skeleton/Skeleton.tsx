import { DetailSkeleton } from './DetailSkeleton/DetailSkeleton';
import {
  StyledAuthorImagePlaceholder,
  StyledAuthorTitle,
  StyledAuthorWrapper,
} from './DetailSkeleton/DetailSkeleton.styles';
import {
  StyledEventSkeleton,
  StyledEventSkeletonMap,
  StyledMainSkeletonWrapper,
} from './Skeleton.styles';
import { Skeleton } from './Skeleton.types';

const SkeletonLoader = ({ variant }: Skeleton) => {
  const homeSkeletons = Array.from({ length: 3 });
  const eventsSkeletons = Array.from({ length: 10 });
  const users = Array.from({ length: 15 });
  return (
    <StyledMainSkeletonWrapper>
      {variant === 'event-home' ? (
        <>
          {homeSkeletons.map((_, count) => (
            <StyledEventSkeleton key={count} />
          ))}
        </>
      ) : variant === 'event-events' ? (
        <>
          {eventsSkeletons.map((_, count) => (
            <StyledEventSkeleton key={count} />
          ))}
        </>
      ) : variant === 'event-map' ? (
        <StyledEventSkeletonMap />
      ) : variant === 'detail-page' ? (
        <DetailSkeleton />
      ) : (
        variant === 'users' && (
          <>
            {users.map((_, count) => (
              <StyledAuthorWrapper key={count}>
                <StyledAuthorImagePlaceholder />
                <StyledAuthorTitle />
              </StyledAuthorWrapper>
            ))}
          </>
        )
      )}
    </StyledMainSkeletonWrapper>
  );
};

export { SkeletonLoader };
