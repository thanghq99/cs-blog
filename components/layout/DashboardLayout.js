import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import getLastPathPartition from "@/utils/getLastPathPartition";
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import Link from "next/link";

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
      <main>
        <div className="flex space-x-1">
          <Link href="/dashboard/news" className="border-2 p-1">
            News
          </Link>
          <Link href="/dashboard/updates" className="border-2 p-1">
            Updates
          </Link>
          <Link href="/dashboard/users" className="border-2 p-1">
            Users
          </Link>
        </div>
        {children}
      </main>
    </>
  );
}

export default DashboardLayout;
