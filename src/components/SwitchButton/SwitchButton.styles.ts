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
  font-family: 'Roboto', sans-serif;
  border: none;
  margin: 0;
  padding: 0.3rem 0.5rem;
  border-radius: 6px;
  width: 100%;
  font-weight: 500;
  :disabled {
    cursor: default;
  }
  ${({ active }) =>
    active
      ? css`
          color: #717171;
          background-color: #e7e7e7;
        `
      : css`
          color: #8e8e8e;
          background-color: transparent;
        `}
`;

export { StyledButton, StyledButtonGroupWrapper };
