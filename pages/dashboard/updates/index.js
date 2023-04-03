import DashboardLayout from "@/components/layout/DasboardLayout";
import React from "react";

function Updates() {
  return <div>Updates</div>;
}

export default Updates;

Updates.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
