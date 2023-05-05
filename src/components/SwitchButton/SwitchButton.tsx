import { useState } from 'react';
import { StyledButton, StyledButtonGroupWrapper } from './SwitchButton.styles';
import { SwitchButton } from './SwitchButton.types';
import { Icon } from '../Icon/Icon';

const SwitchButton = ({
  labels = [],
  onClick,
  className,
  indexActive,
  icon = [],
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
          {icon[index] && <Icon icon={icon[index]} />}
        </StyledButton>
      ))}
    </StyledButtonGroupWrapper>
  );
};

export { SwitchButton };
