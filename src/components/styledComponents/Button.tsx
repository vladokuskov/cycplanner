import { ButtonProps } from '../types/styledComponents/button.types';
import styled, { css } from 'styled-components';
import { Icon } from './Icon';

const sizes = {
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

const StyledButton = styled.button<ButtonProps>`
  font-family: 'Open-Sans', sans-serif;
  background-color: transparent;
  border: none;
  padding: 0;
  margin: 0;
  font-weight: ${({ bold }) => (bold === true ? 600 : 500)};
  letter-spacing: 0.01rem;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s;
  ${({ full }) =>
    full === true &&
    css`
      width: 100%;
    `}
  ${({ size }) =>
    size === 'sm1'
      ? sizes.sm1
      : size === 'sm2'
      ? sizes.sm2
      : size === 'sm3'
      ? sizes.sm3
      : size === 'md1'
      ? sizes.md1
      : size === 'md2'
      ? sizes.md2
      : size === 'md3'
      ? sizes.md3
      : size === 'xl1'
      ? sizes.xl1
      : size === 'xl2'
      ? sizes.xl2
      : size === 'xl3'
      ? sizes.xl3
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
          &:hover,
          &:focus {
            color: #808080;
          }
          &:active {
            color: #6b6b6b;
          }
        `
      : ''};
`;

const ButtonText = styled.span``;

const ButtonIcon = styled.span<ButtonProps>`
  ${({ variant }) =>
    variant === 'text-icon' &&
    css`
      color: #969696;
    `}
`;

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
}: ButtonProps) => {
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
    >
      {variant !== 'icon' && variant !== 'icon-bg' && (
        <ButtonText>{text}</ButtonText>
      )}
      {(variant === 'text-icon' ||
        variant === 'icon' ||
        variant === 'icon-bg') && (
        <ButtonIcon variant={variant}>
          <Icon icon={icon} />
        </ButtonIcon>
      )}
    </StyledButton>
  );
};

export { Button };
