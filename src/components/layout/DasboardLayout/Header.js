import { useEffect, useRef, useState } from "react";
import SearchModal from "./SearchModal";
import DropMenu from "./DropMenu";

const { useSidebarContext } = require("@/src/contexts/siderbarContext");

const SearchBar = () => {
  return (
    <>
      <input
        className="px-4 py-2 rounded-none w-1/2 max-w-md hidden bg-slate-700 placeholder:text-slate-400 md:block focus:outline-custom"
        placeholder="Search something... (nonfunctional)"
      ></input>
      <SearchModal />
    </>
  );
};

const NameDisplayer = ({ name }) => <p className="mr-2">Welcome, {name}!</p>;

export default function Header() {
  const { open } = useSidebarContext();

  return (
    <div
      className={`fixed right-0 top-0 z-40 bg-[#090d13] h-16 text-white flex justify-between items-center px-4 ${
        open ? "left-64" : "left-16"
      }`}
    >
      {/* search bar */}
      <SearchBar />
      {/* account actions */}
      <div className="flex">
        <NameDisplayer name={"Gabe Newell"} />
        <DropMenu />
      </div>
    </div>
  );
}
