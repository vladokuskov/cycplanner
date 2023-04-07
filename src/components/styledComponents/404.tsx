import Link from 'next/link';
import styled from 'styled-components';

const LayoutWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  height: 100%;
  margin-top: 4rem;
  padding: 1rem;
  @media (min-width: 680px) {
    margin-top: 10rem;
  }
  a {
    font-family: 'Roboto';
    color: #a3d168;
    font-weight: 500;
    text-decoration: underline;
    text-underline-offset: 0.2rem;
    &:hover,
    &:focus {
      color: #b7e977;
    }
    &:active {
      color: #a3d168;
    }
  }
`;

const Title = styled.h1`
  color: #2c2c2c;
  font-family: 'Lato';
`;

const Description = styled.p`
  color: #2c2c2c;
  font-family: 'Roboto';
`;

const FourOFour = () => {
  return (
    <LayoutWrapper>
      <Title>Oops, page not found :c</Title>
      <Description>
        Go back to the homepage and navigate to the page you were trying to
        reach from there.
      </Description>
      <Link href="/">Go to Home page</Link>
    </LayoutWrapper>
  );
};

export { FourOFour };
