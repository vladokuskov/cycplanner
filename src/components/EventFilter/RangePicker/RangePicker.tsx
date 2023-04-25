import React, { useState, useEffect, useRef } from 'react';
import {
  RangeSelectorWrapper,
  RangeOptionsWrapper,
  RangeOption,
  SelectorLabel,
} from './RangePicker.styles';
import { Button } from '../../Button/Button';
import { Range } from '../../types/shared/RangeSelector.types';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const RangePicker = ({ changeRange, selectedRange }: Range) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleOptionClick = (option: number) => {
    changeRange(option);
    setIsOpen(false);
  };
  const options = [15, 40, 70, 100, 200];

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (isOpen && ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen((prevIsOpen) => !prevIsOpen);
      }
    };
    document.addEventListener('mousedown', checkIfClickedOutside);
    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [isOpen]);

  return (
    <RangeSelectorWrapper ref={ref}>
      <SelectorLabel>Range</SelectorLabel>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="text-icon"
        text={`${selectedRange} km`}
        size={'sm2'}
        bold
        icon={isOpen ? faChevronUp : faChevronDown}
      />

      {isOpen && (
        <RangeOptionsWrapper>
          {options.map((option) => (
            <RangeOption key={option}>
              <Button
                variant="default"
                onClick={() => handleOptionClick(option)}
                text={option + ` km`}
                full
              />
            </RangeOption>
          ))}
        </RangeOptionsWrapper>
      )}
    </RangeSelectorWrapper>
  );
};

export default RangePicker;
