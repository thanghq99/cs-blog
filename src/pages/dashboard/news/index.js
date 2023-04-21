import React, { useState } from "react";
import { useRouter } from "next/router";
import NewsList from "@/src/components/dashboard/news/NewsList";
import DashboardLayout from "@/src/components/layout/DasboardLayout";
import Button from "@/src/components/sharedComponents/Button";
import PageHeader from "@/src/components/sharedComponents/PageHeader";
import useNewsList from "@/src/hooks/useNewsList";
import Pagination from "@/src/components/sharedComponents/Pagination";
import LoadingSection from "@/src/components/sharedComponents/LoadingSection";

const DEFAULT_PAGE_SIZE = 5;
function News(props) {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const { data, isLoading } = useNewsList(page, pageSize);

  const goToCreateANewPost = () => {
    router.push("/dashboard/news/create");
  };
  return isLoading ? (
    <LoadingSection />
  ) : (
    <div className="p-4">
      <PageHeader
        title="News Management"
        button={
          <Button title="Create a new post" action={goToCreateANewPost} />
        }
      />
      {data.data.length > 0 ? (
        <>
          <NewsList newList={data.data} page={page} pageSize={pageSize} />
          <div className="mt-4">
            <Pagination
              page={page}
              pageSize={pageSize}
              count={data.count}
              setPage={setPage}
              setPageSize={setPageSize}
              pageSizeChangeable
              pageSizeOptions={[5, 10, 25]}
            />
          </div>
        </>
      ) : (
        <div className="w-full h-28 flex justify-center items-center">
          <p>No news yet, click the button above to create some.</p>
        </div>
      )}
    </div>
  );
}

export default News;

News.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
