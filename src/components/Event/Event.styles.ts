import styled, { css } from 'styled-components';

import { Participating } from '@/components/types/shared/event.types';

const StyledEventWrapper = styled.div`
  position: relative;
  max-width: 43rem;
  min-width: 16rem;
  width: 100%;
  background-color: #f1f1f1;
  border-radius: 10px;
  margin-bottom: 1rem;
  h3,
  h4,
  p,
  a {
    font-family: 'Roboto';
    font-style: normal;
  }
`;

const StyledHeaderButtonsWrapper = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const StyledEventMenu = styled.div`
  position: absolute;
  width: 10rem;
  background-color: #f7f7f7;
  border: 0.015rem solid #e7e7e7;
  border-radius: 0.5rem;
  padding: 0.2rem 0;
  bottom: calc(-100% - 1.5rem);
  right: calc(50% - 2.95rem);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 2;
  :after {
    content: '';
    position: absolute;
    top: -0.8rem;
    right: 0.5rem;
    border-width: 0.8rem 0.8rem 0 0.8rem;
    border-style: solid;
    border-color: #e7e7e7 transparent transparent transparent;
    transform: rotate(180deg);
  }
`;

const StyledEventMenuButton = styled.button<{
  isDisabled?: boolean;
  danger?: boolean;
}>`
  font-family: 'Roboto';
  font-size: 0.9rem;
  width: 100%;
  padding: 0.5rem 0;
  color: ${({ danger }) => (danger ? '#e62e2e' : '#2c2c2c')};
  transition: 0.1s;
  cursor: ${({ isDisabled }) => (isDisabled ? 'default' : 'pointer')};
  &:hover,
  &:focus {
    background-color: ${({ isDisabled }) =>
      isDisabled ? 'transparent' : '#f1f1f1'};
  }
  &:active {
    background-color: ${({ isDisabled }) =>
      isDisabled ? 'transparent' : '#e9e9e9'};
  }
`;

const StyledCopiedMessage = styled.p`
  transition: 0.2s;
  background-color: #d0d0d0;
  color: #fff;
  padding: 0.2rem 0.4rem;
  font-weight: 500;
  letter-spacing: 0.03rem;
  border: none;
  font-size: 0.8rem;
  border-radius: 8px;
  pointer-events: none;
`;
const StyledEventHeaderWrapper = styled.div`
  width: 100%;
  padding: 1rem 0.9rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledEventMainWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 0.5rem;
  @media (min-width: 680px) {
    flex-direction: row;
    padding-bottom: 0.5rem;
  }
`;

const StyledEventContentWrapper = styled.div`
  width: 100%;
  padding: 0.1rem 0.9rem 0.1rem 0.9rem;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  gap: 0.5rem;
`;

const StyledMapPlaceholder = styled.div`
  width: 100%;
  padding: 0 1rem 1rem 1rem;
  height: 13rem;
  border-radius: 8px;
`;

const StyledEventMapWrapper = styled.div<{ isMapMaximized: boolean }>`
  width: 100%;
  padding: 0 1rem 1rem 1rem;
  height: 13rem;
  border-radius: 8px;
  z-index: 1;
  ${({ isMapMaximized }) =>
    isMapMaximized &&
    css`
      padding: 0.3rem;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    `}
`;

const StyledContentInfoWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  gap: 0.4rem;
`;

const StyledContentButtonsWrapper = styled.div<{
  isFavorite: boolean;
  participated: Participating;
}>`
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  @media (min-width: 680px) {
    margin-bottom: 0;
  }
  .participateBtn {
    ${({ participated }) =>
      participated === Participating.participated
        ? css`
            background-color: #4e8bea;
            &:hover,
            &:focus {
              background-color: #6a9be9;
            }
            &:active {
              background-color: #4e8bea;
            }
          `
        : participated === Participating.awaiting &&
          css`
            background-color: #e4e153;
            &:hover,
            &:focus {
              background-color: #f0ee6c;
            }
            &:active {
              background-color: #e4e153;
            }
          `}
  }
  .favoriteBtn {
    ${({ isFavorite: isBookmarked }) =>
      isBookmarked &&
      css`
        color: #e25c5c;
        &:hover {
          color: #f37676;
        }
        &:active {
          color: #e25c5c;
        }
      `}
  }
`;

const StyledEventTitle = styled.h3`
  font-weight: 500;
  font-size: 1.3rem;
  line-height: 23px;

  color: #2c2c2c;
`;

const StyledEventDescription = styled.p`
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.2rem;
  color: #656565;
`;

const StyledEventDetailWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.2rem;
`;

const StyledDetailTitle = styled.h4`
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.2rem;
  color: #454545;
`;
const StyledDetailDescription = styled.p`
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.2rem;
  color: #656565;
`;

const StyledButtonWrapper = styled.div`
  position: relative;
  p {
    position: absolute;
    top: -0.3rem;
    right: -0.6rem;
    color: #2c2c2c;
    font-weight: 600;
    font-size: 0.8rem;
    pointer-events: none;
    color: #959595;
  }
`;

const StyledDetailLocation = styled.a`
  cursor: pointer;
  text-decoration: underline;
  text-decoration-color: #656565;
  text-underline-offset: 0.1rem;
  &:hover,
  &:focus {
    text-decoration-color: #979797;
    p {
      color: #979797;
    }
  }
`;

export {
  StyledButtonWrapper,
  StyledContentButtonsWrapper,
  StyledContentInfoWrapper,
  StyledCopiedMessage,
  StyledDetailDescription,
  StyledDetailLocation,
  StyledDetailTitle,
  StyledEventContentWrapper,
  StyledEventDescription,
  StyledEventDetailWrapper,
  StyledEventHeaderWrapper,
  StyledEventMainWrapper,
  StyledEventMapWrapper,
  StyledEventMenu,
  StyledEventMenuButton,
  StyledEventTitle,
  StyledEventWrapper,
  StyledHeaderButtonsWrapper,
  StyledMapPlaceholder,
};
