import DashboardLayout from "@/components/layout/DashboardLayout";
import Link from "next/link";
import React from "react";

function Dashboard() {
  return (
    <>
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
    </>
  );
}

export default Dashboard;

Dashboard.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
