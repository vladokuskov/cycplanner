import styled, { css } from 'styled-components';

const StyledMenuMainWrapper = styled.aside`
  @media (min-width: 680px) {
    display: none;
  }
`;

const StyledMenuWrapper = styled.div<{ sticky: boolean }>`
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
      top: 3.4rem;
      z-index: 1005;
    `}
`;
const StyledLinksWrapper = styled.div`
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  padding-bottom: 1rem;
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
const StyledMenuFooter = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  gap: 2rem;
`;

const StyledMenuFooterButtonsWrapper = styled.div<{
  variant: 'logged' | 'guest';
}>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: ${({ variant }) =>
    variant === 'guest' ? 'flex-start' : 'space-between'};
  gap: 0.5rem;
`;
const StyledMenuFooterButtonsLabel = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: 0.9rem;
  line-height: 12px;
  color: #787878;
`;

export {
  StyledLinksWrapper,
  StyledMenuFooter,
  StyledMenuFooterButtonsLabel,
  StyledMenuFooterButtonsWrapper,
  StyledMenuMainWrapper,
  StyledMenuWrapper,
};
