import React from "react";
import Image from "next/image";
import Link from "next/link";
import { displayDate } from "@/src/utils/displayDate";
import ViewCount from "./ViewCount";

function NewsItem({ news }) {
  return (
    <Link href={`/news/${news._id}`}>
      <div className="relative h-[275px] w-full flex transition ease-in-out duration-200 hover:scale-105">
        <div className="relative h-full w-2/5 hidden md:block">
          <Image
            alt="news preview image"
            src={news.thumbnail}
            fill
            className="object-cover overflow-hidden"
          />
        </div>
        <div className="flex flex-col justify-center w-full px-3 md:px-0 md:w-3/5 md:ml-11 font-medium text-neutral-400">
          <div className="absolute h-full w-full opacity-20 md:hidden">
            <Image
              alt="news preview image"
              src={news.thumbnail}
              fill
              className="object-cover overflow-hidden -mx-3"
            />
          </div>
          <div className="flex space-x-3 mb-1  text-gray-400/80 z-10">
            <p className="uppercase tracking-widest">
              {displayDate(news.date)}
            </p>
            <ViewCount viewCount={news.viewCount} />
          </div>

          <p className="text-3xl capitalize text-white mr-2">{news.title}</p>
          <p className="text-xl my-2">{news.description}</p>
          <div className="group w-full flex items-center">
            <span className="font-extrabold text-lg uppercase tracking-widest transition ease-in-out duration-200 group-hover:text-sky-500/80">
              Read more
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 transition ease-in-out duration-200 group-hover:text-white group-hover:translate-x-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="border-b border-b-gray-800 my-8"></div>
    </Link>
  );
}

export default NewsItem;
