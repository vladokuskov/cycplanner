import Link from 'next/link';

import {
  StyledFooterDescription,
  StyledFooterLink,
  StyledFooterLinksWrapper,
  StyledFooterMainWrapper,
  StyledFooterWrapper,
} from './Footer.styles';

const Footer = () => {
  return (
    <StyledFooterMainWrapper>
      <StyledFooterWrapper>
        <StyledFooterLinksWrapper>
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
        </StyledFooterLinksWrapper>
        <StyledFooterLinksWrapper>
          <StyledFooterLink
            href="https://github.com/swappnet/cycplanner"
            target="_blank"
          >
            GitHub
          </StyledFooterLink>
          <StyledFooterLink
            href="https://cycroute.netlify.app/"
            target="_blank"
          >
            cycroute (Route builder)
          </StyledFooterLink>
        </StyledFooterLinksWrapper>
      </StyledFooterWrapper>
      <StyledFooterDescription>{`© ${new Date().getFullYear()} Made with love from Swappnet <3 ' cycplanner`}</StyledFooterDescription>
    </StyledFooterMainWrapper>
  );
};

export default Footer;
