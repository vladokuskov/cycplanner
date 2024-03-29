import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export type Button = {
  variant?:
    | 'filled'
    | 'outlined'
    | 'text-icon'
    | 'icon-bg'
    | 'icon'
    | 'default'
    | 'danger';
  text?: string;
  icon?: IconDefinition | null;
  full?: boolean;
  buttonType?: 'default' | 'submit';
  size?: 'sm1' | 'sm2' | 'sm3' | 'md1' | 'md2' | 'md3' | 'xl1' | 'xl2' | 'xl3';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  bold?: boolean;
  disabled?: boolean;
  status?: 'default' | 'error' | 'success';
  rotate?: boolean;
  wider?: boolean;
};
