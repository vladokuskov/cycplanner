import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content-wrapper">
        <div className="footer-nav-links footer-links-wrapper">
          <Link
            href="/"
            title="Go to Home"
            aria-label="Go to Home"
            className="footer-link"
          >
            Home
          </Link>
          <Link
            href="/events"
            title="Go to Events"
            aria-label="Go to Events"
            className="footer-link"
          >
            Events
          </Link>
          <Link
            href="/contact"
            title="Go to Contact us"
            aria-label="Go to Contact us"
            className="footer-link"
          >
            Contact us
          </Link>
          <Link
            href="/account"
            title="Go to My account"
            aria-label="Go to My account"
            className="footer-link"
          >
            My account
          </Link>
        </div>
        <div className="footer-external-links footer-links-wrapper">
          <a
            href="https://github.com/swappnet/cycplanner"
            title="Go to GitHub project"
            aria-label="Go to GitHub project"
            rel="noopener noreferrer"
            target="_blank"
            className="footer-link"
          >
            GitHub
          </a>
          <a
            href="https://cycroute.netlify.app/"
            title="Go to Route builder"
            aria-label="Go to Route builder"
            rel="noopener noreferrer"
            target="_blank"
            className="footer-link"
          >
            cycroute (Route builder)
          </a>
        </div>
      </div>
      <p className="footer-copy">{`© ${new Date().getFullYear()} ' cycplanner`}</p>
    </footer>
  );
};

export default Footer;
