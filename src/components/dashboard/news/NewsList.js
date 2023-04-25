import React from "react";
import TableAction from "./TableAction";
import PublishBadge from "./PublishBadge";

function NewsList({ newList, page, pageSize }) {
  const emptyRows = pageSize - newList.length;
  console.log(pageSize);

  return (
    <table className="table-fixed w-full border-collapse border border-gray-200 text-left text-gray-400">
      <thead className="text-gray-400 uppercase bg-gray-700">
        {/* table head */}
        <tr className="">
          <th scope="col" className="px-6 py-4 border border-gray-400 text-lg">
            Title
          </th>
          <th
            scope="col"
            className="px-6 py-4 w-1/4 lg:w-1/5 border border-gray-400 text-center hidden md:table-cell"
          >
            Pulishing status
          </th>
          <th
            scope="col"
            className="px-6 py-4 w-1/4 md:w-1/6 lg:w-2/12 xl:w-1/12 border border-gray-400 text-center "
          >
            Action
          </th>
        </tr>
      </thead>
      {/* table main */}
      <tbody className="[&>*:nth-child(odd)]:bg-gray-600 [&>*:nth-child(even)]:bg-gray-700">
        {newList.map((news, index) => (
          <tr key={index} className={`h-[65px] border-b`}>
            <td className="border border-gray-400 px-6 py-4 font-medium whitespace-nowrap text-white">
              {news.title}
            </td>
            <td className="border border-gray-400 px-6 py-4 font-medium whitespace-nowrap text-white hidden md:table-cell">
              <PublishBadge publishable={news.publishable} />
            </td>
            <td className="border border-gray-400 px-6 py-4 font-medium whitespace-nowrap text-white">
              {/* pass page and pageSize to persit useSWR mutate bind key depends on page and pageSize */}
              <TableAction news={news} page={page} pageSize={pageSize} />
            </td>
          </tr>
        ))}
        {Array(emptyRows)
          .fill()
          .map((x, index) => (
            <tr key={index} className={`h-[65px] border-b`}>
              <td className="border border-gray-400 px-6 py-4 font-medium whitespace-nowrap text-white"></td>
              <td className="border border-gray-400 px-6 py-4 font-medium whitespace-nowrap text-white hidden md:table-cell"></td>
              <td className="border border-gray-400 px-6 py-4 font-medium whitespace-nowrap text-white"></td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default NewsList;
