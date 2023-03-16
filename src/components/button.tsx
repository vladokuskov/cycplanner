interface Button {
  size?: 'sm' | 'md' | 'xl' | 'xxl';
  type: 'filled' | 'outline' | 'icon' | 'text';
  label?: string;
  icon?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({ onClick, label, type, icon, size }: Button) => {
  const buttonClassName = `btn btn-${type} ${size}`;

  return (
    <button className={buttonClassName} onClick={onClick} title={label}>
      {type === 'icon' ? icon : label}
    </button>
  );
};

export default Button;
