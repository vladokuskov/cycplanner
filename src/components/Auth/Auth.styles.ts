import styled from 'styled-components';

const StyledAuthLayoutWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  @media (min-height: 400px) and (min-width: 680px) {
    height: 100vh;
  }
`;

const StyledAuthWrapper = styled.div`
  position: relative;
  max-width: 950px;
  min-height: 32rem;
  min-width: 16rem;
  width: 100%;
  margin: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #fbfbfb;
  box-shadow: 0px 0px 21px -3px rgba(0, 0, 0, 0.09);
  border-radius: 10px;
  padding: 0.7rem;
  @media (min-width: 680px) {
    flex-direction: row;
    max-height: 40rem;
  }
  .back-button {
    position: absolute;
    top: 0.5rem;
    left: 0.7rem;
  }
`;

const StyledAuthContentWrapper = styled.div`
  padding-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex-direction: column;
  width: 100%;
  @media (min-width: 680px) {
    padding-top: 0.5rem;
  }
`;

const StyledAuthBannerWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  display: none;
  border-radius: 10px;
  @media (min-width: 680px) {
    display: block;
  }
`;

const StyledAuthBanner = styled.div`
  border-radius: 10px;
  width: 100%;
  height: 100%;
  img {
    object-fit: cover;
    border-radius: 10px;
  }
`;

const StyledAuthHeaderWrapper = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  flex-direction: column;
  width: 95%;
  a {
    text-decoration: none;
  }
`;

const StyledHeaderLogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 10rem;
  min-width: 10rem;
  height: 100%;
  width: 100%;
  margin-bottom: 1rem;
  @media (min-width: 680px) {
    margin-bottom: 2rem;
  }
  img {
    width: 100%;
    height: 100%;
  }
`;
const StyledHeaderInfoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const StyledHeaderTitle = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-size: 1.8rem;
  line-height: 37px;
  font-weight: 700;
  color: #2c2c2c;
  margin: 0;
`;

const StyledAuthFormWrapper = styled.form`
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex-direction: column;
`;

const StyledAuthLink = styled.span`
  color: #999999;
  font-weight: 400;
  font-size: 0.9rem;
  line-height: 13px;
  cursor: pointer;
  span {
    color: #2c2c2c;
    font-weight: 600;
    text-decoration: underline;
  }
  :hover {
    span {
      color: #6d6d6d;
      text-decoration: underline;
    }
  }
`;

const StyledAuthAltSectionWrapper = styled.div`
  width: 100%;
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
`;
const StyledAltHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  width: 100%;
  max-width: 80%;
`;
const StyledAltTitle = styled.p`
  text-align: center;
  position: relative;
  font-weight: 500;
  color: #999999;
  width: 100%;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    height: 0.1rem;
    width: calc(50% - 4.5rem);
    border-radius: 15px;
    border: none;
    background-color: #99999950;
    transform: translateY(-50%);
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 0;
    height: 0.1rem;
    width: calc(50% - 4.5rem);
    border-radius: 15px;
    border: none;
    background-color: #99999950;
    transform: translateY(-50%);
  }
`;

const StyledAltButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 0 1rem;
  gap: 0.7rem;
`;

export {
  StyledAltButtonsWrapper,
  StyledAltHeaderWrapper,
  StyledAltTitle,
  StyledAuthAltSectionWrapper,
  StyledAuthBanner,
  StyledAuthBannerWrapper,
  StyledAuthContentWrapper,
  StyledAuthFormWrapper,
  StyledAuthHeaderWrapper,
  StyledAuthLayoutWrapper,
  StyledAuthLink,
  StyledAuthWrapper,
  StyledHeaderInfoWrapper,
  StyledHeaderLogoWrapper,
  StyledHeaderTitle,
};
