import styled, { css } from 'styled-components';
import { ContainerVariant } from '../types/styledComponents/container.types';

const StyledContainer = styled.div<ContainerVariant>`
  ${({ variant }) =>
    variant === 'page' &&
    css`
      width: 100%;
      height: 100%;
      max-width: 75rem;
      min-height: 100vh;
      margin: 0 auto;
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

    ${({ variant }) =>
    variant === 'events-page' &&
    css`
      width: 100%;
      max-width: 75rem;
      min-height: 100vh;
      margin: 0 auto;
      background-color: #fbfbfb;
      display: grid;
      padding: 1rem;
      @media (min-width: 680px) {
        grid-template-columns: 3fr 7fr;
      }
    `}
`;

export const StyledPageContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export default StyledContainer;
