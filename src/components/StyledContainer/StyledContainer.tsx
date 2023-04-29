import styled, { css } from 'styled-components';
import { ContainerVariant } from '../types/shared/container.types';

const StyledContainer = styled.div<ContainerVariant>`
  ${({ variant }) =>
    variant === 'page' &&
    css`
      width: 100%;
      height: 100%;
      max-width: 75rem;
      min-height: 87vh;
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
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      padding: 1rem;
      @media (min-width: 680px) {
        display: grid;
        grid-template-columns: 3fr 7fr;
      }
    `}

    ${({ variant }) =>
    variant === 'detail-page' &&
    css`
      width: 100%;
      max-width: 75rem;
      min-height: 100vh;
      margin: 0 auto;
      background-color: #fbfbfb;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: flex-start;
      padding: 1rem;
      grid-template-columns: 1fr;
      @media (min-width: 680px) {
        display: grid;
        align-items: flex-start;
        grid-template-columns: 6fr 4fr;
      }
    `}

    ${({ variant }) =>
    variant === 'profile-page' &&
    css`
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      gap: 2rem;
      @media (min-width: 680px) {
        display: grid;
        grid-template-columns: 2fr 7fr;
        grid-template-rows: auto;
        grid-template-areas:
          'main'
          'sidebar-left';
      }
    `}
`;

export const StyledPageContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export default StyledContainer;
