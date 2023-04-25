import styled from 'styled-components';

const ErrorMessageWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Title = styled.h2`
  font-family: 'Lato';
  color: #525252;
  font-size: 1.2rem;
`;

const Description = styled.p`
  font-family: 'Roboto';
  color: #929292;
  font-size: 1rem;
  margin-bottom: 1rem;
`;

export { ErrorMessageWrapper, Title, Description };
