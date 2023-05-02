import styled from 'styled-components';

const StyledFormSectionWrapper = styled.section`
  width: 100%;
`;

const StyledTitle = styled.h1`
  width: 100%;
  text-align: center;
  padding: 1rem;
  color: rgba(32, 32, 32, 0.77);
  font-style: normal;
  font-weight: 600;
  font-size: 2rem;
  line-height: 3rem;
`;

const StyledFormWrapper = styled.form`
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 0.7rem;
  max-width: 40rem;
  margin: 0 auto;
`;

export { StyledFormSectionWrapper, StyledFormWrapper, StyledTitle };
