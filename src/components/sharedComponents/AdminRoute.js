import { useSession } from "next-auth/react";
import React from "react";
import ProtectedSection from "./ProtectedSection";

function AdminRoute({ children }) {
  const { data } = useSession();
  if (data.user.isAdmin === true) return <div>{children}</div>;
  else return <ProtectedSection />;
}

export default AdminRoute;
