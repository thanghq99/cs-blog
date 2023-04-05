import NewsList from "@/src/components/dashboard/news/NewsList";
import DashboardLayout from "@/src/components/layout/DasboardLayout";
import React from "react";

function News() {
  return <>
  <NewsList />
  </>;
}

export default News;

News.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
