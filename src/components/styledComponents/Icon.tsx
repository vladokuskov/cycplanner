import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Icon } from '../types/styledComponents/icon.types';
import styled, { css, keyframes } from 'styled-components';

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const AnimatedIcon = styled(FontAwesomeIcon)<Icon>`
  ${({ spinning }) =>
    spinning === 'true' &&
    css`
      animation: ${spin} 0.5s linear infinite;
    `}
`;

const Icon = ({ icon, spinning = 'false' }: Icon) => {
  return <AnimatedIcon icon={icon} spinning={spinning} />;
};

export { Icon };
