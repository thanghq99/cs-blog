import DashboardLayout from "@/src/components/layout/DasboardLayout";
import PageHeader from "@/src/components/sharedComponents/PageHeader";
import Button from "@/src/components/sharedComponents/Button";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import CustomEditorRenderer from "@/src/components/sharedComponents/CustomEditorRenderer";

const CustomEditor = dynamic(
  () => import("@/src/components/sharedComponents/CustomEditor"),
  {
    ssr: false,
    loading: () => <p>Loading ...</p>,
  }
);

function CreateNews() {
  const [content, setContent] = useState("");

  return (
    <div className="p-4">
      <PageHeader
        title="Create a new post"
        button={
          <Button
            title="Create"
            action={() =>
              console.log("try to create with this content: ", content)
            }
          />
        }
      />
      <div>
        <h2 className="text-lg">News preview</h2>
        <div className="text-black mb-3">
          <input
            className="w-full my-1 px-3 py-2"
            type="text"
            placeholder="Title"
          ></input>
          <input
            className="w-full my-1 px-3 py-2"
            type="text"
            placeholder="Description"
          ></input>
          <p className="text-white">Preview image</p>
          <input
            className="my-1 text-white"
            type="file"
            placeholder="Backgound image"
          ></input>
        </div>
      </div>
      <div>
        <h2 className="text-lg">News Writer</h2>
        <div className="bg-white text-black">
          <CustomEditor setContent={setContent} content={content} />
        </div>
        <h2 className="text-lg">News Preview</h2>
        <div className="bg-white text-black mt-2">
          {content && <CustomEditorRenderer content={content} />}
        </div>
      </div>
    </div>
  );
}

export default CreateNews;

CreateNews.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
