import styled from 'styled-components';

const StyledFooterMainWrapper = styled.div`
  width: 100%;
  padding: 0.1rem 1rem;
  background-color: #e1e1e1;
  border-top: 1px solid #b4b4b4;
`;

const StyledFooterWrapper = styled.div`
  padding: 2rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  width: 100%;
  max-width: 600px;
`;

const StyledFooterLinksWrapper = styled.div`
  @include flexCenter(column, 0.2rem);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  gap: 0.2rem;
  a {
    color: #2c2c2c;
    &:hover,
    &:focus {
      color: #777777;
    }
    &:active {
      color: #222222;
    }
    @media (min-width: 680px) {
      font-size: 1rem;
    }
  }
`;

const StyledFooterLink = styled.a`
  text-decoration: underline;
  text-underline-offset: 0.1rem;
  font-weight: 500;
  font-size: 0.9rem;
`;

const StyledFooterDescription = styled.p`
  text-align: center;
  padding-bottom: 0.5rem;
  color: #818181;
  letter-spacing: -0.01em;
  font-weight: 400;
  font-size: 0.9rem;
`;

export {
  StyledFooterDescription,
  StyledFooterLink,
  StyledFooterLinksWrapper,
  StyledFooterMainWrapper,
  StyledFooterWrapper,
};
