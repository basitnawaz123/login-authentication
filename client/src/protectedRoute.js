import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ redirectTo, children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

export default ProtectedRoute;
