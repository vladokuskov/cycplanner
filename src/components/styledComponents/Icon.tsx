import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Icon } from '../types/styledComponents/icon.types';

const Icon = ({ icon }: Icon) => {
  return <FontAwesomeIcon icon={icon} />;
};

export { Icon };
