import React from "react";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const authorized = false;
  // do check authentication
  //   if (!authorized) return navigate("/auth/login");

  return children;
};

export default PrivateRoute;
