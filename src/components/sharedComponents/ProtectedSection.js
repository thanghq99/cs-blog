import React from "react";

function ProtectedSection() {
  return (
    <div className="w-full h-80 flex flex-col justify-center items-center">
      <p className="text-5xl uppercase">Protected section!</p>
      <p className="text-xl">You don't have permission to access this page</p>
    </div>
  );
}

export default ProtectedSection;
