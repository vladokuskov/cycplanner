import styled from 'styled-components';

const StyledSectionTitle = styled.h2`
  font-size: 1.375rem;
  line-height: 1.2em;
  letter-spacing: -0.004em;
  color: #2c2c2c;
  padding-bottom: 1rem;
`;

const StyledSectionSubTitle = styled.h3`
  font-size: 1.075rem;
  line-height: 1.75em;
  letter-spacing: -0.004em;
  color: #2c2c2c50;
  padding-bottom: 1rem;
`;

const StyledFailedText = styled.p`
  color: #df3737;
  font-weight: 400;
  font-size: 0.9rem;
  line-height: 13px;
  margin: 0;
  align-self: flex-start;
  padding: 0.2rem 0;
`;

export { StyledFailedText, StyledSectionSubTitle, StyledSectionTitle };
