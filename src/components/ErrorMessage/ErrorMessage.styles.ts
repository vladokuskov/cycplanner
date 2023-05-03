import styled from 'styled-components';

const StyledErrorMessageWrapper = styled.div`
  margin-top: 1.5rem;
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

const StyledBasicErrorWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.3rem;
  width: 100%;
  color: #c73e1d;
  p {
    font-family: 'Roboto';
    font-weight: 500;
    font-size: 0.9rem;
  }
`;

export {
  StyledDescription,
  StyledErrorMessageWrapper,
  StyledTitle,
  StyledBasicErrorWrapper,
};
