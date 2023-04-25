import styled from 'styled-components';

const FormSectionWrapper = styled.section`
  width: 100%;
`;

const Title = styled.h1`
  width: 100%;
  text-align: center;
  padding: 1rem;
  color: rgba(32, 32, 32, 0.77);
  font-style: normal;
  font-weight: 600;
  font-size: 2rem;
  line-height: 3rem;
`;

const FormWrapper = styled.form`
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 0.7rem;
  max-width: 40rem;
  margin: 0 auto;
`;

export { FormSectionWrapper, Title, FormWrapper };
