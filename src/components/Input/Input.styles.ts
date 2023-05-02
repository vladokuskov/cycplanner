import styled, { css } from 'styled-components';

import { Input } from './Input.types';

const StyledInputMainWrapper = styled.div<Input>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s;
  margin: 0;
  margin-top: ${({ variant, label }) =>
    variant === 'outlined' && label?.length !== 0 ? '1.5rem' : '0'};
  ${({ variant, full }) =>
    css`
      background-color: ${variant === 'search' ? '#DDDDDD' : 'transparent'};
      color: ${variant === 'search' ? '#474747' : '#2C2C2C'};
      border-radius: ${variant === 'search' ? '0.5rem' : '0.625rem'};
      border: none;
      width: ${full === true ? '100%' : 'auto'};
    `};
  ${({ variant }) =>
    css`
      &:hover,
      &:focus {
        .icon {
          color: ${variant === 'search' ? '#7a7a7ab3' : '#acacac'};
        }
      }
    `}
`;

const StyledInputWrapper = styled.div<Input>`
  position: relative;
  width: 100%;
  height: 100%;
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    appearance: textfield;
    -moz-appearance: textfield;
  }
`;

const StyledLabel = styled.label<Input>`
  position: absolute;
  font-family: 'Inter';
  transition: 0.2s;
  pointer-events: none;
  ${({ variant }) =>
    variant !== 'auth'
      ? css`
          letter-spacing: -0.025em;
          font-weight: 400;
          font-style: normal;
          font-size: 0.9rem;
          line-height: 31px;
          top: -1.7rem;
          color: rgba(72, 72, 72, 0.67);
        `
      : variant === 'auth' &&
        css`
          top: 0.1rem;
          left: 2.5rem;
          font-size: 0.9rem;
          color: #999999df;
          &.center {
            top: 50%;
            transform: translateY(-50%);
            left: 2.5rem;
          }
        `};
`;

const StyledInput = styled.input<Input>`
  font-family: 'Roboto';
  width: 100%;
  margin: 0;
  padding: 0;
  background-color: transparent;
  font-weight: 500;
  color: #696969;
  -webkit-tap-highlight-color: transparent;
  transition: 0.2s;
  ::placeholder {
    opacity: 0.3;
    font-weight: 400;
    font-size: 0.9rem;
  }
  ${({ variant, danger }) =>
    css`
      border-radius: ${variant === 'search' ? '0.5rem' : '0.625rem'};
      border: ${variant === 'search'
        ? '2px solid transparent'
        : danger === true
        ? '2px solid #fc6666'
        : '2px solid #999999'};
    `}

  ${({ variant }) =>
    variant === 'search'
      ? css`
          padding: 0.2rem 1.7rem 0.2rem 0.3rem;
        `
      : variant === 'auth'
      ? css`
          padding: 1.3rem 0.3rem 0.2rem 2.5rem;
          font-weight: 500;
        `
      : variant === 'outlined'
      ? css`
          padding: 0.4rem 0.3rem 0.4rem 0.3rem;
        `
      : variant === 'outlined-icon' &&
        css`
          padding: 0.6rem 0.6rem 0.6rem 2.2rem;
        `}

  &:hover {
    background-color: ${({ variant }) =>
      variant === 'search' ? '#e6e6e66e' : 'transparent'};
    border-color: ${({ variant, danger }) =>
      variant === 'search'
        ? 'transparent'
        : danger === true
        ? '#ff8585'
        : '#bebebe'};
  }

  &:focus {
    outline: none;
    box-shadow: none;
  }

  *:focus:not(:focus-visible) {
    outline: none;
    box-shadow: none;
  }

  &:focus-visible {
    outline: none;
    outline-offset: 0;
    border-color: #a3d168 !important;
    border-radius: ${({ variant }) =>
      variant === 'search' ? '0.5rem' : '0.625rem'};
    background-color: ${({ variant }) =>
      variant === 'search' ? '#e6e6e66e' : '#a3ee4211'};
  }
`;

const StyledTextarea = styled.textarea<Input>`
  -webkit-tap-highlight-color: transparent;
  font-family: 'Roboto', sans-serif;
  border: none;
  margin: 0;
  padding: 0;
  background-color: transparent;
  padding: 0.3rem;
  max-width: 100%;
  width: 100%;
  border-radius: 0.625rem;
  min-height: 2.1rem;
  font-weight: 500;
  resize: vertical;
  transition: 0.2s;
  color: #696969;
  ${({ variant, danger }) =>
    css`
      border: ${variant === 'search'
        ? 'none'
        : danger === true
        ? '2px solid #fc6666'
        : '2px solid #999999'};
    `}
  ::placeholder {
    opacity: 0.3;
    font-weight: 400;
    font-size: 0.9rem;
  }
  &:hover {
    border-color: ${({ danger }) => (danger === true ? '#ff8585' : '#bebebe')};
  }
  &:focus {
    outline: none;
    box-shadow: none;
  }

  *:focus:not(:focus-visible) {
    outline: none;
    box-shadow: none;
  }

  &:focus-visible {
    outline: none;
    outline-offset: 0;
    border-color: #a3d168 !important;
    border-radius: 0.625rem;
    background-color: #a3ee4211;
  }
`;

const StyledInputButton = styled.button<Input>`
  position: absolute;
  padding: 0 0.5rem;
  border-radius: 0.25rem;
  ${({ variant }) =>
    css`
      color: ${variant === 'search' ? '#5a5a5a' : '#999999'};
      right: ${variant === 'search' ? '0rem' : '.5rem'};
    `}
`;

const StyledInputIcon = styled.span<Input>`
  transition: 0.2s;
  position: absolute;
  left: 0.5rem;
  ${({ variant }) =>
    variant === 'search'
      ? css`
          left: auto;
          right: 0.4rem;
          color: #5a5a5ab3;
        `
      : (variant === 'auth' || variant === 'outlined-icon') &&
        css`
          color: #5a5a5ab3;
          font-size: 1.4rem;
        `}
`;

export {
  StyledInput,
  StyledInputButton,
  StyledInputIcon,
  StyledInputMainWrapper,
  StyledInputWrapper,
  StyledLabel,
  StyledTextarea,
};
