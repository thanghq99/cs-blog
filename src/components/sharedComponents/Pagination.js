import { useState } from "react";
import Button from "./Button";

const PageSizeSelection = ({ pageSizeOptions, setTempPageSize }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="relative min-w-[40px] flex justify-center"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-7 h-7 relative"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
        />
      </svg>
      {open ? (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[28px] flex flex-col text-center">
          {pageSizeOptions &&
            pageSizeOptions.map((option, index) => (
              <div
                key={index}
                className="px-4 py-2 border border-gray-500 bg-gray-600 hover:cursor-pointer hover:bg-slate-500"
                onClick={() => setTempPageSize(option)}
              >
                {option}
              </div>
            ))}
        </div>
      ) : null}
    </div>
  );
};

const Pagination = ({
  page,
  pageSize,
  count,
  setPage,
  setPageSize,
  pageSizeChangeable,
  pageSizeOptions,
}) => {
  const [tempPageSize, setTempPageSize] = useState(pageSize);
  const pages = Math.ceil(count / pageSize);
  const onChangePageSize = (e) => {
    setTempPageSize(e.target.value);
  };
  const confirmChangePageSize = () => {
    setPageSize(tempPageSize);
  };
  return (
    <>
      {pageSizeChangeable && (
        <div className="flex justify-center items-center space-x-2 mb-2">
          <span>Page size:</span>
          <input
            type="number"
            value={tempPageSize}
            onChange={onChangePageSize}
            className="w-20 mx-2 px-4 py-2 rounded-none focus:outline-custom text-black"
          ></input>
          <PageSizeSelection
            pageSizeOptions={pageSizeOptions}
            setTempPageSize={setTempPageSize}
          />
          <Button title="Set" action={confirmChangePageSize} />
        </div>
      )}
      <div className="flex justify-center space-x-2">
        {page > 0 ? (
          <div
            className="h-7 w-7 px-2 py-1 bg-gray-700 text-center hover:scale-105 transition hover:cursor-pointer"
            onClick={() => setPage(page - 1)}
          >
            &lt;
          </div>
        ) : (
          <div className="h-7 w-7 opacity-0"></div>
        )}
        {Array(pages)
          .fill()
          .map((x, index) => (
            <div
              className={`h-7 w-7 px-2 py-1 text-center hover:scale-105 transition hover:cursor-pointer ${
                page === index ? "bg-gray-500" : "bg-gray-700"
              }`}
              key={index}
              onClick={() => setPage(index)}
            >
              {index + 1}
            </div>
          ))}

        {page < pages - 1 ? (
          <div
            className="h-7 w-7 px-2 py-1 bg-gray-700 text-center hover:scale-105 transition hover:cursor-pointer"
            onClick={() => setPage(page + 1)}
          >
            &gt;
          </div>
        ) : (
          <div className="h-7 w-7 opacity-0"></div>
        )}
      </div>
    </>
  );
};

export default Pagination;
