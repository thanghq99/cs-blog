import DashboardLayout from "@/src/components/layout/DasboardLayout";
import React from "react";
import NewsForm from "@/src/components/dashboard/news/NewsForm";

const type = {
  CREATE: 0,
  EDIT: 1,
};
function CreateNews(props) {
  return (
    <div className="p-4">
      <NewsForm type={type.CREATE} />
    </div>
  );
}

export default CreateNews;

CreateNews.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
