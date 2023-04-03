import DashboardLayout from "@/components/layout/DasboardLayout";
import Link from "next/link";
import React from "react";

function Dashboard() {
  return <>dashboard content</>;
}

export default Dashboard;

Dashboard.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
