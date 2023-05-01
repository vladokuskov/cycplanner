import styled, { css } from 'styled-components';

import { Button } from './Button.types';

const ButtonSizes = {
  sm1: css`
    padding: 0.4rem 0.8rem;
    font-size: 0.85rem;
  `,
  sm2: css`
    padding: 0.45rem 1rem;
    font-size: 0.95rem;
  `,
  sm3: css`
    padding: 0.5rem 1.1rem;
    font-size: 1rem;
  `,
  md1: css`
    padding: 0.55rem 1.3rem;
    font-size: 1.125rem;
  `,
  md2: css`
    padding: 0.55rem 1.3rem;
    font-size: 1.25rem;
  `,
  md3: css`
    padding: 0.6rem 2rem;
    font-size: 1.375rem;
  `,
  xl1: css`
    padding: 0.6rem 2.5rem;
    font-size: 1.5rem;
  `,
  xl2: css`
    padding: 0.65rem 2.75rem;
    font-size: 1.625rem;
  `,
  xl3: css`
    padding: 0.65rem 2.95rem;
    font-size: 1.75rem;
  `,
};

const StyledButton = styled.button<Button>`
  font-family: 'Roboto', sans-serif;
  background-color: transparent;
  border: none;
  margin: 0;
  font-weight: ${({ bold }) => (bold === true ? 500 : 400)};
  letter-spacing: 0.01rem;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  transition: 0.2s;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  justify-content: ${({ icon }) => (icon ? 'space-between' : 'center')};
  gap: ${({ icon }) => (icon ? '1rem' : 'auto')};
  ${({ full }) =>
    full === true &&
    css`
      width: 100%;
    `}
  ${({ size }) =>
    size === 'sm1'
      ? ButtonSizes.sm1
      : size === 'sm2'
      ? ButtonSizes.sm2
      : size === 'sm3'
      ? ButtonSizes.sm3
      : size === 'md1'
      ? ButtonSizes.md1
      : size === 'md2'
      ? ButtonSizes.md2
      : size === 'md3'
      ? ButtonSizes.md3
      : size === 'xl1'
      ? ButtonSizes.xl1
      : size === 'xl2'
      ? ButtonSizes.xl2
      : size === 'xl3'
      ? ButtonSizes.xl3
      : ''}
    ${({ variant }) =>
    variant === 'default'
      ? css`
          background-color: transparent;
          color: #474747;
          border: none;
          &:hover,
          &:focus {
            color: #7c7c7c;
          }
          &:active {
            color: #383838;
          }
        `
      : variant === 'filled'
      ? css`
          background-color: #a3d168;
          color: #ffffff;
          border: none;
          &:hover,
          &:focus {
            background-color: #b6e974;
          }
          &:active {
            background-color: #acdb6e;
          }
        `
      : variant === 'outlined'
      ? css`
          background-color: transparent;
          color: #a3d168;
          border: 2px solid #a3d168;
          &:hover,
          &:focus {
            color: #b6e974;
            border-color: #b2e472;
          }
          &:active {
            color: #b6e974;
            border-color: #aada6d;
          }
        `
      : variant === 'text-icon'
      ? css`
          justify-content: space-between;
          gap: 1rem;
          background-color: rgba(155, 155, 155, 0.26);
          color: #474747;
          border: none;
          &:hover,
          &:focus {
            background-color: rgba(185, 185, 185, 0.26);
            color: #777777;
          }
          &:active {
            background-color: rgba(138, 138, 138, 0.26);
            color: #474747;
          }
        `
      : variant === 'icon-bg'
      ? css`
          background-color: rgba(155, 155, 155, 0.26);
          color: #474747;
          border: none;
          border-radius: 8px;
          padding: 0.2rem 0.5rem;
          &:hover,
          &:focus {
            background-color: rgba(185, 185, 185, 0.26);
            color: #777777;
          }
          &:active {
            background-color: rgba(138, 138, 138, 0.26);
            color: #474747;
          }
        `
      : variant === 'icon'
      ? css`
          background-color: transparent;
          color: #2c2c2c;
          border: none;
          padding: 0;
          &:hover {
            color: #808080;
          }
          &:active {
            color: #2c2c2c;
          }
        `
      : variant === 'danger'
      ? css`
          background-color: transparent;
          color: #f77;
          border: 2px solid #f77;
          &:hover,
          &:focus {
            background-color: #ff3737;
            color: #ffffff;
            border-color: #ff3737;
          }
          &:active {
            background-color: #e62e2e;
            color: #ffffff;
            border-color: #e62e2e;
          }
        `
      : ''};

  ${({ status }) =>
    status === 'error'
      ? css`
          color: #e62e2e;
          border-color: #e62e2e;
          &:hover,
          &:focus {
            color: #ff3737;
            border-color: #ff3737;
          }
          &:active {
            color: #f13434;
            border-color: #f13434;
          }
        `
      : status === 'success'
      ? css`
          color: #2e93e6;
          border-color: #2e93e6;
          &:hover,
          &:focus {
            color: #35a3fd;
            border-color: #35a3fd;
          }
          &:active {
            color: #2f96eb;
            border-color: #2f96eb;
          }
        `
      : ''}

  ${({ disabled, variant }) =>
    disabled && variant === 'default'
      ? css`
          color: #c7c7c7;

          &:hover,
          &:focus {
            color: #c7c7c7;
          }
          &:active {
            color: #c7c7c7;
          }
        `
      : disabled && variant === 'filled'
      ? css`
          background-color: #d6eeb6;
          &:hover,
          &:focus {
            background-color: #d6eeb6;
          }
          &:active {
            background-color: #d6eeb6;
          }
        `
      : disabled &&
        variant === 'text-icon' &&
        css`
          background-color: rgba(225, 225, 225, 0.26);
          color: #c8c8c8;
          &:hover,
          &:focus {
            background-color: rgba(225, 225, 225, 0.26);
            color: #c8c8c8;
          }
          &:active {
            background-color: rgba(225, 225, 225, 0.26);
            color: #c8c8c8;
          }
        `}
        ${({ wider }) =>
    wider &&
    css`
      padding-left: 0.5rem;
      padding-right: 0.5rem;
    `}
`;

const StyledButtonText = styled.span``;

const StyledButtonIcon = styled.span<Button>`
  ${({ variant }) =>
    variant === 'text-icon' &&
    css`
      color: #969696;
    `}
`;

export { StyledButton, StyledButtonIcon, StyledButtonText };
