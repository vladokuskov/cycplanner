import React, { useRef } from 'react';

import { useClickOutside } from '@/hooks/useClickOutside';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

import { Button } from '../../Button/Button';
import { Range } from '../../types/shared/RangeSelector.types';
import { StyledSelectorLabel } from '../EventFilterShared.styles';
import {
  StyledRangeOption,
  StyledRangeOptionsWrapper,
  StyledRangeSelectorWrapper,
} from './RangePicker.styles';

const options = [15, 40, 70, 100, 200];

const RangePicker = ({ changeRange, selectedRange }: Range) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useClickOutside(ref, false);

  const handleOptionClick = (option: number) => {
    changeRange(option);
    setIsOpen(false);
  };

  return (
    <StyledRangeSelectorWrapper ref={ref}>
      <StyledSelectorLabel>Range</StyledSelectorLabel>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="text-icon"
        text={`${selectedRange} km`}
        size={'sm2'}
        bold
        icon={isOpen ? faChevronUp : faChevronDown}
      />
      {isOpen && (
        <StyledRangeOptionsWrapper>
          {options.map((option) => (
            <StyledRangeOption key={option}>
              <Button
                variant="default"
                onClick={() => handleOptionClick(option)}
                text={option + ` km`}
                full
              />
            </StyledRangeOption>
          ))}
        </StyledRangeOptionsWrapper>
      )}
    </StyledRangeSelectorWrapper>
  );
};

export default RangePicker;
