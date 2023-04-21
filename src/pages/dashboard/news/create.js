import DashboardLayout from "@/src/components/layout/DasboardLayout";
import PageHeader from "@/src/components/sharedComponents/PageHeader";
import Button from "@/src/components/sharedComponents/Button";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import ImageUploader from "@/src/components/sharedComponents/ImageUploader";
import { toast } from "react-toastify";
import CustomDatePicker from "@/src/components/sharedComponents/CustomDatePicker";
import { useRouter } from "next/router";

const CustomEditor = dynamic(
  () => import("@/src/components/sharedComponents/CustomEditor"),
  {
    ssr: false,
    loading: () => <p>Loading ...</p>,
  }
);

function CreateNews(props) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");
  const [date, setDate] = useState(new Date());
  const [content, setContent] = useState("");
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
      console.log(submitData);
      try {
        let fetchData = await fetch("/api/news", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submitData),
        });
        let fetchResponse = await fetchData.json();
        console.log(fetchResponse);
        if (fetchResponse.success === false) toast.error("An error occurs");
        else toast.success("News is successfully created");
        router.push("/dashboard/news");
      } catch (error) {
        console.log(error);
        toast.error("An error occurs");
      }
    } else toast.error("Please fill the form");
  };

  return (
    <div className="p-4">
      <PageHeader
        title="Create a new post"
        button={<Button title="Create" action={handleSubmit} />}
      />
      <div>
        <div className="text-center bolder text-lg">
          <p>
            NOTE: Remember to wait for the images to be fully uploaded and fill
            every fields
          </p>
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
    </div>
  );
}

export default CreateNews;

CreateNews.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
