import { Input } from './Input.types';
import { Icon } from '../Icon/Icon';
import {
  faMagnifyingGlass,
  faClose,
  faCircleNotch,
} from '@fortawesome/free-solid-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import {
  InputIcon,
  InputButton,
  InputWrapper,
  InputMainWrapper,
  StyledTextarea,
  StyledInput,
  Label,
} from './Input.styles';

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
