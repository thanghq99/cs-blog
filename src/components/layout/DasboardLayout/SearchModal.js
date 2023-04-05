import React, { useState } from "react";
import Modal from "react-modal";

const searchResults = [
  {
    title: "Home page",
    description:
      "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
  },
  {
    title: "Users",
    description:
      "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
  },
  {
    title: "News",
    description:
      "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
  },
  {
    title: "Updates",
    description:
      "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
  },
];

const Result = ({ result }) => (
  <div className="p-1 mb-3 bg-slate-600">
    <p className="font-bold text-lg">{result.title}</p>
    <p>{result.description}</p>
  </div>
);

Modal.setAppElement("#__next");
function SearchModal() {
  const [open, setOpen] = useState(false);
  const openModal = () => {
    console.log("open modal");
    setOpen(true);
  };
  const closeModal = () => {
    console.log("open modal");
    setOpen(false);
  };
  return (
    <div>
      <button className="block md:hidden" onClick={openModal}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </button>
      <Modal
        isOpen={open}
        onRequestClose={closeModal}
        overlayClassName="fixed inset-0 z-[999] backdrop-blur-sm bg-slate-500/10"
        className="absolute inset-10 p-4 bg-[#101826] rounded-none text-white flex flex-col justify-between"
      >
        <div>
          <input
            className="px-4 py-3 mb-3 rounded-none w-full bg-slate-700 placeholder:text-slate-400 focus:outline-custom"
            placeholder="Search something... (nonfunctional)"
          ></input>
          <p className="font-extrabold text-lg">Result:</p>
          {searchResults.map((result, index) => (
            <Result key={index} result={result} />
          ))}
        </div>
        <div className="flex justify-center items-center">
          <button
            onClick={closeModal}
            className="px-3 py-2 bg-red-600 text-2xl uppercase text-slate-950 font-extrabold"
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default SearchModal;
