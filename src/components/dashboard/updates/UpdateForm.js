import PageHeader from "@/src/components/sharedComponents/PageHeader";
import Button from "@/src/components/sharedComponents/Button";
import React from "react";
import { toast } from "react-toastify";
import CustomDatePicker from "@/src/components/sharedComponents/CustomDatePicker";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import CustomTextareaAutoSize from "@/src/components/sharedComponents/CustomTextareaAutoSize";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "@/src/components/sharedComponents/ErrorMessage";
import formType from "@/src/utils/formType";

const Update = z.object({
  date: z.coerce.date(),
  content: z.string().min(1, "Content must contain at least 1 character(s)"),
});

export default function UpdateForm({ type, defaultValues, id }) {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      date: defaultValues?.date || new Date().setHours(0, 0, 0, 0),
      content: defaultValues?.content || "",
    },
    resolver: zodResolver(Update),
  });
  const onSubmit = async (data) => {
    let createFn = () => {
      return fetch("/api/updates", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    };
    let editFn = () => {
      return fetch(`/api/updates/${id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    };
    try {
      let fetchData =
        type === formType.CREATE ? await createFn() : await editFn();
      let fetchResponse = await fetchData.json();
      console.log(fetchResponse);
      if (fetchResponse.success === false)
        toast.error(fetchResponse?.message || "An error occurs");
      else {
        toast.success(
          `Updates is successfully ${
            type === formType.CREATE ? "created" : "edited"
          } `
        );
        if (type === formType.CREATE) router.push("/dashboard/updates");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurs");
    }
  };
  return (
    <>
      <PageHeader
        title={
          type === formType.CREATE
            ? "Create a new update post"
            : "Edit update post"
        }
        button={
          <Button
            title={type === formType.CREATE ? "Create" : "Edit"}
            action={handleSubmit(onSubmit)}
          />
        }
      />
      <form>
        <div className="text-black mb-3">
          <h2 className="text-lg text-white">Update date</h2>
          <CustomDatePicker name="date" control={control} />
          <ErrorMessage message={errors?.date?.message}></ErrorMessage>
          <h2 className="text-lg text-white">Updates content</h2>
          <CustomTextareaAutoSize name="content" control={control} />
          <ErrorMessage message={errors?.content?.message}></ErrorMessage>
        </div>
      </form>
    </>
  );
}
