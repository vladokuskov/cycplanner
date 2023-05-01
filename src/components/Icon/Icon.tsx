import { AnimatedIcon } from './Icon.styles';
import { Icon } from './Icon.types';

const Icon = ({ icon, spinning = 'false' }: Icon) => {
  if (icon) {
    return <AnimatedIcon icon={icon} spinning={spinning} />;
  } else return <></>;
};

export { Icon };
