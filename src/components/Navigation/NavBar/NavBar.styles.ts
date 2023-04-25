import styled, { css, keyframes } from 'styled-components';

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

const NavbarWrapper = styled.div<{ sticky: boolean }>`
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

export {
  NavbarMainWrapper,
  NavbarWrapper,
  LogoWrapper,
  LogoImage,
  LinksWrapper,
  SubLinksWrapper,
  NavbarMenuWrapper,
};
