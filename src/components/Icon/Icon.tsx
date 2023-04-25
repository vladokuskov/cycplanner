import { Icon } from './Icon.types';
import { AnimatedIcon } from './Icon.styles';

const Icon = ({ icon, spinning = 'false' }: Icon) => {
  return <AnimatedIcon icon={icon} spinning={spinning} />;
};

export { Icon };
