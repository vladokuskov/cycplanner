import styled, { css } from 'styled-components';
import { ContainerVariant } from '../types/styledComponents/container.types';

const StyledContainer = styled.div<ContainerVariant>`
  ${({ variant }) =>
    variant === 'page' &&
    css`
      width: 100%;
      height: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0;
      background-color: #fbfbfb;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
    `}

  ${({ variant }) =>
    variant === 'grid' &&
    css`
      display: grid;
    `}

    ${({ variant }) =>
    variant === 'page-content' &&
    css`
      width: 100%;
      flex-direction: column;
      display: flex;
      align-items: center;
      justify-content: center;
    `}
`;

export default StyledContainer;
