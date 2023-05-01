import { useEffect, useRef, useState } from 'react';

import { useClickOutside } from 'hooks/useClickOutside';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useAuth } from '@/context/AuthContext';
import { faBars, faClose } from '@fortawesome/free-solid-svg-icons';

import { Button } from '../../Button/Button';
import { ProfilePreview } from '../../ProfilePreview/ProfilePreview';
import NavMenu from '../NavMenu/NavMenu';
import { ProfileMenu } from '../ProfileMenu/ProfileMenu';
import {
  LinksWrapper,
  LogoImage,
  LogoWrapper,
  NavbarMainWrapper,
  NavbarMenuWrapper,
  NavbarWrapper,
  SubLinksWrapper,
} from './NavBar.styles';

const Navbar = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useClickOutside(ref, false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useClickOutside(ref, false);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    window.addEventListener('scroll', handleSticky);
    return () => {
      window.removeEventListener('scroll', handleSticky);
    };
  }, []);

  const handleMenuClick = () => {
    setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
  };

  const handleProfileMenuClose = () => {
    setIsProfileMenuOpen(false);
  };

  const handleProfileMenuOpen = () => {
    setIsProfileMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
  };

  const handleSticky = () => {
    const scrollTop = window.scrollY;
    setIsSticky(scrollTop >= 60 ? true : false);
  };

  return (
    <NavbarMainWrapper ref={ref}>
      <NavbarWrapper sticky={isSticky}>
        <LogoWrapper>
          <Link href="/">
            <LogoImage src="/assets/logo.svg" alt="" />
          </Link>
        </LogoWrapper>
        <LinksWrapper>
          <Link
            href="/"
            title="Go to Home"
            aria-label="Go to Home"
            className={router.pathname === '/' ? 'active' : ''}
          >
            HOME
          </Link>
          <Link
            href="/events"
            title="Go to Events"
            aria-label="Go to Events"
            className={router.pathname === '/events' ? 'active' : ''}
          >
            EVENTS
          </Link>
          <Link
            href="/contact"
            title="Go to Contact us"
            aria-label="Go to Contact us"
            className={router.pathname === '/contact' ? 'active' : ''}
          >
            CONTACT US
          </Link>
        </LinksWrapper>
        <NavbarMenuWrapper>
          <Button
            variant="icon"
            icon={!isMenuOpen ? faBars : faClose}
            size="xl1"
            onClick={() => {
              setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
            }}
          />
          {isMenuOpen && (
            <NavMenu
              sticky={isSticky}
              router={router}
              handleMenuClick={handleMenuClick}
            />
          )}
        </NavbarMenuWrapper>
        <SubLinksWrapper>
          {user ? (
            <ProfilePreview
              variant="button"
              photoURL={user?.photoURL}
              onClick={handleProfileMenuOpen}
            />
          ) : (
            <Button
              variant="outlined"
              text="Sign up"
              size="sm1"
              bold
              onClick={() => router.replace('/signup')}
            />
          )}
          {isProfileMenuOpen && (
            <ProfileMenu
              name={user?.displayName}
              onClose={handleProfileMenuClose}
            />
          )}
        </SubLinksWrapper>
      </NavbarWrapper>
    </NavbarMainWrapper>
  );
};

export default Navbar;
