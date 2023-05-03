import styled from 'styled-components';

const StyledDetailSidebarSectionWrapper = styled.section`
  width: 100%;
  height: 100%;
  border-top: 1px solid #dfdfdf;
  padding-top: 1.5rem;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  @media (min-width: 680px) {
    width: 90%;
    padding: 1rem;
    border: none;
    margin: 0 auto;
  }
`;

const StyledSectionTitle = styled.h2`
  font-family: 'Lato';
  letter-spacing: 0.01em;
  font-weight: 600;
  color: #777777;
`;

const StyledParticipantsList = styled.div`
  padding-top: 1rem;
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  gap: 0.9rem;
`;

const StyledUserControlWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.2rem;
`;

const StyledUserControlButtonsWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
`;

export {
  StyledDetailSidebarSectionWrapper,
  StyledParticipantsList,
  StyledSectionTitle,
  StyledUserControlButtonsWrapper,
  StyledUserControlWrapper,
};
