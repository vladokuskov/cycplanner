export type ButtonProps = {
  variant?:
    | 'filled'
    | 'outlined'
    | 'text-icon'
    | 'icon-bg'
    | 'icon'
    | 'default';
  text?: string;
  icon?: any;
  full?: boolean;
  buttonType?: 'default' | 'submit';
  size?: 'sm1' | 'sm2' | 'sm3' | 'md1' | 'md2' | 'md3' | 'xl1' | 'xl2' | 'xl3';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  bold?: boolean;
  disabled?: boolean;
};
