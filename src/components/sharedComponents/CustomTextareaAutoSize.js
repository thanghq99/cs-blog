import React from "react";
import { Controller } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";

export default function CustomTextareaAutoSize({ name, control }) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextareaAutosize
          className="w-full my-1 px-4 py-2 rounded-none md:block focus:outline-custom"
          value={field.value}
          onChange={(data) => field.onChange(data)}
          placeholder="Update content"
        />
      )}
    />
  );
}
