import DashboardLayout from "@/components/layout/DasboardLayout";
import React from "react";

function News() {
  return <div>News</div>;
}

export default News;

News.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};