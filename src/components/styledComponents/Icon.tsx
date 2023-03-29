import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProps } from '../types/styledComponents/icon.types';

const Icon = ({ icon }: IconProps) => {
  return <FontAwesomeIcon icon={icon} />;
};

export { Icon };
