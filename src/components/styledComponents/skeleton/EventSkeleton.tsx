import styled from 'styled-components';

export const EventSkeleton = styled.div`
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

export const EventSkeletonMap = styled.div`
  width: 100%;
  height: 100%;
  background-color: #d6d6d6ab;
`;
