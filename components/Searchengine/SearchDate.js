import moment from 'moment';
import React, { useState } from 'react';
import { FormControl } from 'react-bootstrap';
import { IoCalendarNumber } from "react-icons/io5";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import CSS for the date picker



const SearchDate = ({ label }) => {
  const [selected, setSelected] = useState(false);
  const [currDate, setCurrDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false); // Track calendar visibility



  const handleDateChange = (date) => {
    setCurrDate(date);  // Update the current selected date
    setShowCalendar(false); // Hide calendar after selecting a date
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar); // Toggle calendar visibility
  };

  return (
    <div className="shadow-sm date">
      {!selected ? (
        <>
          <IoCalendarNumber />
          <div className="date-input-wrapper" onClick={toggleCalendar}>
            <FormControl
              type="text"
              value={moment(currDate).format("DD-MMM-YYYY")}  // Display selected date
              placeholder="Select a date"
              readOnly
            className='input-date'
            />
          </div>

          {showCalendar && (
            <DatePicker
              selected={currDate}
              onChange={handleDateChange}
              inline
              dateFormat="dd MMM yyyy"
              minDate={new Date()}  // Prevent selecting past dates
              highlightDates={[new Date()]}  // Highlight today's date
            />
          )}
        </>
      ) : (
        <div className="airport-result">
          <IoCalendarNumber />
          <div className="airport-city fw-bold">{moment(currDate).format("Do")} {moment(currDate).format("MMM'YYYY")}</div>
          <div className="airport-details text-muted">
            {moment(currDate).format("dddd")}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchDate;
