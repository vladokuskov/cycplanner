import styled from 'styled-components';

const PageTitle = styled.h2`
  margin-top: 2rem;
  color: rgba(32, 32, 32, 0.77);
  font-style: normal;
  font-weight: 600;
  font-size: 2rem;
  line-height: 3rem;
`;

const EventFormWrapper = styled.form`
  width: 100%;
  padding: 3rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
`;

const FormMainWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 45rem;
  gap: 2rem;
  @media (min-width: 680px) {
    flex-direction: row-reverse;
    align-items: flex-start;
  }
`;

const FormFooterWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (min-width: 680px) {
    width: auto;
  }
`;

const InputsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const EventTypesWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 0.5rem;
`;

export {
  EventTypesWrapper,
  InputsWrapper,
  FormFooterWrapper,
  FormMainWrapper,
  EventFormWrapper,
  PageTitle,
};
