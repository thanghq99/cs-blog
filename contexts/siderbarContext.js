import { createContext, useContext, useEffect, useState } from "react";

const SidebarContext = createContext(null);

export function SidebarProvider({ children }) {
  const [open, setOpen] = useState(null);

  useEffect(() => {
    const persitData = JSON.parse(localStorage.getItem("sidebar_open"));
    setOpen(persitData);
  }, []);

  function toggleSidebar() {
    const newOpenState = !open;
    localStorage.setItem("sidebar_open", JSON.stringify(newOpenState));
    setOpen(newOpenState);
  }
  return (
    <SidebarContext.Provider value={{ open, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebarContext() {
  return useContext(SidebarContext);
}
