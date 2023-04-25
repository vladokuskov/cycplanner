import Link from 'next/link';
import {
  FooterWrapper,
  FooterDescription,
  FooterMainWrapper,
  FooterLinksWrapper,
  FooterLink,
} from './Footer.styles';

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
