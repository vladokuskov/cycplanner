import styled from 'styled-components';

const StyledPageTitle = styled.h2`
  margin-top: 2rem;
  color: rgba(32, 32, 32, 0.77);
  font-style: normal;
  font-weight: 600;
  font-size: 2rem;
  line-height: 3rem;
`;

const StyledEventFormWrapper = styled.form`
  width: 100%;
  padding: 3rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
`;

const StyledFormMainWrapper = styled.div`
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

const StyledFormFooterWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (min-width: 680px) {
    width: auto;
  }
`;

const StyledInputsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const StyledEventTypesWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 0.5rem;
`;

const StyledExternalLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 1.2rem;
  color: #a3d168;
  white-space: nowrap;
  font-weight: 600;
  &:hover,
  &:focus {
    color: #b6e974;
  }
  &:active {
    color: #acdb6e;
  }
`;

const StyledCreationOptionWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  gap: 0.2rem;
`;

const StyledLabel = styled.label`
  font-family: 'Inter';
  transition: 0.2s;
  pointer-events: none;
  letter-spacing: -0.025em;
  font-weight: 400;
  font-style: normal;
  font-size: 0.9rem;
  line-height: 1rem;
  color: rgba(72, 72, 72, 0.67);
`;

export {
  StyledEventFormWrapper,
  StyledEventTypesWrapper,
  StyledFormFooterWrapper,
  StyledFormMainWrapper,
  StyledInputsWrapper,
  StyledPageTitle,
  StyledExternalLink,
  StyledCreationOptionWrapper,
  StyledLabel,
};
