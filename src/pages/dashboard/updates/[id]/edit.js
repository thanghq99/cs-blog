import DashboardLayout from "@/src/components/layout/DasboardLayout";
import PageHeader from "@/src/components/sharedComponents/PageHeader";
import Button from "@/src/components/sharedComponents/Button";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Updates from "@/src/db/models/Updates";
import { useRouter } from "next/router";
import dbConnect from "@/src/db/mongooseConnector";
import CustomDatePicker from "@/src/components/sharedComponents/CustomDatePicker";
import TextareaAutosize from "react-textarea-autosize";

export async function getServerSideProps(context) {
  const id = context.params.id;
  await dbConnect();
  try {
    const updates = await Updates.findById(id);
    return {
      props: {
        success: true,
        date: updates.date.toString(),
        content: updates.content,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        success: false,
        date: "",
        content: "",
      },
    };
  }
}

function EditUpdates(props) {
  const router = useRouter();
  const { id } = router.query;
  const [date, setDate] = useState(new Date(props.date));
  const [content, setContent] = useState(props.content);
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
      try {
        let fetchData = await fetch(`/api/updates/${id}`, {
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
        else toast.success("Update is successfully updated");
      } catch (error) {
        console.log(error);
        toast.error("An error occurs");
      }
    } else toast.error("Please fill the form");
  };

  return (
    <div className="p-4">
      <PageHeader
        title="Edit update post"
        button={<Button title="Edit" action={handleSubmit} />}
      />
      {props.success ? (
        <>
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
        </>
      ) : (
        <div className="h-[50vh] text-4xl flex justify-center items-center">
          <p>Can not find this updates post</p>
        </div>
      )}
    </div>
  );
}

export default EditUpdates;

EditUpdates.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
