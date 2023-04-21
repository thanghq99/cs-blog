// "use client";

import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import getLastPathPartition from "@/src/utils/getLastPathPartition";
import capitalizeFirstLetter from "@/src/utils/capitalizeFirstLetter";
import { SidebarProvider } from "@/src/contexts/siderbarContext";
import Header from "./Header";
import Sidebar from "./Sidebar";
import DashboardMainContent from "./DashboardMainContent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
          <DashboardMainContent>{children}</DashboardMainContent>
        </SidebarProvider>
        <ToastContainer position="top-center" autoClose={3000} />
      </main>
      <div id="react-modals" />
    </>
  );
}

export default DashboardLayout;
