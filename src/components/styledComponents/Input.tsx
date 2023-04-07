import { Input } from '../types/styledComponents/input.types';
import styled, { css } from 'styled-components';
import { Icon } from './Icon';
import { faMagnifyingGlass, faClose } from '@fortawesome/free-solid-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';

const InputMainWrapper = styled.div<Input>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s;
  margin: 0;
  ${({ variant, full, danger }) =>
    css`
      background-color: ${variant === 'search' ? '#DDDDDD' : 'transparent'};
      color: ${variant === 'search' ? '#474747' : '#2C2C2C'};
      border-radius: ${variant === 'search' ? '8px' : '10px'};
      border: ${variant === 'search'
        ? 'none'
        : danger === true
        ? '2px solid #e62e2e'
        : '2px solid #999999'};
      width: ${full === true ? '100%' : 'auto'};
    `};

  ${({ variant, danger }) =>
    css`
      &:hover,
      &:focus {
        background-color: ${variant === 'search' ? '#e6e6e6' : 'transparent'};
        border-color: ${danger === true ? '#ff3737' : '#acacac'};
        .icon {
          color: ${variant === 'search'
            ? '#7a7a7ab3'
            : danger === true
            ? '#ff3737'
            : '#acacac'};
        }
      }
    `}
`;

const InputWrapper = styled.div<Input>`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Label = styled.label<Input>`
  position: absolute;
  font-family: 'Roboto', sans-serif;
  ${({ variant }) =>
    variant === 'outlined' || variant === 'textarea'
      ? css`
          top: -1.7rem;
          color: rgba(32, 32, 32, 0.77);
        `
      : (variant === 'auth' || variant === 'auth-pass') &&
        css`
          top: 0.1rem;
          left: 2.5rem;
          font-size: 0.9rem;
          color: #999999df;
        `};
`;

const StyledInput = styled.input<Input>`
  font-family: 'Roboto', sans-serif;
  width: 100%;
  border: none;
  margin: 0;
  padding: 0;
  background-color: transparent;
  font-weight: 500;
  color: #696969;
  -webkit-tap-highlight-color: transparent;
  ::placeholder {
    opacity: 0.3;
    font-weight: 400;
  }
  ${({ variant }) =>
    css`
      border-radius: ${variant === 'search' ? '8px' : '10px'};
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
      : variant === 'auth-pass'
      ? css`
          padding: 1.3rem 3rem 0.2rem 2.5rem;
        `
      : variant === 'outlined'
      ? css`
          padding: 0.4rem 0.3rem 0.4rem 0.3rem;
        `
      : variant === 'outlined-icon' &&
        css`
          padding: 0.35rem 0.6rem 0.35rem 2.2rem;
        `}
                 
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
    box-shadow: 0 0 0 3px #a3d168;
    ${({ variant }) =>
      css`
        border-radius: ${variant === 'search' ? '8px' : '10px'} !important;
      `}
  }
`;

const StyledTextarea = styled.textarea<Input>`
  font-family: 'Roboto', sans-serif;
  border: none;
  margin: 0;
  padding: 0;
  background-color: transparent;
  padding: 0.3rem;
  max-width: 100%;
  width: 100%;
  border-radius: 10px;
  min-height: 2.1rem;
  font-weight: 500;
  resize: vertical;
  color: #696969;
  ::placeholder {
    opacity: 0.3;
    font-weight: 400;
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
    box-shadow: 0 0 0 3px #a3d168;
    ${({ variant }) =>
      css`
        border-radius: ${variant === 'search' ? '8px' : '10px'} !important;
      `}
  }
`;

const InputButton = styled.button<Input>`
  position: absolute;
  padding: 0 0.5rem;
  border-radius: 4px;
  ${({ variant }) =>
    css`
      color: ${variant === 'search' ? '#5a5a5a' : '#999999'};
      right: ${variant === 'search' ? '0rem' : '.5rem'};
    `}
`;

const InputIcon = styled.span<Input>`
  transition: 0.2s;
  position: absolute;
  left: 0.5rem;
  ${({ variant, danger }) =>
    variant === 'search'
      ? css`
          left: auto;
          right: 0.4rem;
          color: #5a5a5ab3;
        `
      : (variant === 'auth' ||
          variant === 'auth-pass' ||
          variant === 'outlined-icon') &&
        css`
          color: ${danger === true ? '#e62e2e' : '#5a5a5ab3'};
          font-size: 1.4rem;
        `}
`;

const Input = ({
  variant,
  danger,
  label,
  value,
  required,
  isPassShowed,
  icon,
  full,
  onChange,
  onClick,
  placeholder,
  name,
}: Input) => {
  return (
    <InputMainWrapper variant={variant} full={full} danger={danger}>
      {(variant === 'auth' ||
        variant === 'auth-pass' ||
        variant === 'outlined-icon' ||
        (variant === 'search' && value?.length === 0)) && (
        <InputIcon variant={variant} danger={danger} className="icon">
          <Icon icon={variant === 'search' ? faMagnifyingGlass : icon} />
        </InputIcon>
      )}
      <InputWrapper>
        {(variant === 'auth' ||
          variant === 'auth-pass' ||
          variant === 'outlined' ||
          variant === 'textarea') && (
          <Label htmlFor={variant} variant={variant}>
            {label}
          </Label>
        )}
        {variant === 'textarea' ? (
          <StyledTextarea
            name={name}
            value={value}
            variant={variant}
            title={label ? label : ''}
            onChange={onChange}
            required={required}
            placeholder={placeholder}
            autoComplete="off"
            autoCorrect="off"
          />
        ) : (
          <StyledInput
            type={
              variant === 'auth-pass' && !isPassShowed
                ? 'password'
                : variant === 'auth-pass' && isPassShowed
                ? 'text'
                : 'text'
            }
            name={name}
            value={value}
            variant={variant}
            title={label ? label : ''}
            onChange={onChange}
            required={required}
            placeholder={placeholder}
            autoComplete="off"
            autoCorrect="off"
          />
        )}
      </InputWrapper>
      {((variant === 'search' && value?.length !== 0) ||
        (variant === 'auth-pass' && value?.length !== 0)) && (
        <InputButton
          type="button"
          onClick={onClick}
          variant={variant}
          title={
            variant === 'search'
              ? 'Clear'
              : !isPassShowed
              ? 'Show password'
              : 'Hide password'
          }
        >
          <Icon
            icon={
              variant === 'search'
                ? faClose
                : !isPassShowed
                ? faEye
                : faEyeSlash
            }
          />
        </InputButton>
      )}
    </InputMainWrapper>
  );
};

export { Input };
