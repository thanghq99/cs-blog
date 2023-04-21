import useNewsList from "@/src/hooks/useNewsList";
import React from "react";
import NewsItem from "./NewsItem";

function LastestNews() {
  const { data, isLoading } = useNewsList(0, 3); //lastest 3 news posts
  return isLoading ? (
    "Loading"
  ) : (
    <div className="container mx-auto xl:max-w-[1200px] pb-40">
      <p className="w-full mb-3 text-center text-xl font-bold uppercase text-gray-400 tracking-widest">
        Lastest news
      </p>

      {data.data.map((news, index) => (
        <NewsItem key={index} news={news} />
      ))}
    </div>
  );
}

export default LastestNews;
