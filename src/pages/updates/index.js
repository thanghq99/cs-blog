import BlogLayout from "@/src/components/layout/BlogLayout";
import LoadingSection from "@/src/components/sharedComponents/LoadingSection";
import Pagination from "@/src/components/sharedComponents/Pagination";
import UpdateItem from "@/src/components/updates/UpdateItem";
import useUpdatesList from "@/src/hooks/useUpdatesList";
import React, { useState } from "react";

const DEFAULT_PAGE_SIZE = 15;
function Updates() {
  const [page, setPage] = useState(0);
  const { data, isLoading } = useUpdatesList(page, DEFAULT_PAGE_SIZE);
  return isLoading ? (
    <LoadingSection />
  ) : (
    <div className="container mx-auto xl:max-w-[1200px] flex flex-col">
      {data.data.map((update, index) => (
        <UpdateItem key={index} update={update} />
      ))}
      <div className="mt-7 mb-20">
        <Pagination
          page={page}
          pageSize={DEFAULT_PAGE_SIZE}
          setPage={setPage}
          count={data.count}
        />
      </div>
    </div>
  );
}

export default Updates;

Updates.getLayout = function getLayout(page) {
  return <BlogLayout>{page}</BlogLayout>;
};
