import DashboardLayout from "@/src/components/layout/DasboardLayout";
import PageHeader from "@/src/components/sharedComponents/PageHeader";
import Button from "@/src/components/sharedComponents/Button";
import React, { useState } from "react";
import { toast } from "react-toastify";
import CustomDatePicker from "@/src/components/sharedComponents/CustomDatePicker";
import { useRouter } from "next/router";
import TextareaAutosize from "react-textarea-autosize";

function CreateUpdates(props) {
  const router = useRouter();
  const [date, setDate] = useState(new Date());
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);

  const handleChangeContent = (e) => {
    setContent(e.target.value);
  };

  const validateForm = () => {
    setErrors([]);
    const newErrors = [];
    if (date === "") newErrors.push("Date must not be empty.");
    if (content === "") newErrors.push("Content must not be empty.");
    setErrors(newErrors);
    return newErrors;
  };

  const handleSubmit = async () => {
    const newErrors = validateForm();
    if (newErrors.length === 0) {
      const submitData = {
        date,
        content,
      };
      console.log(submitData);
      try {
        let fetchData = await fetch("/api/updates", {
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
        else toast.success("Updates is successfully created");
        router.push("/dashboard/updates");
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
          {errors.map((e, index) => (
            <p key={index}>{e}</p>
          ))}
        </div>
        <div className="text-black mb-3">
          <h2 className="text-lg text-white">Update date</h2>
          <CustomDatePicker date={date} setDate={setDate} />
          <h2 className="text-lg text-white">Updates content</h2>
          <TextareaAutosize
            className="w-full my-1 px-4 py-2 rounded-none md:block focus:outline-custom"
            value={content}
            onChange={handleChangeContent}
            placeholder="Update content"
          />
        </div>
      </div>
    </div>
  );
}

export default CreateUpdates;

CreateUpdates.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
