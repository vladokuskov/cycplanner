import React, { useState, useEffect, useRef } from 'react';

const RangePicker = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(40);

  const ref = useRef<HTMLDivElement>(null);

  const handleOptionClick = (option: number) => {
    setSelectedOption(option);
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
      >
        <span>{selectedOption + ` km`}</span>
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
              role="button"
              onClick={() => handleOptionClick(option)}
              tabIndex={0}
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
