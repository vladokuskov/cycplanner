import styled from 'styled-components';

const StyledPageTitle = styled.h2`
  color: rgba(32, 32, 32, 0.77);
  font-style: normal;
  font-weight: 600;
  font-size: 2rem;
  line-height: 3rem;
`;

const StyledEventSectionWrapper = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2rem;
  margin-top: 2rem;
  @media (min-width: 680px) {
    padding-left: 1rem;
    margin-top: 0;
  }
`;

const StyledEventsWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  gap: 1rem;
`;

export { StyledEventSectionWrapper, StyledEventsWrapper, StyledPageTitle };
