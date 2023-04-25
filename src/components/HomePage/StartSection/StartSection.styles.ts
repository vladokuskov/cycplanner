import styled from 'styled-components';

const StartSectionWrapper = styled.section`
  width: 100%;
  padding: 1rem;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  @media (min-width: 680px) {
    padding: 1rem 3rem;
  }
`;

const StartContentWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  gap: 1.5rem;
`;

const StartBannerWrapper = styled.div`
  display: none;
  max-width: 35rem;
  min-width: 26rem;
  width: 100%;
  @media (min-width: 680px) {
    display: block;
    padding: 1rem 3rem;
  }
`;

const StartTitle = styled.h1`
  color: rgba(32, 32, 32, 0.77);
  font-weight: 500;
  font-size: 3.5rem;
  line-height: 93%;
  @media (min-width: 1200px) {
    font-size: 5rem;
  }
`;

const StartTitleBolder = styled.span`
  color: #2c2c2c;
  font-weight: 800;
`;

const StartDescription = styled.p`
  margin-top: 0.5rem;
  color: #2c2c2c;
  font-weight: 600;
  font-size: 1rem;
  line-height: 19px;
  margin-top: 0.5rem;
  @media (min-width: 680px) {
    max-width: 90%;
    font-size: 1.1rem;
  }
`;

export {
  StartSectionWrapper,
  StartDescription,
  StartTitleBolder,
  StartTitle,
  StartBannerWrapper,
  StartContentWrapper,
};
