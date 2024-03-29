import styled from 'styled-components';

const StyledAvatarEditingWindowWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: #00000068;
  z-index: 5000;
`;

const StyledAvatarEditingWindow = styled.div`
  width: 100%;
  max-width: 30rem;
  background-color: #f7f7f7;
  border: 0.015rem solid #e7e7e7;
  border-radius: 0.3rem;
  margin: 5rem 1rem;
  div {
    padding: 1rem;
  }
`;

const StyledAvatarEditingTitle = styled.h3`
  font-family: 'Roboto';
  font-size: 0.9rem;
  color: #2c2c2c;
  font-weight: 400;
`;
const StyledAvatarEditingHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 0.015rem solid #e7e7e7;
`;

const StyledAvatarEditingBody = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 0.2rem;
`;

const StyledAvatarEditingFooter = styled.div`
  width: 100%;
  height: 100%;
  border-top: 0.015rem solid #e7e7e7;
`;

export {
  StyledAvatarEditingBody,
  StyledAvatarEditingFooter,
  StyledAvatarEditingHeader,
  StyledAvatarEditingTitle,
  StyledAvatarEditingWindow,
  StyledAvatarEditingWindowWrapper,
};
