import { useState } from 'react';

import {
  IconEye,
  IconEyeOff,
  IconKey,
  IconMail,
  IconUser,
} from '@tabler/icons-react';
import Button from './button';

import { IInput } from '@/types/input-component.types';

const Input = ({
  variant = 'email',
  icon,
  placeHolder = 'Type text',
  status = 'default',
  onChange,
  isRequired = true,
  label,
  value,
}: IInput) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="input-wrapper">
      {icon === 'email' ? (
        <IconMail className="input-icon" />
      ) : icon === 'account' ? (
        <IconUser className="input-icon" />
      ) : (
        <IconKey className="input-icon" />
      )}
      <div className="input-field-wrapper">
        <label htmlFor={variant} className="input-field-label">
          {label}
        </label>
        <input
          title={label}
          name={variant}
          value={value}
          type={
            variant === 'email'
              ? 'email'
              : variant === 'password' && !showPassword
              ? 'password'
              : 'text'
          }
          className={`input-field variant-${variant} status-${status}`}
          onChange={onChange}
          placeholder={placeHolder}
          autoComplete="false"
          autoCorrect="false"
          required={isRequired}
        />
      </div>
      {variant === 'password' && (
        <Button
          variant="icon"
          icon={showPassword ? <IconEyeOff /> : <IconEye />}
          onClick={handleTogglePasswordVisibility}
          type="button"
        />
      )}
    </div>
  );
};

export default Input;
