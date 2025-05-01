import moment from 'moment';
import React, { useRef, useState } from 'react';
import { IoCalendarNumber } from "react-icons/io5";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SearchDate = ({ label, onChange }) => {
  const [currDate, setCurrDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDateChange = (date) => {
    setCurrDate(date);
    onChange(date);
    setShowCalendar(false); // Hide calendar after selection
  };

  return (
    <div className="shadow-sm date">
      <div className="airport-result pointer-cursor" onClick={() => setShowCalendar(!showCalendar)}>
        <IoCalendarNumber />
        <div className="airport-city fw-bold">
          {moment(currDate).format("Do")} {moment(currDate).format("MMM YYYY")}
        </div>
        <div className="airport-details text-muted">
          {moment(currDate).format("dddd")}
        </div>
      </div>

      {showCalendar && (
        <div className="calendar-container">
          <DatePicker
            selected={currDate}
            onChange={handleDateChange}
            inline
            minDate={new Date()}
            highlightDates={[new Date()]}
          />
        </div>
      )}
    </div>
  );
};

export default SearchDate;
