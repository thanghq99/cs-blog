// "use client";

import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import getLastPathPartition from "@/utils/getLastPathPartition";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import { SidebarProvider } from "@/contexts/siderbarContext";
import Header from "./Header";
import Sidebar from "./Sidebar";
import DashboardMainContent from "./DashboardMainContent";

function DashboardLayout({ children }) {
  const router = useRouter();
  const lastPathPartition = getLastPathPartition(router.pathname);
  const title =
    lastPathPartition === "dashboard"
      ? "Dashboard"
      : `Dashboard | ${capitalizeFirstLetter(lastPathPartition)}`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main className="">
        <SidebarProvider>
          <Header />
          <Sidebar />
          <DashboardMainContent children={children} />
        </SidebarProvider>
      </main>
      <div id="react-modals" />
    </>
  );
}

export default DashboardLayout;
