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
import { useSession } from "next-auth/react";
import LoadingSection from "../../sharedComponents/LoadingSection";

function DashboardLayout({ children }) {
  const { status } = useSession();
  const router = useRouter();
  const lastPathPartition = getLastPathPartition(router.pathname);
  const title =
    lastPathPartition === "dashboard"
      ? "Dashboard"
      : `Dashboard | ${capitalizeFirstLetter(lastPathPartition)}`;

  if (status === "loading") return <LoadingSection />;
  if (status === "unauthenticated") router.replace("/sign-in");
  if (status === "authenticated")
    return (
      <>
        <Head>
          <title>{title}</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <main className="">
          <SidebarProvider>
            <Header />
            <Sidebar />
            <DashboardMainContent>{children}</DashboardMainContent>
          </SidebarProvider>
        </main>
        <div id="react-modals" />
      </>
    );
}

export default DashboardLayout;
