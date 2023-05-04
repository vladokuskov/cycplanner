import { useState } from 'react';
import { StyledButton, StyledButtonGroupWrapper } from './SwitchButton.styles';
import { SwitchButton } from './SwitchButton.types';

const SwitchButton = ({
  labels = [],
  onClick,
  className,
  indexActive,
}: SwitchButton) => {
  const [activeIndex, setActiveIndex] = useState(indexActive ? indexActive : 0);

  const handleClick = (label: string, index: number) => {
    setActiveIndex(index);
    onClick(label);
  };

  return (
    <StyledButtonGroupWrapper>
      {labels.map((label, index) => (
        <StyledButton
          className={className}
          key={index}
          active={index === activeIndex}
          disabled={index === activeIndex}
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
