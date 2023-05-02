import { useState } from 'react';

import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import {
  faCircleNotch,
  faClose,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';

import { Icon } from '../Icon/Icon';
import {
  StyledInput,
  StyledInputButton,
  StyledInputIcon,
  StyledInputMainWrapper,
  StyledInputWrapper,
  StyledLabel,
  StyledTextarea,
} from './Input.styles';
import { Input } from './Input.types';

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
  isLoading,
}: Input) => {
  const [isFocused, setIsFocused] = useState(false); // Only for Auth variant
  return (
    <StyledInputMainWrapper variant={variant} full={full} danger={danger}>
      {(variant === 'auth' ||
        variant === 'outlined-icon' ||
        variant === 'search') && (
        <StyledInputIcon variant={variant} danger={danger} className="icon">
          {variant === 'search' && isLoading && (
            <Icon
              icon={faCircleNotch}
              spinning={isLoading ? 'true' : 'false'}
            />
          )}
          {variant === 'search' && !isLoading && value?.length === 0 && (
            <Icon icon={faMagnifyingGlass} />
          )}
          {variant !== 'search' && <Icon icon={icon} />}
        </StyledInputIcon>
      )}
      <StyledInputWrapper>
        {(variant === 'auth' || variant === 'outlined') && (
          <StyledLabel
            htmlFor={variant}
            variant={variant}
            className={isFocused ? '' : variant === 'auth' ? 'center' : ''}
          >
            {label}
          </StyledLabel>
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
            isLoading={isLoading}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              if (value?.length !== 0) {
                setIsFocused(true);
              } else {
                setIsFocused(false);
              }
            }}
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
      </StyledInputWrapper>
      {((variant === 'search' && value?.length !== 0 && !isLoading) ||
        (variant === 'auth' &&
          value?.length !== 0 &&
          fieldType === 'password')) && (
        <StyledInputButton
          type="button"
          onClick={onClick}
          variant={variant}
          title={
            variant === 'search'
              ? 'Clear'
              : variant === 'auth' && fieldType === 'password' && !isPassShowed
              ? 'Show password'
              : variant === 'auth' && fieldType === 'password' && isPassShowed
              ? 'Hide password'
              : ''
          }
        >
          <Icon
            icon={
              variant === 'search'
                ? faClose
                : variant === 'auth' &&
                  fieldType === 'password' &&
                  !isPassShowed
                ? faEye
                : variant === 'auth' && fieldType === 'password' && isPassShowed
                ? faEyeSlash
                : undefined
            }
            spinning="false"
          />
        </StyledInputButton>
      )}
    </StyledInputMainWrapper>
  );
};

export { Input };
