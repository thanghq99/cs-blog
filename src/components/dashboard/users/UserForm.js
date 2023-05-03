import React from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "@/src/components/sharedComponents/ErrorMessage";
import formType from "@/src/utils/formType";
import PageHeader from "../../sharedComponents/PageHeader";
import Button from "../../sharedComponents/Button";
import { toast } from "react-toastify";

const User = z.object({
  email: z.string().email("Email is not valid"),
  alias: z.string().min(1, "Alias must contain at least 1 character(s)"),
  isAdmin: z.coerce.boolean(),
});

export default function UserForm({ type, defaultValues, id }) {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: defaultValues?.email || "",
      alias: defaultValues?.alias || "",
      isAdmin: defaultValues?.isAdmin || false,
    },
    resolver: zodResolver(User),
  });

  const onSubmit = async (data) => {
    console.log(data);
    let createFn = () => {
      return fetch("/api/users", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    };
    let editFn = () => {
      return fetch(`/api/users/${id}`, {
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
      if (fetchResponse.success === false) {
        toast.error(fetchResponse?.message || "An error occurs");
      } else {
        toast.success(
          `Users is successfully ${
            type === formType.CREATE ? "created" : "edited"
          }`
        );
        if (type === formType.CREATE) router.push("/dashboard/users");
      }
    } catch (error) {
      console.log(error);

      toast.error("An error occurs");
    }
  };

  return (
    <>
      <PageHeader
        title={type === formType.CREATE ? "Create a new user" : "Edit user"}
        button={
          <Button
            title={type === formType.CREATE ? "Create" : "Edit"}
            action={handleSubmit(onSubmit)}
          />
        }
      />
      <form>
        <div className="text-black mb-3 flex flex-col space-y-2 lg:flex-row lg:space-x-2 lg:space-y-0">
          <div className="w-full">
            <h2 className="text-lg text-white">Email</h2>
            <input
              {...register("email")}
              className="w-full h-10 px-4 py-2 rounded-none md:block focus:outline-custom"
              placeholder="Email"
            />
            <ErrorMessage message={errors?.email?.message} />
          </div>
          <div className="w-full">
            <h2 className="text-lg text-white">Alias</h2>
            <input
              {...register("alias")}
              className="w-full h-10 px-4 py-2 rounded-none md:block focus:outline-custom"
              placeholder="Alias"
            />
            <ErrorMessage message={errors?.alias?.message} />
          </div>
          <div className="w-full">
            <h2 className="text-lg text-white">Is admin?</h2>
            <select
              {...register("isAdmin")}
              className="w-full h-10 px-4 py-2 rounded-none leading-6 md:block focus:outline-custom"
            >
              <option value={true}>Yes</option>
              <option value={false}>Yesn't</option>
            </select>
            <ErrorMessage message={errors?.isAdmin?.message} />
          </div>
        </div>
      </form>
    </>
  );
}
