import styled from 'styled-components';

const StyledInfoWrapper = styled.div`
  position: relative;
`;
const StyledInfoButton = styled.button`
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  width: 1.2rem;
  height: 1.2rem;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  background-color: #e0e0e0;
  color: #2c2c2c;
`;
const StyledInfoTitle = styled.p`
  z-index: 1001;
  position: absolute;
  top: 0;
  left: 1.5rem;
  width: 100%;
  width: 100%;
  max-width: 10rem;
  min-width: 12rem;
  text-align: center;
  padding: 0.1rem 0.3rem;
  border-radius: 10px;
  color: #2c2c2c;
  background-color: #e0e0e0;
  margin-right: 1rem;
`;
const StyledInfoTitleBolder = styled.span`
  font-weight: 600;
`;

export {
  StyledInfoButton,
  StyledInfoTitle,
  StyledInfoTitleBolder,
  StyledInfoWrapper,
};
