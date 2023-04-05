import Image from "next/image";
import { useRouter } from "next/router";
import sidebarConfig from "./sidebarConfig";
import SidebarItem from "./SidebarItem";

const { useSidebarContext } = require("@/src/contexts/siderbarContext");

const LeftArrow = ({ open, ...props }) => (
  <button {...props}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={`w-8 h-8 hover:scale-125 hover:fill-red-600 transition ${
        open ? null : "rotate-180"
      }`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  </button>
);

export default function Sidebar() {
  const { open, toggleSidebar } = useSidebarContext();
  // const [open, setOpen] = useState(true);
  return (
    <div
      className={`fixed top-0 left-0 z-40 h-screen bg-[#090d13] text-white transition ${
        open ? "w-64" : "w-16"
      }`}
    >
      <div
        className={`h-16 p-2 flex ${
          open ? "justify-between" : "justify-center"
        }`}
      >
        {open ? (
          <Image
            src="/valve_logo.svg"
            alt="admin-valve-logo"
            height="0"
            width="0"
            className="w-auto h-auto"
          />
        ) : null}
        <LeftArrow onClick={toggleSidebar} open={open} />
      </div>
      <div className="">
        {sidebarConfig.map((item, index) => (
          <SidebarItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
}
