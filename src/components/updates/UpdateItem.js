import { displayDate } from "@/src/utils/displayDate";
import React from "react";

export default function UpdateItem({ update }) {
  return (
    <div className="mt-10 px-10 py-6 bg-neutral-950 border-l-2 border-l-sky-400/20">
      <p className="uppercase text-lg text-neutral-600 leading-[0.25rem] font-light">
        {displayDate(update.date)}
      </p>
      <p className="mt-4 mb-2 font-bold text-2xl">{`Release Notes for ${new Date(
        update.date
      ).toLocaleDateString()}`}</p>
      <p className="whitespace-pre-wrap text-neutral-400 font-semibold text-lg">
        {update.content}
      </p>
    </div>
  );
}
