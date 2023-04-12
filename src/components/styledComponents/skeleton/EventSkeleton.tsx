import styled from 'styled-components';

const EventSkeletonWrapper = styled.div`
  width: 100%;
  max-width: 43rem;
  height: 16rem;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  background-color: none;
  gap: 1rem;
  background-color: #d6d6d6ab;
`;

const EventSkeleton = () => {
  return <EventSkeletonWrapper></EventSkeletonWrapper>;
};

export { EventSkeleton };
