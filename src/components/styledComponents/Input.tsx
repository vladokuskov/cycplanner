import { Input } from '../types/styledComponents/input.types';
import styled, { css } from 'styled-components';
import { Icon } from '../Icon/Icon';
import {
  faMagnifyingGlass,
  faClose,
  faCircleNotch,
} from '@fortawesome/free-solid-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';

const InputMainWrapper = styled.div<Input>`
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

const InputWrapper = styled.div<Input>`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Label = styled.label<Input>`
  position: absolute;
  font-family: 'Roboto';
  ${({ variant }) =>
    variant !== 'auth' && variant !== 'auth-pass'
      ? css`
          letter-spacing: -0.025em;
          font-weight: 400;
          font-style: normal;
          font-size: 0.9rem;
          line-height: 31px;
          top: -1.7rem;
          color: rgba(72, 72, 72, 0.77);
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

const InputButton = styled.button<Input>`
  position: absolute;
  padding: 0 0.5rem;
  border-radius: 0.25rem;
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
  ${({ variant }) =>
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
          color: #5a5a5ab3;
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
  fieldType = 'text',
  isloading,
}: Input) => {
  return (
    <InputMainWrapper variant={variant} full={full} danger={danger}>
      {(variant === 'auth' ||
        variant === 'auth-pass' ||
        variant === 'outlined-icon' ||
        variant === 'search') && (
        <InputIcon variant={variant} danger={danger} className="icon">
          {variant === 'search' && isloading && (
            <Icon
              icon={faCircleNotch}
              spinning={isloading ? 'true' : 'false'}
            />
          )}
          {variant === 'search' && !isloading && value?.length === 0 && (
            <Icon icon={faMagnifyingGlass} />
          )}
          {variant !== 'search' && <Icon icon={icon} />}
        </InputIcon>
      )}
      <InputWrapper>
        {(variant === 'auth' ||
          variant === 'auth-pass' ||
          variant === 'outlined') && (
          <Label htmlFor={variant} variant={variant}>
            {label}
          </Label>
        )}
        {variant === 'textarea' ? (
          <StyledTextarea
            danger={danger}
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
            isloading={isloading}
            type={
              fieldType === 'email'
                ? 'email'
                : fieldType === 'password' && !isPassShowed
                ? 'password'
                : fieldType === 'password' && isPassShowed
                ? 'text'
                : fieldType === 'number'
                ? 'number'
                : 'text'
            }
            danger={danger}
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
      {((variant === 'search' && value?.length !== 0 && !isloading) ||
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
            spinning="false"
          />
        </InputButton>
      )}
    </InputMainWrapper>
  );
};

export { Input };
