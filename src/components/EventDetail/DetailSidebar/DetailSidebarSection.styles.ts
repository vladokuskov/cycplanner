import styled from 'styled-components';

const DetailSidebarSectionWrapper = styled.section`
  width: 100%;
  height: 100%;
  border-top: 1px solid #dfdfdf;
  padding-top: 1.5rem;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  @media (min-width: 680px) {
    width: 80%;
    padding: 1rem;
    border: none;
    margin: 0 auto;
  }
`;

const SectionTiitle = styled.h2`
  font-family: 'Lato';
  letter-spacing: 0.01em;
  font-weight: 600;
  color: #777777;
`;

const SwitcherWrapper = styled.div`
  width: 100%;
  background-color: #d9d9d9;
  border-radius: 8px;
  padding: 0.2rem;

  max-width: 70%;
  margin: 0 auto;
  margin-top: 0.5rem;
`;

const SwitchButton = styled.button`
  font-family: 'Roboto';
  font-size: 0.9rem;
  font-weight: 500;
  width: 50%;
  padding: 0.3rem 0.3rem;
  border-radius: 8px;
  background-color: #e7e7e7;
  transition: 0.2s;
  color: #2c2c2c;
  &:hover,
  &:focus {
    background-color: #f1f1f1;
  }
  :disabled {
    background-color: #d9d9d9;
    color: #9b9b9b;
    cursor: default;
  }
`;

const ParticipantsList = styled.div`
  padding-top: 1rem;
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  gap: 0.9rem;
`;

const UserControlWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.2rem;
`;

const UserControlButtonsWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
`;

export {
  UserControlButtonsWrapper,
  UserControlWrapper,
  ParticipantsList,
  SwitchButton,
  SwitcherWrapper,
  SectionTiitle,
  DetailSidebarSectionWrapper,
};
