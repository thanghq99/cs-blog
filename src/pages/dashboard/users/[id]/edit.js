import DashboardLayout from "@/src/components/layout/DasboardLayout";
import PageHeader from "@/src/components/sharedComponents/PageHeader";
import Button from "@/src/components/sharedComponents/Button";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Users from "@/src/db/models/Users";
import { useRouter } from "next/router";
import dbConnect from "@/src/db/mongooseConnector";
import AdminRoute from "@/src/components/sharedComponents/AdminRoute";
import UserForm from "@/src/components/dashboard/users/UserForm";
import formType from "@/src/utils/formType";

export async function getServerSideProps(context) {
  const id = context.params.id;
  await dbConnect();
  try {
    const users = await Users.findById(id);
    return {
      props: {
        success: true,
        defaultValues: {
          email: users.email,
          alias: users.alias,
          isAdmin: users.isAdmin,
        },
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        success: false,
        defaultValues: {
          email: "",
          alias: "",
          isAdmin: false,
        },
      },
    };
  }
}

function EditUsers(props) {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="p-4">
      {props.success ? (
        <UserForm
          type={formType.EDIT}
          defaultValues={props.defaultValues}
          id={id}
        />
      ) : (
        <div className="h-[50vh] text-4xl flex justify-center items-center">
          <p>Can not find this user post</p>
        </div>
      )}
    </div>
  );
}

export default EditUsers;

EditUsers.getLayout = function getLayout(page) {
  return (
    <DashboardLayout>
      <AdminRoute>{page}</AdminRoute>
    </DashboardLayout>
  );
};
