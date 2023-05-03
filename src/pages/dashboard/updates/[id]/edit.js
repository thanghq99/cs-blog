import DashboardLayout from "@/src/components/layout/DasboardLayout";
import React from "react";
import Updates from "@/src/db/models/Updates";
import { useRouter } from "next/router";
import dbConnect from "@/src/db/mongooseConnector";
import UpdateForm from "@/src/components/dashboard/updates/UpdateForm";
import formType from "@/src/utils/formType";

export async function getServerSideProps(context) {
  const id = context.params.id;
  await dbConnect();
  try {
    const updates = await Updates.findById(id);
    return {
      props: {
        success: true,
        defaultValues: {
          date: updates.date.getTime(),
          content: updates.content,
        },
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        success: false,
        defaultValues: {
          date: new Date().getTime(),
          content: "",
        },
      },
    };
  }
}

function EditUpdates(props) {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="p-4">
      {props.success ? (
        <UpdateForm
          type={formType.EDIT}
          defaultValues={props.defaultValues}
          id={id}
        />
      ) : (
        <div className="h-[50vh] text-4xl flex justify-center items-center">
          <p>Can not find this update post</p>
        </div>
      )}
    </div>
  );
}

export default EditUpdates;

EditUpdates.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
