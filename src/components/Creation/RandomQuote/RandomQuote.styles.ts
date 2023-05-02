import styled from 'styled-components';

const StyledRandomQuoteWrapper = styled.div`
  width: 100%;
  padding: 6rem 1rem;
  position: relative;
  @media (min-width: 680px) {
    max-width: 80%;
  }
`;
const StyledQuoteText = styled.p`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin: 0 auto;
  font-family: 'Lato';
  font-style: normal;
  font-weight: 500;
  font-size: 1.2rem;
  line-height: 1.4rem;
  color: #585858;
`;

const StyledQuoteImageWrapper = styled.div`
  width: 6rem;
  height: 6rem;
  @media (min-width: 680px) {
    left: 5rem;
  }
  svg {
    width: 100%;
    height: 100%;
  }
`;

export { StyledQuoteImageWrapper, StyledQuoteText, StyledRandomQuoteWrapper };
