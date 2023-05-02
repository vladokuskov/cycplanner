import styled from 'styled-components';

const StyledMainSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0.3rem;
  margin-bottom: 1rem;
  div {
    background-color: #d6d6d6ab;
  }
`;

const StyledSidebarSection = styled.div`
  width: 100%;
  border-top: 1px solid #dfdfdf !important;
  border-radius: 0 !important;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  @media (min-width: 680px) {
    width: 90%;
    padding: 1rem;
    border: none;
    margin: 0 auto;
    border: none !important;
  }
  div {
    background-color: #d6d6d6ab;
  }
`;

const StyledMapSkeleton = styled.div`
  width: 100%;
  max-height: 15rem;
  height: 100%;
  min-height: 15rem;
`;

const StyledButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  margin: 0.5rem 0;
  background-color: transparent !important;
  @media (min-width: 680px) {
    justify-content: flex-end;
  }
`;

const StyledAuthorMainWrapper = styled.div`
  margin-top: 0.5rem;
  width: 100%;
  background-color: transparent !important;
`;

const StyledAuthorWrapper = styled.div`
  width: 100%;
  background-color: transparent !important;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.3rem;
`;
const StyledAuthorImagePlaceholder = styled.div`
  width: 2.3rem;
  height: 2.3rem;
  border-radius: 50% !important;
  border: none;
`;

const StyledAuthorTitle = styled.div`
  width: 100%;
  height: 1.2rem;
  max-width: 10rem;
`;

const StyledBigTitle = styled.div`
  width: 100%;
  height: 2rem;
  max-width: 80%;
  margin-top: 1rem;
`;

const StyledMediumTitle = styled.div`
  width: 100%;
  height: 1.2rem;

  margin-top: 0.3rem;
`;

const StyledSmallTitle = styled.div`
  width: 100%;
  height: 1rem;
`;

const StyledButtonSkeleton = styled.div`
  width: 2rem;
  height: 2rem;
`;

const StyledDescriptionWrapper = styled.div`
  width: 100%;
  background-color: transparent !important;
  flex-direction: column;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0.2rem;
  margin-top: 0.8rem;
  max-width: 75%;
`;

const StyledDetailsWrapper = styled.div`
  width: 100%;
  background-color: transparent !important;
  flex-direction: column;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0.4rem;
  margin-top: 0.5rem;
  max-width: 15rem;
`;

const StyledUsersList = styled.div`
  width: 100%;
  background-color: transparent !important;
  margin-top: 1rem;
  flex-direction: column;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1rem;
`;

export {
  StyledAuthorImagePlaceholder,
  StyledAuthorMainWrapper,
  StyledAuthorTitle,
  StyledAuthorWrapper,
  StyledBigTitle,
  StyledButtonSkeleton,
  StyledButtonsWrapper,
  StyledDescriptionWrapper,
  StyledDetailsWrapper,
  StyledMainSection,
  StyledMapSkeleton,
  StyledMediumTitle,
  StyledSidebarSection,
  StyledSmallTitle,
  StyledUsersList,
};
