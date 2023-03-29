import Link from 'next/link';
import styled from 'styled-components';

const FooterMainWrapper = styled.div`
  width: 100%;
  padding: 0.1rem 1rem;
  background-color: #e1e1e1;
  border-top: 1px solid #b4b4b4;
`;

const FooterWrapper = styled.div`
  padding: 2rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  width: 100%;
  max-width: 600px;
`;

const FooterLinksWrapper = styled.div`
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

const FooterLink = styled.a`
  text-decoration: underline;
  text-underline-offset: 0.1rem;
  font-weight: 500;
  font-size: 0.9rem;
`;

const FooterDescription = styled.p`
  text-align: center;
  padding-bottom: 0.5rem;
  color: #818181;
  letter-spacing: -0.01em;
  font-weight: 400;
  font-size: 0.9rem;
`;

const Footer = () => {
  return (
    <FooterMainWrapper>
      <FooterWrapper>
        <FooterLinksWrapper>
          <Link href="/" title="Go to Home" aria-label="Go to Home">
            Home
          </Link>
          <Link href="/events" title="Go to Events" aria-label="Go to Events">
            Events
          </Link>
          <Link
            href="/contact"
            title="Go to Contact us"
            aria-label="Go to Contact us"
          >
            Contact us
          </Link>
          <Link
            href="/profile"
            title="Go to Profile"
            aria-label="Go to Profile"
          >
            Profile
          </Link>
        </FooterLinksWrapper>
        <FooterLinksWrapper>
          <FooterLink
            href="https://github.com/swappnet/cycplanner"
            target="_blank"
          >
            GitHub
          </FooterLink>
          <FooterLink href="https://cycroute.netlify.app/" target="_blank">
            cycroute (Route builder)
          </FooterLink>
        </FooterLinksWrapper>
      </FooterWrapper>
      <FooterDescription>{`© ${new Date().getFullYear()} Made with love from Swappnet <3 ' cycplanner`}</FooterDescription>
    </FooterMainWrapper>
  );
};

export default Footer;
