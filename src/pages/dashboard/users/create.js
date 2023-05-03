import DashboardLayout from "@/src/components/layout/DasboardLayout";
import React from "react";
import AdminRoute from "@/src/components/sharedComponents/AdminRoute";
import UserForm from "@/src/components/dashboard/users/UserForm";
import formType from "@/src/utils/formType";

function CreateUsers(props) {
  return (
    <div className="p-4">
      <UserForm type={formType.CREATE} />
    </div>
  );
}

export default CreateUsers;

CreateUsers.getLayout = function getLayout(page) {
  return (
    <DashboardLayout>
      <AdminRoute>{page}</AdminRoute>
    </DashboardLayout>
  );
};
