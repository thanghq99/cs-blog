const { useSidebarContext } = require("@/contexts/siderbarContext");

export default function DashboardMainContent({ children }) {
  const { open } = useSidebarContext();
  return (
    <div
      className={`mt-16 h-screen bg-[#15171b] text-white ${
        open ? "ml-64" : "ml-16"
      }`}
    >
      {children}
    </div>
  );
}
