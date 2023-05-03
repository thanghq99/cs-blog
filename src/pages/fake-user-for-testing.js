import React from "react";
import formType from "../utils/formType";
import UserForm from "../components/dashboard/users/UserForm";

function FakeUserCreation(props) {
  return (
    <div className="min-h-screen bg-slate-800 p-8 text-white">
      <div className="container mx-auto ">
        <UserForm type={formType.CREATE} />
      </div>
    </div>
  );
}

export default FakeUserCreation;
