import styled, { css } from 'styled-components';
import { ContainerVariant } from '../types/styledComponents/container.types';

const StyledContainer = styled.div<ContainerVariant>`
  ${({ variant }) =>
    variant === 'page' &&
    css`
      width: 100%;
      height: 100%;
      max-width: 1200px;
      min-height: 100vh;
      margin: 0 auto;
      padding: 0;
      background-color: #fbfbfb;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
    `}

  ${({ variant }) =>
    variant === 'grid' &&
    css`
      display: grid;
    `}
`;

export const StyledPageContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export default StyledContainer;
