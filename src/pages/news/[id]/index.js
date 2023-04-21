import dynamic from "next/dynamic";
import React from "react";
import NewsModel from "@/src/db/models/News";
import dbConnect from "@/src/db/mongooseConnector";
import NewsContentLayout from "@/src/components/layout/NewsContentLayout";
import BackToNewsButton from "@/src/components/news/BackToNewsButton";
import { displayDate } from "@/src/utils/displayDate";

const CustomEditor = dynamic(
  () => import("@/src/components/sharedComponents/CustomEditor"),
  {
    ssr: false,
    loading: () => <p>Loading ...</p>,
  }
);

export async function getServerSideProps(context) {
  const id = context.params.id;
  await dbConnect();
  try {
    const news = await NewsModel.findById(id);
    let oldViewCount = news.viewCount;
    await news.updateOne({ viewCount: oldViewCount + 1 });
    return {
      props: {
        success: true,
        title: news.title,
        description: news.description,
        date: news.date.toString(),
        backgroundImage: news.backgroundImage,
        publishable: news.publishable,
        content: news.content,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        success: false,
        title: "",
        description: "",
        date: "",
        backgroundImage: "",
        publishable: false,
        content: "",
      },
    };
  }
}

function News(props) {
  return (
    <div className="relative min-h-screen ">
      {/* backgound image */}
      <div
        className="w-full h-[500px] -mb-72"
        style={{
          WebkitMaskImage:
            "linear-gradient(to top, transparent 25%, black 100%)",
        }}
      >
        <div
          className={`h-full w-full bg-cover bg-no-repeat bg-center opacity-95`}
          style={{
            backgroundImage: "url(" + props.backgroundImage + ")",
          }}
        ></div>
      </div>

      {/* title container START */}
      <div className="relative z-10 container mx-auto flex flex-col items-center">
        {/* back to news button */}
        <BackToNewsButton />
        {/* title */}
        <p
          className="mt-10 mb-8 text-5xl text-white font-black"
          style={{ textShadow: "0px 0px 10px #000, 0px 0px 5px #000" }}
        >
          {props.title}
        </p>
        {/* publish date */}
        <p className="text-xl uppercase tracking-widest text-gray-400">
          {displayDate(props.date)}
        </p>
      </div>
      {/* title container END */}

      {/* content */}
      <div className="p-4">
        {props.success ? (
          <CustomEditor content={props.content} isReadOnly={true} />
        ) : (
          <div className="h-[50vh] text-4xl flex justify-center items-center">
            <p>Can not find this news post</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default News;

News.getLayout = function getLayout(page) {
  return <NewsContentLayout>{page}</NewsContentLayout>;
};
