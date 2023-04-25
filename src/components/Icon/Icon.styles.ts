import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styled, { css, keyframes } from 'styled-components';
import { Icon } from './Icon.types';

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

export { AnimatedIcon };
