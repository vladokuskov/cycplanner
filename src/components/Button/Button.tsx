import { Icon } from '../Icon/Icon';
import { ButtonIcon, ButtonText, StyledButton } from './Button.styles';
import { Button } from './IButton';

const Button = ({
  text,
  variant = 'filled',
  onClick,
  icon,
  size = 'sm3',
  full = false,
  buttonType = 'default',
  className,
  bold = false,
  disabled = false,
  status = 'default',
  rotate,
  wider = false,
}: Button) => {
  return (
    <StyledButton
      className={className}
      onClick={onClick}
      title={text}
      variant={variant}
      size={size}
      full={full}
      type={buttonType === 'default' ? 'button' : 'submit'}
      bold={bold}
      disabled={disabled}
      status={status}
      icon={icon}
      wider={wider}
    >
      {text && text?.length !== 0 && variant !== 'icon' && (
        <ButtonText>{text}</ButtonText>
      )}
      {icon && (
        <ButtonIcon variant={variant}>
          <Icon icon={icon} spinning={rotate ? 'true' : 'false'} />
        </ButtonIcon>
      )}
    </StyledButton>
  );
};

export { Button };
