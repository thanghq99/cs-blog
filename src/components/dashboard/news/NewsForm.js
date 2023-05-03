import PageHeader from "@/src/components/sharedComponents/PageHeader";
import Button from "@/src/components/sharedComponents/Button";
import dynamic from "next/dynamic";
import React from "react";
import ImageUploader from "@/src/components/sharedComponents/ImageUploader";
import { toast } from "react-toastify";
import CustomDatePicker from "@/src/components/sharedComponents/CustomDatePicker";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "../../sharedComponents/ErrorMessage";
import formType from "@/src/utils/formType";

const News = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title  must contain at least 1 character(s)")
    .max(60, "Title must contain at most 200 character(s)"),
  description: z
    .string()
    .trim()
    .min(1, "Description must contain at least 1 character(s)")
    .max(200, "Description must contain at most 200 character(s)"),
  thumbnail: z.string().min(1, "Thumbnail must be provided"),
  backgroundImage: z.string().min(1, "Background image must be provided"),
  date: z.coerce.date(),
  content: z.string().min(1),
});

const CustomEditor = dynamic(
  () => import("@/src/components/sharedComponents/CustomEditor"),
  {
    ssr: false,
    loading: () => <p>Loading ...</p>,
  }
);

export default function NewsForm({ type, defaultValues, id }) {
  const router = useRouter();
  const {
    control,
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: defaultValues?.title || "",
      description: defaultValues?.description || "",
      thumbnail: defaultValues?.thumbnail || "",
      backgroundImage: defaultValues?.backgroundImage || "",
      date: defaultValues?.date || new Date().setHours(0, 0, 0, 0),
      content: defaultValues?.content || "",
    },
    resolver: zodResolver(News),
  });

  watch(["thumbnail", "backgroundImage"]);

  const onSubmit = async (data) => {
    function createFn() {
      return fetch("/api/news", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    }
    function editFn() {
      return fetch(`/api/news/${id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    }
    try {
      let fetchData =
        type === formType.EDIT ? await editFn() : await createFn();
      let fetchResponse = await fetchData.json();
      console.log(fetchResponse);
      if (fetchResponse.success === false)
        toast.error(fetchResponse?.message || "An error occurs");
      else {
        toast.success(
          `News is successfully ${
            type === formType.EDIT ? "edited" : "created"
          }`
        );
        if (type === formType.CREATE) router.push("/dashboard/news");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurs");
    }
  };

  const handleChangeThumbnail = (imageUrl) => {
    setValue("thumbnail", imageUrl);
  };

  const handleChangeBackgroundImage = (imageUrl) => {
    setValue("backgroundImage", imageUrl);
  };

  const handleChangeContent = (content) => {
    setValue("content", content);
  };

  return (
    <>
      <PageHeader
        title={type === formType.EDIT ? "Edit news post" : "Create a news post"}
        button={
          <Button
            title={type === formType.EDIT ? "Edit" : "Create"}
            action={handleSubmit(onSubmit)}
          />
        }
      />
      <form>
        <div className="text-center bolder text-lg">
          <p onClick={() => console.log(getValues())}>
            NOTE: Remember to wait for the images to be fully uploaded and fill
            every fields
          </p>
        </div>
        <h2 className="text-lg">News preview</h2>
        <div className="text-black mb-3">
          <input
            {...register("title")}
            className="w-full my-1 px-4 py-2 rounded-none md:block focus:outline-custom"
            type="text"
            placeholder="Title"
          ></input>
          <ErrorMessage message={errors.title?.message} />
          <input
            {...register("description")}
            className="w-full my-1 px-4 py-2 rounded-none md:block focus:outline-custom"
            type="text"
            placeholder="Short description"
          ></input>
          <ErrorMessage message={errors.description?.message} />
          <p className="text-lg text-white">Update date</p>
          <CustomDatePicker name="date" control={control} />
          <ErrorMessage message={errors.date?.message} />
          <p className="text-lg text-white">Thumbnail image</p>
          <ImageUploader
            imageUrl={getValues("thumbnail")}
            setImageUrl={handleChangeThumbnail}
          />
          <ErrorMessage message={errors.thumbnail?.message} />
          <p className="text-lg text-white">Background image</p>
          <ImageUploader
            imageUrl={getValues("backgroundImage")}
            setImageUrl={handleChangeBackgroundImage}
          />
          <ErrorMessage message={errors.backgroundImage?.message} />
        </div>
        <h2 className="text-lg">News editor</h2>
        <div className="bg-white text-black">
          <CustomEditor
            setContent={handleChangeContent}
            content={getValues("content")}
            isReadOnly={false}
          />
        </div>
        <ErrorMessage message={errors.content?.message} />
      </form>
    </>
  );
}
