import React, { useState, useEffect, useRef } from 'react';

interface Props {
  changeRange: (range: number) => void;
  selectedRange: number;
}

const RangePicker = ({ changeRange, selectedRange }: Props) => {
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
    <div className="selectors-range-wrapper" ref={ref}>
      <label htmlFor="RangePicker" className="filter-label">
        Range
      </label>
      <button
        onClick={() => setIsOpen(!isOpen)}
        name="RangePicker"
        className="selector-range-button"
        title="Select range of search"
        aria-label="Select range of search"
      >
        <span>{selectedRange + ` km`}</span>
        <span className="range-button--icon">
          <i className={isOpen ? 'arrow-up' : 'arrow-down'} />
        </span>
      </button>
      {isOpen && (
        <ul className="range-options-wrapper">
          {options.map((option) => (
            <li
              className="range-option-wrapper"
              key={option}
              tabIndex={0}
              role="button"
              onClick={(e) => handleOptionClick(option)}
            >
              {option + ` km`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RangePicker;
