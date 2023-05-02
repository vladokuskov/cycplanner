import styled from 'styled-components';

const StyledFilterWrapper = styled.div`
  margin-top: 0.5rem;
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  gap: 0.8rem;
  @media (min-width: 680px) {
    align-items: center;
  }
`;

const StyledFilterSelectorsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
  align-items: flex-end;
`;

export { StyledFilterSelectorsWrapper, StyledFilterWrapper };
