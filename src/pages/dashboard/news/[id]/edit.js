import DashboardLayout from "@/src/components/layout/DasboardLayout";
import React from "react";
import News from "@/src/db/models/News";
import { useRouter } from "next/router";
import dbConnect from "@/src/db/mongooseConnector";
import NewsForm from "@/src/components/dashboard/news/NewsForm";
import formType from "@/src/utils/formType";

export async function getServerSideProps(context) {
  const id = context.params.id;
  await dbConnect();
  try {
    const news = await News.findById(id);
    return {
      props: {
        success: true,
        defaultValues: {
          title: news.title,
          description: news.description,
          date: news.date.getTime(),
          thumbnail: news.thumbnail,
          backgroundImage: news.backgroundImage,
          content: news.content,
        },
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        success: false,
        defaultValues: {
          title: "",
          description: "",
          date: new Date().getTime(),
          thumbnail: "",
          backgroundImage: "",
          content: "",
        },
      },
    };
  }
}

function EditNews(props) {
  const router = useRouter();
  const { id } = router.query;
  console.log(props.defaultValues);
  return (
    <div className="p-4">
      {props.success ? (
        <NewsForm
          type={formType.EDIT}
          defaultValues={props.defaultValues}
          id={id}
        />
      ) : (
        <div className="h-[50vh] text-4xl flex justify-center items-center">
          <p>Can not find this news post</p>
        </div>
      )}
    </div>
  );
}

export default EditNews;

EditNews.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
