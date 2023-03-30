import styled from 'styled-components';
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../Button';
import { RangeProps } from '@/components/types/props/RangeSelector.types';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const RangeSelectorWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  position: relative;
  gap: 0.3rem;
`;

export const SelectorLabel = styled.label`
  font-family: 'Lato', sans-serif;
  color: rgba(46, 46, 46, 0.53);
  font-weight: 400;
  font-size: 0.8rem;
  line-height: 12px;
  margin-left: 0.5rem;
`;

const RangeOptionsWrapper = styled.ul`
  z-index: 2;
  position: absolute;
  top: 3.6rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: none;
  border-radius: 10px;
  background-color: transparent;
  box-shadow: 0px 5px 15px -1px rgba(0, 0, 0, 0.09);
`;

const RangeOption = styled.li`
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
  text-align: center;
  width: 100%;
  border-bottom: 1px solid rgb(138, 138, 138);
  background-color: #e5e5e5;
  border: none;
  border-radius: 10px;
`;

const RangePicker = ({ changeRange, selectedRange }: RangeProps) => {
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
