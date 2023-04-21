import DashboardLayout from "@/src/components/layout/DasboardLayout";
import PageHeader from "@/src/components/sharedComponents/PageHeader";
import Button from "@/src/components/sharedComponents/Button";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import ImageUploader from "@/src/components/sharedComponents/ImageUploader";
import { toast } from "react-toastify";
import News from "@/src/db/models/News";
import { useRouter } from "next/router";
import dbConnect from "@/src/db/mongooseConnector";
import CustomDatePicker from "@/src/components/sharedComponents/CustomDatePicker";

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
    const news = await News.findById(id);
    return {
      props: {
        success: true,
        title: news.title,
        description: news.description,
        date: news.date.toString(),
        thumbnail: news.thumbnail,
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
        thumbnail: "",
        backgroundImage: "",
        publishable: false,
        content: "",
      },
    };
  }
}

function EditNews(props) {
  const router = useRouter();
  const { id } = router.query;
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);
  const [date, setDate] = useState(new Date(props.date));
  const [thumbnail, setThumbnail] = useState(props.imageUrl);
  const [backgroundImage, setBackgroundImage] = useState(props.backgroundImage);
  const [content, setContent] = useState(props.content);
  const [errors, setErrors] = useState([]);

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const validateForm = () => {
    setErrors([]);
    const newErrors = [];
    if (title === "") newErrors.push("Title must not be empty.");
    if (description === "") newErrors.push("Description must not be empty.");
    if (date === "") newErrors.push("Date must not be empty.");
    if (thumbnail === "") newErrors.push("Thumbnail image must not be empty.");
    if (backgroundImage === "")
      newErrors.push("Background image must not be empty.");
    setErrors(newErrors);
    return newErrors;
  };

  const handleSubmit = async () => {
    const newErrors = validateForm();
    if (newErrors.length === 0) {
      const submitData = {
        title,
        description,
        date,
        thumbnail,
        backgroundImage,
        content,
      };
      try {
        let fetchData = await fetch(`/api/news/${id}`, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submitData),
        });
        let fetchResponse = await fetchData.json();
        console.log(fetchResponse);
        if (fetchResponse.success === false) toast.error("An error occurs");
        else toast.success("News is successfully updated");
      } catch (error) {
        console.log(error);
        toast.error("An error occurs");
      }
    } else toast.error("Please fill the form");
  };

  return (
    <div className="p-4">
      <PageHeader
        title="Edit news post"
        button={<Button title="Edit" action={handleSubmit} />}
      />
      {props.success ? (
        <>
          <div>
            <div className="text-center bolder text-lg">
              <p>NOTE: Remember to wait for the images to be fully uploaded</p>
              {errors.map((e, index) => (
                <p key={index}>{e}</p>
              ))}
            </div>
            <h2 className="text-lg">News preview</h2>
            <div className="text-black mb-3">
              <input
                value={title}
                onChange={handleChangeTitle}
                className="w-full my-1 px-4 py-2 rounded-none md:block focus:outline-custom"
                type="text"
                placeholder="Title"
              ></input>
              <input
                value={description}
                onChange={handleChangeDescription}
                className="w-full my-1 px-4 py-2 rounded-none md:block focus:outline-custom"
                type="text"
                placeholder="Short description"
              ></input>
              <p className="text-lg text-white">Update date</p>
              <CustomDatePicker date={date} setDate={setDate} />
              <p className="text-lg text-white">Thumbnail image</p>
              <ImageUploader imageUrl={thumbnail} setImageUrl={setThumbnail} />
              <p className="text-lg text-white">Background image</p>
              <ImageUploader
                imageUrl={backgroundImage}
                setImageUrl={setBackgroundImage}
              />
            </div>
          </div>
          <div>
            <h2 className="text-lg">News editor</h2>
            <div className="bg-white text-black">
              <CustomEditor
                setContent={setContent}
                content={content}
                isReadOnly={false}
              />
            </div>
          </div>
        </>
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
