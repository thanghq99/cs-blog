import UpdateForm from "@/src/components/dashboard/updates/UpdateForm";
import DashboardLayout from "@/src/components/layout/DasboardLayout";
import formType from "@/src/utils/formType";

function CreateUpdates(props) {
  return (
    <div className="p-4">
      <UpdateForm type={formType.CREATE} />
    </div>
  );
}

export default CreateUpdates;

CreateUpdates.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
