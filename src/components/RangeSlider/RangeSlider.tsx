import React from 'react';

import {
  StyledLabel,
  StyledRangeSlider,
  StyledRangeSliderWrapper,
} from './RangeSlider.styles';
import { RangeSlider } from './RangeSlider.types';

const RangeSlider = ({
  value,
  startValue,
  endValue,
  label,
  onChange,
  step,
}: RangeSlider) => {
  return (
    <StyledRangeSliderWrapper>
      {label && <StyledLabel htmlFor="rangeSlider">{label}</StyledLabel>}
      <StyledRangeSlider
        name="rangeSlider"
        type="range"
        min={startValue}
        max={endValue}
        value={value}
        step={step}
        onChange={onChange}
      />
    </StyledRangeSliderWrapper>
  );
};

export { RangeSlider };
