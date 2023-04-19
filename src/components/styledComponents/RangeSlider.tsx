import React from 'react';
import styled from 'styled-components';
import { IRangeSlider } from '../types/styledComponents/rangeSlider.types';

const RangeSliderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
`;
const Label = styled.label`
  font-family: 'Roboto';
  font-size: 0.9rem;
  color: #2c2c2c; ;
`;
const StyledRangeSlider = styled.input`
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 0.5rem;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
  border-radius: 8px;
  ::-webkit-slider-thumb {
    transition: 0.2s;
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    border: none;
    border-radius: 50%;
    background: #727272;
    box-shadow: none;
    cursor: pointer;
    &:hover {
      background: #a7a7a7;
    }
    &:active,
    &:focus {
      background: #a3d168;
    }
  }
  ::-moz-range-thumb {
    transition: 0.2s;
    width: 25px;
    height: 25px;
    border: none;
    border-radius: 50%;
    background: #727272;
    box-shadow: none;
    cursor: pointer;
    &:hover {
      background: #a7a7a7;
    }
    &:active,
    &:focus {
      background: #a3d168;
    }
  }
`;

const RangeSlider = ({
  value,
  startValue,
  endValue,
  label,
  onChange,
  step,
}: IRangeSlider) => {
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
