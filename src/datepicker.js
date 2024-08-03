import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './styles.css';

const MyDatePicker = () => {
  const [startDate, setStartDate] = useState(null);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };


  return (
    <div>
      <DatePicker 
        selected={startDate}
        onChange={handleStartDateChange}
        dateFormat="dd/MM/yyyy" // Customize the date format as needed
        className='datePicker'
      />
    </div>

  );
};

export default MyDatePicker;
