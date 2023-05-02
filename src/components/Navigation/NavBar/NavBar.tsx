import { useEffect, useRef, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { useAuth } from '@/context/AuthContext';
import { useClickOutside } from '@/hooks/useClickOutside';
import { faBars, faClose } from '@fortawesome/free-solid-svg-icons';

import { Button } from '../../Button/Button';
import { ProfilePreview } from '../../ProfilePreview/ProfilePreview';
import NavMenu from '../NavMenu/NavMenu';
import { ProfileMenu } from '../ProfileMenu/ProfileMenu';
import {
  StyledLinksWrapper,
  StyledLogoImage,
  StyledLogoWrapper,
  StyledNavbarMainWrapper,
  StyledNavbarMenuWrapper,
  StyledNavbarWrapper,
  StyledSubLinksWrapper,
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
    <StyledNavbarMainWrapper ref={ref}>
      <StyledNavbarWrapper sticky={isSticky}>
        <StyledLogoWrapper>
          <Link href="/">
            <StyledLogoImage src="/assets/logo.svg" alt="" />
          </Link>
        </StyledLogoWrapper>
        <StyledLinksWrapper>
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
        </StyledLinksWrapper>
        <StyledNavbarMenuWrapper>
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
        </StyledNavbarMenuWrapper>
        <StyledSubLinksWrapper>
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
        </StyledSubLinksWrapper>
      </StyledNavbarWrapper>
    </StyledNavbarMainWrapper>
  );
};

export default Navbar;
