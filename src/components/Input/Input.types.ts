type InputVariants =
  | 'search'
  | 'textarea'
  | 'outlined'
  | 'outlined-icon'
  | 'auth';

type FieldTypes = 'text' | 'email' | 'password' | 'number';

export type Input = {
  variant?: InputVariants;
  danger?: boolean;
  label?: string;
  value?: string;
  required?: boolean;
  fieldType?: FieldTypes;
  isPassShowed?: boolean;
  icon?: any;
  full?: boolean;
  placeholder?: string;
  name?: string;
  className?: string;
  onChangeArea?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isLoading?: boolean;
};
