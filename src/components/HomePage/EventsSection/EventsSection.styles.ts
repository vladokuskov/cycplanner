import styled from 'styled-components';

const StyledEventsSectionWrapper = styled.section`
  width: 100%;
  padding: 1rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  @media (min-width: 680px) {
    padding: 1rem 3rem;
  }
`;

const StyledHomeEventsHeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  @media (min-width: 680px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;
const StyledHeaderTitleWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  @media (min-width: 680px) {
    width: 100%;
    flex-direction: row;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

const StyledHomeEventsBodyWrapper = styled.div`
  padding: 1.5rem 0;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
  .more-link {
    align-self: center;
    color: #2c2c2c;
    font-weight: 600;
    font-size: 1rem;
    line-height: 12px;
    margin-left: 0.5rem;
    margin-top: 2rem;
    @media (min-width: 680px) {
      font-size: 1.2rem;
    }
    &:hover,
    &:focus {
      color: #5a5a5a;
    }
    &:active {
      color: #303030;
    }
  }
`;

const StyledBodyEventsWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  gap: 1rem;
`;

export {
  StyledBodyEventsWrapper,
  StyledEventsSectionWrapper,
  StyledHeaderTitleWrapper,
  StyledHomeEventsBodyWrapper,
  StyledHomeEventsHeaderWrapper,
};
