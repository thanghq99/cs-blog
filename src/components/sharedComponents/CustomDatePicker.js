import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CustomDatePicker({ date, setDate }) {
  //date depends on client (blog writer) location, get
  const getClientDate = (date) => {
    return new Date(date.setHours(0, 0, 0, 0));
  };
  //date depends on server location (mongoose convert it to JS date again)
  const getServerDate = (date) => {
    return `${date.toLocaleDateString("en-GB")}`;
  };
  return (
    <DatePicker
      dateFormat="dd-MM-yyyy"
      selected={date}
      showPopperArrow={false}
      onChange={(date) => {
        setDate(getClientDate(date));
      }}
      className="z-50 my-1 px-4 py-2 rounded-none md:block focus:outline-custom"
    />
  );
}

export default CustomDatePicker;
