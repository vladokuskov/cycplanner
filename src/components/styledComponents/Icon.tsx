import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Icon } from '../types/styledComponents/icon.types';
import styled, { css, keyframes } from 'styled-components';

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const AnimatedIcon = styled(FontAwesomeIcon)<Icon>`
  ${({ isAnimated }) =>
    isAnimated &&
    css`
      animation: ${spin} 0.5s linear infinite;
    `}
`;

const Icon = ({ icon, isAnimated = false }: Icon) => {
  return <AnimatedIcon icon={icon} isAnimated={isAnimated} />;
};

export { Icon };
