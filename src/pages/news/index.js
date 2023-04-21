import BlogLayout from "@/src/components/layout/BlogLayout";
import NewsItem from "@/src/components/news/NewsItem";
import LoadingSection from "@/src/components/sharedComponents/LoadingSection";
import Pagination from "@/src/components/sharedComponents/Pagination";
import useNewsList from "@/src/hooks/useNewsList";
import React, { useState } from "react";

const DEFAULT_PAGE_SIZE = 15;
function News() {
  const [page, setPage] = useState(0);
  const { data, isLoading } = useNewsList(page, DEFAULT_PAGE_SIZE, true);
  return isLoading ? (
    <LoadingSection />
  ) : (
    <div className="container mx-auto xl:max-w-[1200px] flex flex-col lg:pt-14">
      {data.data.map((news, index) => (
        <NewsItem key={index} news={news} />
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

export default News;

News.getLayout = function getLayout(page) {
  return <BlogLayout>{page}</BlogLayout>;
};
