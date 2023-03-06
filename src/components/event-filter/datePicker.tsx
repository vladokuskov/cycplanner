import { forwardRef } from 'react';

import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface Props {
  updateDate: (date: Date) => void;
  initialDate: Date;
}

const DatePicker = ({ updateDate, initialDate }: Props) => {
  const ReactDatePickerInput = forwardRef<
    HTMLButtonElement,
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >
  >((props: any, ref) => (
    <button ref={ref} {...props} className="date-selector-button">
      {props.value}
      {<i className="selector-date-icon" />}
    </button>
  ));

  return (
    <div className="selectors-date-wrapper">
      <label htmlFor="datePicker" className="filter-label">
        Date
      </label>
      <ReactDatePicker
        wrapperClassName="selector-date-wrapper"
        shouldCloseOnSelect
        timeCaption="time"
        dateFormat="MMM d, yyyy"
        selected={initialDate}
        onChange={updateDate}
        name="datePicker"
        customInput={<ReactDatePickerInput />}
      />
    </div>
  );
};

export default DatePicker;
