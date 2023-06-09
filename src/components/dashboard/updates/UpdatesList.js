import React from "react";
import TableAction from "./TableAction";
import { displayDate } from "@/src/utils/displayDate";

function UpdatesList({ updatesList, mutate, pageSize }) {
  const emptyRows = pageSize - updatesList.length;

  return (
    <table className="table-fixed w-full border-collapse border border-gray-200 text-left text-gray-400">
      <thead className="text-gray-400 uppercase bg-gray-700">
        {/* table head */}
        <tr className="">
          <th scope="col" className="px-6 py-4 border border-gray-400 text-lg">
            Update date
          </th>
          <th
            scope="col"
            className="px-6 py-4 w-1/4 md:w-1/6 lg:w-2/12 border border-gray-400 text-lg text-center"
          >
            Action
          </th>
        </tr>
      </thead>
      {/* table main */}
      <tbody className="[&>*:nth-child(odd)]:bg-gray-600 [&>*:nth-child(even)]:bg-gray-700">
        {updatesList.map((update, index) => (
          <tr key={index} className={`h-[65px] border-b`}>
            <td className="border border-gray-400 px-6 py-4 font-medium whitespace-nowrap text-white">
              {displayDate(update.date)}
            </td>
            <td className="border border-gray-400 px-6 py-4 font-medium whitespace-nowrap text-white">
              <TableAction update={update} mutate={mutate} />
            </td>
          </tr>
        ))}
        {Array(emptyRows)
          .fill()
          .map((x, index) => (
            <tr key={index} className={`h-[65px] border-b`}>
              <td className="border border-gray-400 px-6 py-4 font-medium whitespace-nowrap text-white"></td>
              <td className="border border-gray-400 px-6 py-4 font-medium whitespace-nowrap text-white"></td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default UpdatesList;
