import NewsList from "@/src/components/dashboard/news/NewsList";
import DashboardLayout from "@/src/components/layout/DasboardLayout";
import Button from "@/src/components/sharedComponents/Button";
import PageHeader from "@/src/components/sharedComponents/PageHeader";
import { useRouter } from "next/router";
import React from "react";

function News() {
  const router = useRouter()
  const goToCreateANewPost = () => {router.push('/dashboard/news/create')}
  return (
  <div className="p-4">
    <PageHeader title='News Management' button={<Button title='Create a new post' action={goToCreateANewPost}/>}/>
    <NewsList />
  </div>);
}

export default News;

News.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
