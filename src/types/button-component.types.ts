export interface IButton {
  type?: 'button' | 'submit';
  size?: 'sm' | 'md' | 'xl' | 'xxl';
  variant: 'filled' | 'outline' | 'icon' | 'text' | 'icon-outlined';
  label?: string;
  icon?: React.ReactNode;
  stretched?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
