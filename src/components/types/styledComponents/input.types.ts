export type Input = {
  variant?:
    | 'search'
    | 'textarea'
    | 'outlined'
    | 'outlined-icon'
    | 'auth'
    | 'auth-pass';
  danger?: boolean;
  label?: string;
  value?: string;
  required?: boolean;
  isPassShowed?: boolean;
  icon?: any;
  full?: boolean;
  placeholder?: string;
  name?: string;
  onChangeArea?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};
