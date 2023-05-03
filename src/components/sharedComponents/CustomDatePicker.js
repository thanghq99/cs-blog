import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller } from "react-hook-form";

function CustomDatePicker({ name, control }) {
  //date depends on client (blog writer) location, get
  const getClientDate = (date) => {
    return date.setHours(0, 0, 0, 0);
  };
  //date depends on server location (mongoose convert it to JS date again)
  const getServerDate = (date) => {
    return `${date.toLocaleDateString("en-GB")}`;
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <DatePicker
          dateFormat="dd-MM-yyyy"
          selected={field.value}
          showPopperArrow={false}
          onChange={(date) => {
            field.onChange(getClientDate(date));
          }}
          className="z-50 my-1 px-4 py-2 rounded-none md:block focus:outline-custom"
        />
      )}
    />
  );
}

export default CustomDatePicker;
