export interface IInput {
  variant?: 'email' | 'password' | 'account' | 'default';
  icon?: 'email' | 'account' | 'password';
  placeHolder?: string;
  status?: 'default' | 'danger';
  isRequired?: boolean;
  label?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}
