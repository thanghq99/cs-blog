import React, { useState } from "react";
import { useRouter } from "next/router";
import UsersList from "@/src/components/dashboard/users/UsersList";
import DashboardLayout from "@/src/components/layout/DasboardLayout";
import Button from "@/src/components/sharedComponents/Button";
import PageHeader from "@/src/components/sharedComponents/PageHeader";
import useUsersList from "@/src/hooks/useUsersList";
import Pagination from "@/src/components/sharedComponents/Pagination";
import LoadingSection from "@/src/components/sharedComponents/LoadingSection";
import AdminRoute from "@/src/components/sharedComponents/AdminRoute";

function Users(props) {
  const router = useRouter();
  const { data, isLoading, page, pageSize, setPage, setPageSize, mutate } =
    useUsersList();

  const goToCreateANewUser = () => {
    router.push("/dashboard/users/create");
  };
  return isLoading ? (
    <LoadingSection />
  ) : (
    <div className="p-4">
      <PageHeader
        title="Users Management"
        button={
          <Button title="Create a new user" action={goToCreateANewUser} />
        }
      />
      {data.data.length > 0 ? (
        <>
          <UsersList
            usersList={data.data}
            page={page}
            pageSize={pageSize}
            mutate={mutate}
          />
          <div className="mt-4">
            <Pagination
              page={page}
              pageSize={pageSize}
              count={data.count}
              setPage={setPage}
              setPageSize={setPageSize}
              pageSizeChangeable
              pageSizeOptions={[5, 10, 25]}
            />
          </div>
        </>
      ) : (
        <div className="w-full h-28 flex justify-center items-center">
          <p>No user yet, click the button above to create some.</p>
        </div>
      )}
    </div>
  );
}

export default Users;

Users.getLayout = function getLayout(page) {
  return (
    <DashboardLayout>
      <AdminRoute>{page}</AdminRoute>
    </DashboardLayout>
  );
};
