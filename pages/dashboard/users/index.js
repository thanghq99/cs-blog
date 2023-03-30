DashboardLayout;
import DashboardLayout from "@/components/layout/DashboardLayout";
import React from "react";

function Users() {
  return <div>Users</div>;
}

export default Users;

Users.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
