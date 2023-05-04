import { useState } from 'react';
import { StyledButton, StyledButtonGroupWrapper } from './SwitchButton.styles';
import { SwitchButton } from './SwitchButton.types';

const SwitchButton = ({
  labels = [],
  onClick,
  className,
  indexActive,
}: SwitchButton) => {
  const handleClick = (label: string, index: number) => {
    onClick(label);
  };

  return (
    <StyledButtonGroupWrapper>
      {labels.map((label, index) => (
        <StyledButton
          className={className}
          key={index}
          active={index === indexActive}
          disabled={index === indexActive}
          onClick={() => handleClick(label, index)}
          type="button"
          title={label}
        >
          {labels && labels?.length !== 0 && <span>{label}</span>}
        </StyledButton>
      ))}
    </StyledButtonGroupWrapper>
  );
};

export { SwitchButton };
