import React, { useState } from "react";
import { useRouter } from "next/router";
import UpdatesList from "@/src/components/dashboard/updates/UpdatesList";
import DashboardLayout from "@/src/components/layout/DasboardLayout";
import Button from "@/src/components/sharedComponents/Button";
import PageHeader from "@/src/components/sharedComponents/PageHeader";
import useUpdatesList from "@/src/hooks/useUpdatesList";
import Pagination from "@/src/components/sharedComponents/Pagination";
import LoadingSection from "@/src/components/sharedComponents/LoadingSection";
function Updates(props) {
  const router = useRouter();
  const { data, isLoading, page, pageSize, setPage, setPageSize, mutate } =
    useUpdatesList();

  const goToCreateANewUpdate = () => {
    router.push("/dashboard/updates/create");
  };
  return isLoading ? (
    <LoadingSection />
  ) : (
    <div className="p-4">
      <PageHeader
        title="Updates Management"
        button={
          <Button title="Create a new update" action={goToCreateANewUpdate} />
        }
      />
      {data.data.length > 0 ? (
        <>
          <UpdatesList
            updatesList={data.data}
            mutate={mutate}
            pageSize={pageSize}
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
          <p>No update yet, click the button above to create some.</p>
        </div>
      )}
    </div>
  );
}

export default Updates;

Updates.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
