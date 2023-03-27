import styled, { css } from 'styled-components';
import Link from 'next/link';
import { NavbarWrapperProps, NavMenu } from '@/components/types/navbar.types';
import { IconChevronRight } from '@tabler/icons-react';

const MenuMainWrapper = styled.div`
  @media (min-width: 680px) {
    display: none;
  }
`;

const MenuWrapper = styled.div<NavbarWrapperProps>`
  left: 0;
  top: 3.7rem;
  position: absolute;
  background-color: #f1f1f1;
  width: 100%;
  max-width: 1200px;
  left: 50%;
  z-index: 1005;
  border-bottom: 1px solid #c1c1c1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  justify-content: space-between;
  padding: 1rem 2rem;
  -webkit-transform: translate(-50%, 0);
  -ms-transform: translate(-50%, 0);
  transform: translate(-50%, 0);
  ${({ sticky }) =>
    sticky &&
    css`
      top: 3rem;
      z-index: 1005;
    `}
`;
const LinksWrapper = styled.div`
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  padding-bottom: 0.5rem;
  a {
    display: inline-flex;
    justify-content: space-between;
    color: rgb(80, 80, 80);
    text-align: start;
    max-width: 100%;
    min-width: 100%;
    width: 100%;
    padding: 0.7rem 0.8rem 0.1rem 0.8rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.116);
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
const MenuFooter = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  gap: 0.5rem;
`;

const NavMenu = ({ sticky, handleMenuClick, router }: NavMenu) => {
  return (
    <MenuMainWrapper>
      <MenuWrapper sticky={sticky}>
        <LinksWrapper>
          <Link
            href="/"
            onClick={handleMenuClick}
            className={router.pathname == '/' ? 'active' : ''}
            title="Go to Home"
            aria-label="Go to Home"
          >
            <span>HOME</span>
            <span>
              <IconChevronRight />
            </span>
          </Link>
          <Link
            href="/events"
            onClick={handleMenuClick}
            className={router.pathname == '/events' ? 'active' : ''}
            title="Go to Events"
            aria-label="Go to Events"
          >
            <span>EVENTS</span>
            <span>
              <IconChevronRight />
            </span>
          </Link>
          <Link
            href="/contact"
            onClick={handleMenuClick}
            className={router.pathname == '/contact' ? 'active' : ''}
            title="Go to Contact us"
            aria-label="Go to Contact us"
          >
            <span>CONTACT US</span>
            <span>
              <IconChevronRight />
            </span>
          </Link>
        </LinksWrapper>
        <MenuFooter>{/* SIGNUP & LOGIN buttons! */}</MenuFooter>
      </MenuWrapper>
    </MenuMainWrapper>
  );
};

export default NavMenu;