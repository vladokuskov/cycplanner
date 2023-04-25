import React from 'react';
import {
  StyledRangeSlider,
  Label,
  RangeSliderWrapper,
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
    <RangeSliderWrapper>
      {label && <Label htmlFor="rangeSlider">{label}</Label>}
      <StyledRangeSlider
        name="rangeSlider"
        type="range"
        min={startValue}
        max={endValue}
        value={value}
        step={step}
        onChange={onChange}
      />
    </RangeSliderWrapper>
  );
};

export { RangeSlider };
