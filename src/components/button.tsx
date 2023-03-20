import { IButton } from '@/types/button-component.types';

const Button = ({
  onClick,
  label,
  variant,
  icon,
  size = 'sm',
  stretched = false,
  type = 'submit',
}: IButton) => {
  const buttonClassName = `btn btn-${variant} ${size} ${stretched && 'full'}`;

  return (
    <button
      className={buttonClassName}
      onClick={onClick}
      title={label}
      type={type}
    >
      {variant === 'icon' || variant === 'icon-outlined' ? icon : label}
    </button>
  );
};

export default Button;
