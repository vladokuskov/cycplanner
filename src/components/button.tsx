interface Button {
  size?: 'sm' | 'md' | 'xl' | 'xxl';
  type: 'filled' | 'outline' | 'icon' | 'text' | 'icon-outlined';
  label?: string;
  icon?: React.ReactNode;
  stretched?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({ onClick, label, type, icon, size, stretched }: Button) => {
  const buttonClassName = `btn btn-${type} ${size} ${stretched && 'full'}`;

  return (
    <button className={buttonClassName} onClick={onClick} title={label}>
      {type === 'icon' || type === 'icon-outlined' ? icon : label}
    </button>
  );
};

export default Button;
