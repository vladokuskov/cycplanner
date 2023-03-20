import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';
import Button from '../button';

import NavMenu from './navMenu';

const Navbar = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const router = useRouter();

  const handleMenuClick = () => {
    setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
  };

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (
        isMenuOpen &&
        ref.current &&
        !ref.current.contains(e.target as Node)
      ) {
        setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
      }
    };
    document.addEventListener('mousedown', checkIfClickedOutside);
    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [isMenuOpen]);

  const [sticky, setSticky] = useState<string>('');

  useEffect(() => {
    window.addEventListener('scroll', isSticky);
    return () => {
      window.removeEventListener('scroll', isSticky);
    };
  }, []);

  const isSticky = () => {
    const scrollTop = window.scrollY;
    const stickyClass = scrollTop >= 60 ? 'sticky' : '';
    setSticky(stickyClass);
  };

  return (
    <nav ref={ref} className={`navbar-wrapper ${sticky}`}>
      <div className={`navbar-content-wrapper ${sticky}`}>
        <div className="navbar-logo-wrapper">
          <img src="/assets/logo.svg" alt="" className="navbar-logo" />
        </div>
        <div className="navbar-menu-wrapper">
          <button
            className={
              isMenuOpen
                ? 'hamburger hamburger--3dy is-active'
                : 'hamburger hamburger--3dy'
            }
            type="button"
            title={!isMenuOpen ? 'Open Menu' : 'Close Menu'}
            tabIndex={0}
            onClick={() => {
              setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
            }}
          >
            <span className="hamburger-box">
              <span className="hamburger-inner"></span>
            </span>
          </button>
          {isMenuOpen && (
            <NavMenu
              sticky={sticky}
              handleMenuClick={handleMenuClick}
              router={router}
            />
          )}
        </div>
        <div className="navbar-links-wrapper">
          <Link
            href="/"
            title="Go to Home"
            aria-label="Go to Home"
            className={
              router.pathname == '/' ? 'navbar-link active' : 'navbar-link '
            }
          >
            HOME
          </Link>
          <Link
            href="/events"
            title="Go to Events"
            aria-label="Go to Events"
            className={
              router.pathname == '/events'
                ? 'navbar-link active'
                : 'navbar-link '
            }
          >
            EVENTS
          </Link>
          <Link
            href="/contact"
            title="Go to Contact us"
            aria-label="Go to Contact us"
            className={
              router.pathname == '/contact'
                ? 'navbar-link active'
                : 'navbar-link '
            }
          >
            CONTACT US
          </Link>
        </div>
        <div className="navbar-sublinks-wrapper">
          <Link href="/signup">
            <Button variant="outline" label="SIGN UP" size="md" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
