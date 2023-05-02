import BlogLayout from "@/src/components/layout/BlogLayout";
import NewsItem from "@/src/components/news/NewsItem";
import LoadingSection from "@/src/components/sharedComponents/LoadingSection";
import Pagination from "@/src/components/sharedComponents/Pagination";
import useNewsList from "@/src/hooks/useNewsList";
import React from "react";

const DEFAULT_PAGE = 0;
const DEFAULT_PAGE_SIZE = 15;
const PUBLISH_STATUS = true;
function News() {
  const { data, isLoading, page, setPage } = useNewsList(
    DEFAULT_PAGE,
    DEFAULT_PAGE_SIZE,
    PUBLISH_STATUS
  );
  return isLoading ? (
    <LoadingSection />
  ) : (
    <div className="container mx-auto xl:max-w-[1200px] flex flex-col pt-6 md:pt-14">
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
