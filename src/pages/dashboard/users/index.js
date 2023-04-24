import React, { useState } from "react";
import { useRouter } from "next/router";
import UsersList from "@/src/components/dashboard/users/UsersList";
import DashboardLayout from "@/src/components/layout/DasboardLayout";
import Button from "@/src/components/sharedComponents/Button";
import PageHeader from "@/src/components/sharedComponents/PageHeader";
import useUsersList from "@/src/hooks/useUsersList";
import Pagination from "@/src/components/sharedComponents/Pagination";
import LoadingSection from "@/src/components/sharedComponents/LoadingSection";

const DEFAULT_PAGE_SIZE = 5;
function Users(props) {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const { data, isLoading } = useUsersList(page, pageSize);

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
          <UsersList usersList={data.data} page={page} pageSize={pageSize} />
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
  return <DashboardLayout>{page}</DashboardLayout>;
};
