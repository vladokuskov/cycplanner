import styled from 'styled-components';

const StyledErrorMessageWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const StyledTitle = styled.h2`
  font-family: 'Lato';
  color: #525252;
  font-size: 1.2rem;
`;

const StyledDescription = styled.p`
  font-family: 'Roboto';
  color: #929292;
  font-size: 1rem;
  margin-bottom: 1rem;
`;

export { StyledDescription, StyledErrorMessageWrapper, StyledTitle };
