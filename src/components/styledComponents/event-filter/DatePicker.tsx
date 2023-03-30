import styled from 'styled-components';
import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { Button } from '../Button';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { SelectorLabel } from './RangePicker';

interface Props {
  changeDate: any;
  initialDate: Date;
}

const DatePickerMainWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  position: relative;
  gap: 0.3rem;
`;
const DatePickerWrapper = styled.div`
  top: -18.8rem;
  position: absolute;
  background-color: #e2e2e2;
  border-radius: 10px;
  z-index: 1;
  box-shadow: 0px 5px 15px -1px rgba(0, 0, 0, 0.09);
`;

const DatePicker = ({ changeDate, initialDate }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <DatePickerMainWrapper>
      <SelectorLabel>Date</SelectorLabel>
      <Button
        icon={faCalendar}
        variant="text-icon"
        size="sm3"
        text="Date"
        bold
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <DatePickerWrapper>
          <DayPicker
            mode="single"
            selected={initialDate}
            onSelect={changeDate}
            pagedNavigation
          />
        </DatePickerWrapper>
      )}
    </DatePickerMainWrapper>
  );
};

export { DatePicker };
