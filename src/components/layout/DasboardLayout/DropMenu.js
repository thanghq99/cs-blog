import { useEffect, useRef, useState } from "react";

const ChevronDown = ({ open, toggleButtonRef, ...props }) => (
  <button ref={toggleButtonRef} {...props}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={`w-6 h-6 transition hover:text-red-600 ${
        open ? "rotate-180" : null
      }`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  </button>
);

const MenuActions = ({ closeMenu, menuActionsRef, ...props }) => {
  return (
    <ul
      ref={menuActionsRef}
      className="absolute right-0 border min-w-[130px] border-slate-800 transition"
      {...props}
    >
      <li className="flex whitespace-nowrap bg-[#090d13] px-2 py-1 transition hover:bg-red-500 hover:text-slate-900 hover:cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 mr-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
          />
        </svg>
        Profile
      </li>
      <li className="flex whitespace-nowrap bg-[#090d13] px-2 py-1 transition hover:bg-red-500 hover:text-slate-900 hover:cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 mr-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
          />
        </svg>
        Log out
      </li>
    </ul>
  );
};

export default function DropMenu() {
  const [open, setOpen] = useState(false);
  const toggleButtonRef = useRef();
  const menuActionsRef = useRef();

  const toggleMenu = () => setOpen(!open);
  const closeMenu = () => setOpen(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuActionsRef.current &&
        !menuActionsRef.current.contains(event.target) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(event.target)
      ) {
        console.log("click somewhere");
        closeMenu();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuActionsRef]);

  return (
    <div className="relative">
      <ChevronDown
        open={open}
        onClick={toggleMenu}
        toggleButtonRef={toggleButtonRef}
      />
      {open && (
        <MenuActions closeMenu={closeMenu} menuActionsRef={menuActionsRef} />
      )}
    </div>
  );
}
