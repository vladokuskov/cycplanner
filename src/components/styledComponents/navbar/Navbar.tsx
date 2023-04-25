import { NavbarWrapper } from '@/components/types/shared/navbar.types';
import styled, { css, keyframes } from 'styled-components';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';

import Link from 'next/link';
import { Button } from '../../Button/Button';
import NavMenu from './NavMenu';

import { faBars, faClose } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '@/context/AuthContext';
import { ProfilePreview } from '../../ProfilePreview/ProfilePreview';
import { ProfileMenu } from './ProfileMenu';

const smoothSticky = keyframes`
from {
    transform: translateY(-100%);
    opacity: 0;
  }

  to {
    transform: translateY(0px);
    opacity: 1;
  }

`;

const NavbarMainWrapper = styled.nav`
  opacity: 1;
  width: 100%;
  border-bottom: 1px solid #d3d3d3;
  padding: 0.1rem 1rem;
  height: 3.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavbarWrapper = styled.div<NavbarWrapper>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${({ sticky }) =>
    sticky &&
    css`
      -webkit-transform: translateZ(0);
      transform: translateZ(0);
      margin-top: -1px;
      animation: ${smoothSticky} 250ms;
      background-color: #fbfbfb;
      position: fixed;
      height: 3.4rem;
      top: 0;
      padding: 0.1rem 1rem;
      z-index: 1005;
      border-bottom: 0.1rem solid #d3d3d3;
      max-width: 1200px;
    `}
`;

const LogoWrapper = styled.div`
  max-width: 9rem;
  min-width: 9rem;
  height: 100%;
  width: 100%;
  margin-right: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogoImage = styled.img`
  width: 100%;
  height: 100%;
`;

const LinksWrapper = styled.div`
  display: none;
  @media (min-width: 680px) {
    display: flex;
  }
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 1rem;
  a {
    color: rgb(80, 80, 80);
    font-weight: 500;
    font-size: 0.9rem;
    &:hover,
    &:focus {
      color: rgb(150, 150, 150);
    }
    &:active {
      color: rgb(58, 58, 58);
    }
    &.active {
      color: rgb(150, 150, 150);
    }
  }
`;

const SubLinksWrapper = styled.div`
  display: none;
  flex-direction: center;
  justify-content: center;
  gap: 2rem;
  position: relative;
  @media (min-width: 680px) {
    display: flex;
  }
`;

const NavbarMenuWrapper = styled.div`
  @media (min-width: 680px) {
    display: none;
  }
`;

const Navbar = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState<boolean>(false);
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
              navRef={ref}
              onClose={handleProfileMenuClose}
              isOpen={isProfileMenuOpen}
            />
          )}
        </SubLinksWrapper>
      </NavbarWrapper>
    </NavbarMainWrapper>
  );
};

export default Navbar;
