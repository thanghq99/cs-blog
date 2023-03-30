import BlogLayout from "@/components/layout/BlogLayout";
import React from "react";

function News() {
  return <div>Counter-Strike News</div>;
}

export default News;

News.getLayout = function getLayout(page) {
  return <BlogLayout>{page}</BlogLayout>;
};
