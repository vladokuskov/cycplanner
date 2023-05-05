import styled, { css } from 'styled-components';

import { SwitchButton } from './SwitchButton.types';

const StyledButtonGroupWrapper = styled.div`
  background-color: #d9d9d9;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 6px;
`;

const StyledButton = styled.button<SwitchButton>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  font-family: 'Roboto', sans-serif;
  border: none;
  margin: 0;
  padding: 0.3rem 0.5rem;
  width: 100%;
  font-weight: 500;

  :disabled {
    cursor: default;
  }
  ${({ active }) =>
    active
      ? css`
          border-radius: 6px;
          color: rgb(68, 68, 68);
          background-color: rgb(236, 236, 236);
        `
      : css`
          color: #888;
          background-color: transparent;
        `}
`;

export { StyledButton, StyledButtonGroupWrapper };
