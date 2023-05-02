import { StyledIcon } from './Icon.styles';
import { Icon } from './Icon.types';

const Icon = ({ icon, spinning = 'false' }: Icon) => {
  if (icon) {
    return <StyledIcon icon={icon} spinning={spinning} />;
  } else return <></>;
};

export { Icon };
